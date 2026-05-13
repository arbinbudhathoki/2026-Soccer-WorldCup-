# 2026 Soccer World Cup

Interactive World Cup website built with Next.js, focused on history, fan storytelling, and 2026 tournament predictions.

**Official tournament hub:** [FIFA World Cup 2026™ — Canada, Mexico, USA](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026)

## Screenshots

**Landing — World Cup mode:** history, 2026 predictions, and event snapshot.

![Landing: World Cup mode hero with neon UI](docs/screenshots/landing-world-cup-mode.png)

**Matchroom — historical finals:** year toggle (2014 / 2018 / 2022), podium, and final-night stats (Supabase-ready panel).

![Matchroom dashboard: finals energy and year selector](docs/screenshots/matchroom-dashboard.png)

**Dashboard — 2026 predictor & score sync:** match scorelines, daily completed scores from TheSportsDB.

![Dashboard: 2026 predictor and free API score sync](docs/screenshots/dashboard-predictor-sync.png)

## Live demo

**[Deploy to Vercel (one click)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farbinbudhathoki%2F2026-Soccer-WorldCup-)**

After the first production deploy, you will see a **production URL** on your Vercel project overview. Add a clickable **App** link in this README (same format as a normal markdown link) and set `NEXT_PUBLIC_SITE_URL` in Vercel to that exact URL (see `.env.example`) so link previews and Open Graph images stay correct on custom domains or stable Vercel URLs.

Example line you can add after you know the URL: `[open live site](https://<your-project>.vercel.app)`.

## Highlights

- World Cup themed homepage with modern glass/neon UI
- Historical tournament storytelling and stats
- Match prediction experience for the 2026 tournament (dashboard + per-fixture pages)
- Group-stage fixture browser with filters, and a Supabase-backed leaderboard when RPCs are installed
- Personal fan note section (Germany, Mesut Ozil inspiration)
- Built with reusable React components and Tailwind styling

## Latest 2026 Update Snapshot

- Tournament window: June 11 to July 19, 2026
- Format: 48 teams, 12 groups of four, 104 total matches
- Final venue: New York New Jersey Stadium (MetLife Stadium), East Rutherford
- Ticketing: additional batch released on April 22, 2026
- Storylines: player fitness/injury watch (Lamine Yamal, Estevao) and ongoing Messi status discussion

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Framer Motion

## Quick Start

1. Install dependencies:
   `npm install`
2. Create local environment file:
   `cp .env.example .env.local`
3. Start development server:
   `npm run dev`
4. Open in browser:
   `http://localhost:3000`

### Useful Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Run production build locally
- `npm run lint` - Run Next.js/ESLint checks
- `npm run typecheck` - Run TypeScript without emitting files (`tsconfig.typecheck.json` scopes `src/` so local `.next` artifacts do not affect CI)

### Database (Supabase)

After applying `supabase/schema.sql`, optional additive SQL lives in `supabase/migrations/` (for example `20260512_leaderboard_scoring.sql` is merged into the bottom of `schema.sql` for greenfield installs). The dashboard **Leaderboard** calls the `get_leaderboard` RPC; if you created the database before that function existed, run the migration file once in the Supabase SQL editor. To verify scoring locally, set a `matches` row to `status = 'finished'` with `home_score` / `away_score`, save a prediction for that `fixture_key`, then reload the dashboard so the leaderboard RPC runs.

## Continuous integration

GitHub Actions runs `npm run lint`, `npm run typecheck`, and `npm run build` on pushes and pull requests to `main` / `master` (see `.github/workflows/ci.yml`).

## Run Locally

1. Clone the repo:
   `git clone https://github.com/arbinbudhathoki/2026-Soccer-WorldCup-.git`
2. Open the project folder:
   `cd 2026-Soccer-WorldCup-`
3. Install dependencies:
   `npm install`
4. Start development server:
   `npm run dev`
5. Open in browser:
   `http://localhost:3000`

If the first screen still shows a **spinning trophy** instead of the **penalty vs keeper** scene, you are not on the latest code or Next is serving a stale cache. From the project folder run `git pull origin main`, delete the `.next` folder (`rm -rf .next`), then `npm run dev` again. Confirm with `git log -1 --oneline` — it should mention the penalty loader, not “initial trophy loading overlay”.

## Deployment (Vercel)

1. Use [the deploy link above](#live-demo) or go to [Vercel](https://vercel.com) and import this repository.
2. **Recommended:** in project **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your production URL (Vercel URL or custom domain) so link previews and metadata use a stable address.
3. Add optional Supabase keys from `.env.example` if you use that integration.
4. After deploy, paste the production URL into the **App** line in the [Live demo](#live-demo) section of this README.

## Repository

GitHub: [arbinbudhathoki/2026-Soccer-WorldCup-](https://github.com/arbinbudhathoki/2026-Soccer-WorldCup-)
