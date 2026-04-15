import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { WorldCupSongsVote } from "@/components/WorldCupSongsVote";

export default function WorldCupSongsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 md:px-8">
      <header className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-neon"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Iconic &amp; official
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            World Cup <span className="text-neon">songs</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
            From Chile 1962 through Qatar 2022 — anthems, collabs, and
            tournament energy. What are the best World Cup songs so far? Cast
            your vote below.
          </p>
        </div>
      </header>

      <WorldCupSongsVote />
    </div>
  );
}
