import { createClient } from "@supabase/supabase-js";

import type { Project } from "@/lib/types";

type ProjectRow = Omit<Project, "tags"> & { tags: string[] | null; image_path: string | null };

// Public, read-only fetch of every project, newest first. Uploaded images win over a pasted image_url.
export async function getProjects(): Promise<{ projects: Project[]; errorMessage?: string }> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,tags,live_url,repo_url,image_url,image_path")
    .order("created_at", { ascending: false })
    .returns<ProjectRow[]>();

  const projects: Project[] = (data ?? []).map(({ image_path, tags, ...project }) => ({
    ...project,
    tags: tags ?? [],
    image_url: image_path
      ? supabase.storage.from("project-images").getPublicUrl(image_path).data.publicUrl
      : project.image_url,
  }));

  return { projects, errorMessage: error?.message };
}
