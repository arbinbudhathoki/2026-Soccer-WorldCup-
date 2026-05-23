import { NextResponse } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route-handler";
import {
  getEmptyManOfMatchVoteTotals,
  manOfMatchPlayerIdSet,
} from "@/data/man-of-match-poll";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = getEmptyManOfMatchVoteTotals();
  const supabase = await createRouteHandlerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ totals: base, configured: false });
  }

  const { data, error } = await supabase
    .from("man_of_match_votes")
    .select("player_id, vote_count");

  if (error) {
    return NextResponse.json({
      totals: base,
      configured: true,
      dbError: error.message,
    });
  }

  const totals = { ...base };
  for (const row of data ?? []) {
    const id = row.player_id as string;
    const n = row.vote_count as number;
    if (id in totals) {
      totals[id as keyof typeof totals] = n;
    }
  }

  return NextResponse.json({ totals, configured: true });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const playerId =
    typeof body === "object" && body !== null && "playerId" in body
      ? (body as { playerId: unknown }).playerId
      : undefined;

  if (typeof playerId !== "string" || !manOfMatchPlayerIdSet.has(playerId)) {
    return NextResponse.json({ error: "Invalid player" }, { status: 400 });
  }

  const supabase = await createRouteHandlerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  const { error } = await supabase.rpc("increment_man_of_match_vote", {
    p_player_id: playerId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, configured: true });
}
