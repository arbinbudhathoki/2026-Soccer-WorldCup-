import Link from "next/link";
import { HelpCircle } from "lucide-react";

export function Messi2026Status() {
  return (
    <section
      id="messi-2026"
      className="glass-panel rounded-3xl border border-amber-500/20 p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
          <HelpCircle className="h-3.5 w-3.5" aria-hidden />
          Messi 2026 watch
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
        Will Lionel Messi play at World Cup 2026™?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">
        As of early 2026 the storyline is still open: Messi has continued with
        Inter Miami while Argentina plan for another title defense. Fitness,
        call-ups, and how far La Albiceleste progress will decide whether we get
        one more World Cup chapter from the 2022 champion — or a farewell built
        around the Copa América era instead.
      </p>
      <p className="mt-3 text-sm text-zinc-500">
        Editorial status:{" "}
        <span className="font-semibold text-amber-200">Unconfirmed</span> — check
        official Argentina squad news closer to kickoff.
      </p>
      <p className="mt-4 text-sm">
        <Link
          href="#legend-pick"
          className="text-neon underline decoration-neon/40 underline-offset-[3px] transition hover:text-white"
        >
          Compare Messi with Ronaldo &amp; Neymar in the legend pick →
        </Link>
      </p>
    </section>
  );
}
