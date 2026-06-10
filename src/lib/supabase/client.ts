import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";

export function createBrowserSupabaseClient() {
  const env = getSupabaseEnv();
  if (!env) {
    return null;
  }

  try {
    return createBrowserClient(env.url, env.key);
  } catch {
    return null;
  }
}
