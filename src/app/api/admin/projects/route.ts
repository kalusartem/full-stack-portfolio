import { NextResponse, type NextRequest } from "next/server";
import { applyCookies, requireAdmin } from "../_utils";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.response;

  const { supabase, cookiesToSet } = gate;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    const res = NextResponse.json({ error: error.message }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  const res = NextResponse.json({ projects: data ?? [] });
  return applyCookies(res, cookiesToSet);
}

export async function POST(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.response;

  const { supabase, cookiesToSet } = gate;

  const body = (await req.json()) as {
    id: string | null;
    payload: Record<string, unknown>;
  };

  const id = body.id ?? null;
  const payload = body.payload ?? {};

  const result = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (result.error) {
    const res = NextResponse.json(
      { error: result.error.message },
      { status: 400 },
    );
    return applyCookies(res, cookiesToSet);
  }

  const res = NextResponse.json({ ok: true });
  return applyCookies(res, cookiesToSet);
}

export async function DELETE(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.response;

  const { supabase, cookiesToSet } = gate;

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const imagePath = url.searchParams.get("image_path");

  if (!id) {
    const res = NextResponse.json({ error: "missing id" }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    const res = NextResponse.json({ error: error.message }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  if (imagePath) {
    // Best-effort cleanup
    await supabase.storage.from("project-images").remove([imagePath]);
  }

  const res = NextResponse.json({ ok: true });
  return applyCookies(res, cookiesToSet);
}
