export type CompletedMatch = {
  id: string;
  date: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
};

type SportsDbEvent = {
  idEvent: string;
  dateEvent: string;
  strLeague?: string | null;
  strHomeTeam?: string | null;
  strAwayTeam?: string | null;
  intHomeScore?: string | null;
  intAwayScore?: string | null;
  strStatus?: string | null;
};

type SportsDbResponse = {
  events?: SportsDbEvent[] | null;
};

function toIsoDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return value;
}

export async function fetchCompletedSoccerMatchesByDate(
  date: Date | string
): Promise<CompletedMatch[]> {
  const day = toIsoDate(date);
  const url = `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${day}&s=Soccer`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`SportsDB request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as SportsDbResponse;
  const events = payload.events ?? [];

  return events
    .filter((event) => {
      if (!event.idEvent || !event.strHomeTeam || !event.strAwayTeam) {
        return false;
      }
      return event.intHomeScore !== null && event.intAwayScore !== null;
    })
    .map((event) => ({
      id: event.idEvent,
      date: event.dateEvent ?? day,
      league: event.strLeague ?? "Unknown competition",
      homeTeam: event.strHomeTeam ?? "Home",
      awayTeam: event.strAwayTeam ?? "Away",
      homeScore: Number(event.intHomeScore ?? 0),
      awayScore: Number(event.intAwayScore ?? 0),
      status: event.strStatus ?? "FT",
    }));
}
