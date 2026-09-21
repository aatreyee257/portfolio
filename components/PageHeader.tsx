import type { ReactNode } from "react";
import ASCIIBackground from "@/components/ASCIIBackground";

type Props = {
  rail: string;
  title: string;
  lede?: ReactNode;
};

export default function PageHeader({ rail, title, lede }: Props) {
  return (
    <header className="relative isolate overflow-hidden border-b border-rule">
      <ASCIIBackground variant="ambient" scrim={false} />
      <div className="shell rail-grid pt-32 pb-14 sm:pt-40 sm:pb-20">
        <p className="meta lg:pt-4">{rail}</p>
        <div>
          <h1 className="text-[clamp(2.25rem,7vw,4.5rem)] font-light leading-[0.95] tracking-[-0.04em]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-7 prose-measure text-lg font-normal leading-relaxed text-dim">
              {lede}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
