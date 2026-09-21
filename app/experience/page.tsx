import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles at Monash University, IBM, GSK and Itie — cloud infrastructure, data engineering and applied AI.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        rail="/experience"
        title="Experience"
        lede="Five roles across research, data engineering, cloud infrastructure and applied AI. Listed most recent first."
      />

      <section className="shell pt-8 sm:pt-12">
        <ExperienceTimeline entries={experience} />
      </section>
    </>
  );
}
