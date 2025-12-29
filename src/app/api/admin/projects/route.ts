import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { applyCookies, requireAdmin } from "../_utils";
import {
  projectCreateSchema,
  projectUpdateSchema,
} from "@/lib/validation/projects";

export const runtime = "edge";

/**
 * Accept BOTH request shapes:
 * 1) Legacy (your current client): { id: string|null, payload: {...fields} }
 * 2) Optional newer style: { id?: string|null, ...fields } (flattened)
 */
const legacyBodySchema = z
  .object({
    id: z.string().nullable().optional(),
    payload: z.record(z.string(), z.unknown()),
  })
  .strict();

const flatBodySchema = z
  .object({
    id: z.string().nullable().optional(),
  })
  .passthrough(); // fields validated later by project*Schema

function jsonError(err: unknown) {
  if (err instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "validation_error",
          message: "Invalid input",
          details: err.flatten(),
        },
      },
      { status: 422 },
    );
  }

  return NextResponse.json(
    { error: { code: "internal_error", message: "Something went wrong" } },
    { status: 500 },
  );
}

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

/**
 * POST does both:
 * - Create when id is null/undefined
 * - Update when id is provided
 */
export async function POST(req: NextRequest) {
  try {
    const gate = await requireAdmin(req);
    if (!gate.ok) return gate.response;

    const { supabase, cookiesToSet } = gate;

    const raw = await req.json();

    // Support both body shapes
    let id: string | null = null;
    let payload: Record<string, unknown> = {};

    const legacyParsed = legacyBodySchema.safeParse(raw);
    if (legacyParsed.success) {
      id = legacyParsed.data.id ?? null;
      payload = legacyParsed.data.payload ?? {};
    } else {
      // Flat body: { id?, ...fields }
      const flat = flatBodySchema.parse(raw);
      id = flat.id ?? null;

      payload = { ...(raw as Record<string, unknown>) };
      delete payload.id;
    }

    // Validate payload depending on create vs update
    const validated = id
      ? projectUpdateSchema.parse(payload) // partial update allowed
      : projectCreateSchema.parse(payload); // create requires required fields

    const result = id
      ? await supabase
          .from("projects")
          .update(validated)
          .eq("id", id)
          .select("*")
          .single()
      : await supabase.from("projects").insert(validated).select("*").single();

    if (result.error) {
      const res = NextResponse.json(
        { error: result.error.message },
        { status: 400 },
      );
      return applyCookies(res, cookiesToSet);
    }

    const res = NextResponse.json({ project: result.data, ok: true });
    return applyCookies(res, cookiesToSet);
  } catch (err) {
    return jsonError(err);
  }
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
