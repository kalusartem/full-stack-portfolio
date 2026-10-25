-- Adds the "Car Market" project to the portfolio. Idempotent: skipped if a project with this title exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
insert into public.projects (title, description, tags, live_url, repo_url, is_published, sort_order)
select
  'Car Market',
  'A full-stack used-car marketplace built with React 19, Vite, Tailwind v4, and Supabase Postgres with row level security, featuring VIN decoding via NHTSA vPIC, radius search by ZIP code, favorites, and buyer-seller messaging. It ships with light and dark themes and optional TOTP multi-factor authentication.',
  array['React', 'TypeScript', 'Supabase', 'Postgres + RLS', 'Tailwind CSS']::text[],
  'https://car-market-1fq.pages.dev/',
  'https://github.com/kalusartem/Car-Market',
  true,
  0
where not exists (select 1 from public.projects where title = 'Car Market');
