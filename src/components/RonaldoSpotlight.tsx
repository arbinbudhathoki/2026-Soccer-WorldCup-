import { Flag, MapPin, Shirt, Trophy } from "lucide-react";

const milestones = [
  {
    title: "Madeira to Lisbon",
    body: "Born 5 February 1985 in Funchal, Madeira. He left home as a teenager to join Sporting CP’s academy — the move that set his relentless training habits for life.",
  },
  {
    title: "Breakthrough & Europe",
    body: "A standout friendly against Manchester United earned a move to England. He then became a global star at Real Madrid, later adding Juventus and a return to United before joining Al Nassr.",
  },
  {
    title: "Portugal on his back",
    body: "Portugal’s all-time leading scorer and captain. He lifted UEFA Euro 2016 and the 2018–19 Nations League, defining a golden era for the Seleção.",
  },
  {
    title: "World Cup chapters",
    body: "From his 2006 debut to five straight tournaments: a 2018 hat-trick against Spain in Sochi, a 2022 brace vs Ghana, and a quarter-final run in Qatar — each World Cup added another layer to his story.",
  },
];

export function RonaldoSpotlight() {
  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(57,255,140,0.08),_transparent_50%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Legend spotlight
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Cristiano Ronaldo — life on and off the pitch
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            A quick arc from island kid to five-time Ballon d’Or winner: the
            through-line is work ethic, reinvention, and carrying Portugal into
            every major tournament conversation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-neon" aria-hidden />
              Funchal, Madeira
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Flag className="h-3.5 w-3.5 text-neon" aria-hidden />
              Portugal · 200+ caps
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Shirt className="h-3.5 w-3.5 text-neon" aria-hidden />
              FW · Portugal #7
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
              <Trophy className="h-3.5 w-3.5 text-neon" aria-hidden />
              5× Ballon d’Or
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
