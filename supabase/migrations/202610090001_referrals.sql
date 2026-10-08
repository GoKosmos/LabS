-- Apply after the profiles migration. Registration-time attribution only.
alter table public.profiles
  add column referrer_id uuid references public.profiles(id) on delete set null,
  add constraint profiles_no_self_referral check (referrer_id is distinct from id);
create index profiles_referrer_idx on public.profiles (referrer_id);

-- A user can supply a referral code at signup, but cannot change attribution
-- with later metadata or profile updates. Only existing users can be referrers.
create or replace function public.create_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  referral text := new.raw_user_meta_data ->> 'referrer_id';
  inviter uuid;
begin
  if referral ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    select id into inviter from public.profiles
    where id = referral::uuid and id <> new.id;
  end if;
  insert into public.profiles (id, display_name, referrer_id)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), inviter);
  return new;
end;
$$;
revoke all on function public.create_user_profile() from public;

-- Keep the existing RLS and display_name-only update grant unchanged.
-- Historical accounts are deliberately not attributed from mutable metadata.
