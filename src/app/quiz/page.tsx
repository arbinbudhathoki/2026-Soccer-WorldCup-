import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Champions2026Quiz } from "@/components/Champions2026Quiz";

export default function ChampionsQuizPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-4 py-10 md:px-8">
      <header className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-heat"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back home
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">
            Champions quiz
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Last four <span className="text-neon">winners</span> → 2026
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
            From South Africa 2010 through Qatar 2022, only four countries
            lifted the trophy: Spain, Germany, France, and Argentina. Test
            your memory, then cast which one you believe can rule North America
            in 2026.
          </p>
        </div>
      </header>

      <Champions2026Quiz />
    </div>
  );
}
