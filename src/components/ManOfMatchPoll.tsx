"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Award } from "lucide-react";
import {
  getEmptyManOfMatchVoteTotals,
  manOfMatchPlayers,
  type ManOfMatchPlayerId,
} from "@/data/man-of-match-poll";

const PICK_COPY: Record<ManOfMatchPlayerId, string> = {
  Messi:
    "The game slows down until he decides it doesn't — one touch and the entire stadium remembers why he's the reference point.",
  Ronaldo:
    "Motm energy: gravity in the box, chaos in the celebration, and the scoreboard somehow owes him a thank-you note.",
  Pogba:
    "When the tempo needs a conductor, Pogba shows up — line-breaking passes, swagger, and the kind of midfield control that flips a tight match.",
  Neymar:
    "Man of the match by highlight reel — defenders dizzy, crowd loud, and the broadcast director already replaying the nutmeg.",
};

export function ManOfMatchPoll() {
  const [picked, setPicked] = useState<ManOfMatchPlayerId | null>(null);
  const [totals, setTotals] = useState(getEmptyManOfMatchVoteTotals());
  const [voteStatus, setVoteStatus] = useState("");

  const loadTotals = useCallback(async () => {
    try {
      const res = await fetch("/api/man-of-match/votes", { cache: "no-store" });
      const data = (await res.json()) as {
        totals?: Record<ManOfMatchPlayerId, number>;
      };
      if (data.totals) {
        setTotals(data.totals);
      }
    } catch {
      /* offline / Supabase not configured */
    }
  }, []);

  useEffect(() => {
    void loadTotals();
  }, [loadTotals]);

  const handleVote = async (playerId: ManOfMatchPlayerId) => {
    setPicked(playerId);
    setVoteStatus("");
    try {
      const res = await fetch("/api/man-of-match/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });
      const data = (await res.json()) as { ok?: boolean; configured?: boolean };
      if (data.ok) {
        await loadTotals();
        setVoteStatus("Vote counted — thanks!");
      } else if (data.configured === false) {
        setVoteStatus("Connect Supabase to save community votes.");
      }
    } catch {
      setVoteStatus("Could not record vote right now.");
    }
  };

  const totalVotes = useMemo(
    () =>
      totals.Messi + totals.Ronaldo + totals.Pogba + totals.Neymar,
    [totals],
  );

  const leader = useMemo(() => {
    if (totalVotes === 0) {
      return null;
    }
    return manOfMatchPlayers.reduce((best, p) =>
      totals[p.id] > totals[best.id] ? p : best,
    );
  }, [totals, totalVotes]);

  return (
    <section
      id="man-of-match-poll"
      className="glass-panel rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Award className="h-3.5 w-3.5" aria-hidden />
          Fan poll
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
        Who gets your Man of the Match vote?
      </h2>
      <p className="mt-2 text-sm text-zinc-400 md:text-base">
        Pick the player you&apos;d hand the award to after the big night — Messi,
        Ronaldo, Pogba, or Neymar. One tap, one vote (community totals when
        Supabase is connected).
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {manOfMatchPlayers.map((player) => {
          const count = totals[player.id];
          const pct =
            totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isActive = picked === player.id;

          return (
            <li key={player.id}>
              <button
                type="button"
                onClick={() => void handleVote(player.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-neon bg-neon/10 shadow-neon"
                    : "border-white/10 bg-black/25 hover:border-heat/30 hover:bg-black/35"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {player.name}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {player.nation} · {player.role}
                    </p>
                  </div>
                  {totalVotes > 0 ? (
                    <span className="shrink-0 text-sm font-bold text-neon">
                      {pct}%
                    </span>
                  ) : null}
                </div>
                {totalVotes > 0 ? (
                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/40"
                    aria-hidden
                  >
                    <div
                      className="h-full bg-neon/80 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                ) : null}
                <p className="mt-2 text-xs text-zinc-500">
                  {count} vote{count === 1 ? "" : "s"}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {leader && totalVotes > 0 ? (
        <p className="mt-6 text-sm text-zinc-400">
          Current fan leader:{" "}
          <span className="font-semibold text-white">{leader.name}</span> (
          {totals[leader.id]} votes)
        </p>
      ) : null}

      <div
        className="mt-5 rounded-2xl border border-neon/25 bg-neon/5 p-4 md:p-5"
        role="status"
      >
        {picked ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
              Your MOTM pick
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {manOfMatchPlayers.find((p) => p.id === picked)?.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
              {PICK_COPY[picked]}
            </p>
            {voteStatus ? (
              <p className="mt-2 text-xs text-zinc-500">{voteStatus}</p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-zinc-500">
            No vote yet — tap a player to cast yours.
          </p>
        )}
      </div>
    </section>
  );
}
