import { FixturePredictorBlock } from "@/app/dashboard/fixture-predictor-block";
import { featuredPredictionFixture } from "@/data/worldcup-history";

export async function FeaturedPredictorSection() {
  return <FixturePredictorBlock fixture={featuredPredictionFixture} />;
}
