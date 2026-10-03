"use client";

import { useMemo, useState } from "react";

import ContactForm from "@/components/ContactForm";
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

const eyebrow = "text-sm uppercase tracking-[0.25em] text-white/45";
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
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white selection:bg-white selection:text-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] hidden h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/15 blur-3xl animate-float-slow md:block" />
        <div className="absolute bottom-[-8rem] left-[-6rem] hidden h-[28rem] w-[28rem] rounded-full bg-cyan-400/12 blur-3xl animate-float-slower md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <main id="main" className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <nav aria-label="Primary" className="sticky top-4 z-30 animate-fade-in-down">
            <div className="rounded-3xl border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md md:rounded-full">
              <div className="flex items-center justify-between">
                <a href="#top" className="text-lg font-semibold tracking-wide md:text-xl">
                  {site.name}
                </a>

                <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="transition duration-300 hover:-translate-y-0.5 hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className="-mr-2 rounded-xl p-2 text-white/80 md:hidden"
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
                <div id="mobile-menu" className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3 md:hidden">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className="rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div id="top" className="grid items-center gap-14 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                Full-Stack Developer • AI Automation
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
                I build products that
                <span className="block leading-[1.18] bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  feel premium at first glance.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                I design and build modern digital experiences — from AI-powered tools to full-stack web platforms —
                with a focus on brand presence, clarity, motion, and clean execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-2xl bg-white px-6 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Get in touch
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                  <div className="text-sm uppercase tracking-[0.22em] text-white/35">What I work with</div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight">
                    Design that looks sharp.
                    <span className="block text-white/55">Systems that stay usable.</span>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl font-semibold">{projects.length}</div>
                      <div className="mt-1 text-xs text-white/60">Projects shown below</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl font-semibold">AI + UX</div>
                      <div className="mt-1 text-xs text-white/60">Focus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:px-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
              <p className={eyebrow}>About</p>
              <h2 className={h2}>Minimal. Intentional. High-impact.</h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/70">
                I build sleek, high-converting digital products that combine strong branding, clean engineering, and
                premium user experience. My work focuses on modern web apps, automation systems, and polished
                interfaces that help founders and businesses stand out.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/65">{item.text}</p>
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
            <p className="max-w-xl leading-7 text-white/65">
              Products that look premium, feel fast, and solve real business problems through design, automation, and
              scalable development.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item, index) => (
              <div
                key={item.title}
                className="group min-h-[260px] rounded-[2rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/40">0{index + 1}</div>
                  <div className="h-10 w-10 rounded-2xl bg-white/10 transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <h3 className="mt-12 max-w-xs text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/60">{item.text}</p>
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
              <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                Projects are temporarily unavailable. Please try again later.
              </p>
            ) : (
              <p className="max-w-xl leading-7 text-white/60">
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
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
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
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/5">
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
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)] text-sm text-white/45">
                        No preview image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 min-h-[72px] leading-7 text-white/65">
                      {project.description || "No description added yet."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
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
                          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition duration-300 hover:scale-[1.03]"
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
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/10"
                        >
                          Code
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/60 md:col-span-2 xl:col-span-3">
                {projects.length > 0 ? "No projects match this filter." : "Projects are coming soon."}
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-28 md:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center md:p-12">
            <p className={eyebrow}>Contact</p>
            <h2 className={h2}>Let&apos;s build something together.</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
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
                    className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition duration-300 hover:bg-white/10"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
