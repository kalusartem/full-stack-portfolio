-- Adds "The Long Chart" to the portfolio. Idempotent: skipped if a project with this title or live URL exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
-- The repository is private, so repo_url is left empty. There is no slug column, so title/live_url is the key.
insert into public.projects (title, description, tags, live_url, is_published, sort_order)
select
  'The Long Chart',
  'A Bitcoin and S&P 500 dashboard in plain JavaScript with no build step. Bitcoin gets cycle-low multiples by halving era, a draggable all-time channel, a power-law fan, halving-cycle scenarios and a rainbow chart; the S&P 500 a log trend channel back to 1928, a year-over-year overlay and a 10-year projection fan. It also backtests about 225 rule-based ETF strategies month by month, picking the best on 2008-2016 and showing them on unseen later years, and has compound interest, mortgage, lease-vs-buy and retirement-spending calculators. Live prices come from a Cloudflare Pages Function cached at the edge, with bundled data as the offline fallback.',
  array['JavaScript', 'Data visualization', 'Backtesting', 'Cloudflare Pages']::text[],
  'https://thelongchart.pages.dev/',
  true,
  0
where not exists (
  select 1 from public.projects
  where title ilike 'The Long Chart%' or live_url like 'https://thelongchart.pages.dev%'
);
