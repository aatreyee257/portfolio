import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HOSTED_ASCII_RUNTIME, HOSTED_ASCII_RUNTIME_SRC } from "@/lib/config";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Software Developer, Cloud Infrastructure, AI`,
    template: `%s — ${site.name}`,
  },
  description: site.statement,
  openGraph: {
    title: `${site.name} — Software Developer, Cloud Infrastructure, AI`,
    description: site.statement,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b09" },
    { media: "(prefers-color-scheme: light)", color: "#f2f6f2" },
  ],
  colorScheme: "dark light",
};

/** Runs before first paint: saved choice, else the OS setting. No flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh antialiased">
        {/* Loaded once for the whole application, and only when the hosted
            runtime is explicitly opted into. Default build runs the local
            renderer instead. */}
        {HOSTED_ASCII_RUNTIME ? (
          <Script src={HOSTED_ASCII_RUNTIME_SRC} strategy="afterInteractive" />
        ) : null}

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
