/** Outbound ticket sources — editorial links only; no inventory API. */

export const FIFA_OFFICIAL_TICKETS_URL =
  "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets";

/** Secondary marketplace listing (resale / broker inventory). */
export const GO_TICKETS_WORLD_CUP_URL = "https://gotickets.com/fifa-world-cup";

export type TicketHighlightFixture = {
  id: string;
  label: string;
  date: string;
  venue: string;
  note?: string;
};

/** High-demand fixtures fans often search for first. */
export const ticketHighlightFixtures: TicketHighlightFixture[] = [
  {
    id: "2026-A-M1-1",
    label: "Mexico vs South Africa",
    date: "Thu, Jun 11 · Mexico City",
    venue: "Opening match (Group A)",
    note: "Official tournament opener",
  },
  {
    id: "2026-D-M1-1",
    label: "USA vs Paraguay",
    date: "Fri, Jun 12 · Los Angeles",
    venue: "Group D · SoFi Stadium area",
  },
  {
    id: "2026-C-M1-1",
    label: "Brazil vs Morocco",
    date: "Sat, Jun 13 · New York / New Jersey",
    venue: "Group C · MetLife Stadium area",
    note: "Neymar & Brazil storyline",
  },
  {
    id: "2026-B-M1-1",
    label: "Canada vs Bosnia and Herzegovina",
    date: "Fri, Jun 12 · Toronto",
    venue: "Group B · host nation opener",
  },
  {
    id: "final",
    label: "World Cup Final",
    date: "Sun, Jul 19 · East Rutherford",
    venue: "Match 104 · MetLife Stadium area",
    note: "Highest demand — plan early",
  },
];
