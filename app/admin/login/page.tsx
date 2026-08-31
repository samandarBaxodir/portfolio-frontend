"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { login } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(username, password);
      saveToken(data.access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Login yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8"
      >
        <h1 className="text-xl font-semibold mb-6">Admin kirish</h1>

        <label className="block text-sm text-muted mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent"
          required
        />

        <label className="block text-sm text-muted mb-1">Parol</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 outline-none focus:border-accent"
          required
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </motion.form>
    </main>
  );
}
