import { HistoricalHero } from "@/components/HistoricalHero";
import { PredictorCard } from "@/components/PredictorCard";
import { RonaldoSpotlight } from "@/components/RonaldoSpotlight";
import { featuredPredictionFixture } from "@/data/worldcup-history";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 md:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-neon"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back home
          </Link>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Matchroom <span className="text-neon">Dashboard</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Premium dark mode, neon pitch accents, and glass panels — built for
            big-tournament nights.
          </p>
        </div>
        <div className="glass-panel rounded-2xl px-5 py-4 text-sm text-zinc-300">
          <p className="text-xs uppercase tracking-[0.3em] text-neon">Live data</p>
          <p className="mt-2 font-semibold text-white">Supabase-ready</p>
          <p className="text-xs text-zinc-500">
            Connect env keys to unlock auth + persistence.
          </p>
        </div>
      </header>

      <HistoricalHero />
      <RonaldoSpotlight />
      <PredictorCard fixture={featuredPredictionFixture} />
    </div>
  );
}
