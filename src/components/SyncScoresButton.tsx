"use client";

import { useFormStatus } from "react-dom";

export function SyncScoresButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-neon px-4 py-3 text-sm font-semibold text-pitch shadow-neon transition hover:bg-neon-dim disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
    >
      {pending ? "Syncing scores..." : "Sync today's scores"}
    </button>
  );
}
