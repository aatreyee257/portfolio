import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { education } from "@/data/education";

export const metadata: Metadata = {
  title: "About",
  description:
    "Master of Information Technology student at Monash University, working across cloud infrastructure, data engineering and applied AI.",
};

const arc = [
  { year: "2022", label: "EEG signal work and accessibility technology", org: "Itie" },
  { year: "2024", label: "Python ETL and reusable data connectors", org: "GSK" },
  { year: "2024—26", label: "Terraform and IBM Cloud VPC", org: "IBM" },
  { year: "2026", label: "RAG evaluation and data migration", org: "Monash University" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        rail="/about"
        title="About"
        lede="I work across cloud infrastructure, software engineering and applied AI, currently in Melbourne."
      />

      <section className="shell pt-16 sm:pt-24">
        <div className="rail-grid">
          <p className="meta lg:pt-2">background</p>
          <div className="prose-measure space-y-6 text-lg font-normal leading-relaxed text-dim">
            <p>
              My work sits between infrastructure and the systems built on top
              of it. At IBM I wrote Terraform configurations that provisioned
              more than a hundred IBM Cloud resources and Go test suites covering
              IBM Cloud VPC, a service used by over ten thousand enterprise
              customers. Automating that provisioning cut manual configuration by
              sixty percent.
            </p>
            <p>
              Before that, at GSK, I built Python ETL processes for CoDi,
              decoupling the pipeline from Talend and replacing it with reusable
              connectors for Blob Storage, SFTP, NAS and ADLS Gen2, tested with
              pytest and shipped through Azure DevOps. My earliest technical work
              was EEG signal preprocessing at Itie, supporting educational
              technology for dyslexic learners.
            </p>
            <p>
              I am now completing a Master of Information Technology at Monash
              University. Alongside it I evaluate retrieval-augmented LLM systems
              for the university&rsquo;s assistive technology team — measuring
              semantic accuracy, reducing hallucinated output, and working with
              locally hosted models so data stays under institutional control —
              and support the Nimbus data migration in the T&amp;A FLEX program.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pt-24 sm:pt-32">
        <SectionHeading rail="arc" title="How the work moved" />
        <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {arc.map((step, index) => (
            <li key={step.year} className="bg-void p-6 sm:p-7">
              <Reveal delay={index * 0.05}>
                <p className="font-mono text-sm text-accent">{step.year}</p>
                <p className="mt-4 text-base font-normal leading-snug text-ink">
                  {step.label}
                </p>
                <p className="mt-3 text-sm text-muted">{step.org}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pt-24 sm:pt-32">
        <SectionHeading rail="education" title="Education" />
        <div className="mt-12 border-t border-rule">
          {education.map((item) => (
            <div key={item.degree} className="rail-grid border-b border-rule py-10">
              <p className="meta lg:pt-2">{item.period.toLowerCase()}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <h3 className="text-2xl font-light tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-sm text-dim">{item.institution}</p>
                  <p className="mt-1 text-sm text-muted">{item.place}</p>
                </div>
                {item.note ? (
                  <p className="font-mono text-sm text-dim">{item.note}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
