"use client";

import { useEffect, useState } from "react";
import { getAchievements, authFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { Achievement } from "@/lib/types";
import { ImageUpload } from "@/components/image-upload";

const emptyForm = { title: "", description: "", image_url: "" };

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setItems(await getAchievements());
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(item: Achievement) {
    setForm({ title: item.title, description: item.description || "", image_url: item.image_url || "" });
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingId) {
        await authFetch(`/api/achievements/${editingId}`, token, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await authFetch(`/api/achievements/`, token, {
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
    await authFetch(`/api/achievements/${id}`, token, { method: "DELETE" });
    await load();
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Yutuqlar</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Yangi yutuq
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-foreground">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{editingId ? "Tahrirlash" : "Yangi yutuq"}</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={18} className="text-muted" />
              </button>
            </div>

            <label className="block text-sm text-muted mb-1">Nomi</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" required />

            <label className="block text-sm text-muted mb-1">Tavsif</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" rows={3} />

            <label className="block text-sm text-muted mb-1">Rasm</label>
            <div className="mb-4">
              <ImageUpload
               value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
              />
              </div>

            <button type="submit" disabled={saving} className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
