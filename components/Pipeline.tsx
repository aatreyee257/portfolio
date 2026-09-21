"use client";

import { motion, useReducedMotion } from "framer-motion";

type Stage = { label: string; note?: string };

export default function Pipeline({ stages }: { stages: Stage[] }) {
  const reduced = useReducedMotion();

  return (
    <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
      {stages.map((stage, index) => (
        <motion.li
          key={stage.label}
          className="relative bg-void p-5 sm:p-6"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.45,
            delay: reduced ? 0 : index * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="flex items-center gap-3">
            <span aria-hidden className="font-mono text-xs text-rule-strong">
              {index === stages.length - 1 ? "=" : String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-rule" aria-hidden />
          </div>

          <p
            className={[
              "mt-5 text-base leading-snug",
              index === stages.length - 1
                ? "font-mono text-accent"
                : "font-light text-ink",
            ].join(" ")}
          >
            {stage.label}
          </p>

          {stage.note ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {stage.note}
            </p>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}
