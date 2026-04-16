"use client";

import { useState } from "react";

type Legend = "Messi" | "Ronaldo";

export function LegendPick() {
  const [picked, setPicked] = useState<Legend | null>(null);

  return (
    <section className="glass-panel rounded-2xl p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
        Fan pick
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        Who will win your vote: Messi or Ronaldo?
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Pick your football legend for today.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
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

      <p className="mt-4 min-h-6 text-sm text-zinc-300" role="status">
        {picked ? `You picked ${picked}!` : "No pick yet."}
      </p>
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
