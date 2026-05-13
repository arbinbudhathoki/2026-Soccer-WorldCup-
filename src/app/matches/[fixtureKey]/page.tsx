import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { FixturePredictorBlock } from "@/app/dashboard/fixture-predictor-block";
import { getFixtureById, isGroupFixtureKey } from "@/lib/worldcup-fixtures";

type Props = {
  params: Promise<{ fixtureKey: string }>;
};

export default async function MatchDetailPage({ params }: Props) {
  const { fixtureKey } = await params;
  const decoded = decodeURIComponent(fixtureKey);

  if (!isGroupFixtureKey(decoded)) {
    notFound();
  }

  const fixture = getFixtureById(decoded);
  if (!fixture) {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10 md:px-8"
    >
      <div>
        <Link
          href="/matches"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-heat"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          All fixtures
        </Link>
        <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          Group {fixture.groupLetter} · Matchday {fixture.matchday}
        </h1>
        <p className="mt-2 text-lg text-zinc-300">
          {fixture.home} vs {fixture.away}
        </p>
        <p className="mt-1 font-mono text-xs text-zinc-500">{fixture.id}</p>
      </div>

      <FixturePredictorBlock fixture={fixture} />
    </main>
  );
}
