"use client";

import { useEffect, useState } from "react";
import { getBlogPosts, authFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { BlogPost } from "@/lib/types";

const emptyForm = { title: "", slug: "", content: "", tags: "" };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setPosts(await getBlogPosts());
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(post: BlogPost) {
    setForm({ title: post.title, slug: post.slug, content: post.content, tags: post.tags || "" });
    setEditingId(post.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingId) {
        await authFetch(`/api/blog/${editingId}`, token, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await authFetch(`/api/blog/`, token, {
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
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await authFetch(`/api/blog/${id}`, token, { method: "DELETE" });
    await load();
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Yangi post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-muted">/{post.slug}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-foreground">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{editingId ? "Tahrirlash" : "Yangi post"}</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={18} className="text-muted" />
              </button>
            </div>

            <label className="block text-sm text-muted mb-1">Sarlavha</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" required />

            <label className="block text-sm text-muted mb-1">Slug (URL uchun, masalan: birinchi-postim)</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" required />

            <label className="block text-sm text-muted mb-1">Matn</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" rows={6} required />

            <label className="block text-sm text-muted mb-1">Teglar (vergul bilan)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent" placeholder="Next.js, FastAPI" />

            <button type="submit" disabled={saving} className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
