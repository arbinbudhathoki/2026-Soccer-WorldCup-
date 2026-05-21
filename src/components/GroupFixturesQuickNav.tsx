import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { worldCup2026GroupStageFixtures } from "@/data/worldcup-history";

export function GroupFixturesQuickNav() {
  return (
    <section className="glass-panel rounded-3xl p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
        All group predictions
      </p>
      <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
        72 group-stage fixtures
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Open any match to submit a scoreline when the row exists in Supabase.
      </p>
      <ul className="mt-6 max-h-80 space-y-2 overflow-y-auto pr-1">
        {worldCup2026GroupStageFixtures.map((f) => (
          <li key={f.id}>
            <Link
              href={`/matches/${f.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm transition hover:border-neon/30"
            >
              <span>
                <span className="text-xs text-zinc-500">
                  G{f.groupLetter} MD{f.matchday}
                </span>
                <span className="mt-0.5 block font-medium text-white">
                  {f.home} vs {f.away}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-neon" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/matches"
        className="mt-4 inline-flex text-sm font-semibold text-neon transition hover:text-white"
      >
        Full fixtures browser →
      </Link>
    </section>
  );
}
