-- Batch scoring + public leaderboard RPC (run after base schema.sql).

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
