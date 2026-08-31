"use client";

import { motion } from "framer-motion";
import { Send, Code2, Mail, Camera, Briefcase, Download } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import type { SiteSettings } from "@/lib/types";

export function ContactContent({ settings }: { settings: SiteSettings }) {
  const contacts = [
    { label: "Telegram", sub: "Bog'lanish va kanalim", href: settings.telegram_url, icon: Send },
    { label: "GitHub", sub: "Loyihalarim", href: settings.github_url, icon: Code2 },
    { label: "Email", sub: settings.email, href: settings.email ? `mailto:${settings.email}` : null, icon: Mail },
    { label: "Instagram", sub: "Profilim", href: settings.instagram_url, icon: Camera },
    { label: "LinkedIn", sub: "Professional profil", href: settings.linkedin_url, icon: Briefcase },
  ].filter((c) => c.href);

  return (
    <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold tracking-tight mb-3"
      >
        Kontakt
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-muted mb-10"
      >
        Loyiha taklifi, hamkorlik yoki shunchaki salom aytish uchun bog'lanishdan tortinma.
      </motion.p>

      {contacts.length === 0 ? (
        <p className="text-muted mb-10">Kontakt havolalari hali qo'shilmagan.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contacts.map((contact) => (
            <TiltCard key={contact.label} href={contact.href!} target="_blank" className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <contact.icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-medium">{contact.label}</p>
                  <p className="text-sm text-muted">{contact.sub}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}

      {settings.cv_url && (
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          href={settings.cv_url}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={16} /> CV yuklab olish
        </motion.a>
      )}
    </main>
  );
}
