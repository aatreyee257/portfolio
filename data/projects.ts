export type Project = {
  id: string;
  name: string;
  period: string;
  team: string;
  tagline: string;
  description: string[];
  stack: string[];
  award?: string;
};

export const projects: Project[] = [
  {
    id: "infraalign",
    name: "InfraAlign",
    period: "May 2026 — June 2026",
    team: "Solo project",
    tagline:
      "A Go CLI that detects configuration drift between live AWS infrastructure and Terraform-defined state.",
    description: [
      "InfraAlign reads the two sources of truth that infrastructure teams live between: what Terraform says should exist, and what is actually running in the account.",
      "It scans live AWS resources through the AWS SDK, parses the Terraform HCL to derive desired state, then classifies every resource it finds on either side.",
      "Findings go out as Slack alerts. Auto-remediation exists but stays behind an explicit flag, so nothing changes in an account unless it is asked for.",
    ],
    stack: ["Go", "AWS SDK", "Terraform", "HCL", "Slack", "Infrastructure as Code"],
  },
  {
    id: "counterfeit-detection",
    name: "AI-Powered Counterfeit Packaging Detection",
    period: "June 2024 — August 2024",
    team: "Team of 2",
    tagline:
      "Deep learning applied to pharmaceutical packaging: comparing a sample against an authentic reference to judge authenticity.",
    description: [
      "Pharmaceutical packaging carries structural detail that counterfeits reproduce imperfectly. The system compares a candidate image against an authentic reference rather than judging it in isolation.",
      "SSIM measures structural deviation between the pair; a CNN classifies the result as authentic or counterfeit.",
    ],
    stack: ["Deep learning", "CNN", "SSIM", "Image comparison", "Python"],
    award: "1st Prize — global hackathon, GSK, July 2024",
  },
];

export const detectionFlow = [
  { label: "Authentic reference", note: "Known-good packaging image" },
  { label: "SSIM comparison", note: "Sample measured against the reference" },
  { label: "Structural deviation detection", note: "Where the two images diverge" },
  { label: "CNN classification", note: "Deviation pattern classified" },
  { label: "Authentic / Counterfeit", note: "Verdict" },
];

export const infraFlow = {
  live: [
    { label: "AWS infrastructure", note: "What is actually running" },
    { label: "AWS SDK scanner", note: "Enumerates live resources" },
    { label: "Live resource state", note: "Observed" },
  ],
  desired: [
    { label: "Terraform configuration", note: "What should exist" },
    { label: "HCL parser", note: "Reads the configuration" },
    { label: "Desired state", note: "Declared" },
  ],
  engine: "Drift classification engine",
  outcomes: [
    {
      key: "matched" as const,
      label: "Matched",
      note: "Live resource agrees with configuration",
    },
    {
      key: "drifted" as const,
      label: "Drifted",
      note: "Managed by Terraform, but changed outside it",
    },
    {
      key: "unmanaged" as const,
      label: "Unmanaged",
      note: "Exists in the account, absent from configuration",
    },
  ],
  outputs: [
    { label: "Slack alerts", note: "Findings pushed to the team channel" },
    { label: "Flag-gated auto-remediation", note: "Off unless explicitly enabled" },
  ],
};
