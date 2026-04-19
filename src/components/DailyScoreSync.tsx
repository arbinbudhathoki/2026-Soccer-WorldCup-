"use client";

import { useActionState } from "react";
import type { CompletedMatch } from "@/lib/free-football-api";
import {
  syncTodayScores,
  type DailySyncActionState,
} from "@/app/dashboard/score-actions";
import { SyncScoresButton } from "@/components/SyncScoresButton";

const initialState: DailySyncActionState = {
  ok: true,
  message: "",
};

type Props = {
  matches: CompletedMatch[];
};

export function DailyScoreSync({ matches }: Props) {
  const [state, formAction] = useActionState(syncTodayScores, initialState);

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Free API score sync
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Daily completed match scores
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Pulls finished soccer matches from TheSportsDB and stores them in a
            local project file so your app keeps historical scores day by day.
          </p>
        </div>
        <form action={formAction}>
          <SyncScoresButton />
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

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-zinc-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">League</th>
              <th className="px-4 py-3">Match</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-zinc-500" colSpan={5}>
                  No stored completed matches yet. Run sync to save scores.
                </td>
              </tr>
            ) : (
              matches.map((match) => (
                <tr key={match.id} className="border-t border-white/10 text-zinc-200">
                  <td className="px-4 py-3">{match.date}</td>
                  <td className="px-4 py-3 text-zinc-300">{match.league}</td>
                  <td className="px-4 py-3">
                    {match.homeTeam} vs {match.awayTeam}
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {match.homeScore} - {match.awayScore}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{match.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
