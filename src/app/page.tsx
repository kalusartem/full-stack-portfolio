import HomeClient from "@/components/HomeClient";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

// Rendered on every request, so projects added or picked in the admin show at once (nothing is revalidated).
export const dynamic = "force-dynamic";

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
  const { projects, errorMessage } = await getProjects();

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so project/site strings can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeClient projects={projects} errorMessage={errorMessage} />
    </>
  );
}
