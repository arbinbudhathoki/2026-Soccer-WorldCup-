const API_FOOTBALL_BASE = "https://v3.football.api-sports.io";

/** FIFA World Cup on API-Football. */
export const API_FOOTBALL_WORLD_CUP_LEAGUE_ID = 1;
export const API_FOOTBALL_WORLD_CUP_SEASON = 2026;

export type ApiFootballFixtureStatus = {
  short: string;
  long: string;
};

export type ApiFootballFixtureItem = {
  fixture: {
    id: number;
    date: string;
    status: ApiFootballFixtureStatus;
  };
  league: {
    id: number;
    season: number;
    round?: string | null;
  };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};

type ApiFootballResponse<T> = {
  errors?: Record<string, string> | string[] | string;
  response: T;
};

function getApiKey(): string | null {
  const key = process.env.API_FOOTBALL_KEY?.trim();
  return key || null;
}

export function isApiFootballConfigured(): boolean {
  return Boolean(getApiKey());
}

async function apiFootballFetch<T>(path: string): Promise<T> {
  const key = getApiKey();
  if (!key) {
    throw new Error(
      "API_FOOTBALL_KEY is missing. Add it to .env.local (get a key at api-football.com).",
    );
  }

  const response = await fetch(`${API_FOOTBALL_BASE}${path}`, {
    headers: {
      "x-apisports-key": key,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API-Football request failed (${response.status}).`);
  }

  const payload = (await response.json()) as ApiFootballResponse<T>;
  const errors = payload.errors;

  if (errors && (Array.isArray(errors) ? errors.length > 0 : Object.keys(errors).length > 0)) {
    const detail =
      typeof errors === "string"
        ? errors
        : Array.isArray(errors)
          ? errors.join(", ")
          : Object.values(errors).join(", ");
    throw new Error(`API-Football error: ${detail}`);
  }

  return payload.response;
}

export async function fetchWorldCupFixtures(): Promise<ApiFootballFixtureItem[]> {
  const query = new URLSearchParams({
    league: String(API_FOOTBALL_WORLD_CUP_LEAGUE_ID),
    season: String(API_FOOTBALL_WORLD_CUP_SEASON),
  });

  return apiFootballFetch<ApiFootballFixtureItem[]>(`/fixtures?${query}`);
}

export async function fetchLiveWorldCupFixtures(): Promise<ApiFootballFixtureItem[]> {
  const live = await apiFootballFetch<ApiFootballFixtureItem[]>("/fixtures?live=all");
  return live.filter(
    (item) =>
      item.league.id === API_FOOTBALL_WORLD_CUP_LEAGUE_ID &&
      item.league.season === API_FOOTBALL_WORLD_CUP_SEASON,
  );
}
