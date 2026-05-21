/** Mirrors `refresh_prediction_points` in Supabase (5 / 3 / 1 / 0). */
export function computePredictionPoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number,
): number {
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return 5;
  }
  if (predictedHome - predictedAway === actualHome - actualAway) {
    return 3;
  }
  const predSign = Math.sign(predictedHome - predictedAway);
  const actSign = Math.sign(actualHome - actualAway);
  if (predSign === actSign) {
    return 1;
  }
  return 0;
}

export const PREDICTION_POINT_RULES = [
  {
    points: 5,
    label: "Exact score",
    detail: "Home and away goals match the final.",
  },
  {
    points: 3,
    label: "Correct goal difference",
    detail: "Right margin (e.g. 2–1 and 3–2 both +1).",
  },
  {
    points: 1,
    label: "Correct result",
    detail: "Right winner or draw, wrong margin.",
  },
  {
    points: 0,
    label: "Miss",
    detail: "Wrong outcome.",
  },
] as const;

export function describePredictionPoints(points: number): string {
  const rule = PREDICTION_POINT_RULES.find((r) => r.points === points);
  return rule?.label ?? "No points";
}
