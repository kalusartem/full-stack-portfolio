import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const supabase = await createClient(); // ✅ await, returns client
  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", url.origin));
}
