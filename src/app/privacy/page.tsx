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
  title: "Privacy Policy",
  description:
    "What this site collects, what it does not, and what leaves your browser.",
};

/**
 * Written against what this codebase actually does, not from a generic
 * template: there is no backend, no analytics and no cookie, the console keeps
 * its state in memory, and the one genuine third-party request is the Google
 * Fonts stylesheet in the root layout. The operator's identity, host and
 * jurisdiction are the only unknowns, and they render as placeholders.
 */

const toc: readonly TocItem[] = [
  { id: "who", label: "Who this is" },
  { id: "collect", label: "What is collected" },
  { id: "console", label: "The console" },
  { id: "third-parties", label: "Third parties" },
  { id: "cookies", label: "Cookies" },
  { id: "rights", label: "Your rights" },
  { id: "changes", label: "Changes" },
];

export default function PrivacyPage() {
  return (
    <div className="gs-doc">
      <DocHead
        eyebrow="Privacy"
        title="What leaves your browser, and what does not."
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
          This describes the site&apos;s actual behaviour accurately, but it has
          not been reviewed by a lawyer and the boxed values are unset. It is
          not fit to publish as-is.
        </span>
      </div>

      <div className="gs-doc-grid">
        <Toc items={toc} />

        <div className="gs-doc-body">
          <Section id="who" n={1} title="Who this is">
            <p>
              This site is operated by{" "}
              <Value value={legal.entity} missing="legal entity" />, reachable
              at <Value value={legal.contact} missing="contact address" />. It
              is published from{" "}
              <Value value={legal.host} missing="hosting provider" />.
            </p>
          </Section>

          <Section id="collect" n={2} title="What is collected">
            <p>
              {siteConfig.wordmark} runs no backend, no database, no account
              system and no analytics. There is nothing here that asks who you
              are, and no server of ours that records that you visited.
            </p>
            <p>
              As with any website, the host serving these files receives the
              request itself — your IP address, the page requested, your user
              agent and the time — and may retain it as an access log under its
              own policy. That retention is{" "}
              <Value value={legal.host} missing="hosting provider" />
              &apos;s, not ours, and we do not read those logs to build a
              profile.
            </p>
          </Section>

          <Section id="console" n={3} title="The console">
            <p>
              The console at <Link href={links.app}>/app</Link> generates keys
              and computes commitments entirely inside your browser tab. The
              salt, the one-time key and the asset text you type are held in
              memory for as long as the tab is open and are discarded when you
              close or reload it.
            </p>
            <p>
              <strong>
                None of it is transmitted, stored, logged or recoverable.
              </strong>{" "}
              There is nowhere for it to go: the page makes no network request
              of its own after it loads.
            </p>
          </Section>

          <Section id="third-parties" n={4} title="Third parties">
            <p>
              One request leaves your browser to a party other than the host.
              Typefaces are loaded from Google Fonts, which means Google
              receives your IP address and user agent when the stylesheet and
              font files are fetched. That is the whole of it: no tag manager,
              no pixel, no embedded video, no chat widget, no advertising
              network.
            </p>
          </Section>

          <Section id="cookies" n={5} title="Cookies">
            <p>
              This site sets no cookies and writes nothing to local storage. It
              therefore asks for no cookie consent, because there is nothing to
              consent to.
            </p>
          </Section>

          <Section id="rights" n={6} title="Your rights">
            <p>
              Under <Value value={legal.jurisdiction} missing="jurisdiction" />{" "}
              you may have rights of access, correction, erasure and objection
              over personal data held about you. In practice we hold none: there
              is no store to search, and a request would be answered by saying
              so. Requests about host access logs should go to{" "}
              <Value value={legal.host} missing="hosting provider" />.
            </p>
            <p>
              To ask anything about this policy, write to{" "}
              <Value value={legal.contact} missing="contact address" />.
            </p>
          </Section>

          <Section id="changes" n={7} title="Changes">
            <p>
              If this site gains a backend, an analytics tool or any other
              third-party request, this page is updated before that ships, and
              the date at the top changes with it.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
