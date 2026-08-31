"use client";

import { useEffect, useState } from "react";
import { getSkills, authFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { Skill } from "@/lib/types";

const emptyForm = { name: "", category: "backend", level: 3 };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setSkills(await getSkills());
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(skill: Skill) {
    setForm({ name: skill.name, category: skill.category, level: skill.level });
    setEditingId(skill.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingId) {
        await authFetch(`/api/skills/${editingId}`, token, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await authFetch(`/api/skills/`, token, {
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
    await authFetch(`/api/skills/${id}`, token, { method: "DELETE" });
    await load();
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Ko'nikmalar</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          <Plus size={16} /> Yangi ko'nikma
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <div>
              <p className="font-medium">{skill.name}</p>
              <p className="text-sm text-muted">{skill.category} · {skill.level}/5</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(skill)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-foreground">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(skill.id)} className="p-2 rounded-lg hover:bg-background text-muted hover:text-red-400">
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
              <h2 className="font-semibold">{editingId ? "Tahrirlash" : "Yangi ko'nikma"}</h2>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={18} className="text-muted" />
              </button>
            </div>

            <label className="block text-sm text-muted mb-1">Nomi</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" required />

            <label className="block text-sm text-muted mb-1">Kategoriya</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent">
              <option value="backend">backend</option>
              <option value="frontend">frontend</option>
              <option value="mobile">mobile</option>
              <option value="3d_cad">3d_cad</option>
              <option value="ai">ai</option>
            </select>

            <label className="block text-sm text-muted mb-1">Daraja (1-5)</label>
            <input type="number" min={1} max={5} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent" required />

            <button type="submit" disabled={saving} className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
