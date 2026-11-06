-- Lets the admin pick which projects appear on the home page (at most 3; the admin API enforces the cap).
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Idempotent. Until it runs, the site falls back to showing the 3 newest projects and the admin toggle fails to save.
alter table public.projects
  add column if not exists show_on_home boolean not null default false;

-- Initial picks: Car Market, HomeFinder and Dustfront.
update public.projects
set show_on_home = true
where id in (
  '0dd0b3c5-03a1-42c6-b9f2-29f3d177842c', -- Car Market
  '98c41b29-d3b0-40ba-91d7-856082da2938', -- HomeFinder
  'de2121f9-08b7-4545-be36-b4059c6b5edb'  -- Dustfront - FPS Game
);
