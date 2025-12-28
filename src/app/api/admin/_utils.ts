import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieKV = { name: string; value: string };

/**
 * Creates a Supabase SSR client for Route Handlers.
 *
 * IMPORTANT: pass the returned `response` back to the caller, so any auth cookie
 * updates (refresh tokens, etc.) are persisted.
 */
export function createRouteClient(req: NextRequest) {
  const cookiesToSet: Array<{
    name: string;
    value: string;
    options?: CookieOptions;
  }> = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll(): CookieKV[] {
          return req.cookies
            .getAll()
            .map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(
          nextCookies: Array<{
            name: string;
            value: string;
            options?: CookieOptions;
          }>,
        ) {
          cookiesToSet.push(...nextCookies);
        },
      },
    },
  );

  return { supabase, cookiesToSet };
}

export async function requireAdmin(req: NextRequest) {
  const { supabase, cookiesToSet } = createRouteClient(req);

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    };
  }

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr || !profile?.is_admin) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, supabase, cookiesToSet, user };
}

export function applyCookies(
  res: NextResponse,
  cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>,
) {
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });
  return res;
}
