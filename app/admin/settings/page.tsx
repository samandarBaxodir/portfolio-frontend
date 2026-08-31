"use client";

import { useEffect, useState } from "react";
import { getSettings, authFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { SiteSettings } from "@/lib/types";

const empty: SiteSettings = {
  telegram_url: "",
  github_url: "",
  email: "",
  instagram_url: "",
  linkedin_url: "",
  cv_url: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings().then((data) =>
      setForm({
        telegram_url: data.telegram_url || "",
        github_url: data.github_url || "",
        email: data.email || "",
        instagram_url: data.instagram_url || "",
        linkedin_url: data.linkedin_url || "",
        cv_url: data.cv_url || "",
      })
    );
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    setSaving(true);
    setSaved(false);
    try {
      await authFetch(`/api/settings/`, token, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setSaved(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Xato yuz berdi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="p-8 max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Kontakt sozlamalari</h1>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6">
        <label className="block text-sm text-muted mb-1">Telegram URL</label>
        <input value={form.telegram_url ?? ""} onChange={(e) => setForm({ ...form, telegram_url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" placeholder="https://t.me/username" />

        <label className="block text-sm text-muted mb-1">GitHub URL</label>
        <input value={form.github_url ?? ""} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" placeholder="https://github.com/username" />

        <label className="block text-sm text-muted mb-1">Email</label>
        <input value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" placeholder="salom@example.com" />

        <label className="block text-sm text-muted mb-1">Instagram URL</label>
        <input value={form.instagram_url ?? ""} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" placeholder="https://instagram.com/username" />

        <label className="block text-sm text-muted mb-1">LinkedIn URL</label>
        <input value={form.linkedin_url ?? ""} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-3 outline-none focus:border-accent" placeholder="https://linkedin.com/in/username" />

        <label className="block text-sm text-muted mb-1">CV URL</label>
        <input value={form.cv_url ?? ""} onChange={(e) => setForm({ ...form, cv_url: e.target.value })} className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent" placeholder="/static/uploads/cv.pdf" />

        <button type="submit" disabled={saving} className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? "Saqlanmoqda..." : saved ? "Saqlandi ✓" : "Saqlash"}
        </button>
      </form>
    </main>
  );
}
