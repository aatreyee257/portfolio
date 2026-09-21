"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { disciplines } from "@/data/disciplines";

export default function WhatIBuild() {
  const [activeId, setActiveId] = useState(disciplines[0].id);
  const reduced = useReducedMotion();
  const active =
    disciplines.find((item) => item.id === activeId) ?? disciplines[0];

  return (
    <div className="rail-grid">
      <p className="meta pt-2">four areas</p>

      <div className="grid gap-px border border-rule bg-rule lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="bg-void">
          {disciplines.map((item) => {
            const selected = item.id === active.id;
            return (
              <li key={item.id} className="border-b border-rule last:border-b-0">
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={selected}
                  className={[
                    "group flex w-full items-center gap-4 px-5 py-6 text-left transition-colors duration-300 sm:px-7 sm:py-7",
                    selected
                      ? "bg-raised text-ink"
                      : "text-muted hover:bg-panel hover:text-dim",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className={[
                      "font-mono text-xs transition-colors duration-300",
                      selected ? "text-accent" : "text-rule-strong",
                    ].join(" ")}
                  >
                    {selected ? "@" : "·"}
                  </span>
                  <span className="text-lg font-light sm:text-xl">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="bg-panel p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-[46ch] text-lg font-normal leading-relaxed text-ink">
                {active.line}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <li
                    key={tech}
                    className="border border-rule px-3 py-1.5 font-mono text-xs text-dim"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <ul className="mt-8 space-y-2 border-t border-rule pt-6">
                {active.refs.map((ref) => (
                  <li key={ref.href + ref.label}>
                    <Link
                      href={ref.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {ref.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
