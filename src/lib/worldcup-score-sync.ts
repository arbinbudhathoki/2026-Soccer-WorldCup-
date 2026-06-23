import {
  API_FOOTBALL_WORLD_CUP_LEAGUE_ID,
  API_FOOTBALL_WORLD_CUP_SEASON,
  fetchLiveWorldCupFixtures,
  fetchWorldCupFixtures,
  type ApiFootballFixtureItem,
} from "@/lib/api-football/client";
import { fixturePairKey, normalizeTeamLabel } from "@/lib/api-football/team-aliases";
import {
  worldCup2026GroupStageFixtures,
  type GroupStageFixture,
} from "@/data/worldcup-history";
import {
  type WorldCupLiveScore,
  type WorldCupMatchStatus,
  type WorldCupScoresSnapshot,
  writeWorldCupLiveScores,
} from "@/lib/worldcup-live-score-store";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const GROUP_FIXTURE_BY_PAIR = new Map<string, GroupStageFixture>(
  worldCup2026GroupStageFixtures.map((f) => [
    fixturePairKey(f.home, f.away),
    f,
  ]),
);

function mapApiStatus(short: string): WorldCupMatchStatus {
  const s = short.toUpperCase();
  if (["FT", "AET", "PEN"].includes(s)) {
    return "finished";
  }
  if (["NS", "TBD"].includes(s)) {
    return "scheduled";
  }
  if (["PST", "SUSP"].includes(s)) {
    return "postponed";
  }
  if (["CANC", "ABD", "AWD", "WO"].includes(s)) {
    return "void";
  }
  return "live";
}

function toLiveScore(item: ApiFootballFixtureItem): WorldCupLiveScore {
  const homeTeam = normalizeTeamLabel(item.teams.home.name);
  const awayTeam = normalizeTeamLabel(item.teams.away.name);
  const pairKey = fixturePairKey(homeTeam, awayTeam);
  const groupFixture = GROUP_FIXTURE_BY_PAIR.get(pairKey);

  return {
    fixtureKey: groupFixture?.id ?? null,
    apiFixtureId: item.fixture.id,
    homeTeam,
    awayTeam,
    homeScore: item.goals.home,
    awayScore: item.goals.away,
    status: mapApiStatus(item.fixture.status.short),
    statusLabel: item.fixture.status.long,
    kickoffAt: item.fixture.date,
    updatedAt: new Date().toISOString(),
  };
}

function mergeFixtureLists(
  all: ApiFootballFixtureItem[],
  live: ApiFootballFixtureItem[],
): ApiFootballFixtureItem[] {
  const byId = new Map<number, ApiFootballFixtureItem>();
  for (const item of all) {
    byId.set(item.fixture.id, item);
  }
  for (const item of live) {
    byId.set(item.fixture.id, item);
  }
  return [...byId.values()];
}

export type WorldCupSyncResult = {
  ok: boolean;
  message: string;
  snapshot?: WorldCupScoresSnapshot;
  matchedGroupFixtures: number;
  finishedCount: number;
  liveCount: number;
  supabaseUpdated: number;
};

async function updateSupabaseScores(scores: WorldCupLiveScore[]): Promise<number> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return 0;
  }

  let updated = 0;
  for (const score of scores) {
    if (!score.fixtureKey) {
      continue;
    }

    const payload: Record<string, unknown> = {
      status: score.status,
      external_fifa_match_code: String(score.apiFixtureId),
    };

    if (score.status === "finished" || score.status === "live") {
      if (score.homeScore !== null) {
        payload.home_score = score.homeScore;
      }
      if (score.awayScore !== null) {
        payload.away_score = score.awayScore;
      }
    }

    if (score.kickoffAt) {
      payload.kickoff_at = score.kickoffAt;
    }

    const { error } = await supabase
      .from("matches")
      .update(payload)
      .eq("fixture_key", score.fixtureKey);

    if (!error) {
      updated += 1;
    }
  }

  if (updated > 0) {
    await supabase.rpc("refresh_prediction_points");
  }

  return updated;
}

export async function syncWorldCupScoresFromApiFootball(): Promise<WorldCupSyncResult> {
  const [allFixtures, liveFixtures] = await Promise.all([
    fetchWorldCupFixtures(),
    fetchLiveWorldCupFixtures(),
  ]);

  const merged = mergeFixtureLists(allFixtures, liveFixtures);
  const scores = merged.map(toLiveScore).sort((a, b) => {
    const aTime = a.kickoffAt ? Date.parse(a.kickoffAt) : 0;
    const bTime = b.kickoffAt ? Date.parse(b.kickoffAt) : 0;
    return aTime - bTime;
  });

  const snapshot: WorldCupScoresSnapshot = {
    syncedAt: new Date().toISOString(),
    source: "api-football",
    leagueId: API_FOOTBALL_WORLD_CUP_LEAGUE_ID,
    season: API_FOOTBALL_WORLD_CUP_SEASON,
    scores,
  };

  await writeWorldCupLiveScores(snapshot);
  const supabaseUpdated = await updateSupabaseScores(scores);

  const matchedGroupFixtures = scores.filter((s) => s.fixtureKey).length;
  const finishedCount = scores.filter((s) => s.status === "finished").length;
  const liveCount = scores.filter((s) => s.status === "live").length;

  return {
    ok: true,
    message: `Synced ${scores.length} World Cup fixtures from API-Football (${finishedCount} finished, ${liveCount} live, ${matchedGroupFixtures} matched to group stage).`,
    snapshot,
    matchedGroupFixtures,
    finishedCount,
    liveCount,
    supabaseUpdated,
  };
}
