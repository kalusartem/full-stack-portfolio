"use client";

import { useMemo, useState } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import { ProjectGrid } from "@/components/ProjectCard";
import { SiteShell } from "@/components/SiteChrome";
import { eyebrow, h2 } from "@/components/ui";
import { uniqueTags } from "@/lib/tags";
import type { Project } from "@/lib/types";

type Props = {
  projects: Project[];
  errorMessage?: string;
};

export default function ProjectsClient({ projects, errorMessage }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = useMemo(() => uniqueTags(projects), [projects]);
  const visibleProjects = activeTag
    ? projects.filter((p) => p.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase()))
    : projects;

  return (
    <SiteShell onHome={false}>
      <section id="work" className="mx-auto max-w-6xl px-6 pb-28 pt-14 md:px-10 md:pt-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>All work</p>
            <h1 className={h2}>Projects</h1>
          </div>
          {errorMessage ? (
            <p role="alert" className="rounded-xl border border-danger-line bg-danger-soft px-4 py-2 text-sm text-danger">
              Projects are temporarily unavailable. Please try again later.
            </p>
          ) : (
            <p className="max-w-md leading-7 text-muted">
              Everything I&apos;ve shipped or am building, newest first. Filter by technology to narrow it down.
            </p>
          )}
        </div>

        {allTags.length > 1 ? (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
            {[null, ...allTags].map((tag) => (
              <button
                key={tag ?? "all"}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                  activeTag === tag
                    ? "border-primary bg-primary text-on-primary"
                    : "border-line bg-surface text-soft hover:bg-surface-strong hover:text-foreground"
                }`}
              >
                {tag ?? "All"}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          {visibleProjects.length > 0 ? (
            <ProjectGrid projects={visibleProjects} featureFirst={!activeTag} />
          ) : (
            <div className="rounded-3xl border border-line bg-surface p-8 text-muted">
              {projects.length > 0 ? "No projects match this filter." : "Projects are coming soon."}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
