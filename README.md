2026 Soccer World Cup

Interactive World Cup experience built with Next.js, focused on football history, fan storytelling, live-style predictions, and the road to the 2026 FIFA World Cup.

Official tournament hub:
FIFA World Cup 2026™ — Canada, Mexico, USA

Screenshots
Landing — World Cup Experience

Modern neon-inspired homepage featuring tournament history, 2026 predictions, and immersive World Cup visuals.

Matchroom — Historical Finals

Interactive finals dashboard with:

year switching (2014 / 2018 / 2022)
podium highlights
final-night stats
Supabase-ready match panels

Dashboard — Predictions & Live Score Sync

Prediction dashboard with:

scoreline predictions
featured fixtures
leaderboard integration
daily score syncing from TheSportsDB

Live Demo
Deploy Instantly on Vercel

Deploy to Vercel (One Click)

After deployment:

Copy your production URL from Vercel.
Add it as:
[Open Live Site](https://your-project.vercel.app)
Set:
NEXT_PUBLIC_SITE_URL=

inside Vercel Environment Variables so Open Graph previews and metadata stay correct.

Features
2026 Prediction System
Match prediction experience with:
dashboard predictor
per-match prediction pages
Prediction locking system prevents edits:
after kickoff
during live matches
after full time
Automatic page revalidation after prediction updates
Leaderboard & Scoring

Supabase-powered leaderboard system with scoring logic:

5 points → exact prediction
3 points → correct result
1 point → partial accuracy

Includes:

refresh_prediction_points()
get_leaderboard() RPC functions
Fixtures Experience
Group-stage fixture browser
Group filters
Matchday filters
Dedicated match pages:
/matches/[fixtureKey]
Loader Redesign

The opening loader was redesigned from a simple spinning trophy into a cinematic football penalty scene featuring:

player animation
ball movement
diving goalkeeper
glowing goal frame

Visual updates include:

zinc/black backdrop
neon cyan + amber glow effects
glassmorphism card
brighter turf strip
“Opening Kick” label
UI & Design
Modern glass/neon World Cup theme
Responsive layouts
Framer Motion animations
Reusable React components
Tailwind CSS styling
Fan Storytelling

Includes personal football storytelling and historical World Cup inspiration sections.

Latest 2026 Tournament Snapshot
Tournament Dates: June 11 – July 19, 2026
Format:
48 teams
12 groups
104 matches
Final Venue:
New York New Jersey Stadium (MetLife Stadium)
Ongoing storylines:
player fitness watch
emerging stars
Messi tournament discussion
Tech Stack
Next.js
React
TypeScript
Tailwind CSS
Supabase
Framer Motion
