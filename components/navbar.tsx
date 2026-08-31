"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/projects", label: "Loyihalar" },
  { href: "/3d-cad", label: "3D & CAD" },
  { href: "/skills", label: "Ko'nikmalar" },
  { href: "/blog", label: "Blog" },
  { href: "/achievements", label: "Yutuqlar" },
  { href: "/contact", label: "Kontakt" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 glass"
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Salom
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
