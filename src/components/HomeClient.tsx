"use client";

import { useMemo, useState, type ComponentType } from "react";

import ContactForm from "@/components/ContactForm";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CubeIcon,
  GitHubIcon,
  LayersIcon,
  LinkedInIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";

type Props = {
  projects: Project[];
  errorMessage?: string;
};

type Social = {
  label: string;
  href: string;
  handle: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

const navLinks = [
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

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

const eyebrow = "font-mono text-xs uppercase tracking-[0.2em] text-accent";
const h2 = "mt-3 text-3xl font-semibold tracking-tight text-balance md:text-5xl";
const chip = "rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-on-primary shadow-[0_10px_40px_var(--primary-glow)] transition duration-300 hover:-translate-y-0.5";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-5 py-3 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-surface-strong";

// "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name"
const handleOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const isLive = (project: Project) => Boolean(project.live_url);

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

function ProjectImage({ project, className = "" }: { project: Project; className?: string }) {
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
function ProjectCard({ project, featured, wide }: { project: Project; featured: boolean; wide: boolean }) {
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

function SocialButtons({ socials, className = "" }: { socials: Social[]; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} (opens in new tab)`}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-soft transition hover:bg-surface-strong hover:text-foreground"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

export default function HomeClient({ projects, errorMessage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Tags are entered freely in the admin, so group them case-insensitively ("supabase" == "Supabase").
  const allTags = useMemo(() => {
    const byKey = new Map<string, string>();
    projects.flatMap((p) => p.tags).forEach((tag) => byKey.set(tag.toLowerCase(), byKey.get(tag.toLowerCase()) ?? tag));
    return Array.from(byKey.values()).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [projects]);
  const visibleProjects = activeTag
    ? projects.filter((p) => p.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase()))
    : projects;

  const socials = [
    site.github && { label: "GitHub", href: site.github, handle: handleOf(site.github), Icon: GitHubIcon },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, handle: handleOf(site.linkedin), Icon: LinkedInIcon },
  ].filter(Boolean) as Social[];

  // The newest project spans the full row; size the grid for the rest so the last row isn't half empty.
  const hasFeatured = !activeTag && visibleProjects.length > 0;
  const gridCount = visibleProjects.length - (hasFeatured ? 1 : 0);
  const gridCols = gridCount % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  const liveCount = projects.filter(isLive).length;
  const heroProject = projects.find((p) => p.image_url);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-on-primary">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] hidden h-[30rem] w-[30rem] rounded-full bg-blob-a blur-3xl animate-float-slow md:block" />
        <div className="absolute top-[40rem] left-[-6rem] hidden h-[28rem] w-[28rem] rounded-full bg-blob-b blur-3xl animate-float-slower md:block" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-x-0 top-0 h-[60rem] bg-grid opacity-[0.08]" />
      </div>

      <header className="sticky top-0 z-30 px-4 pt-4 md:px-10">
        <nav
          aria-label="Primary"
          className="mx-auto max-w-6xl animate-fade-in-down rounded-2xl border border-line bg-nav px-4 py-2.5 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-mono text-xs text-on-primary">
                AK
              </span>
              <span className="hidden sm:inline">{site.name}</span>
            </a>

            <div className="hidden items-center gap-7 text-sm text-soft md:flex">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-foreground">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SocialButtons socials={socials} className="hidden sm:flex" />
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-soft md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                </svg>
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div id="mobile-menu" className="mt-2 flex flex-col gap-1 border-t border-line pt-2 md:hidden">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 text-soft hover:bg-surface hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-soft hover:bg-surface hover:text-foreground sm:hidden"
                >
                  <Icon size={17} /> {label}
                </a>
              ))}
            </div>
          ) : null}
        </nav>
      </header>

      <main id="main" className="relative z-10">
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
              <p className={eyebrow}>Selected work</p>
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

          <div className={`mt-10 grid gap-6 md:grid-cols-2 ${gridCols}`}>
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={index === 0 && hasFeatured}
                  wide={(index === 0 && hasFeatured) || gridCount === 1}
                />
              ))
            ) : (
              <div className="rounded-3xl border border-line bg-surface p-8 text-muted md:col-span-full">
                {projects.length > 0 ? "No projects match this filter." : "Projects are coming soon."}
              </div>
            )}
          </div>
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
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-subtle">
          <p>
            © {new Date().getFullYear()} {site.name} · Built with Next.js &amp; Supabase
          </p>
          <SocialButtons socials={socials} />
        </div>
      </footer>
    </div>
  );
}
