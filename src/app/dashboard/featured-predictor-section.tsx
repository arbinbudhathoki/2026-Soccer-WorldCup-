import { PredictorCard } from "@/components/PredictorCard";
import { featuredPredictionFixture } from "@/data/worldcup-history";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function fetchPredictorHydration(fixtureKey: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { initialHomeGoals: undefined, initialAwayGoals: undefined, formLocked: false };
  }

  const { data: match } = await supabase
    .from("matches")
    .select("id, kickoff_at, status")
    .eq("fixture_key", fixtureKey)
    .maybeSingle();

  let formLocked = false;
  if (match) {
    const liveTerminal = match.status === "live" || match.status === "finished";
    const pastKickoff =
      !!match.kickoff_at &&
      new Date(match.kickoff_at).getTime() <= Date.now();
    formLocked = liveTerminal || pastKickoff;
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

export async function FeaturedPredictorSection() {
  const fixture = featuredPredictionFixture;
  const hydration = await fetchPredictorHydration(fixture.id);

  return (
    <PredictorCard fixture={fixture} {...hydration} />
  );
}
