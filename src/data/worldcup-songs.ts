export type WorldCupSong = {
  id: string;
  year: number;
  title: string;
  artist: string;
  note?: string;
};

/** Iconic & official World Cup songs — stable `id` keys for voting. */
export const worldCupSongs: WorldCupSong[] = [
  {
    id: "1962-el-rock-del-mundial",
    year: 1962,
    title: "El Rock del Mundial",
    artist: "Los Ramblers",
  },
  {
    id: "1994-gloryland",
    year: 1994,
    title: "Gloryland",
    artist: "Daryl Hall feat. Sounds of Blackness",
  },
  {
    id: "1998-la-copa-de-la-vida",
    year: 1998,
    title: "La Copa de la Vida (The Cup of Life)",
    artist: "Ricky Martin",
  },
  {
    id: "1998-carnaval-de-paris",
    year: 1998,
    title: "Carnaval de Paris",
    artist: "Dario G",
  },
  {
    id: "2002-boom",
    year: 2002,
    title: "Boom",
    artist: "Anastacia",
  },
  {
    id: "2006-time-of-our-lives",
    year: 2006,
    title: "The Time of Our Lives",
    artist: "Il Divo & Toni Braxton",
  },
  {
    id: "2010-waka-waka",
    year: 2010,
    title: "Waka Waka (This Time for Africa)",
    artist: "Shakira ft. Freshlyground",
  },
  {
    id: "2010-wavin-flag",
    year: 2010,
    title: "Wavin' Flag",
    artist: "K'NAAN",
    note: "Coca-Cola Celebration Mix",
  },
  {
    id: "2014-we-are-one",
    year: 2014,
    title: "We Are One (Ole Ola)",
    artist: "Pitbull ft. Jennifer Lopez & Claudia Leitte",
  },
  {
    id: "2014-la-la-la",
    year: 2014,
    title: "La La La (Brazil 2014)",
    artist: "Shakira ft. Carlinhos Brown",
  },
  {
    id: "2018-live-it-up",
    year: 2018,
    title: "Live It Up",
    artist: "Nicky Jam ft. Will Smith & Era Istrefi",
  },
  {
    id: "2018-ramenez-la-coupe",
    year: 2018,
    title: "Ramenez la coupe à la maison",
    artist: "Vegedream",
  },
  {
    id: "2022-hayya-hayya",
    year: 2022,
    title: "Hayya Hayya (Better Together)",
    artist: "Trinidad Cardona, Davido, Aisha",
  },
  {
    id: "2022-dreamers",
    year: 2022,
    title: "Dreamers",
    artist: "Jung Kook (BTS)",
  },
  {
    id: "2022-arhbo",
    year: 2022,
    title: "Arhbo",
    artist: "Ozuna, RedOne, GIMS",
  },
];

export const worldCupSongIds = new Set(worldCupSongs.map((s) => s.id));

export function getEmptyVoteTotals(): Record<string, number> {
  return Object.fromEntries(worldCupSongs.map((s) => [s.id, 0]));
}
