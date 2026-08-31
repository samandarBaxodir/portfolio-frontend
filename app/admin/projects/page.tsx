"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { getProjects, authFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { Project } from "@/lib/types";

const emptyForm = {
  title: "",
  description: "",
  category: "software",
  tech_stack: "",
  media_url: "",
  github_url: "",
  demo_url: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(project: Project) {
    setForm({
      title: project.title,
      description: project.description || "",
      category: project.category,
      tech_stack: project.tech_stack || "",
      media_url: project.media_url || "",
      github_url: project.github_url || "",
      demo_url: project.demo_url || "",
    });
    setEditingId(project.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingId) {
        await authFetch(`/api/projects/${editingId}`, token, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await authFetch(`/api/projects/`, token, {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xato yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const token = getToken();
    if (!token) return;
    if (!confirm("Bu loyihani o'chirishni tasdiqlaysizmi?")) return;
    await authFetch(`/api/projects/${id}`, token, { method: "DELETE" });
    await load();
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Loyihalar</h1>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Yangi loyiha
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between bg-card border border-border rounded-xl p-4"
          >
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-muted">
                {project.category} · {project.tech_stack}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(project)}
                className="p-2 rounded-lg hover:bg-background text-muted hover:text-foreground"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg hover:bg-background text-muted hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                {editingId ? "Loyihani tahrirlash" : "Yangi loyiha"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={18} className="text-muted" />
              </button>
            </div>

            <label className="block text-sm text-muted mb-1">Nomi</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent"
              required
            />

            <label className="block text-sm text-muted mb-1">Tavsif</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent"
              rows={3}
            />

            <label className="block text-sm text-muted mb-1">Kategoriya</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent"
            >
              <option value="software">software</option>
              <option value="3d_cad">3d_cad</option>
            </select>

            <label className="block text-sm text-muted mb-1">Texnologiyalar (vergul bilan)</label>
            <input
              value={form.tech_stack}
              onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent"
              placeholder="Python, FastAPI"
            />

            <label className="block text-sm text-muted mb-1">Rasm</label>
            <div className="mb-3">
              <ImageUpload
               value={form.media_url}
                onChange={(url) => setForm({ ...form, media_url: url })}/>
              </div>

            <label className="block text-sm text-muted mb-1">GitHub URL</label>
            <input
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent"
            />

            <label className="block text-sm text-muted mb-1">Demo URL</label>
            <input
              value={form.demo_url}
              onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
