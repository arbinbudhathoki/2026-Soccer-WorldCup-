import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { LegendPick } from "@/components/LegendPick";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="glass-panel rounded-3xl p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Trophy className="h-4 w-4" aria-hidden />
          World Cup Mode
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          History, data, and{" "}
          <span className="text-neon">2026 predictions</span> in one hub.
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Explore 2014–2022 finals, then lock in your scorelines for the
          48-team tournament in North America.
        </p>
        <p className="mt-3 text-base text-zinc-300">
          (Will Messi play this 2026 World Cup?)
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-pitch shadow-neon transition hover:bg-neon-dim"
          >
            Open dashboard
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/songs"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-neon/40 hover:text-white"
          >
            World Cup songs &amp; voting
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <LegendPick />
      <p className="text-center text-xs text-zinc-500">
        Stack: Next.js · Tailwind · Supabase · Framer Motion
      </p>
    </main>
  );
}
