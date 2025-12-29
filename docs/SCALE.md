# What I'd Do at Scale

The current scope is intentionally compact, but the architecture is designed to grow. This document outlines concrete next steps.

## Performance & caching
- Use Next.js caching + revalidation for public pages.
- Add pagination/infinite scroll if projects grow.
- Add full-text search in Postgres (`tsvector`) if needed.

## Reliability & observability
- Structured logs with request IDs and user IDs.
- Error reporting (e.g., Sentry).
- Basic metrics (latency, error rate) and dashboards.

## Security hardening
- Rate-limit admin write endpoints.
- Add audit logging for admin mutations.
- Prefer **private storage + signed URLs** if images must not be public.
- Tighten RLS policies and keep them versioned in migrations.

## Data & migrations
- Store schema + RLS in `supabase/migrations/`.
- Add seeding for local dev.
- Automate migrations in CI/CD to prevent drift.

## Developer experience
- CI checks on every PR: lint, typecheck, test.
- Pre-commit formatting.
- Clear docs for onboarding and environment setup.

## Team scale
- Strong module boundaries: UI vs server routes vs data access.
- Shared schema types (Zod inferred types).
- Consistent error handling and API conventions.
