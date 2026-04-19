"use server";

import { revalidatePath } from "next/cache";
import { fetchCompletedSoccerMatchesByDate } from "@/lib/free-football-api";
import { upsertCompletedMatches } from "@/lib/completed-match-store";

export type DailySyncActionState = {
  ok: boolean;
  message: string;
};

export async function syncTodayScores(): Promise<DailySyncActionState> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const completed = await fetchCompletedSoccerMatchesByDate(today);

    if (completed.length === 0) {
      return {
        ok: true,
        message: `No completed soccer matches returned for ${today}.`,
      };
    }

    const result = await upsertCompletedMatches(completed);
    revalidatePath("/dashboard");

    return {
      ok: true,
      message: `Synced ${completed.length} finished matches (${result.added} new). Stored total: ${result.total}.`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected sync failure.";
    return {
      ok: false,
      message: `Could not sync scores: ${message}`,
    };
  }
}
