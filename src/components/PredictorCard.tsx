"use client";

import { useActionState } from "react";
import { ShieldCheck, Timer } from "lucide-react";
import type { GroupStageFixture } from "@/data/worldcup-history";
import {
  submitPrediction,
  type PredictionActionState,
} from "@/app/dashboard/actions";
import { SubmitPredictionButton } from "./SubmitPredictionButton";

const initialState: PredictionActionState = {
  ok: true,
  message: "",
};

type Props = {
  fixture: GroupStageFixture;
};

export function PredictorCard({ fixture }: Props) {
  const [state, formAction] = useActionState(submitPrediction, initialState);

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            2026 predictor
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Call your shot
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Group {fixture.groupLetter} · Matchday {fixture.matchday} — dial in
            a scoreline. Points logic lands once Supabase `matches` rows mirror
            this schedule.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-zinc-400">
          <Timer className="h-4 w-4 text-neon" aria-hidden />
          Kickoff TBD · venues drop with FIFA schedule lock
        </div>
      </div>

      <form action={formAction} className="mt-8 space-y-6">
        <input type="hidden" name="matchId" value={fixture.id} />

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/40 p-6 md:p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <TeamPillar label="Home" name={fixture.home} align="start" />
            <div className="flex items-center gap-4">
              <ScoreInput label="Home" name="homeGoals" defaultValue={0} />
              <span className="text-3xl font-semibold text-zinc-600">:</span>
              <ScoreInput label="Away" name="awayGoals" defaultValue={0} />
            </div>
            <TeamPillar label="Away" name={fixture.away} align="end" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-2 text-sm text-zinc-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-neon" aria-hidden />
            <span>
              Predictions will lock to kickoff once `matches.kickoff_at` is set
              in Supabase. Until then, this form is a guided preview.
            </span>
          </div>
          <SubmitPredictionButton />
        </div>

        {state.message ? (
          <p
            className={`text-sm ${
              state.ok ? "text-neon" : "text-rose-300"
            }`}
            role="status"
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}

function TeamPillar({
  label,
  name,
  align,
}: {
  label: string;
  name: string;
  align: "start" | "end";
}) {
  const desktop =
    align === "start" ? "md:items-start md:text-left" : "md:items-end md:text-right";
  return (
    <div className={`flex flex-1 flex-col items-center gap-2 ${desktop}`}>
      <span className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <span
        className={`text-center text-2xl font-semibold text-white ${
          align === "start" ? "md:text-left" : "md:text-right"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

function ScoreInput({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: number;
}) {
  return (
    <label className="neon-ring flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>
      <input
        className="w-20 rounded-xl border border-transparent bg-transparent text-center text-3xl font-semibold text-white outline-none"
        type="number"
        name={name}
        min={0}
        max={20}
        defaultValue={defaultValue}
        inputMode="numeric"
        required
      />
    </label>
  );
}
