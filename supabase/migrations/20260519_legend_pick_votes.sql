-- Legend pick fan votes (Messi / Ronaldo / Neymar) — mirrors world_cup_song_votes pattern.

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
