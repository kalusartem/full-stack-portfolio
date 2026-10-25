"use client";

import { useMemo, useState } from "react";

import ContactForm from "@/components/ContactForm";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";

type Props = {
  projects: Project[];
  errorMessage?: string;
};

const navLinks = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
] as const;

const stack = ["Next.js", "React", "TypeScript", "Supabase", "Postgres + RLS", "Tailwind CSS"];

const highlights = [
  {
    title: "Product Builder",
    text: "I create digital products that balance strategy, usability, and visual polish so they feel valuable from the first click.",
  },
  {
    title: "Creative Thinker",
    text: "I turn ambitious ideas into clean, modern experiences that feel distinctive, intentional, and premium.",
  },
  {
    title: "Systems Mindset",
    text: "I build with structure in mind, combining design, automation, and scalable logic into products that can actually grow.",
  },
];

const services = [
  {
    title: "AI automation systems",
    text: "Smart workflows, lead capture flows, admin tooling, and business automations designed to save time and increase output.",
  },
  {
    title: "Premium web experiences",
    text: "Modern websites and product interfaces with strong visual identity, fast performance, and conversion-focused structure.",
  },
  {
    title: "Full-stack product builds",
    text: "Scalable applications with polished UX, clean architecture, and practical features that move from idea to launch fast.",
  },
];

const eyebrow = "text-sm uppercase tracking-[0.25em] text-subtle";
const h2 = "mt-4 text-3xl font-semibold tracking-tight md:text-5xl";

export default function HomeClient({ projects, errorMessage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );
  const visibleProjects = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  const contactLinks = [
    site.github && { label: "GitHub", href: site.github },
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary selection:text-on-primary">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] hidden h-[30rem] w-[30rem] rounded-full bg-blob-a blur-3xl animate-float-slow md:block" />
        <div className="absolute bottom-[-8rem] left-[-6rem] hidden h-[28rem] w-[28rem] rounded-full bg-blob-b blur-3xl animate-float-slower md:block" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      </div>

      <main id="main" className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <nav aria-label="Primary" className="sticky top-4 z-30 animate-fade-in-down">
            <div className="rounded-3xl border border-line bg-nav px-5 py-3 backdrop-blur-md md:rounded-full">
              <div className="flex items-center justify-between">
                <a href="#top" className="text-lg font-semibold tracking-wide md:text-xl">
                  {site.name}
                </a>

                <div className="hidden items-center gap-8 text-sm text-soft md:flex">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="transition duration-300 hover:-translate-y-0.5 hover:text-foreground"
                    >
                      {label}
                    </a>
                  ))}
                  <ThemeToggle />
                </div>

                <button
                  type="button"
                  className="-mr-2 rounded-xl p-2 text-soft md:hidden"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                  </svg>
                </button>
              </div>

              {menuOpen ? (
                <div id="mobile-menu" className="mt-3 flex flex-col gap-1 border-t border-line pt-3 md:hidden">
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
                  <div className="flex items-center justify-between rounded-xl px-3 py-2 text-soft">
                    <span>Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              ) : null}
            </div>
          </nav>

          <div id="top" className="grid items-center gap-14 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm text-soft">
                Full-Stack Developer • AI Automation
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
                I build products that
                <span className="block leading-[1.18] bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent">
                  feel premium at first glance.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-soft md:text-lg">
                I design and build modern digital experiences — from AI-powered tools to full-stack web platforms —
                with a focus on brand presence, clarity, motion, and clean execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-2xl bg-primary px-6 py-3 font-medium text-on-primary shadow-[0_10px_40px_var(--primary-glow)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-line-strong bg-surface px-6 py-3 font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-surface-strong"
                >
                  Get in touch
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative rounded-[2rem] border border-line bg-surface p-6 shadow-2xl md:p-8">
                <div className="rounded-[1.5rem] border border-line bg-inset p-6">
                  <div className="text-sm uppercase tracking-[0.22em] text-subtle">What I work with</div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight">
                    Design that looks sharp.
                    <span className="block text-subtle">Systems that stay usable.</span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-line bg-surface p-4">
                      <div className="text-2xl font-semibold">{projects.length}</div>
                      <div className="mt-1 text-xs text-muted">Projects shown below</div>
                    </div>
                    <div className="rounded-2xl border border-line bg-surface p-4">
                      <div className="text-2xl font-semibold">AI + UX</div>
                      <div className="mt-1 text-xs text-muted">Focus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-line bg-surface p-8 md:p-10">
              <p className={eyebrow}>About</p>
              <h2 className={h2}>Minimal. Intentional. High-impact.</h2>
              <p className="mt-6 max-w-2xl leading-8 text-soft">
                I build sleek, high-converting digital products that combine strong branding, clean engineering, and
                premium user experience. My work focuses on modern web apps, automation systems, and polished
                interfaces that help founders and businesses stand out.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={eyebrow}>Services</p>
              <h2 className={h2}>What I build</h2>
            </div>
            <p className="max-w-xl leading-7 text-muted">
              Products that look premium, feel fast, and solve real business problems through design, automation, and
              scalable development.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item, index) => (
              <div
                key={item.title}
                className="group min-h-[260px] rounded-[2rem] border border-line bg-surface p-6 transition duration-300 hover:-translate-y-2 hover:border-line-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-subtle">0{index + 1}</div>
                  <div className="h-10 w-10 rounded-2xl bg-surface-strong transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <h3 className="mt-12 max-w-xs text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={eyebrow}>Projects</p>
              <h2 className={h2}>Selected work</h2>
            </div>

            {errorMessage ? (
              <p role="alert" className="rounded-xl border border-danger-line bg-danger-soft px-4 py-2 text-sm text-danger">
                Projects are temporarily unavailable. Please try again later.
              </p>
            ) : (
              <p className="max-w-xl leading-7 text-muted">
                A selection of recent work across product design, web development, automation, and premium interface
                builds.
              </p>
            )}
          </div>

          {allTags.length > 1 ? (
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
              {[null, ...allTags].map((tag) => (
                <button
                  key={tag ?? "all"}
                  type="button"
                  aria-pressed={activeTag === tag}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    activeTag === tag
                      ? "border-primary bg-primary text-on-primary"
                      : "border-line-strong bg-surface text-soft hover:bg-surface-strong"
                  }`}
                >
                  {tag ?? "All"}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-[2rem] border border-line bg-surface transition duration-300 hover:-translate-y-2 hover:border-line-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
                    {project.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image_url}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-spot text-sm text-subtle">
                        No preview image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 min-h-[72px] leading-7 text-muted">
                      {project.description || "No description added yet."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      {project.live_url ? (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} live site (opens in new tab)`}
                          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-on-primary transition duration-300 hover:scale-[1.03]"
                        >
                          Live
                        </a>
                      ) : null}
                      {project.repo_url ? (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} source code (opens in new tab)`}
                          className="rounded-xl border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition duration-300 hover:bg-surface-strong"
                        >
                          Code
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[2rem] border border-line bg-surface p-8 text-muted md:col-span-2 xl:col-span-3">
                {projects.length > 0 ? "No projects match this filter." : "Projects are coming soon."}
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-28 md:px-10">
          <div className="rounded-[2rem] border border-line bg-surface p-8 text-center md:p-12">
            <p className={eyebrow}>Contact</p>
            <h2 className={h2}>Let&apos;s build something together.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted">
              Whether it is a product, SaaS interface, automation, or internal tool, I&apos;d love to hear about it.
            </p>

            <ContactForm />

            {contactLinks.length > 0 ? (
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {contactLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-line-strong bg-surface px-6 py-3 font-medium text-foreground transition duration-300 hover:bg-surface-strong"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-8 text-center text-sm text-subtle">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
