import type { Project } from "@/lib/types";

// Tags are entered freely in the admin, so group them case-insensitively ("supabase" == "Supabase").
export function uniqueTags(projects: Project[]): string[] {
  const byKey = new Map<string, string>();
  projects.flatMap((p) => p.tags).forEach((tag) => byKey.set(tag.toLowerCase(), byKey.get(tag.toLowerCase()) ?? tag));
  return Array.from(byKey.values()).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}
