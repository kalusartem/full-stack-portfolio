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

## Why semantic theme tokens + `data-theme`
**Benefits**
- Components use utilities like `bg-surface`, `text-muted`, `border-line`; one set of CSS variables in `globals.css` defines dark and light, so no per-component `dark:` variants.
- `data-theme="light|dark"` on `<html>` plus a `localStorage` key `theme` (`light` | `dark` | `system`) is the same contract as the Car Market app.
- A tiny inline script in `<head>` resolves the theme before first paint, so there is no flash; it also follows OS changes while on "system".

**Tradeoffs**
- Without JavaScript the site falls back to the dark theme.
- A few tokens (text levels, borders) collapse several former opacity steps, so dark values are close to, not pixel-identical with, the old hardcoded classes.
- Third-party widgets (Turnstile) cannot read the token system and follow the OS scheme instead.

## Why optional admin TOTP gated by an env var
**Benefits**
- Supabase Auth MFA (TOTP) adds a second factor on top of GitHub OAuth with no extra infrastructure.
- `REQUIRE_ADMIN_MFA=true` makes middleware demand an `aal2` session for `/admin/*` and `/api/admin/*`; unset, behaviour is unchanged, so deploying the code can never lock the admin out.
- Rollout is safe: enroll at `/admin/security`, confirm a code works, then flip the env var.

**Tradeoffs**
- The gate lives in middleware, not RLS. For database-level enforcement, add `auth.jwt()->>'aal' = 'aal2'` to the admin policies.
- Turning the flag on means every new sign-in needs a code; losing the authenticator requires removing the factor in the Supabase dashboard.
