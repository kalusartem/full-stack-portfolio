"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
export const runtime = "edge";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  image_name: string | null;
  image_path: string | null;
  is_published: boolean;
  sort_order: number;
};

type ImageState = {
  file?: File;
  path?: string | null;
  url?: string;
  name?: string;
};

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  live_url: "",
  repo_url: "",
  image_url: "",
  image_name: "",
  is_published: true,
  sort_order: 0,
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StatusBanner({ msg }: { msg: string }) {
  const isError = /error/i.test(msg);
  const isSuccess = /saved|deleted/i.test(msg);

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm backdrop-blur-xl",
        isError && "border-red-400/30 bg-red-500/10 text-red-100",
        isSuccess && "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
        !isError && !isSuccess && "border-white/10 bg-white/5 text-white/75"
      )}
    >
      {msg}
    </div>
  );
}

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [imageFile, setImage] = useState<ImageState | null>(null);

  const tagsArray = useMemo(() => {
    return form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [form.tags]);

  const summary = useMemo(() => {
    const published = projects.filter((project) => project.is_published).length;
    return {
      total: projects.length,
      published,
      drafts: projects.length - published,
    };
  }, [projects]);

  const load = async () => {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/admin/projects", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      setMsg(`Load error: ${text || res.statusText}`);
      setProjects([]);
      setLoading(false);
      return;
    }

    const json = (await res.json()) as { projects: Project[] };
    setProjects(json.projects ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setImage(null);
  };

  const deleteImage = async (image_path: string) => {
    const res = await fetch("/api/admin/project-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: image_path }),
    });
    if (!res.ok) {
      const text = await res.text();
      setMsg(`Image delete error: ${text || res.statusText}`);
    }
  };

  const saveFile = async () => {
    if (imageFile?.file) {
      const file = imageFile.file;
      const fd = new FormData();
      fd.set("file", file);

      const res = await fetch("/api/admin/project-image", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        setMsg(`Image upload error: ${text || res.statusText}`);
        return;
      }

      const json = (await res.json()) as { path: string };
      return json.path;
    }
    return null;
  };

  const save = async () => {
    const uploadedPath = await saveFile();
    const file = imageFile?.file;

    setMsg("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: tagsArray,
      live_url: form.live_url.trim() || null,
      repo_url: form.repo_url.trim() || null,
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
      image_name: file?.name,
      image_path: file?.type ? uploadedPath : imageFile?.path,
    };

    if (!payload.title || !payload.description) {
      setMsg("Title and description are required.");
      return;
    }

    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    if (!res.ok) {
      const text = await res.text();
      setMsg(`Save error: ${text || res.statusText}`);
      return;
    }

    if (file?.type && payload.image_path !== imageFile?.path) {
      await deleteImage(imageFile?.path || "");
    }

    reset();
    await load();
    setMsg("Saved ✅");
  };

  const edit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      tags: (p.tags ?? []).join(", "),
      live_url: p.live_url ?? "",
      repo_url: p.repo_url ?? "",
      image_url: p.image_url ?? "",
      image_name: p.image_name ?? "",
      is_published: p.is_published,
      sort_order: p.sort_order ?? 0,
    });

    if (p.image_name || p.image_path) {
      setImage({ name: p.image_name ?? undefined, path: p.image_path });
    } else {
      setImage(null);
    }

    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id: string, image_path: string | null) => {
    if (!confirm("Delete this project?")) return;
    setMsg("");

    const url = new URL("/api/admin/projects", window.location.origin);
    url.searchParams.set("id", id);
    if (image_path) url.searchParams.set("image_path", image_path);

    const res = await fetch(url.toString(), { method: "DELETE" });
    if (!res.ok) {
      const text = await res.text();
      setMsg(`Delete error: ${text || res.statusText}`);
      return;
    }

    await load();
    setMsg("Deleted ✅");
  };

  return (
    <motion.main
      className="space-y-8"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.section
        variants={fadeUp}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Project manager</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Manage portfolio projects</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
              Create, edit, reorder, publish, and clean up your work from one modern admin screen.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-[320px]">
            {[
              { label: "Total", value: summary.total },
              { label: "Published", value: summary.published },
              { label: "Drafts", value: summary.drafts },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <div className="text-2xl font-semibold">{item.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Breadcrumbs
          className="mt-6"
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Projects" },
          ]}
        />
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <motion.section
          variants={fadeUp}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Editor</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                {editingId ? "Edit project" : "Create new project"}
              </h2>
            </div>
            {editingId && (
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-100">
                Editing existing item
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Title</label>
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                placeholder="Modern AI dashboard"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-white/70">Description</label>
              <textarea
                className="min-h-32 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                placeholder="Describe the project, outcome, stack, and why it matters."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-white/70">Tags</label>
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                placeholder="nextjs, supabase, framer-motion"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tagsArray.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm text-white/70">Live URL</label>
                <input
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  placeholder="https://yourproject.com"
                  value={form.live_url}
                  onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-white/70">Repo URL</label>
                <input
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                  placeholder="https://github.com/..."
                  value={form.repo_url}
                  onChange={(e) => setForm((f) => ({ ...f, repo_url: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-white/70">Image URL</label>
              <input
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                placeholder="Optional external image URL"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              />
            </div>

            <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Project image</p>
                  <p className="mt-1 text-sm text-white/50">Upload a replacement image or keep the current file attached.</p>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Choose image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const nextFile = e.target.files?.[0] ?? undefined;
                      setImage((current) => ({
                        ...(current ?? {}),
                        file: nextFile,
                        name: nextFile?.name,
                      }));
                    }}
                  />
                </label>
              </div>

              {imageFile && (
                <p className="mt-3 text-sm text-white/60">
                  Selected: <span className="text-white">{imageFile.name || imageFile.path || "Attached image"}</span>
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span>
                  <span className="block text-sm font-medium text-white">Published</span>
                  <span className="mt-1 block text-xs text-white/45">Show this project on the live portfolio.</span>
                </span>
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
                  className="h-5 w-5 rounded border-white/20 bg-black/30 text-white"
                />
              </label>

              <label className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span className="block text-sm font-medium text-white">Sort order</span>
                <span className="mt-1 block text-xs text-white/45">Lower numbers can be used to prioritize featured work.</span>
                <input
                  type="number"
                  className="mt-3 w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/25"
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                className="rounded-2xl bg-white px-5 py-3 font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
                onClick={save}
              >
                {editingId ? "Save changes" : "Create project"}
              </button>
              {editingId && (
                <button
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                  onClick={reset}
                >
                  Cancel edit
                </button>
              )}
            </div>

            {msg && <StatusBanner msg={msg} />}
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">Inventory</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Existing projects</h2>
            </div>
            <button
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              onClick={load}
            >
              Refresh
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="h-5 w-32 rounded bg-white/10" />
                    <div className="mt-3 h-4 w-full rounded bg-white/5" />
                    <div className="mt-2 h-4 w-2/3 rounded bg-white/5" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-6 text-center text-white/55">
                No projects yet. Create your first one in the editor.
              </div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
                {projects.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={fadeUp}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em]",
                              p.is_published
                                ? "bg-emerald-500/15 text-emerald-100"
                                : "bg-white/10 text-white/60"
                            )}
                          >
                            {p.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">{p.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {(p.tags ?? []).length > 0 ? (
                            p.tags.map((tag) => (
                              <span key={`${p.id}-${tag}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-white/35">No tags</span>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-white/40">
                          <span>Sort {p.sort_order}</span>
                          {p.live_url && <span>Live linked</span>}
                          {p.repo_url && <span>Repo linked</span>}
                          {p.image_path || p.image_url ? <span>Image attached</span> : <span>No image</span>}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                          onClick={() => edit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-2xl bg-red-500/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                          onClick={() => del(p.id, p.image_path)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
