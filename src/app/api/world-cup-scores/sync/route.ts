import { NextResponse } from "next/server";
import { isApiFootballConfigured } from "@/lib/api-football/client";
import { syncWorldCupScoresFromApiFootball } from "@/lib/worldcup-score-sync";

export const dynamic = "force-dynamic";

/** POST /api/world-cup-scores/sync — cron-friendly score refresh. */
export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!isApiFootballConfigured()) {
    return NextResponse.json(
      { ok: false, error: "API_FOOTBALL_KEY not configured" },
      { status: 503 },
    );
  }

  try {
    const result = await syncWorldCupScoresFromApiFootball();
    return NextResponse.json({
      ok: true,
      message: result.message,
      finishedCount: result.finishedCount,
      liveCount: result.liveCount,
      matchedGroupFixtures: result.matchedGroupFixtures,
      supabaseUpdated: result.supabaseUpdated,
      syncedAt: result.snapshot?.syncedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Score sync failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    configured: isApiFootballConfigured(),
    endpoint: "POST to sync World Cup scores from API-Football",
  });
}
