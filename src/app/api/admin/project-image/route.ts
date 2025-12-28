import { NextResponse, type NextRequest } from "next/server";
import { applyCookies, requireAdmin } from "../_utils";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.response;

  const { supabase, cookiesToSet } = gate;

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file || typeof file.arrayBuffer !== "function") {
    const res = NextResponse.json({ error: "missing file" }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  const ext = file.name.split(".").pop() || "bin";
  const filePath = `${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { data, error } = await supabase.storage
    .from("project-images")
    .upload(filePath, bytes, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

  if (error || !data?.path) {
    const res = NextResponse.json(
      { error: error?.message ?? "upload failed" },
      { status: 400 },
    );
    return applyCookies(res, cookiesToSet);
  }

  const res = NextResponse.json({ path: data.path });
  return applyCookies(res, cookiesToSet);
}

export async function DELETE(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.response;

  const { supabase, cookiesToSet } = gate;

  const body = (await req.json()) as { path?: string };
  const path = body?.path;
  if (!path) {
    const res = NextResponse.json({ error: "missing path" }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  const { error } = await supabase.storage
    .from("project-images")
    .remove([path]);
  if (error) {
    const res = NextResponse.json({ error: error.message }, { status: 400 });
    return applyCookies(res, cookiesToSet);
  }

  const res = NextResponse.json({ ok: true });
  return applyCookies(res, cookiesToSet);
}
