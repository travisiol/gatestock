import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

// Fonts load from a runtime <link> rather than next/font/google, which
// downloads and self-hosts at BUILD time and so needs outbound access from
// wherever `next build` runs.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "zero-knowledge",
    "privacy",
    "onchain ownership",
    "proof of ownership",
    "self-custody",
    "wallet privacy",
    "Robinhood Chain",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.seoDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="gs-root">
          <div className="gs-ambient" aria-hidden="true">
            <div className="gs-amb-grid" />
            <div className="gs-amb-glow gs-amb-glow-1" />
            <div className="gs-amb-glow gs-amb-glow-2" />
          </div>
          <Nav />
          <div className="gs-flow">{children}</div>
          <div className="gs-flow">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
