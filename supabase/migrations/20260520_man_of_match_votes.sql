-- Man of the Match fan poll (Messi / Ronaldo / Pogba / Neymar).

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
