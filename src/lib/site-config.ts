/**
 * The whole name lives here.
 *
 * `name` is the all-caps lockup (metadata, mobile nav title, footer);
 * `wordmark` is the title-case form used inside running copy. Nothing else in
 * the codebase spells the name out — a rename is these two strings plus the
 * `NEXT_PUBLIC_GATESTOCK_*` env prefix, never a grep-and-replace through the
 * components.
 */
export const siteConfig = {
  name: "GATESTOCK",
  wordmark: "Gatestock",
  tagline: "Own assets without exposing your portfolio.",
  description:
    "A privacy layer for onchain ownership — hold, receive, transfer and prove what you own behind zero-knowledge proofs.",
  seoDescription:
    "Prove you own it without revealing your wallet, your balance, or the rest of your portfolio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gatestock.example",
  x: process.env.NEXT_PUBLIC_GATESTOCK_X ?? null,
} as const;

/**
 * Destinations that leave the marketing site. All of them are placeholders
 * until the console and the paper actually exist; keeping them in one object
 * means the day they ship is a one-file change.
 */
export const links = {
  app: "/app",
  whitepaper: "/whitepaper",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const nav = [
  { href: "/#ownership", label: "Ownership" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: links.whitepaper, label: "Whitepaper" },
] as const;
