import { NextResponse } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabase/route-handler";
import {
  getEmptyLegendVoteTotals,
  legendPickIdSet,
} from "@/data/legend-pick";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = getEmptyLegendVoteTotals();
  const supabase = await createRouteHandlerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ totals: base, configured: false });
  }

  const { data, error } = await supabase
    .from("legend_pick_votes")
    .select("legend_id, vote_count");

  if (error) {
    return NextResponse.json({
      totals: base,
      configured: true,
      dbError: error.message,
    });
  }

  const totals = { ...base };
  for (const row of data ?? []) {
    const id = row.legend_id as string;
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

  const legendId =
    typeof body === "object" && body !== null && "legendId" in body
      ? (body as { legendId: unknown }).legendId
      : undefined;

  if (typeof legendId !== "string" || !legendPickIdSet.has(legendId)) {
    return NextResponse.json({ error: "Invalid legend" }, { status: 400 });
  }

  const supabase = await createRouteHandlerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  const { error } = await supabase.rpc("increment_legend_pick_vote", {
    p_legend_id: legendId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, configured: true });
}
