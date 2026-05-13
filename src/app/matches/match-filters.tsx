"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const GROUPS = "ABCDEFGHIJKL".split("");
const MATCHDAYS = [1, 2, 3] as const;

export function MatchFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const group = searchParams.get("group") ?? "";
  const md = searchParams.get("matchday") ?? "";

  function href(next: { group?: string; matchday?: string }) {
    const p = new URLSearchParams();
    const g = next.group !== undefined ? next.group : group;
    const m = next.matchday !== undefined ? next.matchday : md;
    if (g) {
      p.set("group", g);
    }
    if (m) {
      p.set("matchday", m);
    }
    const q = p.toString();
    return q ? `${pathname}?${q}` : pathname;
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 md:flex-row md:flex-wrap md:items-center">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Group
        </span>
        <Link
          href={href({ group: "", matchday: md })}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            !group
              ? "bg-neon text-pitch"
              : "border border-white/15 text-zinc-400 hover:border-neon/40 hover:text-white"
          }`}
        >
          All
        </Link>
        {GROUPS.map((letter) => (
          <Link
            key={letter}
            href={href({ group: letter, matchday: md })}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              group === letter
                ? "bg-neon text-pitch"
                : "border border-white/15 text-zinc-400 hover:border-neon/40 hover:text-white"
            }`}
          >
            {letter}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Matchday
        </span>
        <Link
          href={href({ group, matchday: "" })}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            !md
              ? "bg-neon text-pitch"
              : "border border-white/15 text-zinc-400 hover:border-neon/40 hover:text-white"
          }`}
        >
          All
        </Link>
        {MATCHDAYS.map((d) => (
          <Link
            key={d}
            href={href({ group, matchday: String(d) })}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              md === String(d)
                ? "bg-neon text-pitch"
                : "border border-white/15 text-zinc-400 hover:border-neon/40 hover:text-white"
            }`}
          >
            MD{d}
          </Link>
        ))}
      </div>
    </div>
  );
}
