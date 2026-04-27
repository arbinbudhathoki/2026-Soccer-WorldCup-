import Link from "next/link";
import { ArrowRight, Calendar, Flag, Trophy } from "lucide-react";
import { GoldenBootStory } from "@/components/GoldenBootStory";
import { HostCitiesMiniMap } from "@/components/HostCitiesMiniMap";
import { LegendPick } from "@/components/LegendPick";
import { WorldCupCountdown } from "@/components/WorldCupCountdown";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="glass-panel rounded-3xl p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Trophy className="h-4 w-4" aria-hidden />
          World Cup Mode
        </div>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
          History, data, and{" "}
          <span className="text-neon">2026 predictions</span> in one hub.
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Explore 2014–2022 finals, then lock in your scorelines for the
          48-team tournament in North America.
        </p>
        <p className="mt-3 text-base text-zinc-300">
          (Will Messi play this 2026 World Cup?)
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-pitch shadow-neon transition hover:bg-neon-dim"
          >
            Open dashboard
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/songs"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-neon/40 hover:text-white"
          >
            World Cup songs &amp; voting
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <WorldCupCountdown />
      <HostCitiesMiniMap />

      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
          <Calendar className="h-4 w-4" aria-hidden />
          <time dateTime="2026-06-11">June 11</time>
          <span className="text-neon/60">–</span>
          <time dateTime="2026-07-19">July 19, 2026</time>
        </div>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Three countries. Sixteen cities. One unforgettable summer.
        </h2>
        <p className="mt-4 text-base font-medium text-white md:text-lg">
          The{" "}
          <a
            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline decoration-neon/50 underline-offset-[3px] transition hover:text-neon hover:decoration-neon"
          >
            FIFA World Cup 2026™
          </a>{" "}
          runs{" "}
          <span className="text-neon">39 days</span> from{" "}
          <time dateTime="2026-06-11">Thursday, June 11</time> through{" "}
          <time dateTime="2026-07-19">Sunday, July 19</time>—the first
          men&apos;s tournament in North America since 1994, and the first
          ever with{" "}
          <span className="text-neon">48 national teams</span> battling across{" "}
          <span className="text-neon">104 matches</span>.
        </p>
        <div className="mt-6 space-y-4 text-sm text-zinc-300 md:text-base">
          <p>
            Picture it: opening night in Mexico City, coast-to-coast drama in
            the United States and Canada, knockout rounds that turn stadiums
            into cauldrons of noise, and a final that crowns a champion on U.S.
            soil. Whether you&apos;re tracking every group or living for one
            dream fixture, this is the summer global football takes over the
            continent.
          </p>
          <p>
            The story starts{" "}
            <time dateTime="2026-06-11">June 11, 2026</time> and doesn&apos;t
            let up until the last whistle on{" "}
            <time dateTime="2026-07-19">July 19, 2026</time>. Clear the
            calendar—history&apos;s about to kick off.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Context: popularity, reach, and pay
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          Men&apos;s vs Women&apos;s World Cup
        </h2>

        <div className="mt-6 space-y-4 text-sm text-zinc-300 md:text-base">
          <p>
            The men&apos;s FIFA World Cup has existed since 1930, while the
            Women&apos;s World Cup began in 1991. That longer timeline gave the
            men&apos;s tournament more time to build global audiences, media
            rights value, and commercial ecosystems.
          </p>
          <p>
            Today, when people say the men&apos;s game is bigger, they usually
            mean current audience and revenue size: larger TV contracts, higher
            sponsorship totals, and stronger ticket demand in many markets.
          </p>
          <p>
            Athlete pay is typically linked to money generated by leagues and
            tournaments. Historically, men&apos;s competitions have produced more
            revenue, which is why salaries and prize pools have often been
            higher.
          </p>
          <p>
            That does not mean men&apos;s football is better. Women&apos;s football
            is elite, highly competitive, and growing quickly, with recent
            Women&apos;s World Cups setting major viewership milestones and closing
            the commercial gap over time.
          </p>
        </div>
      </section>

      <GoldenBootStory />

      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
            <Flag className="h-3.5 w-3.5" aria-hidden />
            Personal note
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            Germany fan story
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
          Why Germany became my team
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
          My fascination with soccer is rooted in a childhood memory: the day my
          father gave me a Germany jersey. As I grew older and my interest in
          data and IT developed, I began to appreciate Germany for more than
          just the colors. I became a fan of their system-the tactical
          efficiency, the precision passing of Mesut Ozil, and the way they
          engineered victory. What started as a gift became a deep appreciation
          for the world&apos;s most technical sport.
        </p>
      </section>

      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Latest 2026 update snapshot
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          April 2026: tickets, final venue, and squad watch
        </h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-sm text-zinc-300 marker:text-neon md:text-base [&>li]:pl-2">
          <li>
            The tournament kicks off on{" "}
            <time dateTime="2026-06-11">June 11, 2026</time> and ends on{" "}
            <time dateTime="2026-07-19">July 19, 2026</time>, with{" "}
            <span className="text-neon">48 teams</span> and{" "}
            <span className="text-neon">104 matches</span> across host nations
            USA, Canada, and Mexico.
          </li>
          <li>
            The final is scheduled for{" "}
            <time dateTime="2026-07-19">July 19</time> at New York New Jersey
            Stadium (MetLife Stadium) in East Rutherford.
          </li>
          <li>
            Stadium watch: Estadio Azteca in Mexico City is set to become the
            first venue to host matches in three different men&apos;s World Cups,
            alongside modern host venues across North America.
          </li>
          <li>
            FIFA released another ticket batch on{" "}
            <time dateTime="2026-04-22">April 22, 2026</time>, with reports
            pointing to mixed demand depending on match and market.
          </li>
          <li>
            With the expanded field, more countries can qualify, creating extra
            room for debut teams, surprise runs, and underdog storylines.
          </li>
          <li>
            Player watch: reports suggest Lamine Yamal is expected to recover in
            time, Estevao faces uncertainty after a season-ending injury, and
            Lionel Messi&apos;s final decision remains a major storyline.
          </li>
          <li>
            Contingency rumors around last-minute replacement teams have been
            publicly downplayed by officials, who continue to emphasize sporting
            qualification.
          </li>
          <li>
            The event is also expected to be highly data-rich, with deeper
            match analytics and fan-facing tools such as predictions, voting,
            and interactive content throughout the tournament.
          </li>
        </ul>
      </section>

      <section className="glass-panel rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          Tickets &amp; pricing
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
          💸 Why are the prices so high?
        </h2>
        <p className="mt-4 text-sm text-zinc-300 md:text-base">
          If you&apos;ve been looking at tickets, you&apos;re likely seeing
          prices significantly higher than past World Cups. Analysts point to a
          few specific &quot;perfect storm&quot; factors:
        </p>
        <ol className="mt-6 list-decimal space-y-6 pl-5 text-sm text-zinc-300 marker:font-semibold marker:text-neon md:text-base [&>li]:pl-2">
          <li>
            <h3 className="font-semibold text-white">
              High demand &amp; &quot;bucket list&quot; factor
            </h3>
            <p className="mt-2">
              Since this is the first World Cup in North America since 1994,
              there is massive domestic demand. For many, this is a
              once-in-a-lifetime event, and fans are willing to pay a premium
              to be part of history on home soil.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-white">Premium venues</h3>
            <p className="mt-2">
              Most US matches are being held in massive, modern NFL stadiums
              (like SoFi, AT&amp;T, and NRG). These venues are designed with a
              high percentage of &quot;premium&quot; inventory—luxury suites,
              club seating, and VIP lounges—which drives up the average ticket
              price compared to traditional soccer-specific stadiums.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-white">
              Dynamic pricing &amp; resale
            </h3>
            <p className="mt-2">
              FIFA and official partners are increasingly using dynamic pricing
              (where costs fluctuate based on real-time demand). Additionally,
              the secondary resale market in the US is extremely aggressive;
              speculators and bots often drive prices well above face value
              immediately.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-white">Corporate allocations</h3>
            <p className="mt-2">
              A massive portion of the best seats are reserved for global
              sponsors, corporate partners, and hospitality packages. This
              shrinks the pool of &quot;affordable&quot; tickets available to
              the general public, pushing the remaining inventory into a
              bidding war.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-white">US market trends</h3>
            <p className="mt-2">
              Simply put, live sports in the US are generally more expensive
              than in Europe or South America. The World Cup pricing is being
              benchmarked against other high-tier US events like the Super Bowl
              or NBA Finals, which historically command thousands of dollars per
              seat.
            </p>
          </li>
        </ol>
      </section>
      <LegendPick />
      <p className="text-center text-xs text-zinc-500">
        Stack: Next.js · Tailwind · Supabase · Framer Motion
      </p>
    </main>
  );
}
