import { createClient } from "@/lib/supabase-server";
import HomeClient from "@/components/HomeClient";

export const runtime = "edge";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  image_path: string | null;
  sort_order: number;
  created_at: string;
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,tags,live_url,repo_url,image_url,image_path,sort_order,created_at")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = ((data ?? []) as Project[]).map((project) => {
    let imageUrl = project.image_url ?? null;
    if (project.image_path) {
      const { data: storageData } = supabase.storage.from("project-images").getPublicUrl(project.image_path);
      imageUrl = storageData.publicUrl;
    }
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.tags ?? [],
      live_url: project.live_url,
      repo_url: project.repo_url,
      image_url: imageUrl,
    };
  });

  return <HomeClient projects={projects} errorMessage={error?.message} />;
}
