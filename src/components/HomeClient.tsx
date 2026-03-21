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
  { label: "Years Exploring AI", value: "5" },
  { label: "Ideas Launched", value: "12" },
];

const highlights = [
  {
    title: "Product Builder",
    text: "I design modern digital products with a focus on speed, clarity, and elegant user experience.",
  },
  {
    title: "Creative Thinker",
    text: "I turn ambitious ideas into polished interfaces that feel premium and memorable.",
  },
  {
    title: "Systems Mindset",
    text: "From design to automation, I build workflows that are useful, scalable, and efficient.",
  },
];

export default function HomeClient({ projects, errorMessage }: Props) {
  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/15 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/12 blur-3xl animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
          <nav className="animate-fade-in-down flex items-center justify-between py-4">
            <div className="text-lg font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.03] md:text-xl">
              Your Name
            </div>
            <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              {[
                ["About", "#about"],
                ["Work", "#work"],
                ["Projects", "#projects"],
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
          </nav>

          <div className="grid items-center gap-12 pt-14 md:pt-24 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
                ✨ Personal Brand • Tailwind Motion
              </div>

              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
                I build ideas
                <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                  into premium digital experiences.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
                Personal website template with cinematic Tailwind animation, layered gradients,
                smooth visual rhythm, and polished interactions that feel premium without extra animation dependencies.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-2xl bg-white px-6 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  View Projects
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-white/10 via-fuchsia-400/10 to-cyan-400/10 blur-2xl animate-tilt-glow" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-1 md:p-8">
                <div className="flex min-h-[420px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-white/50 animate-pulse" />
                      <span className="h-3 w-3 rounded-full bg-white/25 animate-pulse [animation-delay:200ms]" />
                      <span className="h-3 w-3 rounded-full bg-white/15 animate-pulse [animation-delay:400ms]" />
                    </div>

                    <div className="mt-10 space-y-4">
                      <div className="h-6 w-2/3 rounded-full bg-white/10 animate-shimmer" />
                      <div className="h-6 w-5/6 rounded-full bg-white/10 animate-shimmer [animation-delay:150ms]" />
                      <div className="h-6 w-1/2 rounded-full bg-white/10 animate-shimmer [animation-delay:300ms]" />
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {stats.map((item, index) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${0.15 + index * 0.12}s`, animationFillMode: "forwards" }}
                      >
                        <div className="text-2xl font-semibold">{item.value}</div>
                        <div className="mt-1 text-xs text-white/60">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">About</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Minimal, cinematic, and driven by motion.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/70">
                This version uses Tailwind and CSS-only motion for safer deploys and zero hydration headaches
                from animation libraries on the hero section.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl opacity-0 animate-fade-in-up transition duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${0.1 + index * 0.12}s`, animationFillMode: "forwards" }}
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-white/65">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Selected Work</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">What I focus on</h2>
            </div>
            <p className="max-w-xl leading-7 text-white/65">
              Replace these cards with your real services, launches, startup wins, or portfolio pieces.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              "AI products and automation systems",
              "Premium web experiences and landing pages",
              "Brand strategy, growth, and digital positioning",
            ].map((item, index) => (
              <div
                key={item}
                className="group min-h-[240px] rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/40">0{index + 1}</div>
                  <div className="h-10 w-10 rounded-2xl bg-white/10 transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <h3 className="mt-12 max-w-xs text-2xl font-semibold">{item}</h3>
                <p className="mt-4 leading-7 text-white/60">
                  Clean section for showcasing your expertise with room for descriptions, links, and proof points.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Projects</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Live portfolio work</h2>
            </div>
            {errorMessage ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                Could not load some project data: {errorMessage}
              </p>
            ) : null}
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
                      // eslint-disable-next-line @next/next/no-img-element
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
                No projects yet. Add projects from the admin panel and they will appear here.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
