"use client";

import { useEffect, useState } from "react";
import styles from "./InitialLoader.module.css";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 px-4"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(23, 190, 187, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(255, 159, 28, 0.12), transparent 45%)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading World Cup experience"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-neon/45 bg-black/55 p-8 shadow-[0_0_48px_rgba(23,190,187,0.2)] backdrop-blur-md">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-neon">
          Opening kick
        </p>
        <div className={`${styles.scene} w-full max-w-[18rem]`} aria-hidden>
          <div className={styles.pitch} />
          <div className={styles.goal}>
            <div className={styles.net} />
          </div>
          <div className={styles.gk}>
            <div className={styles.gkArm} />
          </div>
          <div className={styles.ball} />
          <div className={styles.player}>
            <div className={styles.playerHead} />
            <div className={styles.playerBody} />
            <div className={styles.playerLeg} />
          </div>
        </div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">
          Penalty — striker vs keeper
        </p>
      </div>
    </div>
  );
}
