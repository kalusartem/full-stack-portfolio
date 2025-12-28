import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function getSupabaseAndUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      supabase,
      user: null,
      error: NextResponse.json({ error: "unauthorized" }, { status: 401 }),
    };
  }

  return { supabase, user, error: null };
}
