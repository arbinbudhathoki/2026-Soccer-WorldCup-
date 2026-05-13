import {
  worldCup2026GroupStageFixtures,
  type GroupStageFixture,
} from "@/data/worldcup-history";

/** Aligns with `GroupStageFixture.id` in `src/data/worldcup-history.ts`. */
export const GROUP_FIXTURE_KEY_RE = /^2026-[A-L]-M[123]-[12]$/;

export function getFixtureById(id: string): GroupStageFixture | undefined {
  return worldCup2026GroupStageFixtures.find((f) => f.id === id);
}

export function isGroupFixtureKey(id: string): boolean {
  return GROUP_FIXTURE_KEY_RE.test(id) && getFixtureById(id) !== undefined;
}
