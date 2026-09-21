"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillGroups, type Skill } from "@/data/skills";

/** Glyph density = how many roles or projects on this site reference the
 *  technology. It is a count of documented work, not a self-rated level. */
function glyph(count: number) {
  if (count >= 3) return "#";
  if (count === 2) return "+";
  if (count === 1) return "-";
  return "·";
}

function Panel({ skill }: { skill: Skill }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={skill.id}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="border border-rule bg-panel p-6 sm:p-7"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-light tracking-tight">{skill.name}</h3>
          <span aria-hidden className="font-mono text-lg text-accent">
            {glyph(skill.evidence.length)}
          </span>
        </div>

        {skill.evidence.length > 0 ? (
          <ul className="mt-7 space-y-6">
            {skill.evidence.map((item) => (
              <li key={item.href + item.where}>
                <Link
                  href={item.href}
                  className="text-sm text-ink underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {item.where}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-7 text-sm leading-relaxed text-muted">
            Listed as a working technology. No role or project on this site
            documents it, so nothing is claimed for it here.
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function SkillExplorer() {
  const [activeId, setActiveId] = useState("terraform");

  const active =
    skillGroups.flatMap((group) => group.skills).find((s) => s.id === activeId) ??
    skillGroups[0].skills[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <div className="space-y-12">
        {skillGroups.map((group) => {
          const holdsActive = group.skills.some((s) => s.id === active.id);

          return (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h2
                id={`group-${group.id}`}
                className="meta border-b border-rule pb-3"
              >
                {group.title.toLowerCase()}
              </h2>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const selected = skill.id === active.id;
                  return (
                    <li key={skill.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(skill.id)}
                        aria-pressed={selected}
                        className={[
                          "inline-flex items-center gap-2.5 border px-4 py-2.5 text-sm transition-colors duration-300",
                          selected
                            ? "border-accent bg-raised text-ink"
                            : "border-rule text-dim hover:border-rule-strong hover:text-ink",
                        ].join(" ")}
                      >
                        <span
                          aria-hidden
                          className={
                            selected
                              ? "font-mono text-xs text-accent"
                              : "font-mono text-xs text-muted"
                          }
                        >
                          {glyph(skill.evidence.length)}
                        </span>
                        {skill.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {holdsActive ? (
                <div className="mt-6 lg:hidden">
                  <Panel skill={active} />
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-5">
          <Panel skill={active} />
          <p className="text-xs leading-relaxed text-muted">
            <span aria-hidden className="font-mono">
              · - + #
            </span>{" "}
            marks how many roles or projects on this site reference a
            technology. It is a count of documented work, not a proficiency
            rating.
          </p>
        </div>
      </aside>
    </div>
  );
}
