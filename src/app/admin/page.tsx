import Link from "next/link";

const quickActions = [
  {
    title: "Manage Projects",
    description: "Create, edit, reorder, and publish your portfolio items from one place.",
    href: "/admin/projects",
    cta: "Open project manager",
  },
  {
    title: "Preview Portfolio",
    description: "Open the public portfolio and review how your latest published content looks live.",
    href: "/",
    cta: "View website",
  },
];

const workflowCards = [
  {
    eyebrow: "01",
    title: "Add polished case studies",
    text: "Keep every project consistent with strong titles, clear descriptions, and tagged tech stacks.",
  },
  {
    eyebrow: "02",
    title: "Control publishing",
    text: "Hide unfinished work, publish strong pieces, and keep the homepage focused on your best work.",
  },
  {
    eyebrow: "03",
    title: "Keep the order premium",
    text: "Use sort order to push your highest-value projects to the top and shape the narrative of the brand.",
  },
];

export default function AdminPage() {
  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-10">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/60">
            Admin overview
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Clean, modern control panel for your portfolio.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            Use this space to manage portfolio content with the same premium feel as the public website.
            It is now styled like a founder dashboard instead of a plain utility screen.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/admin/projects"
              className="rounded-2xl bg-white px-6 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition hover:scale-[1.02]"
            >
              Manage Projects
            </Link>
            <a
              href="/auth/signout"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Sign out
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">Quick actions</p>
          <div className="mt-5 space-y-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <h2 className="text-lg font-semibold">{action.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">{action.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-white/80">{action.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {workflowCards.map((card) => (
          <div
            key={card.eyebrow}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
          >
            <p className="text-sm font-medium text-white/45">{card.eyebrow}</p>
            <h2 className="mt-4 text-xl font-semibold">{card.title}</h2>
            <p className="mt-3 leading-7 text-white/62">{card.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
