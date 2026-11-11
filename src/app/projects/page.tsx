import type { Metadata } from "next";

import ProjectsClient from "@/components/ProjectsClient";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

// Rendered on every request, so projects added or picked in the admin show at once (nothing is revalidated).
export const dynamic = "force-dynamic";

const description = `Every project by ${site.name}: full-stack web apps, real-time browser games and AI automation.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Projects | ${site.name}`,
    description,
    url: "/projects",
    locale: "en_US",
  },
};

export default async function ProjectsPage() {
  const { projects, errorMessage } = await getProjects();

  // CollectionPage + ItemList + breadcrumbs so search engines can read every project and the page hierarchy.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/projects#page`,
        url: `${site.url}/projects`,
        name: `Projects | ${site.name}`,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            ...(project.description && { description: project.description }),
            ...(project.live_url && { url: project.live_url }),
            ...(project.image_url && { image: project.image_url }),
            ...(project.tags.length > 0 && { keywords: project.tags.join(", ") }),
            author: { "@id": `${site.url}/#person` },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so project strings can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProjectsClient projects={projects} errorMessage={errorMessage} />
    </>
  );
}
