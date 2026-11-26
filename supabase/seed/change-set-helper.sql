-- Adds the "Change Set Helper" Chrome extension to the portfolio. Idempotent: skipped if a project with this title exists.
-- NOT applied automatically: run it yourself in the Supabase SQL editor (project: portfolio, schema: public).
-- Columns follow src/lib/validation/projects.ts; `id` and `created_at` are assumed to have table defaults.
-- Not on the Chrome Web Store yet and the repository is private, so live_url and repo_url are left empty; set
-- live_url to the store listing once it's published. There is no slug column, so the title is the key.
insert into public.projects (title, description, tags, is_published, sort_order)
select
  'Change Set Helper',
  'A Chrome extension (Manifest V3) that speeds up building Salesforce change sets. On the Add Components page it replaces the paged table with one searchable, sortable list of every component, with last-modified details, shift-click ranges and bulk add. On a change set it adds CSV export, multi-select remove, a package.xml built from the components (real API names looked up with read-only API calls) and a one-click "Deploy with Diffbridge"; an inbound change set can be recreated as an outbound one in the current org. It stores nothing and sends nothing to third parties.',
  array['Chrome Extension', 'Manifest V3', 'JavaScript', 'Salesforce']::text[],
  true,
  0
where not exists (select 1 from public.projects where title ilike 'Change Set Helper%');
