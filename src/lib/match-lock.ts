export type MatchLockFields = {
  kickoff_at: string | null;
  status: string;
};

export function isPredictionLocked(match: MatchLockFields): boolean {
  if (match.status === "live" || match.status === "finished") {
    return true;
  }
  if (match.kickoff_at) {
    return new Date(match.kickoff_at).getTime() <= Date.now();
  }
  return false;
}
