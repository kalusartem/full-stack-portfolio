import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const { supabase, response } = createClient(request);

  await supabase.auth.signOut();

  // send user back to login
  const redirectUrl = new URL("/login", url.origin);
  return NextResponse.redirect(redirectUrl, {
    headers: response.headers, // important: carries the cookie clears
  });
}
