"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Music2, Trophy } from "lucide-react";
import {
  getEmptyVoteTotals,
  type WorldCupSong,
  worldCupSongs,
} from "@/data/worldcup-songs";

const LOCAL_STORAGE_KEY = "wc-song-local-totals";

type VotePayload = {
  totals: Record<string, number>;
  configured: boolean;
  dbError?: string;
};

function loadLocalTotals(): Record<string, number> {
  if (typeof window === "undefined") return getEmptyVoteTotals();
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return getEmptyVoteTotals();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const base = getEmptyVoteTotals();
    for (const id of Object.keys(base)) {
      const v = parsed[id];
      if (typeof v === "number" && v >= 0) base[id] = v;
    }
    return base;
  } catch {
    return getEmptyVoteTotals();
  }
}

function saveLocalTotals(totals: Record<string, number>) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(totals));
}

export function WorldCupSongsVote() {
  const [totals, setTotals] = useState<Record<string, number> | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/world-cup-songs/votes", { cache: "no-store" });
      const data = (await res.json()) as VotePayload;
      if (data.configured && data.totals) {
        setTotals(data.totals);
        setConfigured(true);
        setDbError(data.dbError ?? null);
      } else {
        setTotals(loadLocalTotals());
        setConfigured(false);
        setDbError(null);
      }
    } catch {
      setTotals(loadLocalTotals());
      setConfigured(false);
      setBanner("Could not reach the server — showing votes saved on this device.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const maxVotes = useMemo(() => {
    if (!totals) return 0;
    return Math.max(1, ...Object.values(totals));
  }, [totals]);

  const sorted = useMemo(() => {
    if (!totals) return [...worldCupSongs];
    return [...worldCupSongs].sort(
      (a, b) => (totals[b.id] ?? 0) - (totals[a.id] ?? 0)
    );
  }, [totals]);

  const byYear = useMemo(() => {
    const map = new Map<number, WorldCupSong[]>();
    for (const s of worldCupSongs) {
      const list = map.get(s.year) ?? [];
      list.push(s);
      map.set(s.year, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, []);

  async function vote(songId: string) {
    setVotingId(songId);
    setBanner(null);
    try {
      const res = await fetch("/api/world-cup-songs/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId }),
      });

      if (res.ok) {
        await refresh();
        return;
      }

      if (res.status === 503) {
        setConfigured(false);
        setTotals((prev) => {
          const base = prev ?? getEmptyVoteTotals();
          const next = {
            ...base,
            [songId]: (base[songId] ?? 0) + 1,
          };
          saveLocalTotals(next);
          return next;
        });
        setBanner(
          "Supabase is not configured — your vote is saved in this browser only."
        );
        return;
      }

      const err = await res.json().catch(() => ({}));
      setBanner(
        typeof err.error === "string" ? err.error : "Could not record your vote."
      );
    } catch (e) {
      setBanner(
        e instanceof Error ? e.message : "Could not record your vote — try again."
      );
    } finally {
      setVotingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {banner && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/95">
          {banner}
        </p>
      )}
      {dbError && (
        <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200/90">
          Database: {dbError}. Run the latest{" "}
          <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
            supabase/schema.sql
          </code>{" "}
          migration if votes are missing.
        </p>
      )}

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
              Leaderboard
            </p>
            <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold text-white">
              <Trophy className="h-7 w-7 text-neon" aria-hidden />
              Best World Cup songs (so far)
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Tap a track to cast a vote.
              {configured === false && (
                <span className="text-zinc-500">
                  {" "}
                  Global totals need Supabase + the schema migration; otherwise
                  counts stay on this device.
                </span>
              )}
            </p>
          </div>
          {loading && (
            <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading votes…
            </span>
          )}
        </div>

        <ol className="flex flex-col gap-3">
          {sorted.map((song, index) => {
            const count = totals?.[song.id] ?? 0;
            const pct = totals ? (count / maxVotes) * 100 : 0;
            const rank = index + 1;
            return (
              <li
                key={song.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-pitch-card/40"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 bg-neon/10 transition-[width]"
                  style={{ width: `${pct}%` }}
                />
                <div className="relative flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-neon">
                      {rank}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">
                        {song.title}
                        {song.note && (
                          <span className="font-normal text-zinc-500">
                            {" "}
                            — {song.note}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-zinc-400">{song.artist}</p>
                      <p className="mt-1 text-xs text-zinc-600">{song.year}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span className="text-sm tabular-nums text-zinc-300">
                      {loading ? "—" : count}{" "}
                      <span className="text-zinc-600">votes</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => void vote(song.id)}
                      disabled={loading || votingId !== null}
                      className="inline-flex items-center justify-center rounded-full border border-neon/40 bg-neon/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neon transition hover:bg-neon/25 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {votingId === song.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        "Vote"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
          <Music2 className="h-5 w-5 text-neon" aria-hidden />
          By tournament year
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          {byYear.map(([year, songs]) => (
            <div key={year}>
              <p className="mb-3 border-b border-white/10 pb-2 text-sm font-semibold text-neon">
                {year}
              </p>
              <ul className="space-y-3 text-sm text-zinc-400">
                {songs.map((s) => (
                  <li key={s.id}>
                    <span className="text-zinc-200">{s.title}</span>
                    {" — "}
                    {s.artist}
                    {s.note && (
                      <span className="text-zinc-600"> ({s.note})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
