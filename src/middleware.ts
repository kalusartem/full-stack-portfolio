import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies
            .getAll()
            .map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Authorization: check admin
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile?.is_admin) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // or "/login"
    return NextResponse.redirect(url);
  }

  // Optional MFA gate. Off unless REQUIRE_ADMIN_MFA is exactly "true", so the default never locks anyone out.
  // /admin/security stays reachable at aal1 so an admin can enroll or step up.
  if (process.env.REQUIRE_ADMIN_MFA === "true") {
    const { pathname } = req.nextUrl;
    const isSecurityPage = pathname === "/admin/security" || pathname.startsWith("/admin/security/");

    if (!isSecurityPage) {
      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aal?.currentLevel !== "aal2") {
        // Carry any refreshed auth cookies over to the early response.
        const withCookies = <T extends NextResponse>(out: T) => {
          res.cookies.getAll().forEach((c) => out.cookies.set(c));
          return out;
        };

        if (pathname.startsWith("/api/")) {
          return withCookies(NextResponse.json({ error: "mfa_required" }, { status: 403 }));
        }

        const url = req.nextUrl.clone();
        url.pathname = "/admin/security";
        url.search = "";
        // nextLevel === "aal2" means a verified factor exists, so ask for the current code instead of enrolling
        if (aal?.nextLevel === "aal2") {
          url.searchParams.set("challenge", "1");
          url.searchParams.set("next", pathname + req.nextUrl.search);
        }
        return withCookies(NextResponse.redirect(url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
