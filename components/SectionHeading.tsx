import type { ReactNode } from "react";

type Props = {
  /** Mono rail text: where you are, in file-path form. */
  rail?: string;
  title: string;
  lede?: ReactNode;
  id?: string;
};

export default function SectionHeading({ rail, title, lede, id }: Props) {
  return (
    <div className="rail-grid hairline pt-6" id={id}>
      <p className="meta pt-1">{rail}</p>
      <div>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 prose-measure text-dim leading-relaxed">{lede}</p>
        ) : null}
      </div>
    </div>
  );
}
