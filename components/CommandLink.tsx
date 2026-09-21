"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { playEnter } from "@/lib/sound";

type Props = {
  href: string;
  label: string;
  /** Shown as the shell path, e.g. "~/experience". */
  path: string;
};

/**
 * Hero call to action styled as a shell command.
 * Hover / focus: the command lights up and a caret appears.
 * Press: a short "enter" chirp plays, the box fills, and the command reads
 * "opening …" until the route changes.
 */
export default function CommandLink({ href, label, path }: Props) {
  const [pending, setPending] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="w-full sm:w-[19rem]"
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Link
        href={href}
        onClick={() => {
          playEnter();
          setPending(true);
        }}
        aria-busy={pending || undefined}
        className={[
          "group relative isolate flex w-full flex-col gap-2 overflow-hidden border bg-void/60 px-6 py-4 backdrop-blur-sm transition-colors duration-300",
          pending
            ? "border-accent"
            : "border-rule-strong hover:border-accent focus-visible:border-accent",
        ].join(" ")}
      >
        {/* Fill that sweeps in on hover and completes on press. */}
        <span
          aria-hidden
          className={[
            "absolute inset-0 -z-10 origin-left transition-transform duration-500 ease-out",
            pending
              ? "scale-x-100 bg-accent/20"
              : "scale-x-0 bg-accent/10 group-hover:scale-x-100 group-focus-visible:scale-x-100",
          ].join(" ")}
        />

        <span
          aria-hidden
          className={[
            "font-mono text-sm transition-colors duration-300",
            pending
              ? "text-accent"
              : "text-muted group-hover:text-accent group-focus-visible:text-accent",
          ].join(" ")}
        >
          $ {pending ? "opening" : "cd"} {path}
          {/* Outer span owns visibility; the inner caret owns the blink,
              so the animation never overrides the hover state. */}
          <span
            className={[
              "transition-opacity duration-200",
              pending
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
            ].join(" ")}
          >
            <span className="caret" />
          </span>
        </span>

        <span className="flex items-center justify-between gap-6 text-base text-ink">
          {label}
          <ArrowUpRight
            size={16}
            aria-hidden
            className="text-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </span>
      </Link>
    </motion.div>
  );
}
