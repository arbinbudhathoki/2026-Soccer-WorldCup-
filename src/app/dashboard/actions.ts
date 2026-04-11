"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type PredictionActionState = {
  ok: boolean;
  message: string;
};

export async function submitPrediction(
  _prev: PredictionActionState | undefined,
  formData: FormData
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

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      ok: true,
      message: `Logged: ${home}–${away}. Add Supabase env vars to sync with the database.`,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      message: "Sign in with Supabase Auth to save predictions to your profile.",
    };
  }

  return {
    ok: true,
    message:
      "Auth detected. Wire `matches` + `predictions` rows next to persist this pick.",
  };
}
