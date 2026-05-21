import { PredictorCard } from "@/components/PredictorCard";
import { FixturePointsFeedback } from "@/components/FixturePointsFeedback";
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
      actualHomeGoals: undefined,
      actualAwayGoals: undefined,
      pointsFeedback: null as {
        predictedHome: number;
        predictedAway: number;
        actualHome: number;
        actualAway: number;
        pointsEarned: number | null;
      } | null,
    };
  }

  const { data: match } = await supabase
    .from("matches")
    .select("id, kickoff_at, status, home_score, away_score")
    .eq("fixture_key", fixtureKey)
    .maybeSingle();

  let formLocked = false;
  let actualHomeGoals: number | undefined;
  let actualAwayGoals: number | undefined;

  if (match) {
    formLocked = isPredictionLocked(match);
    if (
      match.status === "finished" &&
      match.home_score !== null &&
      match.away_score !== null
    ) {
      actualHomeGoals = match.home_score;
      actualAwayGoals = match.away_score;
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialHomeGoals: number | undefined;
  let initialAwayGoals: number | undefined;
  let pointsEarned: number | null = null;

  if (user && match) {
    const { data: row } = await supabase
      .from("predictions")
      .select("home_goals, away_goals, points_earned")
      .eq("match_id", match.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (row) {
      initialHomeGoals = row.home_goals;
      initialAwayGoals = row.away_goals;
      pointsEarned = row.points_earned;
    }
  }

  const pointsFeedback =
    user &&
    match &&
    match.status === "finished" &&
    actualHomeGoals !== undefined &&
    actualAwayGoals !== undefined &&
    initialHomeGoals !== undefined &&
    initialAwayGoals !== undefined
      ? {
          predictedHome: initialHomeGoals,
          predictedAway: initialAwayGoals,
          actualHome: actualHomeGoals,
          actualAway: actualAwayGoals,
          pointsEarned,
        }
      : null;

  return {
    initialHomeGoals,
    initialAwayGoals,
    formLocked,
    actualHomeGoals,
    actualAwayGoals,
    pointsFeedback,
  };
}

type Props = {
  fixture: GroupStageFixture;
};

export async function FixturePredictorBlock({ fixture }: Props) {
  const hydration = await fetchPredictorHydration(fixture.id);
  const { pointsFeedback, ...cardProps } = hydration;

  return (
    <div className="space-y-6">
      {pointsFeedback ? (
        <FixturePointsFeedback
          predictedHome={pointsFeedback.predictedHome}
          predictedAway={pointsFeedback.predictedAway}
          actualHome={pointsFeedback.actualHome}
          actualAway={pointsFeedback.actualAway}
          pointsEarned={pointsFeedback.pointsEarned}
        />
      ) : null}
      <PredictorCard fixture={fixture} {...cardProps} />
    </div>
  );
}
