import Reveal from "@/components/Reveal";
import type { Award } from "@/data/achievements";

export default function AchievementTimeline({ awards }: { awards: Award[] }) {
  return (
    <ol className="border-t border-rule">
      {awards.map((award, index) => (
        <li key={award.title} className="border-b border-rule">
          <Reveal delay={index * 0.06}>
            <article className="rail-grid py-10">
              <p className="meta lg:pt-2">{award.date.toLowerCase()}</p>
              <div>
                <h3 className="text-2xl font-light tracking-tight sm:text-3xl">
                  {award.title}
                </h3>
                {award.org ? (
                  <p className="mt-2 text-sm text-dim">{award.org}</p>
                ) : null}
                <p className="mt-5 prose-measure font-normal leading-relaxed text-dim">
                  {award.note}
                </p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
