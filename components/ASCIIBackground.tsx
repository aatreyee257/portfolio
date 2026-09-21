"use client";

import { useEffect, useRef } from "react";
import { mountAsciiPlasma, type PlasmaInstance } from "@/components/ascii/plasma";
import { HOSTED_ASCII_RUNTIME } from "@/lib/config";

type Props = {
  /** `hero` is the full-strength field. `ambient` is the restrained version
   *  used on inner pages so the site does not become exhausting. */
  variant?: "hero" | "ambient";
  /** Scrim above the field. Off for ambient, which is already faint. */
  scrim?: boolean;
};

const PRESETS = {
  hero: { cell: 14, speed: 0.55, intensity: 1, fps: 30 },
  ambient: { cell: 17, speed: 0.28, intensity: 0.35, fps: 20 },
} as const;

/**
 * Renders the ASCII plasma layer inside the nearest positioned ancestor.
 * That ancestor must be `relative isolate` — isolation keeps this -z-10 layer
 * inside the container, so the page background can never paint over it.
 */
export default function ASCIIBackground({
  variant = "hero",
  scrim = true,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When the hosted runtime is enabled it claims [data-aifx] elements itself.
    if (HOSTED_ASCII_RUNTIME) return;

    const host = hostRef.current;
    if (!host) return;

    let instance: PlasmaInstance | null = null;
    // Mount after paint so the host has real dimensions to measure.
    const id = window.requestAnimationFrame(() => {
      instance = mountAsciiPlasma(host, PRESETS[variant]);
    });

    // Theme toggle flips data-theme on <html>; re-read the plasma colours.
    const themeObserver = new MutationObserver(() => instance?.update({}));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.cancelAnimationFrame(id);
      themeObserver.disconnect();
      instance?.destroy();
    };
  }, [variant]);

  return (
    <>
      <div
        ref={hostRef}
        data-aifx="ascii"
        data-aifx-variant={variant}
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      />
      {scrim ? (
        <div
          className="ascii-scrim absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
