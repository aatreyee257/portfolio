import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SkillExplorer from "@/components/SkillExplorer";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, infrastructure, development and database technologies, each linked to the work that used them.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        rail="/skills"
        title="Skills"
        lede="Select a technology to see which roles and projects on this site actually used it. Where nothing is linked, nothing is claimed."
      />

      <section className="shell pt-16 sm:pt-20">
        <SkillExplorer />
      </section>
    </>
  );
}
