import { Sparkles } from "lucide-react";
import {
  tagLabel,
  worldCup2026NewFaces,
} from "@/data/worldcup-2026-players";

export function WorldCup2026NewFaces() {
  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          2026 player watch
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
        New faces &amp; next-gen stars
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
        The expanded tournament puts more nations—and more young talent—on screen.
        Here&apos;s an editorial watchlist of players who could define the North
        America summer: first-time World Cup finalists, under-21 headline acts,
        returning icons like Neymar Jr at World Cup 2026™, and standouts from the
        host nations. Final squads land closer to kickoff;
        treat this as a storyboard, not an official roster.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worldCup2026NewFaces.map((p) => (
          <li
            key={`${p.nation}-${p.name}`}
            className="flex flex-col rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-heat/30 hover:bg-black/35"
          >
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-neon/25 bg-neon/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neon"
                >
                  {tagLabel(t)}
                </span>
              ))}
            </div>
            <p className="mt-3 text-lg font-semibold text-white">{p.name}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {p.nation} · {p.role}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
              {p.hook}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
