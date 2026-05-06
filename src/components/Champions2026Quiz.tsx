"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleDot, HelpCircle, Trophy } from "lucide-react";
import {
  type ChampionNation,
  championsTrivia,
  championNations,
  predictionCopy,
} from "@/data/champions-quiz";

type Phase = "trivia" | "prediction" | "done";

export function Champions2026Quiz() {
  const [phase, setPhase] = useState<Phase>("trivia");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [pickedChoice, setPickedChoice] = useState<ChampionNation | null>(null);
  const [picked2026, setPicked2026] = useState<ChampionNation | null>(null);

  const q = championsTrivia[index];
  const isLastTrivia = index === championsTrivia.length - 1;

  const progress = useMemo(() => {
    if (phase !== "trivia") return 100;
    const n = championsTrivia.length;
    const pct = showExplain ? ((index + 1) / n) * 100 : (index / n) * 100;
    return Math.round(pct);
  }, [phase, index, showExplain]);

  function handlePickTrivia(choice: ChampionNation) {
    if (showExplain) return;
    setPickedChoice(choice);
    const ok = choice === q.answer;
    setLastCorrect(ok);
    if (ok) setScore((s) => s + 1);
    setShowExplain(true);
  }

  function nextTrivia() {
    setShowExplain(false);
    setLastCorrect(null);
    setPickedChoice(null);
    if (isLastTrivia) {
      setPhase("prediction");
      return;
    }
    setIndex((i) => i + 1);
  }

  function selectPrediction(nation: ChampionNation) {
    setPicked2026(nation);
    setPhase("done");
  }

  function restart() {
    setPhase("trivia");
    setIndex(0);
    setScore(0);
    setLastCorrect(null);
    setShowExplain(false);
    setPickedChoice(null);
    setPicked2026(null);
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
            <Trophy className="h-3.5 w-3.5" aria-hidden />
            2010–2022 champions
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
          The last four winners — memory check
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
          Spain (2010), Germany (2014), France (2018), and Argentina (2022) each
          topped the world once in that stretch — four nations at the pinnacle of
          men&apos;s international football. Answer four quick questions, then
          pick which of them you think could win FIFA World Cup 2026™ in North
          America.
        </p>

        {phase === "trivia" && (
          <>
            <div
              className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-neon transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Question {index + 1} of {championsTrivia.length} · Trivia score{" "}
              {score}/{championsTrivia.length}
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {q.year} · Host: {q.hostBlurb}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                {q.prompt}
              </h3>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const locked = showExplain;
                  const isAnswer = opt === q.answer;
                  const isWrongPick =
                    locked && pickedChoice === opt && opt !== q.answer;
                  const highlight = locked
                    ? isAnswer
                      ? "border-neon bg-neon/15 text-white"
                      : isWrongPick
                        ? "border-rose-500/40 bg-rose-950/30 text-rose-100"
                        : "border-white/10 opacity-45"
                    : "border-white/15 bg-black/20 hover:border-heat/40 hover:bg-black/30";

                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => handlePickTrivia(opt)}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition md:text-base ${highlight}`}
                      >
                        <span>{opt}</span>
                        {locked && isAnswer ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-neon" aria-hidden />
                        ) : (
                          <CircleDot className="h-5 w-5 shrink-0 text-zinc-600" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {showExplain && (
                <div
                  className="mt-6 rounded-2xl border border-neon/25 bg-neon/5 p-5"
                  role="status"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
                    {lastCorrect ? "Correct" : "Not quite"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
                    {q.explain}
                  </p>
                  <button
                    type="button"
                    onClick={nextTrivia}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-pitch shadow-neon transition hover:bg-neon-dim"
                  >
                    {isLastTrivia ? "Pick your 2026 champion" : "Next question"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {phase === "prediction" && (
        <section className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-2 text-neon">
            <HelpCircle className="h-5 w-5" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
              Final question
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Which of these four could win World Cup 2026™?
          </h2>
          <p className="mt-3 text-sm text-zinc-400 md:text-base">
            Same four nations — Spain, Germany, France, Argentina. There&apos;s
            no wrong answer; it&apos;s your North America prediction.
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-300">
            Trivia score: {score}/{championsTrivia.length}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {championNations.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => selectPrediction(n)}
                  className="flex w-full items-center justify-center rounded-2xl border border-white/15 bg-black/25 px-4 py-4 text-base font-semibold text-white transition hover:border-heat/50 hover:bg-black/40 md:py-5"
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {phase === "done" && picked2026 && (
        <section className="glass-panel rounded-3xl border border-neon/30 p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
            Your 2026 pick
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            {predictionCopy[picked2026].headline}
          </h2>
          <p className="mt-2 text-sm font-medium text-zinc-400">
            You chose{" "}
            <span className="text-neon">{picked2026}</span> · Trivia{" "}
            {score}/{championsTrivia.length}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-zinc-300 md:text-base">
            {predictionCopy[picked2026].body}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-heat/40 hover:text-white"
          >
            Play again
          </button>
        </section>
      )}
    </div>
  );
}
