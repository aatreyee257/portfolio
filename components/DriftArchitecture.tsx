"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { infraFlow } from "@/data/projects";

const OUTCOME_COLOR: Record<string, string> = {
  matched: "text-ok",
  drifted: "text-drift",
  unmanaged: "text-unknown",
};

const OUTCOME_BORDER: Record<string, string> = {
  matched: "border-ok",
  drifted: "border-drift",
  unmanaged: "border-unknown",
};

function Branch({
  heading,
  steps,
}: {
  heading: string;
  steps: { label: string; note: string }[];
}) {
  return (
    <div className="bg-void p-6 sm:p-7">
      <p className="meta">{heading}</p>
      <ol className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <li key={step.label}>
            <div className="flex items-baseline gap-3">
              <span aria-hidden className="font-mono text-xs text-rule-strong">
                {index === steps.length - 1 ? "=" : "|"}
              </span>
              <div>
                <p
                  className={[
                    "text-base leading-snug",
                    index === steps.length - 1
                      ? "font-mono text-ink"
                      : "font-light text-ink",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                <p className="mt-1.5 text-sm text-muted">{step.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function DriftArchitecture() {
  const [activeKey, setActiveKey] = useState(infraFlow.outcomes[1].key);
  const reduced = useReducedMotion();
  const active =
    infraFlow.outcomes.find((outcome) => outcome.key === activeKey) ??
    infraFlow.outcomes[0];

  return (
    <div>
      <div className="grid gap-px border border-rule bg-rule md:grid-cols-2">
        <Branch heading="observed" steps={infraFlow.live} />
        <Branch heading="declared" steps={infraFlow.desired} />
      </div>

      <div className="flex justify-center" aria-hidden>
        <span className="h-10 w-px bg-rule" />
      </div>

      <div className="border border-rule bg-panel px-6 py-7 text-center">
        <p className="font-mono text-base text-ink sm:text-lg">
          {infraFlow.engine}
        </p>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted">
          Every resource on either side is compared and placed in one of three
          states.
        </p>
      </div>

      <div className="flex justify-center" aria-hidden>
        <span className="h-10 w-px bg-rule" />
      </div>

      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
        {infraFlow.outcomes.map((outcome) => {
          const selected = outcome.key === active.key;
          return (
            <button
              key={outcome.key}
              type="button"
              onClick={() => setActiveKey(outcome.key)}
              aria-pressed={selected}
              className={[
                "bg-void px-5 py-6 text-left transition-colors duration-300",
                selected ? "bg-raised" : "hover:bg-panel",
              ].join(" ")}
            >
              <span
                className={[
                  "font-mono text-sm",
                  selected ? OUTCOME_COLOR[outcome.key] : "text-muted",
                ].join(" ")}
              >
                {outcome.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={[
          "border border-t-0 border-rule bg-panel p-6 sm:p-7",
          "border-l-2",
          OUTCOME_BORDER[active.key],
        ].join(" ")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active.key}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="prose-measure text-base font-normal leading-relaxed text-dim"
          >
            {active.note}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex justify-center" aria-hidden>
        <span className="h-10 w-px bg-rule" />
      </div>

      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {infraFlow.outputs.map((output) => (
          <div key={output.label} className="bg-void p-6">
            <p className="font-mono text-sm text-ink">{output.label}</p>
            <p className="mt-2 text-sm text-muted">{output.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
