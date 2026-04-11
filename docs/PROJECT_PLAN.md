# World Cup Soccer App — Project Plan

## Vision

A fan-facing web app for FIFA World Cup history (2014, 2018, 2022) and an interactive **2026 prediction game** where signed-in users submit scorelines, earn points after results are known, and climb a leaderboard.

## Tech stack

| Layer | Choice | Role |
| --- | --- | --- |
| Framework | **Next.js 15 (App Router)** | Routing, server actions, SEO-friendly pages |
| Styling | **Tailwind CSS** | Responsive layout, design tokens, dark “sports mode” |
| Icons | **Lucide React** | Consistent iconography |
| Motion | **Framer Motion** | Historical hero transitions |
| Data / auth | **Supabase** | Postgres, Row Level Security, Auth (email/OAuth) |
| Hosting | Vercel + Supabase (recommended) | Edge-friendly Next deployment |

## Repository layout

```
src/
  app/                 # App Router routes & layouts
    layout.tsx
    page.tsx           # Marketing / entry
    globals.css
    dashboard/
      page.tsx         # Main fan dashboard
      actions.ts       # Server actions (predictions, scoring hooks)
  components/          # Presentational + client islands
  data/                # Seed + static reference data (versioned in git)
  lib/supabase/        # Browser + server Supabase clients
supabase/
  schema.sql           # Canonical DDL (+ RLS starter)
docs/
  PROJECT_PLAN.md      # This document
```

## Core features (phased)

### Phase A — Foundation (done in scaffold)

- Next.js + Tailwind + TypeScript strict mode
- `schema.sql` for teams, matches, profiles, predictions
- Static `worldcup-history.ts` for 2014/2018/2022 summaries + 2026 group matrix
- Dashboard UI shell: historical hero + predictor card

### Phase B — Supabase integration

- Create Supabase project; run `schema.sql` in SQL editor or CLI
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Sync `teams` / `matches` from `worldcup-history.ts` via seed script or CSV import
- Wire Auth: magic link or OAuth; create `profiles` row on signup (trigger)

### Phase C — Predictions & points

- **Submit**: `predictions` row per `(user_id, match_id)` unique
- **Lock**: disallow edits after `matches.kickoff_at` (or `status = 'live'|'finished'`)
- **Score**: after final result, compare to actual; award points (e.g. exact result > correct diff > correct winner)
- **Leaderboard**: materialized view or periodic aggregation on `profiles.points_total`

### Phase D — 48-team tournament shape

- **Group stage**: 12 groups × 4 teams × 3 matchdays = 72 fixtures (stored with `stage = 'group'`, `group_letter`, `matchday`)
- **Knockout**: Round of 32 → R16 → QF → SF → third place → final (`bracket_slot`, `winner_to_slot` optional for later rounds)
- **Placeholders**: playoff teams stored with `is_placeholder = true` until March 2026; swap `team_id` on resolution without changing `matches.id` (stable prediction foreign keys)

### Phase E — Product polish

- Match detail pages, filters by group / date
- Push or email digests (optional, via Supabase Edge Functions)
- Admin tool to import official FIFA schedule JSON when released

## Risks & mitigations

- **Schedule changes**: keep `external_fifa_match_code` nullable; never reuse `matches.id`
- **RLS complexity**: start restrictive on `predictions` / `profiles`; public read for `matches`/`teams` only
- **Rate limits on free tier**: cache public match list with `revalidateTag`

## Success criteria (MVP)

- User can sign in, see 2026 group fixtures, submit at least one prediction, and see it persist after refresh
- Historical tab shows 2014/2018/2022 facts accurately
- Schema supports full 104-match 2026 bracket without structural migration
