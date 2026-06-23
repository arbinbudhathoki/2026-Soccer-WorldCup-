"use client";

import { useActionState } from "react";
import { Radio } from "lucide-react";
import {
  syncWorldCupScores,
  type WorldCupScoreSyncState,
} from "@/app/dashboard/worldcup-score-actions";

const initialState: WorldCupScoreSyncState = {
  ok: true,
  message: "",
};

type Props = {
  lastSyncedAt?: string;
  finishedCount?: number;
  liveCount?: number;
  totalCount?: number;
  configured: boolean;
};

export function WorldCupScoreSync({
  lastSyncedAt,
  finishedCount = 0,
  liveCount = 0,
  totalCount = 0,
  configured,
}: Props) {
  const [state, formAction] = useActionState(syncWorldCupScores, initialState);

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            API-Football live scores
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            World Cup 2026 results
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Pulls every tournament fixture from{" "}
            <a
              href="https://www.api-football.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon underline underline-offset-2"
            >
              API-Football
            </a>
            , matches them to your group-stage IDs, and updates prediction
            scoring when Supabase rows exist.
          </p>
          {configured ? (
            <p className="mt-3 text-xs text-zinc-500">
              Last sync:{" "}
              {lastSyncedAt
                ? new Date(lastSyncedAt).toLocaleString()
                : "not yet"}{" "}
              · {totalCount} fixtures · {finishedCount} finished · {liveCount}{" "}
              live
            </p>
          ) : (
            <p className="mt-3 text-xs text-amber-200">
              Add <span className="font-mono">API_FOOTBALL_KEY</span> to{" "}
              <span className="font-mono">.env.local</span> to enable sync.
            </p>
          )}
        </div>
        <form action={formAction}>
          <button
            type="submit"
            disabled={!configured}
            className="inline-flex items-center gap-2 rounded-full bg-neon px-5 py-3 text-sm font-semibold text-pitch shadow-neon transition hover:bg-neon-dim disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Radio className="h-4 w-4" aria-hidden />
            Sync all scores
          </button>
        </form>
      </div>

      {state.message ? (
        <p
          className={`mt-4 text-sm ${state.ok ? "text-neon" : "text-rose-300"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </section>
  );
}
