import { createClient } from "@supabase/supabase-js";

import type { Project } from "@/lib/types";

type ProjectRow = Omit<Project, "tags" | "sort_order" | "show_on_home"> & {
  tags: string[] | null;
  image_path: string | null;
  sort_order: number | null;
  show_on_home?: boolean | null;
};

const BASE_COLUMNS = "id,title,description,tags,live_url,repo_url,image_url,image_path,sort_order";
// Postgres "undefined_column": the show_on_home migration hasn't been run on this database yet.
const UNDEFINED_COLUMN = "42703";

// Public, read-only fetch of every project, newest first. Uploaded images win over a pasted image_url.
export async function getProjects(): Promise<{ projects: Project[]; errorMessage?: string }> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const query = (columns: string) =>
    supabase.from("projects").select(columns).order("created_at", { ascending: false }).returns<ProjectRow[]>();

  let { data, error } = await query(`${BASE_COLUMNS},show_on_home`);
  if (error?.code === UNDEFINED_COLUMN) ({ data, error } = await query(BASE_COLUMNS));

  const projects: Project[] = (data ?? []).map(({ image_path, tags, sort_order, show_on_home, ...project }) => ({
    ...project,
    tags: tags ?? [],
    sort_order: sort_order ?? 0,
    show_on_home: Boolean(show_on_home),
    image_url: image_path
      ? supabase.storage.from("project-images").getPublicUrl(image_path).data.publicUrl
      : project.image_url,
  }));

  return { projects, errorMessage: error?.message };
}
