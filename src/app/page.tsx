import HomeClient from "@/components/HomeClient";
import { createClient } from "@/lib/supabase-server";

type Project = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  const projects: Project[] = await Promise.all(
    ((data ?? []) as any[]).map(async (project) => {
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
    })
  );

  return <HomeClient projects={projects} errorMessage={error?.message} />;
}
