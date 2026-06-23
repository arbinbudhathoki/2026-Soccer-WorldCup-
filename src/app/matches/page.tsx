import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FixtureScoreBadge } from "@/components/FixtureScoreBadge";
import { KnockoutScheduleList } from "@/components/KnockoutScheduleList";
import { TournamentTodayBanner } from "@/components/TournamentTodayBanner";
import { worldCup2026GroupStageFixtures } from "@/data/worldcup-history";
import { readWorldCupLiveScores } from "@/lib/worldcup-live-score-store";
import { MatchFilters } from "./match-filters";

export const dynamic = "force-dynamic";

type Search = { group?: string; matchday?: string; view?: string };

function parseFilters(searchParams: Search) {
  const group = searchParams.group?.toUpperCase();
  const mdRaw = searchParams.matchday;
  const matchday =
    mdRaw === "1" || mdRaw === "2" || mdRaw === "3" ? Number(mdRaw) : undefined;

  const validGroup =
    group && group.length === 1 && group >= "A" && group <= "L" ? group : undefined;

  const view: "group" | "knockout" =
    searchParams.view === "knockout" ? "knockout" : "group";

  return { group: validGroup, matchday, view };
}

export default async function MatchesPage({
  searchParams,
}: {
  searchParams?: Promise<Search>;
}) {
  const resolved = (await searchParams) ?? {};
  const { group, matchday, view } = parseFilters(resolved);

  const fixtures = worldCup2026GroupStageFixtures.filter((f) => {
    if (group && f.groupLetter !== group) {
      return false;
    }
    if (matchday !== undefined && f.matchday !== matchday) {
      return false;
    }
    return true;
  });

  const { scores, syncedAt } = await readWorldCupLiveScores();
  const scoreByFixtureKey = new Map(
    scores
      .filter((s) => s.fixtureKey)
      .map((s) => [s.fixtureKey as string, s]),
  );

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10 md:px-8"
    >
      <header>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-heat"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Dashboard
        </Link>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
          2026 <span className="text-neon">fixtures</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          {view === "knockout"
            ? "Knockout bracket with live scores when synced from API-Football."
            : "Browse all 72 group-stage pairings with live results. Sync scores on the dashboard."}
        </p>
        {syncedAt ? (
          <p className="mt-2 text-xs text-zinc-500">
            Scores last synced {new Date(syncedAt).toLocaleString()}
          </p>
        ) : null}
      </header>

      <TournamentTodayBanner />

      <Suspense fallback={null}>
        <MatchFilters activeView={view} />
      </Suspense>

      {view === "knockout" ? (
        <KnockoutScheduleList />
      ) : (
        <ul className="space-y-3">
          {fixtures.map((f) => (
            <li key={f.id}>
              <Link
                href={`/matches/${f.id}`}
                className="glass-panel flex flex-col gap-3 rounded-2xl p-4 transition hover:border-neon/30 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Group {f.groupLetter} · Matchday {f.matchday}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {f.home}{" "}
                    <span className="text-zinc-600">vs</span> {f.away}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 md:justify-end">
                  <FixtureScoreBadge score={scoreByFixtureKey.get(f.id)} />
                  <span className="inline-flex items-center gap-1 text-sm text-neon">
                    Predict
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {view === "group" && fixtures.length === 0 ? (
        <p className="text-sm text-zinc-500">No fixtures match these filters.</p>
      ) : null}
    </main>
  );
}
