import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { FixtureScoreBadge } from "@/components/FixtureScoreBadge";
import { fixturePairKey } from "@/lib/api-football/team-aliases";
import {
  getLiveHighlightFixtures,
  getTodayScheduleMatches,
  isTournamentLive,
} from "@/lib/tournament-live";
import { readWorldCupLiveScores } from "@/lib/worldcup-live-score-store";
import { formatFixtureScore } from "@/lib/worldcup-scores";

function parseFixtureLabel(fixture: string): { home: string; away: string } | null {
  const parts = fixture.split(/\s+vs\s+/i);
  if (parts.length !== 2) {
    return null;
  }
  return { home: parts[0].trim(), away: parts[1].trim() };
}

export async function TournamentTodayBanner() {
  const now = new Date();
  const live = isTournamentLive(now);
  const todayMatches = getTodayScheduleMatches(now);
  const groupFixtures = getLiveHighlightFixtures(now);
  const { scores } = await readWorldCupLiveScores();
  const byPair = new Map(
    scores.map((s) => [fixturePairKey(s.homeTeam, s.awayTeam), s]),
  );

  if (!live && todayMatches.length === 0) {
    return null;
  }

  return (
    <section className="glass-panel rounded-3xl border border-neon/25 bg-neon/5 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <CalendarDays className="h-5 w-5 text-neon" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          {todayMatches.length > 0 ? "Today's matches" : "Tournament live"}
        </p>
      </div>
      <h2 className="mt-3 text-xl font-semibold text-white md:text-2xl">
        {todayMatches.length > 0
          ? `${todayMatches.length} fixture${todayMatches.length === 1 ? "" : "s"} on the schedule`
          : "World Cup 2026 is underway"}
      </h2>
      {todayMatches.length > 0 ? (
        <ul className="mt-4 space-y-3 text-sm text-zinc-200">
          {todayMatches.slice(0, 8).map((m) => {
            const teams = parseFixtureLabel(m.fixture);
            const score = teams
              ? byPair.get(fixturePairKey(teams.home, teams.away))
              : undefined;

            return (
              <li
                key={m.matchNumber}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2"
              >
                <span>
                  <span className="text-neon">{m.date}</span> · {m.fixture}{" "}
                  <span className="text-zinc-500">({m.city})</span>
                </span>
                {score ? <FixtureScoreBadge score={score} /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
      {groupFixtures.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {groupFixtures.map((f) => {
            const score = byPair.get(fixturePairKey(f.home, f.away));
            const line = formatFixtureScore(score);
            return (
              <li key={f.id}>
                <Link
                  href={`/matches/${f.id}`}
                  className="inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-neon/40"
                >
                  {f.home} vs {f.away}
                  {line ? ` · ${line}` : ""}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
