import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactPanel from "@/components/ContactPanel";
import { site } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        rail="/contact"
        title="Contact"
        lede="Email is the surest way to reach me."
      />

      <section className="shell pt-16 sm:pt-24">
        <div className="rail-grid">
          <p className="meta lg:pt-2">{site.location.toLowerCase()}</p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <ContactPanel />

            <aside className="space-y-8">
              <div>
                <p className="meta">linkedin</p>
                {site.linkedin ? (
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-flex items-center gap-2 text-base text-dim underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    Aatreyee Mukherjee
                    <ArrowUpRight size={15} aria-hidden />
              </a>
  ) : null}
          </div>

          <div>
            <p className="meta">based in</p>
            <p className="mt-3 text-base text-dim">{site.location}</p>
          </div>

          <div>
            <p className="meta">currently</p>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              {site.study}
            </p>
          </div>
        </aside>
      </div>
    </div >
      </section >
    </>
  );
}
