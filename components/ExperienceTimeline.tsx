import Reveal from "@/components/Reveal";
import type { Experience } from "@/data/experience";

type Props = {
  entries: Experience[];
  compact?: boolean;
};

export default function ExperienceTimeline({ entries, compact = false }: Props) {
  return (
    <ol className="relative">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          id={entry.id}
          className="scroll-mt-24 border-t border-rule first:border-t-0"
        >
          <Reveal delay={Math.min(index * 0.05, 0.2)}>
            <article className="rail-grid py-9 sm:py-12">
              <div className="flex items-baseline gap-3 lg:block">
                <p className="meta whitespace-nowrap lg:pt-2">{entry.period}</p>
                {entry.end === "present" ? (
                  <p className="meta mt-0 flex items-center gap-2 lg:mt-3">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    current
                  </p>
                ) : null}
              </div>

              <div>
                <h3 className="text-2xl font-light tracking-tight sm:text-3xl">
                  {entry.role}
                </h3>
                <p className="mt-2 text-sm text-dim">
                  {entry.org}
                  {entry.unit ? (
                    <span className="text-muted"> — {entry.unit}</span>
                  ) : null}
                </p>

                <p className="mt-5 prose-measure font-normal leading-relaxed text-dim">
                  {entry.summary}
                </p>

                {!compact ? (
                  <ul className="mt-7 space-y-3 prose-measure">
                    {entry.detail.map((line) => (
                      <li
                        key={line}
                        className="grid grid-cols-[1.25rem_1fr] text-sm leading-relaxed text-dim"
                      >
                        <span aria-hidden className="font-mono text-rule-strong">
                          +
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {entry.stack.map((tech) => (
                    <li key={tech} className="font-mono text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
