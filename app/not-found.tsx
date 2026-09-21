import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-dvh flex-col justify-center py-32">
      <p className="meta">404</p>
      <h1 className="mt-6 text-[clamp(2rem,6vw,4rem)] font-light tracking-[-0.04em]">
        This page does not exist
      </h1>
      <p className="mt-6 prose-measure text-dim">
        The address may have changed, or the link may be wrong.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit border border-rule-strong px-6 py-4 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        Back to home
      </Link>
    </section>
  );
}
