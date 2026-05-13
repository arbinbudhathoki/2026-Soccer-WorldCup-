import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Trophy } from "lucide-react";

type LeaderboardRow = {
  rank: number;
  user_id: string;
  display_name: string | null;
  points_total: number;
};

async function fetchLeaderboard(limit = 15): Promise<{
  rows: LeaderboardRow[];
  error: string | null;
  disabledReason: string | null;
}> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      rows: [],
      error: null,
      disabledReason:
        "Add Supabase env keys to show the live leaderboard (see .env.example).",
    };
  }

  const { data, error } = await supabase.rpc("get_leaderboard", {
    p_limit: limit,
  });

  if (error) {
    return {
      rows: [],
      error:
        error.message.includes("function") && error.message.includes("does not exist")
          ? "Run supabase/migrations/20260512_leaderboard_scoring.sql in the SQL editor to enable scoring + leaderboard."
          : error.message,
      disabledReason: null,
    };
  }

  const rows = (data ?? []).map((row: Record<string, unknown>) => ({
    rank: Number(row.rank),
    user_id: String(row.user_id ?? ""),
    display_name:
      typeof row.display_name === "string" ? row.display_name : null,
    points_total: Number(row.points_total),
  }));

  return { rows, error: null, disabledReason: null };
}

export async function LeaderboardSection() {
  const { rows, error, disabledReason } = await fetchLeaderboard(15);

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Points
          </p>
          <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold text-white md:text-3xl">
            <Trophy className="h-7 w-7 text-neon" aria-hidden />
            Leaderboard
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Finished matches award 5 pts (exact), 3 pts (goal difference), or
            1 pt (correct side / draw). Totals refresh when this panel loads.
          </p>
        </div>
      </div>

      {disabledReason ? (
        <p className="mt-6 text-sm text-zinc-500">{disabledReason}</p>
      ) : null}
      {error ? (
        <p className="mt-6 text-sm text-rose-300" role="alert">
          {error}
        </p>
      ) : null}

      {!disabledReason && !error && rows.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">
          No profiles yet — sign in with Supabase Auth after the schema + signup
          trigger are applied.
        </p>
      ) : null}

      {!disabledReason && !error && rows.length > 0 ? (
        <ol className="mt-8 space-y-3">
          {rows.map((row) => (
            <li
              key={row.user_id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-lg font-semibold text-neon">
                  {row.rank}
                </span>
                <span className="font-medium text-white">
                  {row.display_name?.trim() || "Fan"}
                </span>
              </div>
              <span className="text-sm font-semibold text-zinc-300">
                {row.points_total} pts
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
