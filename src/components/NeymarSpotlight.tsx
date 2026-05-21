import { Flag, MapPin, Shirt, Trophy } from "lucide-react";

const milestones = [
  {
    title: "Santos origins",
    body: "Born in Mogi das Cruzes and raised through Santos FC’s academy — the club where he became a teenage phenomenon before Europe came calling.",
  },
  {
    title: "Barcelona & PSG era",
    body: "A treble-winning Barcelona chapter, then record-breaking years at Paris Saint-Germain — league titles, creativity, and a highlight reel that never switched off.",
  },
  {
    title: "Brazil’s No. 10",
    body: "Over 120 caps for the Seleção. Olympic gold in 2016, Confederations Cup 2013, and the emotional arc of 2014, 2018, and 2022 World Cups.",
  },
  {
    title: "World Cup 2026",
    body: "After Qatar, he returned to Santos to rebuild fitness and publicly targeted North America 2026 — Brazil’s flair captain for one more summer on the global stage.",
  },
];

export function NeymarSpotlight() {
  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.08),_transparent_50%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Legend spotlight
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Neymar Jr — back for World Cup 2026™
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            The showman arc: from Santos wonderkid to global icon, through heartbreak
            in Qatar, and into a deliberate rebuild aimed at Brazil&apos;s North
            America campaign.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-neon" aria-hidden />
              Santos, Brazil
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Flag className="h-3.5 w-3.5 text-neon" aria-hidden />
              Brazil · 120+ caps
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Shirt className="h-3.5 w-3.5 text-neon" aria-hidden />
              FW · Brazil #10
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Trophy className="h-3.5 w-3.5 text-neon" aria-hidden />
              Olympic gold · 2016
            </span>
          </div>
        </div>
      </div>

      <ul className="relative mt-10 grid gap-4 md:grid-cols-2">
        {milestones.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-white/10 bg-black/30 p-5"
          >
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
