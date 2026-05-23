export const manOfMatchPlayerIds = [
  "Messi",
  "Ronaldo",
  "Pogba",
  "Neymar",
] as const;

export type ManOfMatchPlayerId = (typeof manOfMatchPlayerIds)[number];

export const manOfMatchPlayerIdSet = new Set<string>(manOfMatchPlayerIds);

export type ManOfMatchPlayerMeta = {
  id: ManOfMatchPlayerId;
  name: string;
  nation: string;
  role: string;
};

export const manOfMatchPlayers: ManOfMatchPlayerMeta[] = [
  {
    id: "Messi",
    name: "Lionel Messi",
    nation: "Argentina",
    role: "Forward",
  },
  {
    id: "Ronaldo",
    name: "Cristiano Ronaldo",
    nation: "Portugal",
    role: "Forward",
  },
  {
    id: "Pogba",
    name: "Paul Pogba",
    nation: "France",
    role: "Midfielder",
  },
  {
    id: "Neymar",
    name: "Neymar Jr",
    nation: "Brazil",
    role: "Forward",
  },
];

export function getEmptyManOfMatchVoteTotals(): Record<ManOfMatchPlayerId, number> {
  return { Messi: 0, Ronaldo: 0, Pogba: 0, Neymar: 0 };
}
