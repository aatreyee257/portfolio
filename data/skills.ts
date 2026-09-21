export type Evidence = {
  href: string;
  where: string;
  detail: string;
};

export type Skill = {
  id: string;
  name: string;
  /** Roles and projects on this site that reference the technology.
   *  Empty is a truthful answer: the résumé lists it, nothing here documents it. */
  evidence: Evidence[];
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      {
        id: "golang",
        name: "Golang",
        evidence: [
          {
            href: "/experience#ibm",
            where: "IBM — Software Developer",
            detail:
              "Go test suites with Testify covering IBM Cloud VPC.",
          },
          {
            href: "/projects#infraalign",
            where: "InfraAlign",
            detail:
              "Go CLI: AWS SDK scanning, HCL parsing, drift classification.",
          },
        ],
      },
      {
        id: "python",
        name: "Python",
        evidence: [
          {
            href: "/experience#gsk",
            where: "GSK — Digital and Tech Intern",
            detail:
              "ETL for CoDi, reusable connectors, pytest coverage.",
          },
          {
            href: "/experience#itie",
            where: "Itie — Intern",
            detail: "EEG preprocessing and artifact removal; Tkinter, PyGame.",
          },
          {
            href: "/projects#counterfeit-detection",
            where: "Counterfeit Packaging Detection",
            detail: "CNN and SSIM image comparison.",
          },
        ],
      },
      {
        id: "hcl",
        name: "HCL",
        evidence: [
          {
            href: "/experience#ibm",
            where: "IBM — Software Developer",
            detail: "Terraform configurations for 100+ IBM Cloud resources.",
          },
          {
            href: "/projects#infraalign",
            where: "InfraAlign",
            detail: "HCL parsed to derive Terraform's desired state.",
          },
        ],
      },
      { id: "javascript", name: "JavaScript", evidence: [] },
      { id: "java", name: "Java", evidence: [] },
      { id: "c", name: "C", evidence: [] },
      { id: "cpp", name: "C++", evidence: [] },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    skills: [
      {
        id: "terraform",
        name: "Terraform",
        evidence: [
          {
            href: "/experience#ibm",
            where: "IBM — Software Developer",
            detail:
              "Provisioned 100+ IBM Cloud resources; manual configuration down 60%.",
          },
          {
            href: "/projects#infraalign",
            where: "InfraAlign",
            detail:
              "Terraform state treated as desired state, compared against live AWS.",
          },
        ],
      },
    ],
  },
  {
    id: "software-development",
    title: "Software development",
    skills: [
      {
        id: "devops",
        name: "DevOps",
        evidence: [
          {
            href: "/experience#gsk",
            where: "GSK — Digital and Tech Intern",
            detail: "Pipeline delivery through Azure DevOps.",
          },
          {
            href: "/experience#ibm",
            where: "IBM — Software Developer",
            detail: "Infrastructure automation in an Agile/Scrum team.",
          },
        ],
      },
      { id: "git", name: "Git", evidence: [] },
      { id: "github", name: "GitHub", evidence: [] },
      { id: "docker", name: "Docker", evidence: [] },
    ],
  },
  {
    id: "web",
    title: "Web technologies",
    skills: [
      { id: "react", name: "React.js", evidence: [] },
      { id: "nodejs", name: "Node.js", evidence: [] },
      { id: "express", name: "Express.js", evidence: [] },
      { id: "api", name: "API", evidence: [] },
      { id: "html", name: "HTML5", evidence: [] },
      { id: "css", name: "CSS3", evidence: [] },
      { id: "bootstrap", name: "Bootstrap", evidence: [] },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { id: "postgresql", name: "PostgreSQL", evidence: [] },
      { id: "mysql", name: "MySQL", evidence: [] },
      { id: "oracle", name: "Oracle SQL", evidence: [] },
      { id: "mongodb", name: "MongoDB", evidence: [] },
    ],
  },
];

export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills);
