import {
  worldCup2026FullSchedule,
  worldCup2026GroupStageFixtures,
  type GroupStageFixture,
  type WorldCup2026Match,
} from "@/data/worldcup-history";

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Tournament window in UTC (June 11 – July 19, 2026). */
export const TOURNAMENT_START_UTC = Date.UTC(2026, 5, 11);
export const TOURNAMENT_END_UTC = Date.UTC(2026, 6, 19, 23, 59, 59);

export function isTournamentLive(now: Date | number = Date.now()): boolean {
  const ts = now instanceof Date ? now.getTime() : now;
  return ts >= TOURNAMENT_START_UTC && ts <= TOURNAMENT_END_UTC;
}

export function parseScheduleDate(dateLabel: string, year = 2026): Date | null {
  const parts = dateLabel.trim().split(/\s+/);
  if (parts.length < 2) {
    return null;
  }
  const month = MONTHS[parts[0]];
  const day = Number(parts[1]);
  if (month === undefined || !Number.isFinite(day)) {
    return null;
  }
  return new Date(Date.UTC(year, month, day));
}

function sameUtcDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export function getScheduleMatchesOnDate(
  date: Date,
  schedule: WorldCup2026Match[] = worldCup2026FullSchedule,
): WorldCup2026Match[] {
  return schedule.filter((m) => {
    const d = parseScheduleDate(m.date);
    return d !== null && sameUtcDay(d, date);
  });
}

export function getTodayScheduleMatches(now = new Date()): WorldCup2026Match[] {
  return getScheduleMatchesOnDate(now);
}

/** Group fixtures whose teams appear in today's published schedule. */
export function getTodayGroupFixtures(now = new Date()): GroupStageFixture[] {
  const today = getTodayScheduleMatches(now);
  if (today.length === 0) {
    return [];
  }

  const labels = new Set(
    today.map((m) => m.fixture.toLowerCase().replace(/\s+/g, " ")),
  );

  return worldCup2026GroupStageFixtures.filter((f) => {
    const label = `${f.home} vs ${f.away}`.toLowerCase();
    return labels.has(label);
  });
}

/** Opening-week fixtures to highlight before or during early tournament days. */
export const OPENING_HIGHLIGHT_FIXTURE_IDS = [
  "2026-A-M1-1",
  "2026-D-M1-1",
  "2026-B-M1-1",
  "2026-C-M1-1",
] as const;

export function getOpeningHighlightFixtures(): GroupStageFixture[] {
  return OPENING_HIGHLIGHT_FIXTURE_IDS.map(
    (id) => worldCup2026GroupStageFixtures.find((f) => f.id === id)!,
  ).filter(Boolean);
}

export function getLiveHighlightFixtures(now = new Date()): GroupStageFixture[] {
  const today = getTodayGroupFixtures(now);
  if (today.length > 0) {
    return today;
  }
  if (!isTournamentLive(now)) {
    return getOpeningHighlightFixtures();
  }
  return [];
}
