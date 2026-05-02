"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type PredictionActionState = {
  ok: boolean;
  message: string;
};

/** Aligns with `GroupStageFixture.id` in `src/data/worldcup-history.ts`. */
const FIXTURE_KEY_RE = /^2026-[A-L]-M[123]-[12]$/;

function isPredictionLocked(match: {
  kickoff_at: string | null;
  status: string;
}): boolean {
  if (match.status === "live" || match.status === "finished") {
    return true;
  }
  if (match.kickoff_at) {
    return new Date(match.kickoff_at).getTime() <= Date.now();
  }
  return false;
}

export async function submitPrediction(
  _prev: PredictionActionState | undefined,
  formData: FormData,
): Promise<PredictionActionState> {
  const homeRaw = formData.get("homeGoals");
  const awayRaw = formData.get("awayGoals");
  const home = Number(homeRaw);
  const away = Number(awayRaw);

  if (
    !Number.isFinite(home) ||
    !Number.isFinite(away) ||
    !Number.isInteger(home) ||
    !Number.isInteger(away) ||
    home < 0 ||
    away < 0
  ) {
    return { ok: false, message: "Enter whole-number scores (0 or higher)." };
  }

  const fixtureKeyRaw = formData.get("matchId");
  const fixtureKey =
    typeof fixtureKeyRaw === "string" ? fixtureKeyRaw.trim() : "";

  if (!FIXTURE_KEY_RE.test(fixtureKey)) {
    return { ok: false, message: "Invalid match reference." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      ok: true,
      message: `${home}–${away}. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to save picks.`,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      message: "Sign in with Supabase Auth to save predictions.",
    };
  }

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("id, kickoff_at, status")
    .eq("fixture_key", fixtureKey)
    .maybeSingle();

  if (matchError) {
    return {
      ok: false,
      message: "Could not load this fixture. Try again shortly.",
    };
  }

  if (!match) {
    return {
      ok: false,
      message:
        "Fixture not seeded yet — in Supabase SQL editor run supabase/seed-featured-match.sql for the Mexico vs South Africa opener.",
    };
  }

  if (isPredictionLocked(match)) {
    return {
      ok: false,
      message:
        "This match is locked (kickoff time passed or score is underway/final).",
    };
  }

  const { error: upsertError } = await supabase.from("predictions").upsert(
    {
      user_id: user.id,
      match_id: match.id,
      home_goals: home,
      away_goals: away,
    },
    { onConflict: "user_id,match_id" },
  );

  if (upsertError) {
    if (upsertError.code === "23503") {
      return {
        ok: false,
        message:
          "Your profile row is missing. Sign out and back in after the Supabase signup trigger creates `profiles`.",
      };
    }
    return {
      ok: false,
      message:
        upsertError.message ??
        "Could not save prediction. Check RLS policies and FK constraints.",
    };
  }

  revalidatePath("/dashboard");

  return {
    ok: true,
    message: `Saved ${home}–${away}. You can change this until kickoff.`,
  };
}
