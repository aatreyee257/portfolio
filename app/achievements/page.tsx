import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import AchievementTimeline from "@/components/AchievementTimeline";
import Reveal from "@/components/Reveal";
import { awards, talks } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Hackathon and competition results, plus seminars and technical presentations delivered.",
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        rail="/achievements"
        title="Achievements"
        lede="Competition results, and the seminars and technical sessions I have presented."
      />

      <section className="shell pt-16 sm:pt-24">
        <SectionHeading rail="awards" title="Awards" />
        <div className="mt-10">
          <AchievementTimeline awards={awards} />
        </div>
      </section>

      <section className="shell pt-24 sm:pt-32">
        <SectionHeading
          rail="speaking"
          title="Seminars and presentations"
          lede="Sessions delivered to student and academic audiences."
        />
        <ol className="mt-10 border-t border-rule">
          {talks.map((talk, index) => (
            <li key={talk.title} className="border-b border-rule">
              <Reveal delay={Math.min(index * 0.04, 0.16)}>
                <div className="rail-grid py-7">
                  <p className="meta lg:pt-1.5">
                    {talk.audience ? talk.audience : "seminar"}
                  </p>
                  <p className="prose-measure text-lg font-normal leading-snug">
                    {talk.title}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
