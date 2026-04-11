/**
 * Static reference data for recent World Cups + FIFA World Cup 2026™ group matrix.
 * Group line-ups follow the 5 Dec 2025 Final Draw (placeholders until March 2026 play-offs).
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

/** Final Draw pots resolved to groups (5 Dec 2025). Play-off rows are placeholders. */
export const worldCup2026Groups: GroupRow[] = [
  {
    letter: "A",
    teams: ["Mexico", "Korea Republic", "South Africa", "UEFA Play-off D"],
  },
  {
    letter: "B",
    teams: ["Canada", "Switzerland", "Qatar", "UEFA Play-off A"],
  },
  {
    letter: "C",
    teams: ["Brazil", "Morocco", "Scotland", "Haiti"],
  },
  {
    letter: "D",
    teams: ["USA", "Australia", "Paraguay", "UEFA Play-off C"],
  },
  {
    letter: "E",
    teams: ["Germany", "Ecuador", "Côte d'Ivoire", "Curaçao"],
  },
  {
    letter: "F",
    teams: ["Netherlands", "Japan", "Tunisia", "UEFA Play-off B"],
  },
  {
    letter: "G",
    teams: ["Belgium", "IR Iran", "Egypt", "New Zealand"],
  },
  {
    letter: "H",
    teams: ["Spain", "Uruguay", "Saudi Arabia", "Cabo Verde"],
  },
  {
    letter: "I",
    teams: ["France", "Senegal", "Norway", "FIFA Play-off 2"],
  },
  {
    letter: "J",
    teams: ["Argentina", "Austria", "Algeria", "Jordan"],
  },
  {
    letter: "K",
    teams: ["Portugal", "Colombia", "Uzbekistan", "FIFA Play-off 1"],
  },
  {
    letter: "L",
    teams: ["England", "Croatia", "Panama", "Ghana"],
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

/** Opening Group A pairing for the predictor demo (hosts vs Asian representative). */
export const featuredPredictionFixture: GroupStageFixture =
  worldCup2026GroupStageFixtures.find(
    (f) => f.id === "2026-A-M1-1"
  ) ?? worldCup2026GroupStageFixtures[0];
