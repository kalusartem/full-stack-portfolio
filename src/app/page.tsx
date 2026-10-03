import { createClient } from "@supabase/supabase-js";

import HomeClient from "@/components/HomeClient";
import type { Project } from "@/lib/types";

// Cloudflare Pages requires the edge runtime for dynamic routes (ISR is not available there).
export const runtime = "edge";

type ProjectRow = Omit<Project, "tags"> & { tags: string[] | null; image_path: string | null };

export default async function HomePage() {
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

  return <HomeClient projects={projects} errorMessage={error?.message} />;
}
