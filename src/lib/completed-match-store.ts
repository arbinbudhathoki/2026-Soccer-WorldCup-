import { promises as fs } from "fs";
import path from "path";
import type { CompletedMatch } from "@/lib/free-football-api";

const storePath = path.join(process.cwd(), "src/data/completed-matches.json");

async function ensureStoreFile() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, "[]\n", "utf8");
  }
}

export async function readStoredCompletedMatches(): Promise<CompletedMatch[]> {
  await ensureStoreFile();
  const raw = await fs.readFile(storePath, "utf8");
  const data = JSON.parse(raw) as CompletedMatch[];
  return data.sort((a, b) => b.date.localeCompare(a.date));
}

export async function upsertCompletedMatches(
  incoming: CompletedMatch[]
): Promise<{ added: number; total: number }> {
  const existing = await readStoredCompletedMatches();
  const byId = new Map(existing.map((match) => [match.id, match]));
  let added = 0;

  for (const match of incoming) {
    if (!byId.has(match.id)) {
      added += 1;
    }
    byId.set(match.id, match);
  }

  const next = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date));
  await fs.writeFile(storePath, `${JSON.stringify(next, null, 2)}\n`, "utf8");

  return { added, total: next.length };
}
