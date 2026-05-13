import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { worldCup2026GroupStageFixtures } from "@/data/worldcup-history";
import { MatchFilters } from "./match-filters";

export const dynamic = "force-dynamic";

type Search = { group?: string; matchday?: string };

function parseFilters(searchParams: Search) {
  const group = searchParams.group?.toUpperCase();
  const mdRaw = searchParams.matchday;
  const matchday =
    mdRaw === "1" || mdRaw === "2" || mdRaw === "3" ? Number(mdRaw) : undefined;

  const validGroup =
    group && group.length === 1 && group >= "A" && group <= "L" ? group : undefined;

  return { group: validGroup, matchday };
}

export default async function MatchesPage({
  searchParams,
}: {
  searchParams?: Promise<Search>;
}) {
  const resolved = (await searchParams) ?? {};
  const { group, matchday } = parseFilters(resolved);

  const fixtures = worldCup2026GroupStageFixtures.filter((f) => {
    if (group && f.groupLetter !== group) {
      return false;
    }
    if (matchday !== undefined && f.matchday !== matchday) {
      return false;
    }
    return true;
  });

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
          2026 <span className="text-neon">group fixtures</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Browse all 72 group-stage pairings. Open a match to submit a
          prediction when the row exists in Supabase (seed per fixture or bulk
          import later).
        </p>
      </header>

      <Suspense fallback={null}>
        <MatchFilters />
      </Suspense>

      <ul className="space-y-3">
        {fixtures.map((f) => (
          <li key={f.id}>
            <Link
              href={`/matches/${f.id}`}
              className="glass-panel flex flex-col gap-2 rounded-2xl p-4 transition hover:border-neon/30 md:flex-row md:items-center md:justify-between"
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
              <span className="inline-flex items-center gap-1 text-sm text-neon">
                Predict
                <ChevronRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {fixtures.length === 0 ? (
        <p className="text-sm text-zinc-500">No fixtures match these filters.</p>
      ) : null}
    </main>
  );
}
