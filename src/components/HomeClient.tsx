"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
};

type HomeClientProps = {
  projects: Project[];
  errorMessage?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export default function HomeClient({
  projects,
  errorMessage,
}: HomeClientProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 right-[-8%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/15 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between py-4"
        >
          <div>
            <div className="text-lg font-semibold tracking-wide md:text-xl">
              Artem Kalus
            </div>
            <div className="text-sm text-white/50">
              Full-stack developer • product builder
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <Link
              href="/admin"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Admin
            </Link>
          </div>
        </motion.nav>

        <section className="grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md"
            >
              ✨ Modern full-stack portfolio
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-semibold leading-[0.94] tracking-tight md:text-7xl"
            >
              Building polished
              <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                full-stack products with premium motion.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg"
            >
              I build modern web apps with Next.js, Supabase, secure auth flows,
              admin tooling, and clean product experiences that feel fast,
              sharp, and production-ready.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.16)]"
              >
                View Projects
              </motion.a>
              <motion.a
                href="https://github.com/kalusartem/Full-Stack-Portfolio-2"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md"
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/artemkalus/"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md"
              >
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-white/10 via-fuchsia-400/10 to-cyan-400/10 blur-2xl"
              animate={{ rotate: [0, 4, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8 [transform-style:preserve-3d]"
            >
              <div className="flex min-h-[420px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                <div>
                  <div className="flex items-center gap-2">
                    {[0, 0.2, 0.4].map((delay, index) => (
                      <motion.span
                        key={index}
                        className={`h-3 w-3 rounded-full ${index === 0 ? "bg-white/50" : index === 1 ? "bg-white/25" : "bg-white/15"}`}
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                  <div className="mt-10 space-y-4">
                    {["w-2/3", "w-5/6", "w-1/2"].map((width, i) => (
                      <motion.div
                        key={width}
                        className={`h-6 rounded-full bg-white/10 ${width}`}
                        animate={{ opacity: [0.35, 0.8, 0.35], x: [0, 12, 0] }}
                        transition={{
                          duration: 3.1,
                          repeat: Infinity,
                          delay: i * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-10">
                  {[
                    { label: "Published", value: String(projects.length) },
                    { label: "Stack", value: "Next" },
                    { label: "Backend", value: "Supa" },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-2xl font-semibold">{item.value}</div>
                      <div className="mt-1 text-xs text-white/60">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="grid gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Secure apps, smooth UX, and modern frontend motion.
            </h2>
            <p className="mt-6 max-w-2xl leading-8 text-white/70">
              This portfolio combines a server-rendered Next.js stack with a
              more premium client-side experience. It showcases live projects,
              admin management, OAuth auth, row-level security, and a cleaner
              visual system.
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid gap-4">
            {[
              [
                "Product thinking",
                "I care about how software feels, not just how it functions.",
              ],
              [
                "Full-stack execution",
                "Frontend polish, backend data flows, auth, and deployment all working together.",
              ],
              [
                "Production focus",
                "I build with maintainability, performance, and real usage in mind.",
              ],
            ].map(([title, text]) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-white/65">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-16"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Projects
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Selected work
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/55">
              {errorMessage
                ? "Project feed returned an error."
                : `${projects.length} published project${projects.length === 1 ? "" : "s"} currently live.`}
            </p>
          </motion.div>
          {errorMessage ? (
            <motion.div
              variants={fadeUp}
              className="rounded-[1.5rem] border border-red-500/30 bg-red-500/10 p-5 text-red-100"
            >
              <p className="font-mono text-sm">{errorMessage}</p>
              <p className="mt-2 text-sm text-red-100/75">
                If this is a policy issue, check public read access for
                published projects.
              </p>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-white/70"
            >
              No projects yet. Add one in{" "}
              <Link href="/admin/projects" className="underline">
                /admin/projects
              </Link>{" "}
              and publish it.
            </motion.div>
          ) : (
            <motion.div
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  variants={fadeUp}
                  whileHover={{
                    y: -10,
                    rotateX: 4,
                    rotateY: index % 2 === 0 ? -3 : 3,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl [transform-style:preserve-3d]"
                >
                  {project.image_url ? (
                    <div className="overflow-hidden border-b border-white/10">
                      <motion.img
                        src={project.image_url}
                        alt={project.title}
                        className="h-52 w-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-52 items-center justify-center border-b border-white/10 bg-gradient-to-br from-white/10 to-transparent text-sm text-white/45">
                      Project Preview
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <div className="flex gap-3 text-sm text-white/70">
                        {project.repo_url ? (
                          <a
                            className="transition hover:text-white"
                            href={project.repo_url}
                            rel="noreferrer"
                          >
                            Repo
                          </a>
                        ) : null}
                        {project.live_url ? (
                          <a
                            className="transition hover:text-white"
                            href={project.live_url}
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-4 flex-1 leading-7 text-white/65">
                      {project.description}
                    </p>
                    {project.tags?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="contact"
          className="py-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Let’s build something sharp.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
              Reach out for product builds, full-stack work, startup landing
              pages, or UI refreshes with a more premium feel.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black"
              >
                Email Me
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/artemkalus/"
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white"
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
