import type { WorldCupLiveScore } from "@/lib/worldcup-live-score-store";

export function formatFixtureScore(score: WorldCupLiveScore | undefined): string | null {
  if (!score) {
    return null;
  }
  if (score.homeScore === null || score.awayScore === null) {
    return null;
  }
  return `${score.homeScore}–${score.awayScore}`;
}

export function scoreStatusBadge(score: WorldCupLiveScore | undefined): {
  label: string;
  tone: "live" | "finished" | "scheduled" | "muted";
} | null {
  if (!score) {
    return null;
  }
  if (score.status === "live") {
    return { label: "LIVE", tone: "live" };
  }
  if (score.status === "finished") {
    return { label: "FT", tone: "finished" };
  }
  if (score.status === "postponed") {
    return { label: "PST", tone: "muted" };
  }
  if (score.status === "void") {
    return { label: "VOID", tone: "muted" };
  }
  return null;
}
