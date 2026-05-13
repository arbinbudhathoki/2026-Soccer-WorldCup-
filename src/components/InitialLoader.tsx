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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-pitch"
      role="status"
      aria-live="polite"
      aria-label="Loading World Cup experience"
    >
      <div className="flex flex-col items-center gap-6 px-4">
        <div className={styles.scene} aria-hidden>
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
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
          Penalty — spot kick vs the keeper
        </p>
      </div>
    </div>
  );
}
