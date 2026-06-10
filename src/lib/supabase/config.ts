/** Returns false for empty, placeholder, or malformed Supabase URLs. */
export function isSupabaseConfigured(
  url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
): boolean {
  const trimmedUrl = url?.trim();
  const trimmedKey = key?.trim();
  if (!trimmedUrl || !trimmedKey) {
    return false;
  }

  try {
    const parsed = new URL(trimmedUrl);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSupabaseEnv(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!isSupabaseConfigured(url, key) || !url || !key) {
    return null;
  }
  return { url, key };
}
