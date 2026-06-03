import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ExternalLink,
  ShieldAlert,
  Ticket,
} from "lucide-react";
import {
  FIFA_OFFICIAL_TICKETS_URL,
  GO_TICKETS_WORLD_CUP_URL,
  ticketHighlightFixtures,
} from "@/data/ticket-sources";

export const metadata = {
  title: "Tickets",
  description:
    "Find FIFA World Cup 2026 tickets — official FIFA sales and trusted resale options with pricing context.",
};

export default function TicketsPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10 md:px-8"
    >
      <header>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-heat"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Home
        </Link>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Ticket className="h-3.5 w-3.5" aria-hidden />
          Ticket hub
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
          World Cup 2026 <span className="text-neon">tickets</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Prices are steep — this page helps you compare where to buy. Start with
          FIFA&apos;s official portal for face-value phases; use verified resale
          only when official inventory is gone or you need a specific match fast.
        </p>
      </header>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Recommended order
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            href={FIFA_OFFICIAL_TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-neon/40 bg-neon/10 p-6 transition hover:border-neon hover:bg-neon/15"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-neon">
              1 · Official (best first)
            </p>
            <p className="mt-3 text-xl font-semibold text-white">
              FIFA ticketing portal
            </p>
            <p className="mt-2 flex-1 text-sm text-zinc-300">
              Ballot phases, official hospitality, and face-value releases when
              batches open. Always check here before paying resale markup.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neon group-hover:text-white">
              Open FIFA tickets
              <ExternalLink className="h-4 w-4" aria-hidden />
            </span>
          </a>

          <a
            href={GO_TICKETS_WORLD_CUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-white/15 bg-black/30 p-6 transition hover:border-heat/40 hover:bg-black/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              2 · Marketplace
            </p>
            <p className="mt-3 text-xl font-semibold text-white">
              Browse on GoTickets
            </p>
            <p className="mt-2 flex-1 text-sm text-zinc-400">
              Lists group stage through the final across US, Mexico, and Canada
              venues — useful when official sales are sold out or you need seats
              for a fixed date.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heat group-hover:text-white">
              View FIFA World Cup listings
              <ExternalLink className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 md:p-6">
        <div className="flex gap-3">
          <ShieldAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
            aria-hidden
          />
          <div className="text-sm text-zinc-300">
            <p className="font-semibold text-amber-100">Before you buy resale</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
              <li>
                GoTickets and similar sites are{" "}
                <strong className="text-zinc-300">not</strong> run by FIFA — they
                aggregate seller inventory and prices often exceed face value.
              </li>
              <li>
                This app does not process payments or hold tickets; you checkout
                on the external site.
              </li>
              <li>
                Compare total price (fees, delivery, currency) and read the
                site&apos;s buyer guarantee before paying.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white md:text-2xl">
          Matches fans search first
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Open a fixture on GoTickets and filter by date or city — inventory
          changes quickly (many listings show only a small % left).
        </p>
        <ul className="mt-6 space-y-3">
          {ticketHighlightFixtures.map((f) => (
            <li
              key={f.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-white">{f.label}</p>
                <p className="text-sm text-zinc-400">
                  {f.date} · {f.venue}
                </p>
                {f.note ? (
                  <p className="mt-1 text-xs text-neon">{f.note}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {f.id !== "final" ? (
                  <Link
                    href={`/matches/${f.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-neon/40 hover:text-white"
                  >
                    Fixture details
                  </Link>
                ) : null}
                <a
                  href={GO_TICKETS_WORLD_CUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-neon px-3 py-1.5 text-xs font-semibold text-pitch transition hover:bg-neon-dim"
                >
                  Find tickets
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-8">
        <h2 className="text-lg font-semibold text-white">
          Why tickets feel expensive
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          North America demand, NFL-style premium seating, corporate allocations,
          and aggressive resale all push averages up — same story as on our{" "}
          <Link href="/#tickets-pricing" className="text-neon underline underline-offset-2">
            homepage breakdown
          </Link>
          .
        </p>
        <Link
          href="/matches"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neon transition hover:text-white"
        >
          Browse all 2026 fixtures
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </main>
  );
}
