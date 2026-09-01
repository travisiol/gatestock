import type { Metadata } from "next";
import { Console } from "@/components/Console";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Console",
  description:
    "Commit an asset, hold it under a one-time key, and open a single commitment to a single counterparty.",
  robots: { index: false, follow: true },
};

export default function AppPage() {
  return (
    <div className="gs-page">
      <div className="gs-page-head">
        <span className="gs-eye">Console</span>
        <h1>Commit, hold, prove.</h1>
        <p className="gs-page-lead">
          {siteConfig.wordmark} hashes an asset with a secret salt and a
          one-time key, and only the hash is ever meant to be public. This page
          runs that flow end to end so you can watch what is kept and what is
          handed over.
        </p>
      </div>

      <Console />
    </div>
  );
}
