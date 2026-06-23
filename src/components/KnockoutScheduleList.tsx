import { FixtureScoreBadge } from "@/components/FixtureScoreBadge";
import { fixturePairKey } from "@/lib/api-football/team-aliases";
import { groupKnockoutByRound } from "@/lib/knockout-schedule";
import { readWorldCupLiveScores } from "@/lib/worldcup-live-score-store";

function parseKnockoutFixture(fixture: string): { home: string; away: string } | null {
  const parts = fixture.split(/\s+vs\s+/i);
  if (parts.length !== 2) {
    return null;
  }
  const home = parts[0].trim();
  const away = parts[1].trim();
  if (!home || !away || home === "TBD" || away === "TBD") {
    return null;
  }
  return { home, away };
}

export async function KnockoutScheduleList() {
  const rounds = groupKnockoutByRound();
  const { scores } = await readWorldCupLiveScores();
  const byPair = new Map(
    scores.map((s) => [`${s.homeTeam}|${s.awayTeam}`, s]),
  );

  return (
    <div className="space-y-8">
      {rounds.map(({ round, matches }) => (
        <section key={round}>
          <h2 className="text-lg font-semibold text-white">{round}</h2>
          <ul className="mt-4 space-y-3">
            {matches.map((m) => {
              const teams = parseKnockoutFixture(m.fixture);
              const liveScore = teams
                ? byPair.get(fixturePairKey(teams.home, teams.away))
                : undefined;

              return (
                <li
                  key={m.matchNumber}
                  className="glass-panel rounded-2xl p-4 md:flex md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      Match {m.matchNumber} · {m.date} · {m.kickoffET}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {m.fixture}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col items-start gap-1 md:mt-0 md:items-end">
                    <FixtureScoreBadge score={liveScore} />
                    <p className="text-sm text-zinc-400">{m.city}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
