"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { isLoggedIn, clearToken } from "@/lib/auth";
import { LayoutDashboard, FolderKanban, Star, FileText, Award, Settings, LogOut } from "lucide-react";

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

  if (pathname === "/admin/login") return <>{children}</>;
  if (!checked) return null;

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  return (
    <div className="flex-1 flex">
      <aside className="w-56 shrink-0 border-r border-border p-4 flex flex-col">
        <p className="text-xs text-muted uppercase tracking-wide mb-4 px-2">
          Admin
        </p>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-foreground hover:bg-card"
                }`}
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
      <div className="flex-1">{children}</div>
    </div>
  );
}
