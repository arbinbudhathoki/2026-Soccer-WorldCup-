import {
  worldCup2026FullSchedule,
  type WorldCup2026Match,
} from "@/data/worldcup-history";

export function isGroupStageLabel(stage: string): boolean {
  return stage.toLowerCase().startsWith("grp");
}

export const knockoutRounds = [
  "Round of 32",
  "Round of 16",
  "Quarter-Final",
  "Semi-Final",
  "3rd Place",
  "Final",
] as const;

export type KnockoutRound = (typeof knockoutRounds)[number];

export function getKnockoutSchedule(): WorldCup2026Match[] {
  return worldCup2026FullSchedule.filter((m) => !isGroupStageLabel(m.stage));
}

export function groupKnockoutByRound(
  matches: WorldCup2026Match[] = getKnockoutSchedule(),
): { round: KnockoutRound; matches: WorldCup2026Match[] }[] {
  const buckets = new Map<KnockoutRound, WorldCup2026Match[]>();

  for (const m of matches) {
    const round = normalizeKnockoutRound(m.stage);
    if (!round) {
      continue;
    }
    const list = buckets.get(round) ?? [];
    list.push(m);
    buckets.set(round, list);
  }

  return knockoutRounds.filter((r) => buckets.has(r)).map((round) => ({
    round,
    matches: buckets.get(round)!,
  }));
}

function normalizeKnockoutRound(stage: string): KnockoutRound | null {
  const s = stage.trim();
  if (s === "Round of 32" || s === "Round of 16") {
    return s;
  }
  if (s === "Quarter-Final") {
    return "Quarter-Final";
  }
  if (s === "Semi-Final") {
    return "Semi-Final";
  }
  if (s === "3rd Place" || s === "Match for 3rd place") {
    return "3rd Place";
  }
  if (s === "Final") {
    return "Final";
  }
  return null;
}
