import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import WhatIBuild from "@/components/WhatIBuild";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export default function HomePage() {
  const recent = experience.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="shell pt-24 sm:pt-32">
        <SectionHeading
          rail="what i build"
          title="Four things this work keeps coming back to"
          lede="Cloud infrastructure, software engineering, AI systems and data work — each one tied to a role or project on this site."
        />
        <div className="mt-12">
          <WhatIBuild />
        </div>
      </section>

      <section className="shell pt-28 sm:pt-36">
        <SectionHeading
          rail="experience"
          title="Where the work has happened"
          lede="Three most recent roles. The full record, with responsibilities, sits on the experience page."
        />
        <div className="mt-10 border-t border-rule">
          <ExperienceTimeline entries={recent} compact />
        </div>
        <div className="rail-grid border-t border-rule pt-8">
          <span />
          <Link
            href="/experience"
            className="group inline-flex items-center gap-3 text-sm text-dim transition-colors hover:text-accent"
          >
            View full experience
            <ArrowUpRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>

      <section className="shell pt-28 sm:pt-36">
        <SectionHeading
          rail="selected work"
          title="Two projects, built end to end"
        />
        <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <Link
                href={`/projects#${project.id}`}
                className="group flex h-full flex-col justify-between bg-void p-7 transition-colors duration-300 hover:bg-panel sm:p-10"
              >
                <div>
                  <p className="meta">{project.period.toLowerCase()}</p>
                  <h3 className="mt-5 text-2xl font-light tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-5 prose-measure text-sm leading-relaxed text-dim">
                    {project.tagline}
                  </p>
                </div>
                <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li key={tech} className="font-mono text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pt-28 sm:pt-36">
        <div className="rail-grid hairline pt-10">
          <p className="meta">contact</p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[28ch] text-2xl font-normal leading-snug sm:text-3xl">
              Open to conversations about infrastructure, tooling and applied AI.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-rule-strong px-6 py-4 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
              <ArrowUpRight
                size={15}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
