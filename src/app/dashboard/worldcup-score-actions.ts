"use server";

import { revalidatePath } from "next/cache";
import { isApiFootballConfigured } from "@/lib/api-football/client";
import { syncWorldCupScoresFromApiFootball } from "@/lib/worldcup-score-sync";

export type WorldCupScoreSyncState = {
  ok: boolean;
  message: string;
};

export async function syncWorldCupScores(
  _prev: WorldCupScoreSyncState | undefined,
  _formData?: FormData,
): Promise<WorldCupScoreSyncState> {
  void _prev;
  void _formData;
  if (!isApiFootballConfigured()) {
    return {
      ok: false,
      message:
        "API_FOOTBALL_KEY is missing. Sign up at api-football.com and add the key to .env.local.",
    };
  }

  try {
    const result = await syncWorldCupScoresFromApiFootball();
    revalidatePath("/dashboard");
    revalidatePath("/matches");
    revalidatePath("/");

    const supabaseNote =
      result.supabaseUpdated > 0
        ? ` Updated ${result.supabaseUpdated} Supabase match rows + leaderboard points.`
        : "";

    return {
      ok: true,
      message: `${result.message}${supabaseNote}`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected score sync failure.";
    return { ok: false, message };
  }
}
