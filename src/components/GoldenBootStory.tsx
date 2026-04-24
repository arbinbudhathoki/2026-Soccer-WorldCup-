import { Award } from "lucide-react";

const ESPN_GOLDEN_BOOT_ARTICLE =
  "https://www.espn.com/soccer/story/_/id/41177877/who-won-most-golden-boots-european-winners-list";

export function GoldenBootStory({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <aside className="glass-panel rounded-2xl border border-white/10 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Golden boot vs Golden Shoe
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          The{" "}
          <span className="font-medium text-zinc-200">World Cup Golden Boot</span>{" "}
          goes to the top scorer at the tournament (see Final night above). The{" "}
          <span className="font-medium text-zinc-200">European Golden Boot</span>{" "}
          (Golden Shoe) is a separate prize for league seasons in Europe, using a
          weighted points system since the late 1960s.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          ESPN rounds up the record holders and every winner:{" "}
          <a
            href={ESPN_GOLDEN_BOOT_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neon underline decoration-neon/40 underline-offset-2 transition hover:decoration-neon"
          >
            Who has won the most Golden Boots? European winners list
          </a>
          .
        </p>
      </aside>
    );
  }

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Award className="h-3.5 w-3.5" aria-hidden />
          Awards context
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
        World Cup Golden Boot vs European Golden Shoe
      </h2>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
        <p>
          At each men&apos;s World Cup, FIFA awards the{" "}
          <span className="font-medium text-zinc-200">Golden Boot</span> to the
          player who scores the most goals over the tournament (with tie-breakers
          if needed). That is what you see in the Matchroom dashboard beside each
          final — for example Kylian Mbappé in 2022 or Harry Kane in 2018.
        </p>
        <p>
          The{" "}
          <span className="font-medium text-zinc-200">
            European Golden Boot
          </span>
          , often called the{" "}
          <span className="font-medium text-zinc-200">European Golden Shoe</span>
          , is different: it rewards the leading scorer across European domestic
          leagues in a single season. It has been decided with a{" "}
          <span className="text-zinc-200">points-based formula</span> since it was
          first handed out in the late 1960s — goals in the strongest leagues count
          for more than goals in lower-ranked competitions.
        </p>
        <p>
          In ESPN&apos;s tracker of that European award,{" "}
          <span className="text-neon">Lionel Messi</span> leads with six wins,
          ahead of{" "}
          <span className="text-neon">Cristiano Ronaldo</span> on four. Their
          piece also lists season-by-season champions — from recent names like
          Erling Haaland and Harry Kane back through decades of winners.
        </p>
        <p className="text-zinc-400">
          Source and full winners table:{" "}
          <a
            href={ESPN_GOLDEN_BOOT_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neon underline decoration-neon/40 underline-offset-2 transition hover:decoration-neon"
          >
            Who has won the most Golden Boots? European winners list — ESPN
          </a>
          .
        </p>
      </div>
    </section>
  );
}
