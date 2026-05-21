import { Target } from "lucide-react";
import { PREDICTION_POINT_RULES } from "@/lib/prediction-points";

export function PredictionScoringExplainer() {
  return (
    <section className="glass-panel rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-neon" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Scoring
        </p>
      </div>
      <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
        How prediction points work
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        After a match is marked finished in Supabase, points are calculated with{" "}
        <code className="rounded bg-black/40 px-1 text-xs text-zinc-300">
          refresh_prediction_points()
        </code>
        —same rules as the live preview on each predictor card.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {PREDICTION_POINT_RULES.map((rule) => (
          <li
            key={rule.points}
            className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
          >
            <p className="text-2xl font-bold text-neon">{rule.points}</p>
            <p className="text-sm font-medium text-white">{rule.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{rule.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
