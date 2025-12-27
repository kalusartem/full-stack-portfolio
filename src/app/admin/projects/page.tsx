"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

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
  file?: File; // when user selects a new image
  path?: string | null; // Supabase Storage path (existing)
  url?: string; // public URL for preview
  name?: string; // display name (derived)
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

  const load = async () => {
    setLoading(true);
    setMsg("");

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) setMsg(`Load error: ${error.message}`);
    setProjects((data as Project[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const reset = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
  };

  const save = async () => {
    debugger;
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

    const res = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);

    if (res.error) {
      setMsg(`Save error: ${res.error.message}`);
      return;
    }

    if (file?.type && payload.image_path !== imageFile?.path) {
      await deleteImage(imageFile?.path || "");
    }

    setImage(null);
    reset();
    await load();
    setMsg("Saved ✅");
  };

  const deleteImage = async (image_path: string) => {
    const { error: imgErr } = await supabase.storage
      .from("project-images")
      .remove([image_path]);
    if (imgErr) return setMsg(`Image delete error: ${imgErr.message}`);
  };

  const saveFile = async () => {
    if (imageFile?.file) {
      const file = imageFile.file;
      const ext = file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) {
        setMsg(`Image upload error: ${error.message}`);
        return;
      }

      return data.path;
    }
    return null;
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
    debugger;
    if (p.image_name) {
      setImage({ name: p.image_name, path: p.image_path });
    }
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setMsg("");

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      setMsg(`Delete error: ${error.message}`);
      return;
    }
    await load();
    setMsg("Deleted ✅");
  };

  return (
    <main className="p-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <p className="text-gray-600">
          Create, edit, reorder, publish/unpublish.
        </p>
      </header>

      <section className="rounded border p-4 space-y-3">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit project" : "New project"}
        </h2>

        <div className="grid gap-3 max-w-2xl">
          <input
            className="border rounded px-3 py-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <textarea
            className="border rounded px-3 py-2 min-h-24"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Tags (comma-separated) e.g. nextjs, supabase, rls"
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Live URL (optional)"
            value={form.live_url}
            onChange={(e) =>
              setForm((f) => ({ ...f, live_url: e.target.value }))
            }
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Repo URL (optional)"
            value={form.repo_url}
            onChange={(e) =>
              setForm((f) => ({ ...f, repo_url: e.target.value }))
            }
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Image URL (optional)"
            value={form.image_url}
            onChange={(e) =>
              setForm((f) => ({ ...f, image_url: e.target.value }))
            }
          />
          <label className="inline-block">
            <span className="cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm">
              Choose image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const newImageFile = { ...imageFile };
                newImageFile.file = e.target.files?.[0] ?? undefined;
                debugger;
                setImage(newImageFile);
              }}
            />
          </label>

          {imageFile && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {imageFile.name}
            </p>
          )}

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) =>
                  setForm((f) => ({ ...f, is_published: e.target.checked }))
                }
              />
              Published
            </label>

            <label className="flex items-center gap-2">
              Sort
              <input
                type="number"
                className="border rounded px-2 py-1 w-24"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
                }
              />
            </label>
          </div>

          <div className="flex gap-3">
            <button
              className="rounded bg-gray-900 text-white px-4 py-2"
              onClick={save}
            >
              Save
            </button>
            {editingId && (
              <button className="rounded bg-gray-200 px-4 py-2" onClick={reset}>
                Cancel
              </button>
            )}
          </div>

          {msg && <p className="text-sm font-mono">{msg}</p>}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Existing projects</h2>

        {loading ? (
          <p>Loading…</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">
            No projects yet. Create your first one above.
          </p>
        ) : (
          <div className="grid gap-3">
            {projects.map((p) => (
              <div key={p.id} className="rounded border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{p.title}</h3>
                      {!p.is_published && (
                        <span className="text-xs rounded bg-gray-200 px-2 py-1">
                          Unpublished
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{p.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Tags: {(p.tags ?? []).join(", ") || "—"} | Sort:{" "}
                      {p.sort_order}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="rounded bg-gray-200 px-3 py-1"
                      onClick={() => edit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded bg-red-600 text-white px-3 py-1"
                      onClick={() => del(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
