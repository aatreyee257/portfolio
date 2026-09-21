export const site = {
  name: "Aatreyee Mukherjee",
  roles: ["Software Developer", "Cloud Infrastructure", "AI"],
  statement:
    "Building reliable software, cloud infrastructure and intelligent systems.",
  location: "Melbourne, Australia",
  study: "Master of Information Technology — Monash University",
  email: "aatreyee257@gmail.com",
  /**
   * The résumé LinkedIn URL was not available when this site was generated.
   * Paste the full profile URL here and the link appears everywhere it belongs.
   * Left empty, the UI degrades gracefully instead of shipping a dead link.
   */
  linkedin: "https://www.linkedin.com/in/aatreyee-mukherjee-8253ab216/",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
] as const;
