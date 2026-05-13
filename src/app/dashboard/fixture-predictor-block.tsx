import { PredictorCard } from "@/components/PredictorCard";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isPredictionLocked } from "@/lib/match-lock";
import type { GroupStageFixture } from "@/data/worldcup-history";

async function fetchPredictorHydration(fixtureKey: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      initialHomeGoals: undefined,
      initialAwayGoals: undefined,
      formLocked: false,
    };
  }

  const { data: match } = await supabase
    .from("matches")
    .select("id, kickoff_at, status")
    .eq("fixture_key", fixtureKey)
    .maybeSingle();

  let formLocked = false;
  if (match) {
    formLocked = isPredictionLocked(match);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialHomeGoals: number | undefined;
  let initialAwayGoals: number | undefined;

  if (user && match) {
    const { data: row } = await supabase
      .from("predictions")
      .select("home_goals, away_goals")
      .eq("match_id", match.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (row) {
      initialHomeGoals = row.home_goals;
      initialAwayGoals = row.away_goals;
    }
  }

  return { initialHomeGoals, initialAwayGoals, formLocked };
}

type Props = {
  fixture: GroupStageFixture;
};

export async function FixturePredictorBlock({ fixture }: Props) {
  const hydration = await fetchPredictorHydration(fixture.id);
  return <PredictorCard fixture={fixture} {...hydration} />;
}
