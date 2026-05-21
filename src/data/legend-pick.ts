export const legendPickIds = ["Messi", "Ronaldo", "Neymar"] as const;

export type LegendPickId = (typeof legendPickIds)[number];

export const legendPickIdSet = new Set<string>(legendPickIds);

export function getEmptyLegendVoteTotals(): Record<LegendPickId, number> {
  return { Messi: 0, Ronaldo: 0, Neymar: 0 };
}
