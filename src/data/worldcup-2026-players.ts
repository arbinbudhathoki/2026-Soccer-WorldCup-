/**
 * Editorial spotlight: players shaping the “new chapter” story at FIFA World Cup 2026™.
 * Mix of first-time finalists, elite youngsters, and host-nation standouts — not official squads.
 */

export type WorldCup2026PlayerSpotlight = {
  name: string;
  nation: string;
  role: string;
  hook: string;
  tags: Array<
    "firstWorldCup" | "under21" | "hostNation" | "breakout" | "veteran2026"
  >;
};

const TAG_LABELS: Record<WorldCup2026PlayerSpotlight["tags"][number], string> = {
  firstWorldCup: "First World Cup",
  under21: "U-21",
  hostNation: "Host nation",
  breakout: "Breakout arc",
  veteran2026: "World Cup 2026",
};

export function tagLabel(tag: WorldCup2026PlayerSpotlight["tags"][number]): string {
  return TAG_LABELS[tag];
}

/** Curated watchlist — nations align with this app’s published 2026 group matrix. */
export const worldCup2026NewFaces: WorldCup2026PlayerSpotlight[] = [
  {
    name: "Erling Haaland",
    nation: "Norway",
    role: "Striker",
    hook:
      "A debut on this stage after years of qualifying heartbreak — pure goals against anyone.",
    tags: ["firstWorldCup", "breakout"],
  },
  {
    name: "Lamine Yamal",
    nation: "Spain",
    role: "Right winger",
    hook:
      "Already Spain’s creative lightning rod — every touch in the final third feels like an event.",
    tags: ["under21", "breakout"],
  },
  {
    name: "Neymar Jr",
    nation: "Brazil",
    role: "Forward / No. 10",
    hook:
      "Publicly targeted this World Cup after Qatar — back at Santos, fit again, and set to lead Brazil in North America alongside the next generation.",
    tags: ["veteran2026"],
  },
  {
    name: "Endrick",
    nation: "Brazil",
    role: "Striker",
    hook:
      "The next Brazil No. 9 energy: explosive timing in the box and zero fear of the bright lights.",
    tags: ["under21", "breakout"],
  },
  {
    name: "Warren Zaïre-Emery",
    nation: "France",
    role: "Central midfielder",
    hook:
      "Calm feet and a motor — the kind of teenager who makes veterans look up from their tape.",
    tags: ["under21", "breakout"],
  },
  {
    name: "Florian Wirtz",
    nation: "Germany",
    role: "Attacking midfielder",
    hook:
      "Germany’s tempo artist — line-breaking passes and late arrivals that unlock compact defenses.",
    tags: ["breakout"],
  },
  {
    name: "Jamal Musiala",
    nation: "Germany",
    role: "Attacking midfielder",
    hook:
      "Serpentine dribbles through traffic — when space shrinks, he invents new lanes.",
    tags: ["breakout"],
  },
  {
    name: "Cole Palmer",
    nation: "England",
    role: "Attacking midfielder",
    hook:
      "Left-footed gravity in the half-spaces — cold finishing when England need a moment of clarity.",
    tags: ["breakout"],
  },
  {
    name: "Nico Williams",
    nation: "Spain",
    role: "Left winger",
    hook:
      "Blistering wide play that stretches back lines so Yamal and the midfield can breathe.",
    tags: ["breakout"],
  },
  {
    name: "Alejandro Garnacho",
    nation: "Argentina",
    role: "Forward",
    hook:
      "Chaos off the bench or from the start — direct runs that tilt tired defenses in knockout play.",
    tags: ["breakout"],
  },
  {
    name: "João Neves",
    nation: "Portugal",
    role: "Defensive midfielder",
    hook:
      "Small frame, huge appetite — screening Portugal’s stars while keeping circulation crisp.",
    tags: ["under21", "breakout"],
  },
  {
    name: "Alphonso Davies",
    nation: "Canada",
    role: "Left-back",
    hook:
      "Host-country poster talent — burst from deep that turns defense into a north–south weapon.",
    tags: ["hostNation", "breakout"],
  },
  {
    name: "Malik Tillman",
    nation: "USA",
    role: "Attacking midfielder",
    hook:
      "Physical presence between lines — the sort of profile that fits the grind of a 48-team summer.",
    tags: ["hostNation", "breakout"],
  },
];
