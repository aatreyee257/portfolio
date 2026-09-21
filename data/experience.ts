export type Experience = {
  id: string;
  org: string;
  role: string;
  unit?: string;
  start: string;
  end: string;
  period: string;
  summary: string;
  detail: string[];
  stack: string[];
  domain: "ai" | "data" | "cloud" | "research";
};

export const experience: Experience[] = [
  {
    id: "monash-ai",
    org: "Monash University",
    role: "Artificial Intelligence Engineer",
    unit: "Assistive Technology Team",
    start: "2026-03",
    end: "present",
    period: "March 2026 — Present",
    summary:
      "Evaluating retrieval-augmented LLM systems for assistive technology, with the models kept inside the university's own infrastructure.",
    detail: [
      "Evaluate RAG-based LLM systems, measuring semantic accuracy of generated answers against retrieved source material.",
      "Design testing that surfaces hallucinated output and feeds back into prompt and retrieval changes that reduce it.",
      "Work with locally hosted LLM instances so university data stays under institutional control.",
      "Apply a human-centred approach to AI features built for assistive use.",
    ],
    stack: ["RAG", "LLM evaluation", "Local LLM hosting", "Data sovereignty"],
    domain: "ai",
  },
  {
    id: "monash-data",
    org: "Monash University",
    role: "Data Entry Officer",
    unit: "T&A FLEX Program",
    start: "2026-07",
    end: "present",
    period: "July 2026 — Present",
    summary:
      "Data fidelity work on the Nimbus migration, from auditing through to resolving what the audits turn up.",
    detail: [
      "Support the Nimbus data migration, maintaining fidelity between source records and migrated records.",
      "Audit data quality and troubleshoot the discrepancies that auditing exposes.",
      "Apply data governance requirements to migrated records.",
      "Work with faculty staff and the system implementation team through the rollout.",
    ],
    stack: ["Data migration", "Data quality auditing", "Data governance"],
    domain: "data",
  },
  {
    id: "ibm",
    org: "IBM",
    role: "Software Developer",
    start: "2024-10",
    end: "2026-01",
    period: "October 2024 — January 2026",
    summary:
      "Infrastructure as Code for IBM Cloud VPC — the provisioning path used by enterprise customers.",
    detail: [
      "Built Terraform configurations provisioning 100+ IBM Cloud resources.",
      "Automated infrastructure provisioning, cutting manual configuration by 60%.",
      "Wrote Go test suites with Testify covering IBM Cloud VPC, a service used by 10K+ enterprise customers.",
      "Contributed to cloud cost optimisation across provisioned environments.",
      "Delivered in an Agile/Scrum team.",
    ],
    stack: ["Terraform", "IBM Cloud VPC", "Go", "Testify", "IaC", "Agile"],
    domain: "cloud",
  },
  {
    id: "gsk",
    org: "GSK",
    role: "Digital and Tech Intern",
    start: "2024-02",
    end: "2024-08",
    period: "February 2024 — August 2024",
    summary:
      "Python ETL for CoDi, decoupling the pipeline from Talend and replacing it with reusable connectors.",
    detail: [
      "Built Python ETL processes for CoDi, decoupling data flows from Talend.",
      "Wrote reusable connectors for Blob Storage, SFTP, NAS and ADLS Gen2.",
      "Covered the pipeline with pytest and shipped it through Azure DevOps.",
    ],
    stack: ["Python", "ETL", "Azure DevOps", "pytest", "ADLS Gen2"],
    domain: "data",
  },
  {
    id: "itie",
    org: "Itie",
    role: "Intern",
    start: "2022-03",
    end: "2023-05",
    period: "March 2022 — May 2023",
    summary:
      "EEG signal work behind educational technology for dyslexic learners.",
    detail: [
      "Preprocessed EEG data, including artifact removal.",
      "Built Python interfaces with Tkinter and PyGame.",
      "Worked on dyslexia-focused educational technology.",
    ],
    stack: ["Python", "EEG", "Tkinter", "PyGame"],
    domain: "research",
  },
];
