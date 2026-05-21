import { groupKnockoutByRound } from "@/lib/knockout-schedule";

export function KnockoutScheduleList() {
  const rounds = groupKnockoutByRound();

  return (
    <div className="space-y-8">
      {rounds.map(({ round, matches }) => (
        <section key={round}>
          <h2 className="text-lg font-semibold text-white">{round}</h2>
          <ul className="mt-4 space-y-3">
            {matches.map((m) => (
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
                <p className="mt-2 text-sm text-zinc-400 md:mt-0">{m.city}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
