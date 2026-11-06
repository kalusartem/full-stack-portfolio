"use client";

import Link from "next/link";
import { useMemo } from "react";

import ContactForm from "@/components/ContactForm";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CubeIcon,
  GitHubIcon,
  LayersIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/icons";
import { isLive, ProjectGrid, ProjectImage } from "@/components/ProjectCard";
import { SiteShell, socials } from "@/components/SiteChrome";
import { btnPrimary, btnSecondary, chip, eyebrow, h2, handleOf } from "@/components/ui";
import { site } from "@/lib/site";
import { uniqueTags } from "@/lib/tags";
import type { Project } from "@/lib/types";

type Props = {
  projects: Project[];
  errorMessage?: string;
};

// The home page previews only the newest few; the full, filterable list lives on /projects.
const HOME_PROJECT_LIMIT = 3;

const capabilities = [
  {
    Icon: LayersIcon,
    title: "Full-stack web apps",
    text: "Typed React front ends on top of Postgres, with auth, admin tooling and server-side validation built in from day one.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Postgres"],
  },
  {
    Icon: CubeIcon,
    title: "Real-time & 3D",
    text: "Multiplayer browser games and WebGL scenes with shared client/server rules, WebSocket netcode and a 60 fps budget.",
    stack: ["Three.js", "WebGL", "WebSockets", "Node.js"],
  },
  {
    Icon: SparkIcon,
    title: "AI automation",
    text: "Workflows that remove busywork: lead capture, data pipelines, internal tools and LLM-powered helpers wired into real systems.",
    stack: ["LLM APIs", "Webhooks", "Integrations"],
  },
  {
    Icon: ShieldIcon,
    title: "Production-ready",
    text: "Row Level Security, TOTP MFA, captcha-protected forms, SEO metadata and push-to-deploy pipelines on the edge.",
    stack: ["RLS", "MFA", "Cloudflare", "CI/CD"],
  },
];

const principles = [
  ["Own it end to end", "Schema, API, UI and deploy: I take features from an empty repo to a live URL."],
  ["Secure by default", "Permissions live in the database, writes are validated on the server, secrets never reach the browser."],
  ["Fast on real hardware", "Performance budgets are set up front and measured on modest laptops and phones, not just a dev machine."],
] as const;

export default function HomeClient({ projects, errorMessage }: Props) {
  const allTags = useMemo(() => uniqueTags(projects), [projects]);
  const latestProjects = projects.slice(0, HOME_PROJECT_LIMIT);
  const liveCount = projects.filter(isLive).length;
  const heroProject = projects.find((p) => p.image_url);

  return (
    <SiteShell onHome>
      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-12 px-6 pb-16 pt-14 md:px-10 md:pt-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-in-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-soft">
            <span className="h-2 w-2 rounded-full bg-success-solid shadow-[0_0_0_4px_var(--success-soft)]" />
            Full-Stack Developer · AI Automation
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
            Hi, I&apos;m {site.name.split(" ")[0]}.{" "}
            <span className="text-gradient">I build software that ships.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-soft">
            Full-stack web apps, real-time multiplayer games and AI automation, built with TypeScript, React,
            Node.js and Postgres and taken all the way to production.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className={btnPrimary}>
              See my work <ArrowDownIcon size={15} />
            </a>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} profile (opens in new tab)`}
                className={btnSecondary}
              >
                <Icon size={17} /> {label}
              </a>
            ))}
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-xs text-subtle">Projects</dt>
              <dd className="mt-1 text-2xl font-semibold">{projects.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-subtle">Live now</dt>
              <dd className="mt-1 text-2xl font-semibold">{liveCount}</dd>
            </div>
            <div>
              <dt className="text-xs text-subtle">Technologies</dt>
              <dd className="mt-1 text-2xl font-semibold">{allTags.length}</dd>
            </div>
          </dl>
        </div>

        {heroProject ? (
          <a
            href="#work"
            className="group relative block animate-fade-in-right"
            aria-label={`Latest project: ${heroProject.title}`}
          >
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-blob-a opacity-60 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface p-2 shadow-2xl">
              <div className="flex items-center gap-1.5 px-3 pb-2 pt-1" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="ml-3 truncate font-mono text-xs text-subtle">
                  {heroProject.live_url ? handleOf(heroProject.live_url) : heroProject.title}
                </span>
              </div>
              <ProjectImage project={heroProject} className="aspect-[16/11] rounded-2xl" />
            </div>
            <div className="relative mx-4 -mt-8 flex items-center justify-between gap-3 rounded-2xl border border-line bg-nav px-5 py-4 backdrop-blur-md">
              <div className="min-w-0">
                <div className="font-mono text-xs text-subtle">Latest project</div>
                <div className="truncate font-semibold">{heroProject.title}</div>
              </div>
              <ArrowDownIcon className="shrink-0 text-soft transition group-hover:translate-y-0.5" />
            </div>
          </a>
        ) : null}
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>Latest work</p>
            <h2 className={h2}>Things I&apos;ve built</h2>
          </div>
          {errorMessage ? (
            <p role="alert" className="rounded-xl border border-danger-line bg-danger-soft px-4 py-2 text-sm text-danger">
              Projects are temporarily unavailable. Please try again later.
            </p>
          ) : (
            <p className="max-w-md leading-7 text-muted">
              Live products and experiments, from a car marketplace to browser games running on a free-tier VM.
            </p>
          )}
        </div>

        <div className="mt-10">
          {latestProjects.length > 0 ? (
            <ProjectGrid projects={latestProjects} featureFirst />
          ) : (
            <div className="rounded-3xl border border-line bg-surface p-8 text-muted">Projects are coming soon.</div>
          )}
        </div>

        {projects.length > HOME_PROJECT_LIMIT ? (
          <div className="mt-10 flex justify-center">
            <Link href="/projects" className={`${btnSecondary} group`}>
              View all {projects.length} projects
              <ArrowRightIcon size={15} className="transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : null}
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 md:px-10">
        <p className={eyebrow}>What I do</p>
        <h2 className={h2}>From database to deploy</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {capabilities.map(({ Icon, title, text, stack }) => (
            <div
              key={title}
              className="group rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-line-hover md:p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent transition duration-300 group-hover:scale-110">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-7 text-muted">{text}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${title} stack`}>
                {stack.map((item) => (
                  <li key={item} className={chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 md:px-10">
        <div className="grid gap-10 rounded-3xl border border-line bg-surface p-8 md:p-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={eyebrow}>About</p>
            <h2 className={h2}>Engineer first, with an eye for polish.</h2>
            <p className="mt-6 leading-8 text-soft">
              I like building complete things: the data model, the API that guards it, the interface people
              actually touch, and the pipeline that keeps it running. This site is one of them. It is a Next.js app
              on Cloudflare&apos;s edge with a Supabase backend, an admin dashboard with MFA, and Row Level Security
              doing the real authorization.
            </p>
            <a
              href="https://github.com/kalusartem/Full-Stack-Portfolio-2"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <GitHubIcon size={16} /> Read this site&apos;s source
            </a>
          </div>

          <ol className="space-y-4">
            {principles.map(([title, text], index) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-line bg-inset p-5">
                <span className="font-mono text-sm text-accent">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 leading-7 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-6 pb-28 pt-20 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={eyebrow}>Contact</p>
            <h2 className={h2}>Let&apos;s build something together.</h2>
            <p className="mt-5 max-w-md leading-8 text-muted">
              Have a product, internal tool or automation in mind, or a role on your team? Send a message or reach
              me on GitHub and LinkedIn.
            </p>

            {socials.length > 0 ? (
              <ul className="mt-8 space-y-3">
                {socials.map(({ label, href, handle, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${label}: ${handle} (opens in new tab)`}
                      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-line-hover"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
                        <Icon size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{label}</span>
                        <span className="block truncate text-sm text-subtle">{handle}</span>
                      </span>
                      <ArrowUpRightIcon className="shrink-0 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
            <h3 className="text-lg font-semibold">Send a message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
