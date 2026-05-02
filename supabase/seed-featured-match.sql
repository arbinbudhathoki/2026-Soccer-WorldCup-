-- Featured opener for the dashboard predictor (`featuredPredictionFixture` → Mexico vs South Africa).
-- Requires `schema.sql` applied. Idempotent: safe to run more than once.

insert into public.teams (tournament_year, name, fifa_country_code, group_letter, group_position)
values
  (2026, 'Mexico', 'MEX', 'A', 1),
  (2026, 'South Africa', 'RSA', 'A', 2)
on conflict (tournament_year, group_letter, group_position)
do update set
  name = excluded.name,
  fifa_country_code = excluded.fifa_country_code;

insert into public.matches (
  fixture_key,
  tournament_year,
  stage,
  group_letter,
  matchday,
  home_team_id,
  away_team_id,
  venue,
  status,
  kickoff_at
)
select
  '2026-A-M1-1',
  2026,
  'group',
  'A',
  1,
  home.id,
  away.id,
  'Mexico City — Estadio Azteca',
  'scheduled',
  null::timestamptz
from (
  select id from public.teams
  where tournament_year = 2026 and group_letter = 'A' and group_position = 1
  limit 1
) home
cross join lateral (
  select id from public.teams
  where tournament_year = 2026 and group_letter = 'A' and group_position = 2
  limit 1
) away
on conflict (fixture_key) do update set
  home_team_id = excluded.home_team_id,
  away_team_id = excluded.away_team_id,
  venue = excluded.venue,
  status = excluded.status,
  kickoff_at = excluded.kickoff_at,
  tournament_year = excluded.tournament_year,
  stage = excluded.stage,
  group_letter = excluded.group_letter,
  matchday = excluded.matchday;
