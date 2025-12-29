# Security: Auth, Authorization, and RLS

This document describes the security model used in the app and what should be enforced at each layer.

## Principles
- **RLS is the real security boundary.**
  - Middleware and UI checks are helpful, but the database must remain correct even if they are bypassed.
- **No privileged secrets in the browser.**
  - Service role keys must remain server-only.
- **Validate inputs at the server boundary.**
  - Even authenticated admins can accidentally send invalid payloads; validation prevents data corruption.

## Authentication (who are you?)
- Users authenticate via Supabase Auth (OAuth).
- The app uses **SSR-compatible session handling**, so server-rendered pages can safely read the current user.

## Authorization (what are you allowed to do?)
- Admin-only actions depend on a `profiles.is_admin` flag.
- Admin-only routes should be protected in two places:
  1) **Middleware** (fast UX gate)
  2) **Server endpoints** (authoritative check before a write)

## Row Level Security (RLS)
RLS ensures that permissions hold even if a request bypasses Next.js middleware.

Recommended policy structure:

### `projects`
- `SELECT`: public (anyone can read)
- `INSERT/UPDATE/DELETE`: admin only

### `profiles`
- users can read their own row
- admin can read all rows
- only admin can update `is_admin`

**Implementation note:** keep these policies in source control (e.g., `supabase/migrations/*.sql`) to avoid dashboard drift.

## Storage policies (Supabase Storage)

You have two common options:

### Option A: Public bucket
- Anyone can read objects.
- Only admins can upload/delete.

Pros:
- simplest for a portfolio
- no signed URL logic

Cons:
- images are publicly accessible

### Option B: Private bucket + signed URLs
- No direct public read.
- Server generates **signed URLs** for display.

Pros:
- better privacy controls

Cons:
- extra server route logic

## Threat model checklist
- ✅ Non-admin cannot mutate data (enforced by RLS)
- ✅ Admin endpoints validate input (Zod)
- ✅ Server-only secrets not exposed to client
- ✅ Middleware prevents accidental access (UX improvement)
- ✅ Storage write/delete restricted to admins

## “Gotchas” to avoid
- Relying only on middleware without RLS
- Using `.insert(payload as any)` without validation/whitelisting
- Making Storage public unintentionally
