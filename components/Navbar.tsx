"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes, focus returns to the trigger, background stops scrolling.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-rule bg-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-raised focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 text-ink"
          aria-label={`${site.name} — home`}
        >
          <span className="font-mono text-sm tracking-tight">
            {site.name.toLowerCase().replace(" ", "-")}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        <div className="flex items-center gap-3 md:gap-7">
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative py-1 text-sm transition-colors duration-300",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      className={[
                        "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                        active ? "w-full" : "w-0",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeToggle />

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-rule text-ink"
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            key="mobile-nav"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-rule bg-void/95 backdrop-blur-md"
          >
            <ul className="shell flex flex-col py-2">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="border-b border-rule last:border-b-0">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "flex items-center justify-between py-4 text-lg",
                        active ? "text-ink" : "text-dim",
                      ].join(" ")}
                    >
                      {item.label}
                      {active ? (
                        <span className="h-1 w-1 rounded-full bg-accent" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
