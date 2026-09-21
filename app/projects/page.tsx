import type { Metadata } from "next";
import { Award } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Pipeline from "@/components/Pipeline";
import DriftArchitecture from "@/components/DriftArchitecture";
import Reveal from "@/components/Reveal";
import { detectionFlow, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "InfraAlign, a Go CLI for Terraform drift detection, and an award-winning counterfeit packaging detection system.",
};

const [infraalign, counterfeit] = projects;

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        rail="/projects"
        title="Projects"
        lede="Two builds, shown as systems rather than screenshots: what goes in, what the program decides, and what comes out."
      />

      <article
        id={infraalign.id}
        className="shell scroll-mt-24 pt-16 sm:pt-24"
      >
        <div className="rail-grid">
          <div className="space-y-2 lg:pt-3">
            <p className="meta">{infraalign.period.toLowerCase()}</p>
            <p className="meta">{infraalign.team.toLowerCase()}</p>
          </div>

          <div>
            <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-light leading-[1] tracking-[-0.04em]">
              {infraalign.name}
            </h2>
            <p className="mt-6 prose-measure text-xl font-normal leading-snug text-ink">
              {infraalign.tagline}
            </p>

            <div className="mt-8 prose-measure space-y-5 leading-relaxed text-dim">
              {infraalign.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-6">
              {infraalign.stack.map((tech) => (
                <li key={tech} className="font-mono text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rail-grid">
          <p className="meta lg:pt-2">architecture</p>
          <Reveal>
            <DriftArchitecture />
          </Reveal>
        </div>
      </article>

      <article
        id={counterfeit.id}
        className="shell scroll-mt-24 pt-28 sm:pt-40"
      >
        <div className="rail-grid border-t border-rule pt-12">
          <div className="space-y-2 lg:pt-3">
            <p className="meta">{counterfeit.period.toLowerCase()}</p>
            <p className="meta">{counterfeit.team.toLowerCase()}</p>
          </div>

          <div>
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-light leading-[1.05] tracking-[-0.035em]">
              {counterfeit.name}
            </h2>

            {counterfeit.award ? (
              <p className="mt-6 inline-flex items-center gap-3 border border-accent/40 px-4 py-2.5 text-sm text-accent">
                <Award size={15} aria-hidden />
                {counterfeit.award}
              </p>
            ) : null}

            <p className="mt-7 prose-measure text-xl font-normal leading-snug text-ink">
              {counterfeit.tagline}
            </p>

            <div className="mt-8 prose-measure space-y-5 leading-relaxed text-dim">
              {counterfeit.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-6">
              {counterfeit.stack.map((tech) => (
                <li key={tech} className="font-mono text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rail-grid">
          <p className="meta lg:pt-2">detection flow</p>
          <Pipeline stages={detectionFlow} />
        </div>
      </article>
    </>
  );
}
