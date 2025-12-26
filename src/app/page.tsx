import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  image_path: string | null; // ✅ added
  sort_order: number;
  created_at: string;
};

export default async function HomePage() {
  const { data, error } = await supabaseServer
    .from("projects")
    .select(
      "id,title,description,tags,live_url,repo_url,image_url,image_path,sort_order,created_at",
    ) // ✅ includes both image_url and image_path
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = (data ?? []) as Project[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Artem Kalus</h1>
        <p className="text-lg text-gray-600">
          Full-stack developer — Next.js, Supabase, OAuth, RLS.
        </p>

        <div className="flex gap-3">
          <a
            className="rounded bg-gray-900 text-white px-4 py-2"
            href="https://github.com/kalusartem/Full-Stack-Portfolio-2"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="rounded bg-gray-200 px-4 py-2"
            href="https://www.linkedin.com/in/artemkalus/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <Link className="rounded bg-gray-200 px-4 py-2" href="/admin">
            Admin
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-sm text-gray-500">
            {error ? "Error loading projects" : `${projects.length} published`}
          </p>
        </div>

        {error ? (
          <div className="rounded border p-4">
            <p className="font-mono text-sm text-red-600">{error.message}</p>
            <p className="text-sm text-gray-600 mt-2">
              If this says “permission denied”, your RLS policy for public reads
              isn’t set yet.
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded border p-6 text-gray-600">
            No projects yet. Add one in{" "}
            <Link className="underline" href="/admin/projects">
              /admin/projects
            </Link>{" "}
            and make sure it’s published.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => {
              // ✅ prefer storage image_path, fallback to image_url
              let imgUrl: string | null = p.image_url ?? null;

              if (p.image_path) {
                const { data } = supabaseServer.storage
                  .from("project-images")
                  .getPublicUrl(p.image_path);

                imgUrl = data.publicUrl;
              }

              return (
                <article key={p.id} className="rounded border p-5 space-y-3">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={p.title}
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : null}

                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {p.repo_url && (
                        <a
                          className="text-sm underline"
                          href={p.repo_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Repo
                        </a>
                      )}
                      {p.live_url && (
                        <a
                          className="text-sm underline"
                          href={p.live_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700">{p.description}</p>

                  {p.tags?.length ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs rounded bg-gray-100 px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="pt-8 border-t text-sm text-gray-500">
        Built with Next.js + Supabase (OAuth, RLS, admin CRUD).
      </footer>
    </main>
  );
}
