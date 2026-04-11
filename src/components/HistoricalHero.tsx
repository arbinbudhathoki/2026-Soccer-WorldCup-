"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Goal, Medal, Sparkles, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import type { WorldCupEditionSummary } from "@/data/worldcup-history";
import { worldCupEditions } from "@/data/worldcup-history";

const years = worldCupEditions.map((e) => e.year);

export function HistoricalHero() {
  const [year, setYear] = useState<WorldCupEditionSummary["year"]>(2022);
  const edition = useMemo(
    () => worldCupEditions.find((e) => e.year === year)!,
    [year]
  );

  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(57,255,140,0.12),_transparent_55%)]" />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Historical hero
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Finals energy, on demand.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-400">
            Toggle between the last three tournaments. Each panel is tuned for
            big-stage storytelling — winners, golden boot, and the decisive
            final.
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-white/10 bg-black/30 p-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                year === y
                  ? "bg-neon text-pitch shadow-neon"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-10 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={edition.year}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-neon">
                <Trophy className="h-4 w-4" aria-hidden />
                Podium
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">
                {edition.winner}
              </p>
              <p className="text-sm text-zinc-400">Champions</p>
              <p className="mt-4 text-lg font-medium text-zinc-200">
                Runner-up · {edition.runnerUp}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
                <CalendarDays className="h-4 w-4 text-neon" aria-hidden />
                Hosted in {edition.hostNation}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-neon">
                <Goal className="h-4 w-4" aria-hidden />
                Final night
              </div>
              <p className="mt-4 text-xl font-semibold text-white">
                {edition.final.headline}
              </p>
              <p className="mt-2 text-2xl font-mono text-neon">
                {edition.final.scoreline}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{edition.final.venue}</p>
              <div className="mt-6 space-y-3 text-sm text-zinc-300">
                <p className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-neon" aria-hidden />
                  Golden Boot · {edition.goldenBoot.player} (
                  {edition.goldenBoot.nation}, {edition.goldenBoot.goals} goals)
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-neon" aria-hidden />
                  Golden Ball · {edition.goldenBall}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-dashed border-neon/30 bg-neon/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
                By the numbers
              </p>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {edition.notableStats.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-xl border border-white/5 bg-black/30 p-4 text-sm text-zinc-300"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
