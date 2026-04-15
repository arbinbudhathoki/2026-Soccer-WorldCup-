import { NextResponse } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route-handler";
import { getEmptyVoteTotals, worldCupSongIds } from "@/data/worldcup-songs";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = getEmptyVoteTotals();
  const supabase = await createRouteHandlerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ totals: base, configured: false });
  }

  const { data, error } = await supabase
    .from("world_cup_song_votes")
    .select("song_id, vote_count");

  if (error) {
    return NextResponse.json({
      totals: base,
      configured: true,
      dbError: error.message,
    });
  }

  const totals = { ...base };
  for (const row of data ?? []) {
    const id = row.song_id as string;
    const n = row.vote_count as number;
    if (id in totals) totals[id] = n;
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

  const songId =
    typeof body === "object" && body !== null && "songId" in body
      ? (body as { songId: unknown }).songId
      : undefined;

  if (typeof songId !== "string" || !worldCupSongIds.has(songId)) {
    return NextResponse.json({ error: "Invalid song" }, { status: 400 });
  }

  const supabase = await createRouteHandlerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  const { error } = await supabase.rpc("increment_world_cup_song_vote", {
    p_song_id: songId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, configured: true });
}
