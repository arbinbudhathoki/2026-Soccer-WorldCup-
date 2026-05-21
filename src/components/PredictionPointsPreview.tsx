"use client";

import { useEffect, useState } from "react";
import {
  computePredictionPoints,
  describePredictionPoints,
} from "@/lib/prediction-points";

type Props = {
  actualHome?: number;
  actualAway?: number;
  formLocked?: boolean;
};

export function PredictionPointsPreview({
  actualHome,
  actualAway,
  formLocked = false,
}: Props) {
  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(
      'form[data-predictor-form="true"]',
    );
    if (!form) {
      return;
    }

    const read = () => {
      const h = Number(
        (form.elements.namedItem("homeGoals") as HTMLInputElement | null)?.value,
      );
      const a = Number(
        (form.elements.namedItem("awayGoals") as HTMLInputElement | null)?.value,
      );
      setHome(Number.isFinite(h) ? h : 0);
      setAway(Number.isFinite(a) ? a : 0);
    };

    read();
    form.addEventListener("input", read);
    return () => form.removeEventListener("input", read);
  }, []);

  const hasActual =
    typeof actualHome === "number" &&
    typeof actualAway === "number" &&
    Number.isFinite(actualHome) &&
    Number.isFinite(actualAway);

  const points = hasActual
    ? computePredictionPoints(home, away, actualHome, actualAway)
    : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Points preview
      </p>
      {hasActual ? (
        <p className="mt-2">
          vs actual{" "}
          <span className="font-semibold text-white">
            {actualHome}–{actualAway}
          </span>
          :{" "}
          <span className="font-bold text-neon">{points ?? 0} pts</span>
          <span className="text-zinc-500">
            {" "}
            — {describePredictionPoints(points ?? 0)}
          </span>
        </p>
      ) : (
        <p className="mt-2">
          {formLocked
            ? "Match locked — points appear after the final score is recorded."
            : "Exact score = 5 pts · correct goal difference = 3 · correct winner = 1."}
        </p>
      )}
    </div>
  );
}
