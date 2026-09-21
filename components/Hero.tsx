"use client";

import { motion, useReducedMotion } from "framer-motion";
import CommandLink from "@/components/CommandLink";
import ASCIIBackground from "@/components/ASCIIBackground";
import { site } from "@/data/site";

export default function Hero() {
  const reduced = useReducedMotion();

  const sequence = (delay: number) =>
    reduced
      ? { initial: undefined, animate: undefined, transition: undefined }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <ASCIIBackground variant="hero" />

      <div className="shell flex flex-1 items-center pt-28 pb-16">
        <div className="w-full">
          <motion.p {...sequence(0.05)} className="meta">
            {site.location.toLowerCase()} — {site.study.toLowerCase()}
          </motion.p>

          <motion.h1
            {...sequence(0.14)}
            className="mt-6 text-[clamp(2.75rem,11vw,7.5rem)] font-light leading-[0.92] tracking-[-0.045em]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            {...sequence(0.24)}
            className="mt-6 font-mono text-sm text-dim sm:text-base"
          >
            {site.roles.join(" • ")}
          </motion.p>

          <motion.p
            {...sequence(0.32)}
            className="mt-8 max-w-[34ch] text-xl font-normal leading-snug text-ink sm:max-w-[46ch] sm:text-2xl"
          >
            {site.statement}
          </motion.p>

          <motion.div
            {...sequence(0.42)}
            className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <CommandLink
              href="/experience"
              label="Explore my experience"
              path="~/experience"
            />
            <CommandLink
              href="/projects"
              label="View my projects"
              path="~/projects"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
