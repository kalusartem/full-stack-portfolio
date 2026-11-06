"use client";

import { useState } from "react";

import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { btnPrimary, btnSecondary, chip, eyebrow } from "@/components/ui";
import type { Project } from "@/lib/types";

export const isLive = (project: Project) => Boolean(project.live_url);

function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const pad = size === "md" ? "px-5 py-3" : "px-4 py-2";
  if (!project.live_url && !project.repo_url) {
    return <span className="text-sm text-subtle">In progress</span>;
  }
  return (
    <div className="flex flex-wrap gap-3">
      {project.live_url ? (
        <a
          href={project.live_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} live site (opens in new tab)`}
          className={`${btnPrimary} ${pad}`}
        >
          Visit live <ArrowUpRightIcon size={15} />
        </a>
      ) : null}
      {project.repo_url ? (
        <a
          href={project.repo_url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source code on GitHub (opens in new tab)`}
          className={`${btnSecondary} ${pad}`}
        >
          <GitHubIcon size={16} /> Code
        </a>
      ) : null}
    </div>
  );
}

export function ProjectImage({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-inset ${className}`}>
      {project.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image_url}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-spot text-sm text-subtle">No preview image</div>
      )}
    </div>
  );
}

// `featured` marks the newest project; `wide` gives any full-width card the side-by-side layout.
export function ProjectCard({ project, featured, wide }: { project: Project; featured: boolean; wide: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const description = project.description || "No description added yet.";
  const long = description.length > (wide ? 420 : 180);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:border-line-hover ${
        wide ? "md:col-span-full lg:grid lg:grid-cols-[1.3fr_1fr]" : ""
      }`}
    >
      <ProjectImage
        project={project}
        className={wide ? "aspect-[16/10] border-b border-line lg:aspect-auto lg:min-h-[380px] lg:border-b-0 lg:border-r" : "aspect-[16/10] border-b border-line"}
      />

      <div className={`flex flex-1 flex-col ${wide ? "p-6 md:p-8" : "p-6"}`}>
        <div className="flex items-center gap-2">
          {featured ? <span className={eyebrow}>Latest</span> : null}
          {isLive(project) ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Live
            </span>
          ) : null}
        </div>
        <h3 className={`mt-2 font-semibold tracking-tight ${wide ? "text-3xl" : "text-2xl"}`}>{project.title}</h3>

        <p className={`mt-3 leading-7 text-muted ${expanded ? "" : wide ? "line-clamp-6" : "line-clamp-3"}`}>
          {description}
        </p>
        {long ? (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="mt-2 self-start text-sm font-medium text-accent hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}

        {project.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
            {project.tags.map((tag) => (
              <li key={tag} className={chip}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6">
          <ProjectLinks project={project} size={wide ? "md" : "sm"} />
        </div>
      </div>
    </article>
  );
}

// The newest project spans the full row; the grid is sized for the rest so the last row isn't half empty.
export function ProjectGrid({ projects, featureFirst }: { projects: Project[]; featureFirst: boolean }) {
  const hasFeatured = featureFirst && projects.length > 0;
  const gridCount = projects.length - (hasFeatured ? 1 : 0);
  const gridCols = gridCount % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <div className={`grid gap-6 md:grid-cols-2 ${gridCols}`}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={index === 0 && hasFeatured}
          wide={(index === 0 && hasFeatured) || gridCount === 1}
        />
      ))}
    </div>
  );
}
