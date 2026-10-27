-- Adds the "HomeFinder" project to the portfolio. Idempotent: skipped if a project with this title exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
insert into public.projects (title, description, tags, live_url, image_url, is_published, sort_order)
select
  'HomeFinder',
  'A Zillow-style home search on MLS data built with Next.js 15, React 19 and Leaflet: a synced map and list with price pins, draw-to-search, filters, saved homes and side-by-side compare, a mortgage payment calculator and tour requests with consent records, in English, Russian and Spanish. It talks to any RESO Web API feed (Bridge, Trestle, Spark) or SimplyRETS and runs on Cloudflare Workers through OpenNext.',
  array['Next.js', 'React', 'TypeScript', 'Leaflet', 'RESO Web API', 'Cloudflare Workers']::text[],
  'https://homefinder-mls.kalusartem.workers.dev/',
  'https://kalusartem.github.io/images/homefinder.jpg',
  true,
  0
where not exists (select 1 from public.projects where title = 'HomeFinder');
