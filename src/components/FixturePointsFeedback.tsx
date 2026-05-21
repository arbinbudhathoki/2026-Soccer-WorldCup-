import { Trophy } from "lucide-react";
import { computePredictionPoints, describePredictionPoints } from "@/lib/prediction-points";

type Props = {
  predictedHome: number;
  predictedAway: number;
  actualHome: number;
  actualAway: number;
  pointsEarned?: number | null;
};

export function FixturePointsFeedback({
  predictedHome,
  predictedAway,
  actualHome,
  actualAway,
  pointsEarned,
}: Props) {
  const computed = computePredictionPoints(
    predictedHome,
    predictedAway,
    actualHome,
    actualAway,
  );
  const pts = typeof pointsEarned === "number" ? pointsEarned : computed;

  return (
    <section className="rounded-2xl border border-neon/30 bg-neon/5 p-5 md:p-6">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-neon" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          Match result
        </p>
      </div>
      <p className="mt-3 text-lg font-semibold text-white">
        Final: {actualHome}–{actualAway}
      </p>
      <p className="mt-2 text-sm text-zinc-300">
        Your pick: {predictedHome}–{predictedAway}
      </p>
      <p className="mt-3 text-2xl font-bold text-neon">
        {pts} points
        <span className="ml-2 text-sm font-normal text-zinc-400">
          ({describePredictionPoints(pts)})
        </span>
      </p>
    </section>
  );
}
