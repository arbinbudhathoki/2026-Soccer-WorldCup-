import { execSync } from "node:child_process";

/** Free common dev ports so `next dev` always binds to 3000. */
for (const port of [3000, 3001, 3002]) {
  try {
    const pids = execSync(`lsof -ti:${port}`, { encoding: "utf8" }).trim();
    if (!pids) {
      continue;
    }
    for (const pid of pids.split("\n")) {
      const n = Number(pid);
      if (Number.isFinite(n) && n !== process.pid) {
        try {
          process.kill(n, "SIGKILL");
        } catch {
          /* already exited */
        }
      }
    }
  } catch {
    /* port not in use */
  }
}
