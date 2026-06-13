-> 2026 Soccer World Cup ⚽

-> This is just the prediction and documents gathered from the real offical FIFA website and some from the football websites
Interactive World Cup experience built with Next.js, focused on football history, fan storytelling, live-style predictions, and the road to the 2026 FIFA World Cup.

Official tournament hub:
FIFA World Cup 2026™ — Canada, Mexico, USA

Screenshots of the Website
-> Landing — World Cup Mode

-> History, stats, and 2026 predictions in one cinematic hub with neon UI styling.

-> Opening Loader — Penalty Scene Animation

-> A redesigned loading experience replacing the old spinning trophy with a football penalty showdown.

-> striker vs goalkeeper animation
-> glowing goal frame
-> cinematic neon lighting
-> dark stadium atmosphere

-> Matchroom — Historical Finals

-> Interactive World Cup finals viewer featuring:

-> year toggle (2014 / 2018 / 2022)
podium highlights
match stats panel
Supabase-ready layout

Dashboard — Predictions & Live Score Sync

Full prediction system with:

2026 match predictions
score tracking
leaderboard integration
API-based live score sync

🚀 Live Demo
One-click deploy

Deploy to Vercel

After deployment:

Copy your production URL from Vercel
Set NEXT_PUBLIC_SITE_URL in environment variables
✨ Features
🧠 Prediction System
Match-by-match prediction flow
Dashboard + fixture-level prediction UI
Automatic prediction locking:
after kickoff
during live matches
after match ends
🏆 Leaderboard (Supabase)

Scoring system:

5 pts → exact score
3 pts → correct result
1 pt → partial correctness

Includes RPC functions:

refresh_prediction_points()
get_leaderboard()
📅 Fixtures System
Group-stage browsing
Matchday filters
Individual match pages:
/matches/[fixtureKey]
🎬 Loader System (NEW)

Replaced old trophy spinner with a cinematic football scene:

Visual Upgrade:
black / zinc stadium background
cyan + amber neon glow
glass card UI overlay
animated penalty setup
“Opening Kick” label
📊 Latest Tournament Info (2026)
Dates: June 11 – July 19, 2026
Format:
48 teams
12 groups
104 matches
Final Venue:
MetLife Stadium (New York / New Jersey)
🛠 Tech Stack
Next.js
React
TypeScript
Tailwind CSS
Supabase
Framer Motion
