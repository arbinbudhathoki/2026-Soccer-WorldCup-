import { describe, expect, it } from "vitest";
import { computePredictionPoints } from "./prediction-points";

describe("computePredictionPoints", () => {
  it("awards 5 for exact score", () => {
    expect(computePredictionPoints(2, 1, 2, 1)).toBe(5);
  });

  it("awards 3 for correct goal difference", () => {
    expect(computePredictionPoints(2, 1, 3, 2)).toBe(3);
    expect(computePredictionPoints(0, 0, 1, 1)).toBe(3);
  });

  it("awards 1 for correct winner only", () => {
    expect(computePredictionPoints(1, 0, 3, 0)).toBe(1);
    expect(computePredictionPoints(0, 2, 0, 1)).toBe(1);
  });

  it("awards 0 for wrong outcome", () => {
    expect(computePredictionPoints(2, 0, 0, 1)).toBe(0);
    expect(computePredictionPoints(1, 1, 0, 2)).toBe(0);
  });

  it("handles draws", () => {
    expect(computePredictionPoints(1, 1, 2, 2)).toBe(3);
    expect(computePredictionPoints(0, 0, 1, 2)).toBe(0);
  });
});
