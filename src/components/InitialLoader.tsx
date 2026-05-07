"use client";

import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const LOADER_MS = 2500;

export function InitialLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), LOADER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-pitch"
      role="status"
      aria-live="polite"
      aria-label="Loading World Cup experience"
    >
      <div className="flex flex-col items-center gap-4">
        <Trophy className="h-14 w-14 animate-spin text-neon" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
          Welcome a Real Soccer Enthusiast
        </p>
      </div>
    </div>
  );
}
