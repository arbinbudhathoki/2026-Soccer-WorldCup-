import { PredictorCard } from "@/components/PredictorCard";
import { FixturePointsFeedback } from "@/components/FixturePointsFeedback";
import { FixtureScoreBadge } from "@/components/FixtureScoreBadge";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isPredictionLocked } from "@/lib/match-lock";
import { getScoreByFixtureKey } from "@/lib/worldcup-live-score-store";
import type { GroupStageFixture } from "@/data/worldcup-history";

async function fetchPredictorHydration(fixtureKey: string) {
  const liveScore = await getScoreByFixtureKey(fixtureKey);
  const supabase = await createServerSupabaseClient();

  const base = {
    initialHomeGoals: undefined as number | undefined,
    initialAwayGoals: undefined as number | undefined,
    formLocked: false,
    actualHomeGoals: undefined as number | undefined,
    actualAwayGoals: undefined as number | undefined,
    pointsFeedback: null as {
      predictedHome: number;
      predictedAway: number;
      actualHome: number;
      actualAway: number;
      pointsEarned: number | null;
    } | null,
    liveScore,
  };

  if (!supabase) {
    if (liveScore) {
      base.formLocked =
        liveScore.status === "live" || liveScore.status === "finished";
      if (
        liveScore.homeScore !== null &&
        liveScore.awayScore !== null &&
        (liveScore.status === "finished" || liveScore.status === "live")
      ) {
        base.actualHomeGoals = liveScore.homeScore;
        base.actualAwayGoals = liveScore.awayScore;
      }
    }
    return base;
  }

  const { data: match } = await supabase
    .from("matches")
    .select("id, kickoff_at, status, home_score, away_score")
    .eq("fixture_key", fixtureKey)
    .maybeSingle();

  let formLocked = false;
  let actualHomeGoals: number | undefined;
  let actualAwayGoals: number | undefined;
  let status = "scheduled";

  if (match) {
    status = match.status;
    formLocked = isPredictionLocked(match);
    if (match.home_score !== null && match.away_score !== null) {
      if (match.status === "finished" || match.status === "live") {
        actualHomeGoals = match.home_score;
        actualAwayGoals = match.away_score;
      }
    }
  }

  if (liveScore) {
    if (liveScore.status === "live" || liveScore.status === "finished") {
      formLocked = true;
      status = liveScore.status;
    }
    if (liveScore.homeScore !== null && liveScore.awayScore !== null) {
      if (liveScore.status === "finished" || liveScore.status === "live") {
        actualHomeGoals = liveScore.homeScore;
        actualAwayGoals = liveScore.awayScore;
      }
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialHomeGoals: number | undefined;
  let initialAwayGoals: number | undefined;
  let pointsEarned: number | null = null;

  if (user && match) {
    const { data: row } = await supabase
      .from("predictions")
      .select("home_goals, away_goals, points_earned")
      .eq("match_id", match.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (row) {
      initialHomeGoals = row.home_goals;
      initialAwayGoals = row.away_goals;
      pointsEarned = row.points_earned;
    }
  }

  const pointsFeedback =
    user &&
    match &&
    (status === "finished" || match.status === "finished") &&
    actualHomeGoals !== undefined &&
    actualAwayGoals !== undefined &&
    initialHomeGoals !== undefined &&
    initialAwayGoals !== undefined
      ? {
          predictedHome: initialHomeGoals,
          predictedAway: initialAwayGoals,
          actualHome: actualHomeGoals,
          actualAway: actualAwayGoals,
          pointsEarned,
        }
      : null;

  return {
    initialHomeGoals,
    initialAwayGoals,
    formLocked,
    actualHomeGoals,
    actualAwayGoals,
    pointsFeedback,
    liveScore,
  };
}

type Props = {
  fixture: GroupStageFixture;
};

export async function FixturePredictorBlock({ fixture }: Props) {
  const hydration = await fetchPredictorHydration(fixture.id);
  const { pointsFeedback, liveScore, ...cardProps } = hydration;

  return (
    <div className="space-y-6">
      {liveScore ? (
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Live result
          </p>
          <div className="mt-2">
            <FixtureScoreBadge score={liveScore} />
          </div>
        </div>
      ) : null}
      {pointsFeedback ? (
        <FixturePointsFeedback
          predictedHome={pointsFeedback.predictedHome}
          predictedAway={pointsFeedback.predictedAway}
          actualHome={pointsFeedback.actualHome}
          actualAway={pointsFeedback.actualAway}
          pointsEarned={pointsFeedback.pointsEarned}
        />
      ) : null}
      <PredictorCard fixture={fixture} {...cardProps} />
    </div>
  );
}
