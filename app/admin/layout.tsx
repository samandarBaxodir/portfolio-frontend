"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, clearToken } from "@/lib/auth";
import { LayoutDashboard, FolderKanban, Star, FileText, Award, Settings, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Boshqaruv", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Loyihalar", icon: FolderKanban },
  { href: "/admin/skills", label: "Ko'nikmalar", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/achievements", label: "Yutuqlar", icon: Award },
  { href: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }
    if (!isLoggedIn()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (!checked) return null;

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  return (
    <div className="flex-1 flex relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full glass"
      >
        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      <aside className={`fixed md:sticky top-0 left-0 h-full z-40 w-56 shrink-0 border-r border-border p-4 flex flex-col bg-background transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <p className="text-xs text-muted uppercase tracking-wide mb-4 px-2">Admin</p>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground hover:bg-card"}`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card transition-colors"
        >
          <LogOut size={16} /> Chiqish
        </button>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
