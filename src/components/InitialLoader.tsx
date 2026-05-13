"use client";

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
      <div className="flex flex-col items-center gap-6 px-4">
        <div className="initial-loader-scene" aria-hidden>
          <div className="initial-loader-pitch" />
          <div className="initial-loader-goal">
            <div className="initial-loader-net" />
          </div>
          <div className="initial-loader-gk">
            <div className="initial-loader-gk-arm" />
          </div>
          <div className="initial-loader-ball" />
          <div className="initial-loader-player">
            <div className="initial-loader-player-head" />
            <div className="initial-loader-player-body" />
            <div className="initial-loader-player-leg" />
          </div>
        </div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
          Penalty — spot kick vs the keeper
        </p>
      </div>
    </div>
  );
}
