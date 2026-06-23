import type { WorldCupLiveScore } from "@/lib/worldcup-live-score-store";
import { formatFixtureScore, scoreStatusBadge } from "@/lib/worldcup-scores";

type Props = {
  score?: WorldCupLiveScore;
  className?: string;
};

const TONE_CLASS = {
  live: "border-heat/50 bg-heat/15 text-heat",
  finished: "border-neon/40 bg-neon/10 text-neon",
  scheduled: "border-white/15 bg-white/5 text-zinc-400",
  muted: "border-white/10 bg-black/30 text-zinc-500",
} as const;

export function FixtureScoreBadge({ score, className = "" }: Props) {
  const line = formatFixtureScore(score);
  const badge = scoreStatusBadge(score);

  if (!score || (!line && !badge)) {
    return (
      <span className={`text-xs text-zinc-500 ${className}`.trim()}>
        Score pending
      </span>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {badge ? (
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${TONE_CLASS[badge.tone]}`}
        >
          {badge.label}
        </span>
      ) : null}
      {line ? (
        <span className="font-mono text-lg font-semibold text-white">{line}</span>
      ) : (
        <span className="text-sm text-zinc-400">{score.statusLabel}</span>
      )}
    </div>
  );
}
