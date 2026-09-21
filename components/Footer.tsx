import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell rail-grid py-12">
        <p className="meta">{site.location.toLowerCase()}</p>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-light">{site.name}</p>
            <p className="mt-2 text-sm text-muted">{site.study}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-dim underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {site.email}
            </a>
            {site.linkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 block text-sm text-dim underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                LinkedIn
              </a>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 md:grid-cols-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
