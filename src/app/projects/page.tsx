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
  return <ProjectsClient projects={projects} errorMessage={errorMessage} />;
}
