-- Adds the "Sunburn County" and "Trial Racer" browser games to the portfolio. Idempotent: each is skipped if a project with that title exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
-- Both repositories are private, so repo_url is left empty.
insert into public.projects (title, description, tags, live_url, image_url, is_published, sort_order)
select
  'Sunburn County',
  'An open-world crime sandbox in the browser, built on Three.js: a Miami-style island with drivable traffic, pedestrians, a five-star police wanted system and a three-job mission chain. Characters run on Mixamo rigs with retargeted animations, and cars, buildings and props come from CC BY Sketchfab packs, credited in game. It is tuned to an early-2000s GPU budget (about 60 draw calls and 120k triangles a frame) with merged city chunks, instanced props and blob shadows. It runs on an Oracle Cloud server behind Caddy, and every git branch deploys to its own preview through GitHub Actions.',
  array['Three.js', 'JavaScript', 'WebGL', 'Game Dev', 'Oracle Cloud', 'GitHub Actions']::text[],
  'https://sunburn-county.duckdns.org/',
  'https://kalusartem.github.io/images/sunburn-county.jpg',
  true,
  0
where not exists (select 1 from public.projects where title = 'Sunburn County');

insert into public.projects (title, description, tags, live_url, image_url, is_published, sort_order)
select
  'Trial Racer',
  'A 2D motorbike trials game in a single HTML file with its own physics: lean control and tricks such as the superman and no-hander over seeded, procedurally built terrain. It has three career paths (Trial, Motocross and Enduro) of ten levels each, bikes from 100 cc up, a secret bike for finishing every path, best times saved in the browser, and touch controls for phones. It runs on an Oracle Cloud server behind Caddy, and every git branch deploys to its own preview through GitHub Actions.',
  array['JavaScript', 'Canvas', 'Game Physics', 'Game Dev', 'Oracle Cloud', 'GitHub Actions']::text[],
  'https://trial-racer.duckdns.org/',
  'https://kalusartem.github.io/images/trial-racer.jpg',
  true,
  0
where not exists (select 1 from public.projects where title = 'Trial Racer');
