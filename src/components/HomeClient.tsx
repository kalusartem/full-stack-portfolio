"use client";

type Project = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
};

type Props = {
  projects: Project[];
  errorMessage?: string;
};

const stats = [
  { label: "Projects Built", value: "24+" },
  { label: "Years Building", value: "5" },
  { label: "Ideas Launched", value: "12" },
  { label: "Focus", value: "AI + UX" },
];

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

const testimonials = [
  {
    quote:
      "The end result felt premium, fast, and way more polished than a standard template site.",
    author: "Founder",
  },
  {
    quote:
      "Strong design taste with real execution. It looked expensive and actually worked.",
    author: "Operator",
  },
  {
    quote:
      "A rare mix of branding, product thinking, and technical delivery in one build.",
    author: "Client",
  },
];

export default function HomeClient({ projects, errorMessage }: Props) {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] hidden h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/15 blur-3xl animate-float-slow md:block" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/12 blur-3xl animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <nav className="sticky top-4 z-30 animate-fade-in-down">
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-xl">
              <div className="text-lg font-semibold tracking-wide md:text-xl">
                Artem Kalus
              </div>

              <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
                {[
                  ["About", "#about"],
                  ["Services", "#services"],
                  ["Projects", "#projects"],
                  ["Testimonials", "#testimonials"],
                  ["Admin", "/admin"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="transition duration-300 hover:-translate-y-0.5 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="grid items-center gap-14 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
                ✨ Premium Digital Products • AI • Full Stack
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
                I build products that
                <span className="block leading-[1.18] bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  feel premium at first glance.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                I design and build modern digital experiences — from AI-powered
                tools to full-stack web platforms — with a focus on brand
                presence, clarity, motion, and clean execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-2xl bg-white px-6 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  View Projects
                </a>
                <a
                  href="#services"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore Services
                </a>
                <a
                  href="/admin"
                  className="rounded-2xl border border-white/15 bg-transparent px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/30"
                >
                  Admin
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="text-sm uppercase tracking-[0.2em] text-white/40">
                    Positioning
                  </div>
                  <p className="mt-3 leading-7 text-white/70">
                    I help products look sharper, feel smoother, and present
                    more value through better design and stronger execution.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="text-sm uppercase tracking-[0.2em] text-white/40">
                    Outcome
                  </div>
                  <p className="mt-3 leading-7 text-white/70">
                    Cleaner interfaces, stronger brand perception, and digital
                    products that feel ready to sell, pitch, or scale.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-white/10 via-fuchsia-400/10 to-cyan-400/10 blur-2xl animate-tilt-glow" />

              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-white/50 animate-pulse" />
                      <span className="h-3 w-3 rounded-full bg-white/25 animate-pulse [animation-delay:200ms]" />
                      <span className="h-3 w-3 rounded-full bg-white/15 animate-pulse [animation-delay:400ms]" />
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                      Live Dashboard
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-sm uppercase tracking-[0.22em] text-white/35">
                      Snapshot
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight">
                      Design that looks sharp.
                      <span className="block text-white/55">
                        Systems that stay usable.
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {stats.map((item, index) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 opacity-0 animate-fade-in-up"
                        style={{
                          animationDelay: `${0.15 + index * 0.1}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <div className="text-2xl font-semibold">
                          {item.value}
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="h-4 w-2/3 rounded-full bg-white/10 animate-shimmer" />
                    <div className="h-4 w-5/6 rounded-full bg-white/10 animate-shimmer [animation-delay:150ms]" />
                    <div className="h-4 w-1/2 rounded-full bg-white/10 animate-shimmer [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                About
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Minimal. Intentional. High-impact.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/70">
                I build sleek, high-converting digital products that combine
                strong branding, clean engineering, and premium user experience.
                My work focuses on modern web apps, automation systems, and
                polished interfaces that help founders and businesses stand out.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl opacity-0 animate-fade-in-up transition duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${0.1 + index * 0.12}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/65">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl px-6 py-20 md:px-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Services
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                What I build
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-white/65">
              I focus on building products that look premium, feel fast, and
              solve real business problems through design, automation, and
              scalable development.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item, index) => (
              <div
                key={item.title}
                className="group min-h-[260px] rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/40">0{index + 1}</div>
                  <div className="h-10 w-10 rounded-2xl bg-white/10 transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </div>

                <h3 className="mt-12 max-w-xs text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  Why it works
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                  Built to feel more valuable.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-lg font-semibold">
                    Better first impression
                  </div>
                  <p className="mt-2 leading-7 text-white/60">
                    Strong visual hierarchy, spacing, and polish make the
                    product feel instantly more credible.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-lg font-semibold">Cleaner user flow</div>
                  <p className="mt-2 leading-7 text-white/60">
                    Every section is designed to guide attention and make the
                    experience easier to understand.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-lg font-semibold">
                    More premium brand feel
                  </div>
                  <p className="mt-2 leading-7 text-white/60">
                    Design choices are made to raise perceived value, not just
                    fill space.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-lg font-semibold">
                    Launch-ready execution
                  </div>
                  <p className="mt-2 leading-7 text-white/60">
                    The goal is not just aesthetics, but a product that looks
                    ready to show, sell, and scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto max-w-7xl px-6 py-20 md:px-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Projects
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Selected work
              </h2>
            </div>

            {errorMessage ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                Could not load some project data: {errorMessage}
              </p>
            ) : (
              <p className="max-w-xl leading-7 text-white/60">
                A selection of recent work across product design, web
                development, automation, and premium interface builds.
              </p>
            )}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/5">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
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
                      {project.tags?.map((tag) => (
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
                No projects yet. Add projects from the admin panel and they will
                appear here.
              </div>
            )}
          </div>
        </section>

        <section
          id="testimonials"
          className="mx-auto max-w-7xl px-6 py-20 md:px-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Testimonials
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                What people notice
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-white/60">
              The most common feedback is simple: the work feels sharper, more
              premium, and more ready for real business use.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.quote}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <p className="leading-8 text-white/75">“{item.quote}”</p>
                <div className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">
                  {item.author}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28 md:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">
              Ready
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Build something that feels worth more.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
              Whether it is a portfolio, product, SaaS interface, or internal
              tool, the goal is the same: make it look sharp, work cleanly, and
              feel premium.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition duration-300 hover:scale-[1.03]"
              >
                See the work
              </a>
              <a
                href="/admin"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition duration-300 hover:bg-white/10"
              >
                Open admin
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
