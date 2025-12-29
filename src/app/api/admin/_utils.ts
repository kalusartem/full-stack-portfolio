import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieKV = { name: string; value: string };

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

/**
 * Creates a Supabase SSR client for Route Handlers.
 *
 * IMPORTANT:
 * - The Supabase client may request cookie updates (refresh tokens, etc.).
 * - Route Handlers must apply these cookies to the returned NextResponse.
 * - We collect cookies in `cookiesToSet` and apply them in `applyCookies`.
 */
export function createRouteClient(req: NextRequest) {
  const cookiesToSet: CookieToSet[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Keep your env var name as-is (publishable key / anon key)
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll(): CookieKV[] {
          return req.cookies
            .getAll()
            .map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(nextCookies: CookieToSet[]) {
          cookiesToSet.push(...nextCookies);
        },
      },
    },
  );

  return { supabase, cookiesToSet };
}

export function applyCookies(res: NextResponse, cookiesToSet: CookieToSet[]) {
  cookiesToSet.forEach(({ name, value, options }) => {
    res.cookies.set(name, value, options);
  });
  return res;
}

/**
 * Helper to create a JSON response AND ensure any pending auth cookie updates are persisted.
 */
export function jsonWithCookies(
  body: unknown,
  cookiesToSet: CookieToSet[],
  init?: ResponseInit,
) {
  const res = NextResponse.json(body, init);
  return applyCookies(res, cookiesToSet);
}

type RequireAdminOk = {
  ok: true;
  supabase: ReturnType<typeof createRouteClient>["supabase"];
  cookiesToSet: CookieToSet[];
  user: NonNullable<
    Awaited<
      ReturnType<
        ReturnType<typeof createRouteClient>["supabase"]["auth"]["getUser"]
      >
    >["data"]["user"]
  >;
};

type RequireAdminFail = {
  ok: false;
  response: NextResponse;
};

/**
 * Ensures:
 * - user is authenticated
 * - user is admin (profiles.is_admin === true)
 *
 * Returns a union:
 * - { ok: true, supabase, cookiesToSet, user }
 * - { ok: false, response }  // already includes cookies
 */
export async function requireAdmin(
  req: NextRequest,
): Promise<RequireAdminOk | RequireAdminFail> {
  const { supabase, cookiesToSet } = createRouteClient(req);

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return {
      ok: false,
      response: jsonWithCookies({ error: "unauthorized" }, cookiesToSet, {
        status: 401,
      }),
    };
  }

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr || !profile?.is_admin) {
    return {
      ok: false,
      response: jsonWithCookies({ error: "forbidden" }, cookiesToSet, {
        status: 403,
      }),
    };
  }

  return { ok: true, supabase, cookiesToSet, user };
}
