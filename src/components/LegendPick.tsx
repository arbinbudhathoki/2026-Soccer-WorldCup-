"use client";

import { useState } from "react";

type Legend = "Messi" | "Ronaldo";

/** Fan logic — shown after you tap Messi or Ronaldo */
const fanLogicMessi =
  "I chose Messi because I enjoy watching a man stroll around the pitch for 80 minutes, only to decide in the last 10 minutes that he wants to humiliate an entire defense while looking like he's just looking for his car keys.";

const fanLogicRonaldo =
  "I'm going with CR7. I need that level of confidence. This is a man who scores a tap-in against a team of part-time accountants and celebrates like he just saved the planet from an alien invasion. That's the energy I need in my life.";

/** Always visible — the internet in a nutshell */
const neutralPerspective =
  "Watching the GOAT debate in 2026 is like watching two grandpas argue over who has the faster wheelchair, except both wheelchairs are made of solid gold and can fly.";

export function LegendPick() {
  const [picked, setPicked] = useState<Legend | null>(null);

  const fanLine = picked === "Messi" ? fanLogicMessi : picked === "Ronaldo" ? fanLogicRonaldo : null;

  return (
    <section className="glass-panel rounded-2xl p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
        Fan pick
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        Who will win your vote: Messi or Ronaldo?
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        A tiny GOAT breakdown — then tap a legend for fan-logic commentary.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
        <p className="text-center text-sm font-semibold text-neon">
          🐐 The legend breakdown
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm text-zinc-300">
            <thead>
              <tr className="border-b border-white/10">
                <th
                  scope="col"
                  className="w-[28%] py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                  Feature
                </th>
                <th scope="col" className="py-3 pr-3 font-semibold text-white">
                  Lionel Messi{" "}
                  <span className="block text-xs font-normal text-neon">
                    (The Magician)
                  </span>
                </th>
                <th scope="col" className="py-3 font-semibold text-white">
                  Cristiano Ronaldo{" "}
                  <span className="block text-xs font-normal text-neon">
                    (The Machine)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-white/5">
                <th
                  scope="row"
                  className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                  Style
                </th>
                <td className="py-3 pr-3">
                  Natural genius — like the ball is glued on by some illegal
                  Argentine magnet.
                </td>
                <td className="py-3">
                  Pure work ethic — a biological marvel who treats his body like
                  a high-performance temple.
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <th
                  scope="row"
                  className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                  2025/26 form
                </th>
                <td className="py-3 pr-3">
                  Running the show for Inter Miami in MLS — goals and assists
                  like he&apos;s handing out candy.
                </td>
                <td className="py-3">
                  Leading the line for Al-Nassr and Portugal — career goals
                  still climbing; &quot;aging&quot; didn&apos;t get the memo.
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="py-3 pr-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
                >
                  The &quot;GOAT&quot; card
                </th>
                <td className="py-3 pr-3">
                  2022 World Cup, 2024 Copa América — plus a Ballon d&apos;Or
                  collection that needs its own shelf.
                </td>
                <td className="py-3">
                  All-time goals conversation, five Champions Leagues — the
                  undisputed king of the clutch montage.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <figure className="mt-6 rounded-2xl border border-dashed border-zinc-600/60 bg-zinc-900/40 p-4 md:p-5">
        <figcaption className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Neutral perspective
        </figcaption>
        <blockquote className="mt-3 text-sm italic leading-relaxed text-zinc-300 md:text-base">
          &ldquo;{neutralPerspective}&rdquo;
        </blockquote>
      </figure>

      <div className="mt-6 flex flex-wrap gap-3">
        <PickButton
          label="Messi"
          active={picked === "Messi"}
          onClick={() => setPicked("Messi")}
        />
        <PickButton
          label="Ronaldo"
          active={picked === "Ronaldo"}
          onClick={() => setPicked("Ronaldo")}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-neon/25 bg-neon/5 p-4 md:p-5" role="status">
        {fanLine ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
              Random funny comments (fan logic)
            </p>
            <p className="mt-3 text-sm font-semibold text-white">
              You picked {picked}!
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
              {fanLine}
            </p>
          </>
        ) : (
          <p className="text-sm text-zinc-500">
            No pick yet — tap Messi or Ronaldo for fan logic.
          </p>
        )}
      </div>
    </section>
  );
}

function PickButton({
  label,
  active,
  onClick,
}: {
  label: Legend;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
        active
          ? "border-neon bg-neon text-pitch shadow-neon"
          : "border-white/20 bg-white/5 text-zinc-200 hover:border-neon/40 hover:text-white"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
