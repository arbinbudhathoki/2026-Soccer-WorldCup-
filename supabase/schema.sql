-- World Cup Soccer App — core schema (Supabase / Postgres 15+)
-- Supports 48-team FIFA World Cup 2026™ (12 groups, 104 matches total).

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  points_total integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_points_idx on public.profiles (points_total desc);

-- ---------------------------------------------------------------------------
-- Teams (group stage + resolved playoff placeholders)
-- ---------------------------------------------------------------------------
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid (),
  tournament_year integer not null default 2026,
  fifa_country_code text,
  name text not null,
  short_name text,
  group_letter char(1),
  group_position smallint,
  is_placeholder boolean not null default false,
  confederation text,
  created_at timestamptz not null default now (),
  constraint teams_group_letter_chk check (
    group_letter is null
    or group_letter between 'A' and 'L'
  ),
  constraint teams_group_position_chk check (
    group_position is null
    or (
      group_position between 1
      and 4
    )
  ),
  constraint teams_group_slot_unique unique (tournament_year, group_letter, group_position)
);

create index if not exists teams_tournament_group_idx on public.teams (tournament_year, group_letter);

comment on table public.teams is 'Squads / country rows. For 2026, playoff slots may be placeholders until March 2026.';

-- ---------------------------------------------------------------------------
-- Matches (group + full knockout path for 48-team format)
-- ---------------------------------------------------------------------------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid (),
  tournament_year integer not null default 2026,
  stage text not null,
  group_letter char(1),
  matchday smallint,
  bracket_round smallint,
  bracket_slot text,
  match_number integer,
  home_team_id uuid references public.teams (id) on delete restrict,
  away_team_id uuid references public.teams (id) on delete restrict,
  home_score integer,
  away_score integer,
  kickoff_at timestamptz,
  venue text,
  -- Mirrors `GroupStageFixture.id` in src/data/worldcup-history.ts (e.g. 2026-A-M1-1).
  fixture_key text,
  status text not null default 'scheduled',
  external_fifa_match_code text,
  winner_team_id uuid references public.teams (id),
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint matches_stage_chk check (
    stage in (
      'group',
      'round_of_32',
      'round_of_16',
      'quarter_final',
      'semi_final',
      'third_place',
      'final'
    )
  ),
  constraint matches_status_chk check (
    status in ('scheduled', 'live', 'finished', 'postponed', 'void')
  ),
  constraint matches_group_letter_chk check (
    group_letter is null
    or group_letter between 'A' and 'L'
  ),
  constraint matches_group_stage_chk check (
    (
      stage = 'group'
      and group_letter is not null
      and matchday between 1
      and 3
    )
    or (
      stage <> 'group'
      and matchday is null
    )
  )
);

create index if not exists matches_tournament_stage_idx on public.matches (tournament_year, stage);

create index if not exists matches_group_idx on public.matches (tournament_year, group_letter, matchday);

comment on table public.matches is '104 matches for WC2026: 72 group + 32 R32 + 16 R16 + 8 QF + 4 SF + third + final (adjust counts if FIFA template changes).';

-- ---------------------------------------------------------------------------
-- Predictions (per user per match)
-- ---------------------------------------------------------------------------
create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid (),
  user_id uuid not null references public.profiles (id) on delete cascade,
  match_id uuid not null references public.matches (id) on delete cascade,
  home_goals integer not null,
  away_goals integer not null,
  points_earned integer not null default 0,
  locked_at timestamptz,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now (),
  constraint predictions_scores_chk check (
    home_goals >= 0
    and away_goals >= 0
  ),
  constraint predictions_unique_user_match unique (user_id, match_id)
);

create index if not exists predictions_user_idx on public.predictions (user_id);

create index if not exists predictions_match_idx on public.predictions (match_id);

comment on table public.predictions is 'Score predictions; unique per user/match. Lock when match goes live or at kickoff.';

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

alter table public.predictions enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;

drop policy if exists "profiles_update_own" on public.profiles;

drop policy if exists "predictions_select_own" on public.predictions;

drop policy if exists "predictions_insert_own" on public.predictions;

drop policy if exists "predictions_update_own" on public.predictions;

-- Profiles: each user reads/updates only their row
create policy "profiles_select_own" on public.profiles for
select
  using (auth.uid () = id);

create policy "profiles_update_own" on public.profiles for
update using (auth.uid () = id);

-- Predictions: each user manages their own rows
create policy "predictions_select_own" on public.predictions for
select
  using (auth.uid () = user_id);

create policy "predictions_insert_own" on public.predictions for
insert
with
  check (auth.uid () = user_id);

create policy "predictions_update_own" on public.predictions for
update using (auth.uid () = user_id);

-- Optional: allow leaderboard read of display_name + points via a secure view later

-- ---------------------------------------------------------------------------
-- Auth trigger: create profile on signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user () returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      split_part(coalesce(new.email, ''), '@', 1),
      'fan'
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users for each row
execute function public.handle_new_user ();

-- ---------------------------------------------------------------------------
-- Updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at () returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at before
update on public.profiles for each row
execute function public.set_updated_at ();

drop trigger if exists predictions_set_updated_at on public.predictions;

create trigger predictions_set_updated_at before
update on public.predictions for each row
execute function public.set_updated_at ();

drop trigger if exists matches_set_updated_at on public.matches;

create trigger matches_set_updated_at before
update on public.matches for each row
execute function public.set_updated_at ();

-- ---------------------------------------------------------------------------
-- Public read for schedule data (tune later for admin-only writes)
-- ---------------------------------------------------------------------------
alter table public.teams enable row level security;

alter table public.matches enable row level security;

drop policy if exists "teams_select_public" on public.teams;

drop policy if exists "matches_select_public" on public.matches;

create policy "teams_select_public" on public.teams for
select
  using (true);

create policy "matches_select_public" on public.matches for
select
  using (true);

-- ---------------------------------------------------------------------------
-- World Cup songs — public vote tallies (optional fan poll)
-- ---------------------------------------------------------------------------
create table if not exists public.world_cup_song_votes (
  song_id text primary key,
  vote_count integer not null default 0,
  constraint world_cup_song_votes_count_chk check (vote_count >= 0)
);

alter table public.world_cup_song_votes enable row level security;

drop policy if exists "world_cup_song_votes_select_public" on public.world_cup_song_votes;

create policy "world_cup_song_votes_select_public" on public.world_cup_song_votes for
select
  using (true);

create or replace function public.increment_world_cup_song_vote (p_song_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.world_cup_song_votes (song_id, vote_count)
  values (p_song_id, 1)
  on conflict (song_id) do update
  set vote_count = world_cup_song_votes.vote_count + 1;
end;
$$;

grant execute on function public.increment_world_cup_song_vote (text) to anon;

grant execute on function public.increment_world_cup_song_vote (text) to authenticated;

-- ---------------------------------------------------------------------------
-- Legend pick votes (Messi / Ronaldo / Neymar)
-- ---------------------------------------------------------------------------
create table if not exists public.legend_pick_votes (
  legend_id text primary key,
  vote_count integer not null default 0,
  constraint legend_pick_votes_id_chk check (legend_id in ('Messi', 'Ronaldo', 'Neymar')),
  constraint legend_pick_votes_count_chk check (vote_count >= 0)
);

alter table public.legend_pick_votes enable row level security;

drop policy if exists "legend_pick_votes_select_public" on public.legend_pick_votes;

create policy "legend_pick_votes_select_public" on public.legend_pick_votes for
select
  using (true);

create or replace function public.increment_legend_pick_vote (p_legend_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_legend_id not in ('Messi', 'Ronaldo', 'Neymar') then
    raise exception 'invalid legend_id';
  end if;

  insert into public.legend_pick_votes (legend_id, vote_count)
  values (p_legend_id, 1)
  on conflict (legend_id) do update
  set vote_count = legend_pick_votes.vote_count + 1;
end;
$$;

grant execute on function public.increment_legend_pick_vote (text) to anon;

grant execute on function public.increment_legend_pick_vote (text) to authenticated;

-- ---------------------------------------------------------------------------
-- Man of the Match fan poll (Messi / Ronaldo / Pogba / Neymar)
-- ---------------------------------------------------------------------------
create table if not exists public.man_of_match_votes (
  player_id text primary key,
  vote_count integer not null default 0,
  constraint man_of_match_votes_id_chk check (
    player_id in ('Messi', 'Ronaldo', 'Pogba', 'Neymar')
  ),
  constraint man_of_match_votes_count_chk check (vote_count >= 0)
);

alter table public.man_of_match_votes enable row level security;

drop policy if exists "man_of_match_votes_select_public" on public.man_of_match_votes;

create policy "man_of_match_votes_select_public" on public.man_of_match_votes for
select
  using (true);

create or replace function public.increment_man_of_match_vote (p_player_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_player_id not in ('Messi', 'Ronaldo', 'Pogba', 'Neymar') then
    raise exception 'invalid player_id';
  end if;

  insert into public.man_of_match_votes (player_id, vote_count)
  values (p_player_id, 1)
  on conflict (player_id) do update
  set vote_count = man_of_match_votes.vote_count + 1;
end;
$$;

grant execute on function public.increment_man_of_match_vote (text) to anon;

grant execute on function public.increment_man_of_match_vote (text) to authenticated;

-- ---------------------------------------------------------------------------
-- Additive migrations (safe for databases created before fixture_key existed)
-- ---------------------------------------------------------------------------
alter table public.matches add column if not exists fixture_key text;

create unique index if not exists matches_fixture_key_uidx on public.matches (fixture_key);

comment on column public.matches.fixture_key is 'Stable app id for seed + forms; aligns with TS fixture ids.';

-- ---------------------------------------------------------------------------
-- Batch prediction scoring + public leaderboard RPC
-- (duplicate of supabase/migrations/20260512_leaderboard_scoring.sql)
-- ---------------------------------------------------------------------------
create or replace function public.refresh_prediction_points ()
  returns json
  language plpgsql
  security definer
  set search_path = public
as $$
declare
  n int;
begin
  update public.predictions pr
  set points_earned = calc.pts
  from (
    select
      pr2.id,
      case
        when m.status = 'finished'
        and m.home_score is not null
        and m.away_score is not null then case
          when pr2.home_goals = m.home_score
          and pr2.away_goals = m.away_score then 5
          when (pr2.home_goals - pr2.away_goals) = (m.home_score - m.away_score) then 3
          when sign((pr2.home_goals - pr2.away_goals)::numeric) = sign((m.home_score - m.away_score)::numeric) then 1
          else 0
        end
        else 0
      end as pts
    from public.predictions pr2
    inner join public.matches m on m.id = pr2.match_id
  ) calc
  where
    pr.id = calc.id
    and pr.points_earned is distinct from calc.pts;

  get diagnostics n = row_count;

  update public.profiles p
  set points_total = coalesce(
    (
      select sum(pr.points_earned)::integer
      from public.predictions pr
      where pr.user_id = p.id
    ),
    0
  );

  return json_build_object(
    'predictions_rows_updated',
    n,
    'profiles_refreshed',
    (select count(*)::int from public.profiles)
  );
end;
$$;

create or replace function public.get_leaderboard (p_limit integer default 50)
  returns table (
    rank bigint,
    user_id uuid,
    display_name text,
    points_total integer
  )
  language plpgsql
  security definer
  set search_path = public
as $$
declare
  lim int := least(coalesce(p_limit, 50), 200);
  _discard json;
begin
  select public.refresh_prediction_points () into _discard;

  return query
  select
    row_number() over (
      order by
        p.points_total desc,
        p.id
    )::bigint as rank,
    p.id as user_id,
    p.display_name,
    p.points_total
  from public.profiles p
  order by
    p.points_total desc,
    p.id
  limit lim;
end;
$$;

revoke all on function public.refresh_prediction_points () from public;

revoke all on function public.get_leaderboard (integer) from public;

grant execute on function public.get_leaderboard (integer) to anon;

grant execute on function public.get_leaderboard (integer) to authenticated;
