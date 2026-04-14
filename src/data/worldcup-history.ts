/**
 * Static reference data for recent World Cups + FIFA World Cup 2026™ group matrix.
 * Group line-ups reflect the updated 2026 schedule publication (April 2026).
 */

export type WorldCupEditionSummary = {
  year: 2014 | 2018 | 2022;
  hostNation: string;
  winner: string;
  runnerUp: string;
  goldenBoot: {
    player: string;
    nation: string;
    goals: number;
  };
  goldenBall: string;
  goldenGlove: string;
  bestYoungPlayer: string;
  final: {
    headline: string;
    scoreline: string;
    venue: string;
    attendanceApprox?: number;
  };
  notableStats: string[];
};

export const worldCupEditions: WorldCupEditionSummary[] = [
  {
    year: 2014,
    hostNation: "Brazil",
    winner: "Germany",
    runnerUp: "Argentina",
    goldenBoot: {
      player: "James Rodríguez",
      nation: "Colombia",
      goals: 6,
    },
    goldenBall: "Lionel Messi",
    goldenGlove: "Manuel Neuer",
    bestYoungPlayer: "Paul Pogba",
    final: {
      headline: "Germany edge Argentina in Rio",
      scoreline: "Germany 1–0 Argentina (a.e.t.)",
      venue: "Maracanã, Rio de Janeiro",
      attendanceApprox: 74738,
    },
    notableStats: [
      "171 goals across 64 matches (2.67 per game).",
      "Miroslav Klose became the tournament’s all-time top scorer (16).",
      "First European win on South American soil.",
    ],
  },
  {
    year: 2018,
    hostNation: "Russia",
    winner: "France",
    runnerUp: "Croatia",
    goldenBoot: {
      player: "Harry Kane",
      nation: "England",
      goals: 6,
    },
    goldenBall: "Luka Modrić",
    goldenGlove: "Thibaut Courtois",
    bestYoungPlayer: "Kylian Mbappé",
    final: {
      headline: "Les Bleus lift the trophy in Moscow",
      scoreline: "France 4–2 Croatia",
      venue: "Luzhniki Stadium, Moscow",
      attendanceApprox: 78011,
    },
    notableStats: [
      "169 goals from 64 matches — set-piece efficiency stood out.",
      "VAR used for the first time at a World Cup.",
      "Croatia’s third extra-time comeback run to a final.",
    ],
  },
  {
    year: 2022,
    hostNation: "Qatar",
    winner: "Argentina",
    runnerUp: "France",
    goldenBoot: {
      player: "Kylian Mbappé",
      nation: "France",
      goals: 8,
    },
    goldenBall: "Lionel Messi",
    goldenGlove: "Emiliano Martínez",
    bestYoungPlayer: "Enzo Fernández",
    final: {
      headline: "Instant classic in Lusail",
      scoreline: "Argentina 3–3 France (4–2 pens)",
      venue: "Lusail Stadium, Lusail",
      attendanceApprox: 88966,
    },
    notableStats: [
      "First winter World Cup in the Northern Hemisphere.",
      "Mbappé hat-trick in the final — first since Geoff Hurst in 1966.",
      "Messi completed his senior international trophy set.",
    ],
  },
];

export type GroupStageFixture = {
  id: string;
  tournamentYear: 2026;
  groupLetter: string;
  matchday: 1 | 2 | 3;
  home: string;
  away: string;
  notes?: string;
};

type GroupRow = {
  letter: string;
  teams: [string, string, string, string];
};

/** Finalized 2026 group line-ups from the published match schedule. */
export const worldCup2026Groups: GroupRow[] = [
  {
    letter: "A",
    teams: ["Mexico", "South Africa", "Korea Republic", "Czechia"],
  },
  {
    letter: "B",
    teams: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  },
  {
    letter: "C",
    teams: ["Brazil", "Morocco", "Haiti", "Scotland"],
  },
  {
    letter: "D",
    teams: ["USA", "Paraguay", "Australia", "Turkiye"],
  },
  {
    letter: "E",
    teams: ["Germany", "Curacao", "Cote d'Ivoire", "Ecuador"],
  },
  {
    letter: "F",
    teams: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  },
  {
    letter: "G",
    teams: ["Belgium", "Egypt", "IR Iran", "New Zealand"],
  },
  {
    letter: "H",
    teams: ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"],
  },
  {
    letter: "I",
    teams: ["France", "Senegal", "Iraq", "Norway"],
  },
  {
    letter: "J",
    teams: ["Argentina", "Austria", "Algeria", "Jordan"],
  },
  {
    letter: "K",
    teams: ["Portugal", "DR Congo", "Colombia", "Uzbekistan"],
  },
  {
    letter: "L",
    teams: ["England", "Croatia", "Ghana", "Panama"],
  },
];

function buildGroupFixtures(row: GroupRow): GroupStageFixture[] {
  const [t1, t2, t3, t4] = row.teams;
  const g = row.letter;
  return [
    {
      id: `2026-${g}-M1-1`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 1,
      home: t1,
      away: t2,
    },
    {
      id: `2026-${g}-M1-2`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 1,
      home: t3,
      away: t4,
    },
    {
      id: `2026-${g}-M2-1`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 2,
      home: t1,
      away: t3,
    },
    {
      id: `2026-${g}-M2-2`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 2,
      home: t2,
      away: t4,
    },
    {
      id: `2026-${g}-M3-1`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 3,
      home: t1,
      away: t4,
    },
    {
      id: `2026-${g}-M3-2`,
      tournamentYear: 2026,
      groupLetter: g,
      matchday: 3,
      home: t2,
      away: t3,
    },
  ];
}

export const worldCup2026GroupStageFixtures: GroupStageFixture[] =
  worldCup2026Groups.flatMap(buildGroupFixtures);

/** Opening Group A pairing for the predictor demo (Mexico vs South Africa). */
export const featuredPredictionFixture: GroupStageFixture =
  worldCup2026GroupStageFixtures.find(
    (f) => f.id === "2026-A-M1-1"
  ) ?? worldCup2026GroupStageFixtures[0];
