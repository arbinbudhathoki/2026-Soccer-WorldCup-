"use client";

import { useEffect, useState } from "react";
import { LogIn, LogOut, Mail } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AuthPanel() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setConfigured(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setStatus("Add Supabase env keys to enable sign-in.");
      return;
    }
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("Enter your email.");
      return;
    }

    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: redirectTo },
    });

    setStatus(
      error
        ? error.message
        : "Check your inbox for the magic link.",
    );
  }

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setStatus("Signed out.");
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-zinc-500">
        Sign-in: set{" "}
        <span className="font-mono text-zinc-400">NEXT_PUBLIC_SUPABASE_*</span>{" "}
        in <span className="font-mono text-zinc-400">.env.local</span>
      </div>
    );
  }

  if (userEmail) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neon/25 bg-neon/5 px-4 py-3">
        <span className="text-xs text-zinc-400">
          Signed in as{" "}
          <span className="font-semibold text-white">{userEmail}</span>
        </span>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-heat/40 hover:text-heat"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden />
          Sign out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={sendMagicLink}
      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center"
    >
      <label className="flex flex-1 items-center gap-2">
        <Mail className="h-4 w-4 shrink-0 text-neon" aria-hidden />
        <span className="sr-only">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-neon/50"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-4 py-2 text-xs font-semibold text-pitch transition hover:bg-neon-dim"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden />
        Magic link
      </button>
      {status ? (
        <p className="w-full text-xs text-zinc-400 sm:order-last" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
