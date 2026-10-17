-- Apply after the referrals migration. Adds the self-description fields
-- shown on the «Образ Творца» page. Balance is intentionally not stored here:
-- it must only be changed server-side once payments are connected.
alter table public.profiles
  add column gender text not null default ''
    constraint profiles_gender_check check (gender in ('', 'female', 'male')),
  add column environment text not null default ''
    constraint profiles_environment_length check (char_length(environment) <= 1000),
  add column about text not null default ''
    constraint profiles_about_length check (char_length(about) <= 1000);

grant update (gender, environment, about) on public.profiles to authenticated;
