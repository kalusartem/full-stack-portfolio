-- Adds "Diffbridge" to the portfolio. Idempotent: skipped if a project with this title or live URL exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
-- The repository is private, so repo_url is left empty. There is no slug column, so title/live_url is the key.
-- To feature it on the home page, switch "Show on home" on in /admin/projects (at most 3 projects).
insert into public.projects (title, description, tags, live_url, is_published, sort_order)
select
  'Diffbridge',
  'A Salesforce DevOps platform: org and git comparisons, deployments with automatic rollback, CI jobs, pipelines, backups and test monitoring. Two things set it apart. Smart tests: a deployment that changes no Apex runs without tests, even into production, and changed Apex runs only its related tests. Latest push wins: each org has a deployment queue whose policy can skip or cancel stale jobs when newer pushes arrive. A React and Vite UI sits on a Fastify API and worker over Postgres, with the diff engine, test planner and queue in a shared TypeScript core.',
  array['TypeScript', 'React', 'Fastify', 'Postgres', 'Salesforce', 'DevOps']::text[],
  'https://diffbridge.com/',
  true,
  0
where not exists (
  select 1 from public.projects
  where title ilike 'Diffbridge%' or live_url like 'https://diffbridge.com%' or live_url like 'https://www.diffbridge.com%'
);
