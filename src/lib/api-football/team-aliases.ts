import { worldCup2026Groups } from "@/data/worldcup-history";

/** Canonical team labels used in this app’s group matrix. */
const CANONICAL_TEAMS = new Set(
  worldCup2026Groups.flatMap((g) => g.teams),
);

/**
 * API-Football / broadcast name → app `worldcup-history` label.
 * Add entries when the provider uses a different spelling.
 */
const API_TO_CANONICAL: Record<string, string> = {
  "South Korea": "Korea Republic",
  "Korea Republic": "Korea Republic",
  "United States": "USA",
  USA: "USA",
  Turkey: "Turkiye",
  Turkiye: "Turkiye",
  "Ivory Coast": "Cote d'Ivoire",
  "Côte d'Ivoire": "Cote d'Ivoire",
  "Cote d'Ivoire": "Cote d'Ivoire",
  Iran: "IR Iran",
  "IR Iran": "IR Iran",
  "Cape Verde": "Cabo Verde",
  "Cabo Verde": "Cabo Verde",
  "Congo DR": "DR Congo",
  "DR Congo": "DR Congo",
  "Bosnia-Herzegovina": "Bosnia and Herzegovina",
  "Bosnia and Herzegovina": "Bosnia and Herzegovina",
  Curacao: "Curacao",
  "Curaçao": "Curacao",
  Scotland: "Scotland",
  "Scotland ": "Scotland",
};

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "");
}

export function normalizeTeamLabel(name: string): string {
  const trimmed = stripDiacritics(name).replace(/\s+/g, " ").trim();
  if (API_TO_CANONICAL[trimmed]) {
    return API_TO_CANONICAL[trimmed];
  }
  if (CANONICAL_TEAMS.has(trimmed)) {
    return trimmed;
  }
  return trimmed;
}

export function fixturePairKey(home: string, away: string): string {
  return `${normalizeTeamLabel(home)}|${normalizeTeamLabel(away)}`;
}
