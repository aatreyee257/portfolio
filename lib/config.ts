/**
 * The hero effect runs on a local canvas renderer by default
 * (components/ascii/plasma.ts) — no third-party runtime, no outbound request
 * per visitor, no vendor badge.
 *
 * Set NEXT_PUBLIC_ASCII_RUNTIME=hosted to load the AIDesigner effects runtime
 * instead. It then binds to the same `data-aifx="ascii"` element. See README.
 */
export const HOSTED_ASCII_RUNTIME =
  process.env.NEXT_PUBLIC_ASCII_RUNTIME === "hosted";

export const HOSTED_ASCII_RUNTIME_SRC =
  "https://cdn.aidesigner.ai/effects/runtime/v1.js";
