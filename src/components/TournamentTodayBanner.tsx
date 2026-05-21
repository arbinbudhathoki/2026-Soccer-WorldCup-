import Link from "next/link";
import { CalendarDays } from "lucide-react";
import {
  getLiveHighlightFixtures,
  getTodayScheduleMatches,
  isTournamentLive,
} from "@/lib/tournament-live";

export function TournamentTodayBanner() {
  const now = new Date();
  const live = isTournamentLive(now);
  const todayMatches = getTodayScheduleMatches(now);
  const groupFixtures = getLiveHighlightFixtures(now);

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
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {todayMatches.slice(0, 6).map((m) => (
            <li key={m.matchNumber}>
              <span className="text-neon">{m.date}</span> · {m.fixture}{" "}
              <span className="text-zinc-500">({m.city})</span>
            </li>
          ))}
        </ul>
      ) : null}
      {groupFixtures.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {groupFixtures.map((f) => (
            <li key={f.id}>
              <Link
                href={`/matches/${f.id}`}
                className="inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-neon/40"
              >
                Predict: {f.home} vs {f.away}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
