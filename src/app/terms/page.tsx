import type { Metadata } from "next";
import Link from "next/link";
import {
  DocHead,
  Section,
  Toc,
  Value,
  type TocItem,
} from "@/components/Doc";
import { legal, links, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which this site and its local console are made available.",
};

/**
 * A template, and labelled as one. The clauses are written against what the
 * site actually is — informational pages plus a console that touches no
 * network — rather than boilerplate for a financial service it is not. It
 * still needs a lawyer; nothing here should be treated as drafted advice.
 */

const toc: readonly TocItem[] = [
  { id: "acceptance", label: "Acceptance" },
  { id: "what", label: "What this is" },
  { id: "no-advice", label: "No advice, no offer" },
  { id: "self-custody", label: "Self-custody" },
  { id: "warranty", label: "No warranty" },
  { id: "liability", label: "Liability" },
  { id: "affiliation", label: "Affiliation" },
  { id: "law", label: "Governing law" },
];

export default function TermsPage() {
  return (
    <div className="gs-doc">
      <DocHead
        eyebrow="Terms"
        title="The terms this site is offered on."
        meta={[
          <>
            Last updated{" "}
            <Value value={legal.updated} missing="date needed" />
          </>,
          <>Template — needs legal review</>,
        ]}
      />

      <div className="gs-notice" style={{ marginTop: 32 }}>
        <b>Unreviewed</b>
        <span>
          A starting draft written against what this site does, not legal
          advice, and not reviewed by a lawyer. The boxed values are unset. Do
          not publish it without having it checked.
        </span>
      </div>

      <div className="gs-doc-grid">
        <Toc items={toc} />

        <div className="gs-doc-body">
          <Section id="acceptance" n={1} title="Acceptance">
            <p>
              By using this site you accept these terms. If you do not accept
              them, do not use it. The site is provided by{" "}
              <Value value={legal.entity} missing="legal entity" />.
            </p>
          </Section>

          <Section id="what" n={2} title="What this is">
            <p>
              {siteConfig.wordmark} is, at present, a set of informational pages
              describing a design, plus a console at{" "}
              <Link href={links.app}>/app</Link> that runs a demonstration
              locally in your browser. It is not a wallet, an exchange, a
              broker, a custodian or a payment service, and it holds nothing on
              your behalf.
            </p>
            <p>
              No contract has been deployed and no token has been issued. The
              console does not connect to any network; it generates keys and
              hashes in your tab and discards them when the tab closes.
            </p>
          </Section>

          <Section id="no-advice" n={3} title="No advice, no offer">
            <p>
              Nothing on this site is financial, investment, tax or legal
              advice, and nothing on it is an offer or a solicitation to buy or
              sell anything. The whitepaper is a{" "}
              <Link href={links.whitepaper}>design document</Link> describing
              intentions, not a description of a working system, and its
              contents may change or be abandoned.
            </p>
          </Section>

          <Section id="self-custody" n={4} title="Self-custody">
            <p>
              Any keys or secrets produced by the console exist only on your
              device. We never receive them and cannot recover, reset or
              reissue them. If you lose them, they are lost. If you disclose
              them, whatever they protect is disclosed with them.
            </p>
            <p>
              You are responsible for the security of your device, your browser
              and anything you copy out of the console.
            </p>
          </Section>

          <Section id="warranty" n={5} title="No warranty">
            <p>
              The site is provided <strong>as is</strong> and{" "}
              <strong>as available</strong>, without warranty of any kind,
              express or implied, including fitness for a particular purpose and
              non-infringement. The design has not been audited or independently
              reviewed, and no claim is made that it achieves the privacy
              properties it describes.
            </p>
          </Section>

          <Section id="liability" n={6} title="Liability">
            <p>
              To the fullest extent permitted by law,{" "}
              <Value value={legal.entity} missing="legal entity" /> is not
              liable for any indirect, incidental or consequential loss arising
              from use of this site, including loss of assets, loss of keys or
              loss of privacy. Nothing in these terms excludes liability that
              cannot lawfully be excluded.
            </p>
          </Section>

          <Section id="affiliation" n={7} title="Affiliation">
            <p>
              {siteConfig.wordmark} is an independent, self-custody project. It
              is not affiliated with, endorsed by, or operated by Robinhood
              Markets, Inc. References to any network or company are
              descriptive, and all trademarks belong to their owners.
            </p>
          </Section>

          <Section id="law" n={8} title="Governing law">
            <p>
              These terms are governed by the laws of{" "}
              <Value value={legal.jurisdiction} missing="jurisdiction" />, and
              disputes are subject to the courts of that jurisdiction. Questions
              go to <Value value={legal.contact} missing="contact address" />.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
