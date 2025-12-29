# Decisions & Tradeoffs

This document explains *why* the project uses the current stack and architecture, and what tradeoffs it accepts.

## Why Next.js App Router
**Benefits**
- Server Components are a strong fit for read-heavy public pages.
- Route Handlers provide a clear server boundary for mutations.
- Middleware gives consistent route protection for admin paths.

**Tradeoffs**
- Some integration tests are slightly more involved than in a traditional Express API.
- Requires careful thought around caching/revalidation for dynamic content.

## Why Supabase (Auth + Postgres + Storage)
**Benefits**
- Fast to ship: unified auth + DB + file storage.
- Postgres + RLS provides *real* authorization at the data layer.
- Good DX with SSR and server-side clients.

**Tradeoffs**
- If policies are only configured in the dashboard, teams risk config drift.
  - Solution: store migrations/policies in the repo.

## Why SSR-friendly auth (instead of purely client auth)
**Benefits**
- Keeps privileged operations server-side.
- Enables server-rendered protected pages without client “loading states”.
- Reduces risk of leaking secrets or depending on fragile client logic.

**Tradeoffs**
- Requires cookie/session plumbing and careful server client setup.

## Why validation with Zod
**Benefits**
- Prevents unsafe or accidental writes (field whitelisting).
- Provides a single source of truth for input constraints.
- Easy to infer TypeScript types from schemas.

**Tradeoffs**
- Small upfront work, but pays off quickly.

## Why minimal tests (Vitest)
**Benefits**
- Portfolio-friendly: demonstrates quality gates without overengineering.
- Fast feedback for schema and error-handling stability.

**Tradeoffs**
- Not a full e2e suite by default (can be added later with Playwright).
