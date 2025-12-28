import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  console.log("*************");
  console.log("*************");
  console.log("**middleware.ts");
  try {
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
            console.log("Setting cookies in middleware:", cookiesToSet);
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

    if (req.nextUrl.pathname.startsWith("/admin") && !user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      console.log("return 2: ", url);
      return NextResponse.redirect(url);
    }

    console.log("return 1: ", res);

    return res;
  } catch (error) {
    console.error("ERROR: Middleware error:", error);
  }
  return null;
}

export const config = {
  matcher: ["/admin/:path*"],
};
