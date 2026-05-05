/**
 * Last-four-men’s-World-Cup winners (2010–2022) — quiz + 2026 prediction copy.
 */

export type ChampionNation = "Spain" | "Germany" | "France" | "Argentina";

export const championNations: ChampionNation[] = [
  "Spain",
  "Germany",
  "France",
  "Argentina",
];

export type TriviaQuestion = {
  id: string;
  prompt: string;
  hostBlurb: string;
  year: 2010 | 2014 | 2018 | 2022;
  options: ChampionNation[];
  answer: ChampionNation;
  explain: string;
};

export const championsTrivia: TriviaQuestion[] = [
  {
    id: "2010",
    prompt: "Who won the 2010 FIFA World Cup™?",
    hostBlurb: "South Africa",
    year: 2010,
    options: ["Argentina", "France", "Germany", "Spain"],
    answer: "Spain",
    explain:
      "Spain beat the Netherlands 1–0 in the final in Johannesburg — their first World Cup title.",
  },
  {
    id: "2014",
    prompt: "Who won the 2014 FIFA World Cup™?",
    hostBlurb: "Brazil",
    year: 2014,
    options: ["France", "Spain", "Argentina", "Germany"],
    answer: "Germany",
    explain:
      "Germany edged Argentina 1–0 in extra time at the Maracanã — a fourth star for Die Mannschaft.",
  },
  {
    id: "2018",
    prompt: "Who won the 2018 FIFA World Cup™?",
    hostBlurb: "Russia",
    year: 2018,
    options: ["Germany", "France", "Spain", "Argentina"],
    answer: "France",
    explain:
      "France topped Croatia 4–2 in Moscow — Les Bleus’ second world title.",
  },
  {
    id: "2022",
    prompt: "Who won the 2022 FIFA World Cup™?",
    hostBlurb: "Qatar",
    year: 2022,
    options: ["Spain", "France", "Argentina", "Germany"],
    answer: "Argentina",
    explain:
      "Argentina outlasted France on penalties in Lusail — Messi’s crowning moment with La Albiceleste.",
  },
];

/** Fan-style blurbs after picking a 2026 champion — all four are plausible storylines. */
export const predictionCopy: Record<
  ChampionNation,
  { headline: string; body: string }
> = {
  Spain: {
    headline: "La Roja — control the tempo",
    body:
      "If Spain control midfield and turn possession into cutting-edge finishing, they can add another star in North America. Your pick: patience, patterns, and pressure until the final whistle.",
  },
  Germany: {
    headline: "Die Mannschaft — tournament steel",
    body:
      "Germany know how to peak when it matters. Your choice bets on efficiency, set plays, and that habit of finding answers when knockout football gets ruthless.",
  },
  France: {
    headline: "Les Bleus — depth for days",
    body:
      "France can rotate elite talent and still look terrifying. You’re backing athleticism, game-breakers, and a squad built for seven high-intensity games.",
  },
  Argentina: {
    headline: "La Albiceleste — belief & battlescars",
    body:
      "Argentina arrive with the emotional lift of 2022 still in the DNA. You’re choosing fight, togetherness, and the magic of believing the trophy can stay in the family.",
  },
};
