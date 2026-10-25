import { createClient } from "@supabase/supabase-js";

import HomeClient from "@/components/HomeClient";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";

// Cloudflare Pages requires the edge runtime for dynamic routes (ISR is not available there).
export const runtime = "edge";

type ProjectRow = Omit<Project, "tags"> & { tags: string[] | null; image_path: string | null };

// Person + WebSite structured data; sameAs only includes profile links that are configured.
const sameAs = [site.github, site.linkedin].filter((url): url is string => Boolean(url));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: "Full-Stack Developer",
      description: site.description,
      knowsAbout: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "AI automation"],
      ...(sameAs.length > 0 && { sameAs }),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

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

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so project/site strings can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeClient projects={projects} errorMessage={error?.message} />
    </>
  );
}
