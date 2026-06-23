import { promises as fs } from "fs";
import path from "path";

export type WorldCupMatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed"
  | "void";

export type WorldCupLiveScore = {
  fixtureKey: string | null;
  apiFixtureId: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: WorldCupMatchStatus;
  statusLabel: string;
  kickoffAt: string | null;
  updatedAt: string;
};

export type WorldCupScoresSnapshot = {
  syncedAt: string;
  source: "api-football";
  leagueId: number;
  season: number;
  scores: WorldCupLiveScore[];
};

const storePath = path.join(process.cwd(), "src/data/worldcup-live-scores.json");

const EMPTY_SNAPSHOT: WorldCupScoresSnapshot = {
  syncedAt: "",
  source: "api-football",
  leagueId: 1,
  season: 2026,
  scores: [],
};

async function ensureStoreFile() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(
      storePath,
      `${JSON.stringify(EMPTY_SNAPSHOT, null, 2)}\n`,
      "utf8",
    );
  }
}

export async function readWorldCupLiveScores(): Promise<WorldCupScoresSnapshot> {
  await ensureStoreFile();
  const raw = await fs.readFile(storePath, "utf8");
  const data = JSON.parse(raw) as WorldCupScoresSnapshot;
  return {
    ...EMPTY_SNAPSHOT,
    ...data,
    scores: data.scores ?? [],
  };
}

export async function writeWorldCupLiveScores(
  snapshot: WorldCupScoresSnapshot,
): Promise<void> {
  await ensureStoreFile();
  await fs.writeFile(storePath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
}

export async function getScoreByFixtureKey(
  fixtureKey: string,
): Promise<WorldCupLiveScore | undefined> {
  const { scores } = await readWorldCupLiveScores();
  return scores.find((s) => s.fixtureKey === fixtureKey);
}

export async function getScoresByPairKey(): Promise<Map<string, WorldCupLiveScore>> {
  const { scores } = await readWorldCupLiveScores();
  const map = new Map<string, WorldCupLiveScore>();
  for (const score of scores) {
    map.set(`${score.homeTeam}|${score.awayTeam}`, score);
  }
  return map;
}
