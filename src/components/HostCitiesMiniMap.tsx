"use client";

import { MapPin } from "lucide-react";

const hostCities = [
  {
    city: "Vancouver",
    country: "Canada",
    stadium: "BC Place",
    matches: 7,
    x: "16%",
    y: "22%",
  },
  {
    city: "Toronto",
    country: "Canada",
    stadium: "BMO Field",
    matches: 6,
    x: "38%",
    y: "24%",
  },
  {
    city: "Seattle",
    country: "USA",
    stadium: "Lumen Field",
    matches: 6,
    x: "15%",
    y: "34%",
  },
  {
    city: "San Francisco",
    country: "USA",
    stadium: "Levi's Stadium",
    matches: 6,
    x: "18%",
    y: "45%",
  },
  {
    city: "Los Angeles",
    country: "USA",
    stadium: "SoFi Stadium",
    matches: 8,
    x: "20%",
    y: "57%",
  },
  {
    city: "Dallas",
    country: "USA",
    stadium: "AT&T Stadium",
    matches: 9,
    x: "45%",
    y: "56%",
  },
  {
    city: "Atlanta",
    country: "USA",
    stadium: "Mercedes-Benz Stadium",
    matches: 8,
    x: "57%",
    y: "53%",
  },
  {
    city: "Miami",
    country: "USA",
    stadium: "Hard Rock Stadium",
    matches: 7,
    x: "66%",
    y: "68%",
  },
  {
    city: "New York / New Jersey",
    country: "USA",
    stadium: "MetLife Stadium",
    matches: 8,
    x: "66%",
    y: "38%",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    stadium: "Estadio Azteca",
    matches: 5,
    x: "34%",
    y: "70%",
  },
];

export function HostCitiesMiniMap() {
  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
        Host Cities Mini Map
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
        Dark neon view of 2026 host locations
      </h2>
      <p className="mt-4 text-sm text-zinc-300 md:text-base">
        A quick look at major host points across Canada, the United States, and
        Mexico. Glow markers highlight selected venues and projected match load.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-neon/25 bg-zinc-950/80 p-4 shadow-neon">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(57,255,140,0.16),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(57,255,140,0.1),transparent_40%)]" />

          <div className="relative h-[320px] w-full rounded-2xl border border-white/10 bg-zinc-950/70">
            <div className="absolute left-[8%] top-[12%] h-[35%] w-[32%] rounded-[38%] border border-neon/20 bg-neon/10" />
            <div className="absolute left-[31%] top-[14%] h-[60%] w-[45%] rounded-[42%] border border-neon/25 bg-neon/10" />
            <div className="absolute left-[25%] top-[60%] h-[28%] w-[27%] rounded-[44%] border border-neon/20 bg-neon/10" />

            {hostCities.map((city) => (
              <div
                key={city.city}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: city.x, top: city.y }}
              >
                <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/30 blur-md" />
                <MapPin className="relative h-4 w-4 text-neon drop-shadow-[0_0_10px_rgba(57,255,140,0.75)]" />
                <div className="pointer-events-none absolute left-1/2 top-5 z-10 hidden w-48 -translate-x-1/2 rounded-lg border border-neon/30 bg-zinc-950/95 p-2 text-xs text-zinc-200 group-hover:block">
                  <p className="font-semibold text-white">{city.city}</p>
                  <p className="text-zinc-400">{city.stadium}</p>
                  <p className="mt-1 text-neon">{city.matches} matches</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {hostCities.slice(0, 6).map((city) => (
            <article
              key={`${city.city}-card`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-white">{city.city}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">
                {city.country}
              </p>
              <p className="mt-2 text-sm text-zinc-300">{city.stadium}</p>
              <p className="mt-1 text-xs text-neon">{city.matches} matches planned</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
