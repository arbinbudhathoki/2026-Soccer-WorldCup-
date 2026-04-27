"use client";

import { useEffect, useMemo, useState } from "react";

const START_DATE_UTC = Date.UTC(2026, 5, 11, 0, 0, 0); // June is month 5
const DAY_MS = 24 * 60 * 60 * 1000;

function getCountdown() {
  const now = Date.now();
  const diff = START_DATE_UTC - now;

  if (diff <= 0) {
    return { days: 0, hasStarted: true };
  }

  return {
    days: Math.ceil(diff / DAY_MS),
    hasStarted: false,
  };
}

type WorldCupCountdownProps = {
  variant?: "default" | "compact";
};

export function WorldCupCountdown({ variant = "default" }: WorldCupCountdownProps) {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const subtitle = useMemo(() => {
    if (countdown.hasStarted) {
      return "Kickoff day is here.";
    }

    return countdown.days === 1 ? "day to kickoff" : "days to kickoff";
  }, [countdown.days, countdown.hasStarted]);

  const isCompact = variant === "compact";

  return (
    <section
      className={
        isCompact
          ? "glass-panel rounded-2xl p-5 md:p-6"
          : "glass-panel rounded-3xl p-8 md:p-10"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
        Countdown
      </p>
      <h2
        className={
          isCompact
            ? "mt-2 text-xl font-semibold text-white md:text-2xl"
            : "mt-3 text-2xl font-semibold text-white md:text-3xl"
        }
      >
        {countdown.hasStarted ? "World Cup 2026 has started!" : "Road to June 11, 2026"}
      </h2>
      <div
        className={
          isCompact
            ? "mt-4 inline-flex items-end gap-2 rounded-2xl border border-neon/30 bg-neon/10 px-4 py-3"
            : "mt-5 inline-flex items-end gap-3 rounded-2xl border border-neon/30 bg-neon/10 px-5 py-4"
        }
      >
        <span
          className={
            isCompact
              ? "text-3xl font-bold text-neon md:text-4xl"
              : "text-4xl font-bold text-neon md:text-5xl"
          }
        >
          {countdown.days}
        </span>
        <span
          className={
            isCompact
              ? "pb-1 text-xs uppercase tracking-[0.12em] text-zinc-300"
              : "pb-1 text-sm uppercase tracking-[0.15em] text-zinc-300"
          }
        >
          {subtitle}
        </span>
      </div>
    </section>
  );
}
