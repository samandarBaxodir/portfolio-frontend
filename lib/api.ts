const API_URL = "http://127.0.0.1:8000";

export async function getProjects(category?: string) {
  const url = category
    ? `${API_URL}/api/projects/?category=${category}`
    : `${API_URL}/api/projects/`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Loyihalarni yuklab bo'lmadi");
  return res.json();
}

export async function getSkills() {
  const res = await fetch(`${API_URL}/api/skills/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Ko'nikmalarni yuklab bo'lmadi");
  return res.json();
}

export async function getBlogPosts() {
  const res = await fetch(`${API_URL}/api/blog/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Postlarni yuklab bo'lmadi");
  return res.json();
}

export async function getBlogPost(slug: string) {
  const res = await fetch(`${API_URL}/api/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Post topilmadi");
  return res.json();
}

export async function getAchievements() {
  const res = await fetch(`${API_URL}/api/achievements/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Yutuqlarni yuklab bo'lmadi");
  return res.json();
}

export async function getSettings() {
  const res = await fetch(`${API_URL}/api/settings/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Sozlamalarni yuklab bo'lmadi");
  return res.json();
}


export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login yoki parol xato");
  return res.json();
}

export async function authFetch(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "So'rov xato bilan tugadi");
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function uploadFile(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/api/upload/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Fayl yuklab bo'lmadi");
  return res.json();
}
