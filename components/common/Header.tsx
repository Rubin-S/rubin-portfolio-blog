"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm transition-all duration-300 mb-16 py-4"
    >
      <div className="mx-auto max-w-6xl px-4 flex justify-between items-center">
        {/* Site Identity - Research Paper Style */}
        <Link
          href="/"
          className="font-serif text-xl tracking-tight font-medium hover:opacity-70 transition-opacity"
        >
          Rubin S.
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-sm font-serif">
          <Link
            href="/blog"
            className="hover:underline underline-offset-4 decoration-1 transition-all"
          >
            Journal
          </Link>
          <Link
            href="/projects"
            className="hover:underline underline-offset-4 decoration-1 transition-all"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="hover:underline underline-offset-4 decoration-1 transition-all"
          >
            About
          </Link>

          <div className="h-4 w-[1px] bg-border/60 mx-2" />

          <Link
            href="/games"
            className="text-xs uppercase tracking-widest border border-border/60 px-3 py-1 rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            Bored?
          </Link>

          <div className="flex items-center gap-2 ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Breadcrumb (NAV-B inspired) */}
      {crumbs.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto max-w-6xl px-4 mt-3 text-[10px] uppercase tracking-widest opacity-50 font-mono"
        >
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">/</span>}
              {c}
            </span>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
