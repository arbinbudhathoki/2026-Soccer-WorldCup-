"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center"
    >
      <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
      <p className="text-sm text-zinc-400">
        The page hit a client error. Try reloading, or restart the dev server with{" "}
        <code className="rounded bg-black/40 px-1.5 py-0.5 text-zinc-300">
          npm run dev:clean
        </code>
        .
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-neon px-5 py-2 text-sm font-semibold text-pitch transition hover:brightness-110"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-neon/50"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
