import type { Metadata } from "next";
import Link from "next/link";
import {
  Blank,
  DocHead,
  Section,
  Toc,
  type TocItem,
} from "@/components/Doc";
import { links, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "The design of a privacy layer for onchain ownership: commitments, one-time keys, and opening a single commitment to a single counterparty.",
};

/**
 * A design document, not an implementation report.
 *
 * Everything here describes an intended construction. Where a choice has not
 * actually been made — proof system, hash, set structure, deployment — it says
 * so with a placeholder instead of naming a plausible option, because a
 * whitepaper is the one page on a protocol site that people read as a
 * commitment. Nothing about audits, benchmarks or deployments is stated,
 * because none of it has happened.
 */

const toc: readonly TocItem[] = [
  { id: "summary", label: "Summary" },
  { id: "problem", label: "The problem" },
  { id: "boundary", label: "Hidden and not hidden" },
  { id: "construction", label: "Construction" },
  { id: "threat-model", label: "Threat model" },
  { id: "limitations", label: "Limitations" },
  { id: "open", label: "Open parameters" },
  { id: "status", label: "Status" },
];

export default function WhitepaperPage() {
  return (
    <div className="gs-doc">
      <DocHead
        eyebrow="Whitepaper"
        title="Ownership you can prove without publishing."
        meta={[
          <>Draft 0.1</>,
          <>Design document</>,
          <>Not audited · not deployed</>,
        ]}
      />

      <div className="gs-notice" style={{ marginTop: 32 }}>
        <b>Draft</b>
        <span>
          This describes an intended design. It is not a report on a running
          system: nothing here has been implemented on a network, reviewed or
          audited, and the boxed values below are choices that have not been
          made yet.
        </span>
      </div>

      <div className="gs-doc-grid">
        <Toc items={toc} />

        <div className="gs-doc-body">
          <Section id="summary" n={1} title="Summary">
            <p>
              {siteConfig.wordmark} is a privacy layer for onchain ownership. An
              asset is placed into a commitment set under a key that has never
              held anything else. Holding, receiving and transferring are
              changes to that set. When ownership has to be demonstrated, a
              single commitment is opened to a single counterparty, and that
              counterparty learns one thing: that the claim is true.
            </p>
            <p>
              The design goal is narrow and worth stating plainly. It is not to
              hide that assets exist, nor to obscure the movement of the set. It
              is to break the link between <strong>an address</strong> and{" "}
              <strong>an inventory</strong>.
            </p>
          </Section>

          <Section id="problem" n={2} title="The problem">
            <p>
              A public ledger makes ownership durable by making it legible.
              Every mint, every claim and every token-gated login points back at
              one address, and an address accumulates. What began as a
              convenience becomes a permanent, public inventory of everything
              its holder owns, readable by anyone, for as long as they hold it.
            </p>
            <p>
              The usual answer is a second wallet, and it fails for a structural
              reason: the moment the second wallet has to prove anything to
              anyone, it becomes the first wallet. Compartmentalisation by hand
              degrades every time it is used, and it degrades silently.
            </p>
          </Section>

          <Section id="boundary" n={3} title="Hidden and not hidden">
            <p>
              A privacy claim is only meaningful with its boundary attached.
              This is the boundary.
            </p>
            <h3>Intended to be hidden</h3>
            <ul>
              <li>
                Which asset a given commitment corresponds to, absent an
                opening.
              </li>
              <li>
                The link between a wallet used to interact and the contents of
                the set.
              </li>
              <li>
                The rest of a holder&apos;s portfolio, when a single commitment
                is opened.
              </li>
            </ul>
            <h3>Not hidden, by construction</h3>
            <ul>
              <li>
                That the set exists, and that it changed. An observer sees a
                leaf enter or leave.
              </li>
              <li>
                The timing and the gas payer of every operation, which are
                properties of the chain and not of this design.
              </li>
              <li>
                Anything a counterparty is told during an opening, and anything
                they can correlate with it afterwards.
              </li>
            </ul>
          </Section>

          <Section id="construction" n={4} title="Construction">
            <h3>Commitment</h3>
            <p>
              A commitment binds an asset to a secret salt and to a fresh key,
              and is computed on the holder&apos;s device. Only the commitment
              is intended to reach the chain. The preimage — asset, salt, key —
              stays with the holder, and losing it means losing the ability to
              prove or to transfer.
            </p>
            <p>
              The console at <Link href={links.app}>/app</Link> runs this step
              literally, with <code>SHA-256</code> over the concatenated
              preimage and keys from the browser&apos;s CSPRNG, so the shape of
              the operation can be inspected. The production hash and
              commitment encoding are <Blank>not fixed</Blank>; the console is
              an illustration, not a specification.
            </p>

            <h3>The set</h3>
            <p>
              Commitments accumulate in an append-structured set held onchain,
              against which membership can be proven without identifying the
              member. The concrete structure, its depth and its update rule are{" "}
              <Blank>not fixed</Blank>.
            </p>

            <h3>One-time keys</h3>
            <p>
              Every leaf is authorised by a key generated for it and used for
              nothing else. A key that has only ever touched one asset carries
              no history to correlate, which is the property the whole design
              depends on. Reusing a key would collapse the anonymity set back to
              the size of that key&apos;s history.
            </p>

            <h3>Receiving</h3>
            <p>
              Delivery is taken into the set rather than into the wallet used to
              collect. An observer sees the set grow by one. They do not learn
              which recipient the growth belongs to.
            </p>

            <h3>Transfer</h3>
            <p>
              Handing ownership on retires the authorising key on the spot and
              installs a new commitment under a new key. An observer sees one
              leaf out and one leaf in, with nothing linking the two beyond
              their adjacency in time.
            </p>

            <h3>Proving</h3>
            <p>
              A holder opens one commitment to one verifier. The verifier checks
              the claim against live chain state and gets a single bit back.
              Nothing else moves and nothing else is named. The proof system —
              and therefore the trusted-setup question, the proving cost and the
              verification cost — is <Blank>not selected</Blank>.
            </p>
          </Section>

          <Section id="threat-model" n={5} title="Threat model">
            <p>
              The adversary assumed here is a passive observer with a full view
              of chain state and history, unlimited time, and the ability to
              join the set themselves. They are assumed to be able to correlate
              onchain events with each other and with public offchain data.
            </p>
            <p>
              They are <strong>not</strong> assumed to control the
              holder&apos;s device, to observe the holder&apos;s network at the
              packet level, or to compel a counterparty to reveal what an
              opening told them. Each of those defeats the design, and none of
              them is in scope.
            </p>
          </Section>

          <Section id="limitations" n={6} title="Limitations">
            <p>
              These are properties of the approach, not defects to be patched
              later. They are listed because a privacy tool that hides its
              failure modes is worse than none.
            </p>
            <ul>
              <li>
                <strong>Timing correlation.</strong> A set with few
                participants, or one operation at a distinctive moment, narrows
                the anonymity set regardless of the cryptography.
              </li>
              <li>
                <strong>Gas and funding.</strong> Whoever pays for an operation
                is visible. Funding an operation from a wallet that is already
                public reattaches the identity the design just removed.
              </li>
              <li>
                <strong>RPC and endpoint metadata.</strong> The node a holder
                queries can see what they asked about. This is outside the
                protocol and is not solved by it.
              </li>
              <li>
                <strong>The counterparty.</strong> An opening is disclosure. A
                verifier can record it, publish it, or correlate it with
                everything else they know.
              </li>
              <li>
                <strong>Key loss.</strong> Secrets held only by the holder mean
                no recovery path. This is the cost of self-custody, stated
                rather than engineered around.
              </li>
            </ul>
          </Section>

          <Section id="open" n={7} title="Open parameters">
            <p>
              Everything below is undecided. It is listed rather than filled in
              because naming a plausible choice here would read as a commitment
              that has not been made.
            </p>
            <ul>
              <li>
                Proof system and its setup assumptions — <Blank>tbd</Blank>
              </li>
              <li>
                Hash function and commitment encoding — <Blank>tbd</Blank>
              </li>
              <li>
                Set structure, depth and update rule — <Blank>tbd</Blank>
              </li>
              <li>
                Network and contract addresses — <Blank>not deployed</Blank>
              </li>
              <li>
                Independent review — <Blank>not commissioned</Blank>
              </li>
            </ul>
          </Section>

          <Section id="status" n={8} title="Status">
            <p>
              Nothing described here is live. There is no contract, no token and
              no fundraising associated with this document. The only working
              software published so far is the local console, which touches no
              network at all.
            </p>
            <p>
              {siteConfig.wordmark} is an independent, self-custody design. It
              is not affiliated with, endorsed by, or operated by Robinhood
              Markets, Inc.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
