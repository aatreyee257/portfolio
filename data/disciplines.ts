export type Discipline = {
  id: string;
  title: string;
  line: string;
  tech: string[];
  refs: { href: string; label: string }[];
};

export const disciplines: Discipline[] = [
  {
    id: "cloud",
    title: "Cloud infrastructure",
    line: "Infrastructure described in code, provisioned repeatably, and checked against what is actually running.",
    tech: ["Terraform", "Infrastructure automation", "IBM Cloud", "AWS"],
    refs: [
      { href: "/experience#ibm", label: "IBM — IBM Cloud VPC" },
      { href: "/projects#infraalign", label: "InfraAlign — drift detection" },
    ],
  },
  {
    id: "software",
    title: "Software engineering",
    line: "Tools and services, with tests that make the behaviour provable rather than assumed.",
    tech: ["Go", "Python", "JavaScript", "React", "APIs"],
    refs: [
      { href: "/experience#ibm", label: "IBM — Go and Testify suites" },
      { href: "/projects#infraalign", label: "InfraAlign — Go CLI" },
    ],
  },
  {
    id: "ai",
    title: "AI and intelligent systems",
    line: "Measuring whether a model's answer is actually supported by what it retrieved.",
    tech: [
      "LLMs",
      "RAG evaluation",
      "Local LLM infrastructure",
      "Computer vision",
    ],
    refs: [
      { href: "/experience#monash-ai", label: "Monash — AI Engineer" },
      {
        href: "/projects#counterfeit-detection",
        label: "Counterfeit packaging detection",
      },
    ],
  },
  {
    id: "data",
    title: "Data and automation",
    line: "Moving data between systems without losing fidelity, and proving it afterwards.",
    tech: [
      "ETL",
      "Data migration",
      "Validation",
      "Data quality",
      "Automation",
    ],
    refs: [
      { href: "/experience#gsk", label: "GSK — Python ETL for CoDi" },
      { href: "/experience#monash-data", label: "Monash — Nimbus migration" },
    ],
  },
];
