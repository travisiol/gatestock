import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { links, siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <section className="gs-hero">
        <HeroScene />
        <div className="gs-hero-arc" aria-hidden="true" />
        <div className="gs-hero-grid" aria-hidden="true" />

        <div className="gs-hero-content-wrap">
          <div className="gs-hero-content">
            <h1 className="gs-h1">
              <span className="gs-h1-thin">Own without</span>
              <span className="gs-h1-grad">being watched.</span>
            </h1>
            <p className="gs-sub">
              {siteConfig.wordmark} is a privacy layer for onchain ownership —
              hold, receive, transfer and prove what you own behind
              zero-knowledge proofs.
              <br /> Prove you own it without revealing your wallet, your
              balance, or the rest of your portfolio.
            </p>
            <div className="gs-cta-row">
              <Link href={links.app} className="gs-cta">
                Launch App
              </Link>
              <Link href={links.whitepaper} className="gs-cta-ghost">
                Read whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="gs-sk">
        <div className="gs-wrap">
          <section className="gs-sec" id="ownership">
            <span className="gs-eye">The problem</span>
            <h2>One address reveals everything you own.</h2>
            <p className="gs-lead">
              Every mint, every claim, every token-gated login you have ever
              signed points back at one address — a permanent, public inventory
              of what you hold, readable by anyone, for as long as you hold it.
            </p>
          </section>

          <section className="gs-sec" id="features">
            <span className="gs-eye">What you get</span>
            <h2>Everything private except the proof.</h2>
            <div className="gs-four">
              <div>
                <h3>Private hold</h3>
                <p>
                  Assets sit in the set under a one-time key. No public link
                  between your wallet and the things it owns.
                </p>
                <div className="gs-sees">
                  <b>the chain sees</b> &nbsp;a hash
                </div>
              </div>
              <div>
                <h3>Private receive</h3>
                <p>
                  Take delivery into the set instead of into the wallet you
                  collect with.
                </p>
                <div className="gs-sees">
                  <b>the chain sees</b> &nbsp;the set grew by one
                </div>
              </div>
              <div>
                <h3>Private transfer</h3>
                <p>
                  Hand ownership on. The key that authorises it has never held
                  anything else, and is retired on the spot.
                </p>
                <div className="gs-sees">
                  <b>the chain sees</b> &nbsp;one leaf out, one in
                </div>
              </div>
              <div>
                <h3>Ownership proof</h3>
                <p>
                  Open a single commitment to a single counterparty. Nothing
                  else moves, nothing else is named.
                </p>
                <div className="gs-sees">
                  <b>the verifier sees</b> &nbsp;true
                </div>
              </div>
            </div>
          </section>

          <section className="gs-sec" id="how-it-works">
            <span className="gs-eye">How it works</span>
            <h2>Three steps between your assets and the ledger.</h2>
            <div className="gs-steps">
              <div className="gs-step">
                <div className="gs-n">01</div>
                <h3>Commit</h3>
                <p>
                  Your browser hashes the asset with a secret salt and a fresh
                  key. One word reaches the chain.
                </p>
              </div>
              <div className="gs-step">
                <div className="gs-n">02</div>
                <h3>Hold</h3>
                <p>
                  Holding, receiving and transferring are changes to the set. An
                  observer sees it move, not what moved.
                </p>
              </div>
              <div className="gs-step">
                <div className="gs-n">03</div>
                <h3>Prove</h3>
                <p>
                  A verifier checks your claim against live chain state and gets
                  a single bit back.
                </p>
              </div>
            </div>
          </section>

          <section className="gs-line">
            <h2>Prove you own it. Not what else you own.</h2>
            <p className="gs-lead">
              Connecting a wallet answers a hundred questions nobody asked. This
              answers one.
            </p>
          </section>

          <div className="gs-cta-panel">
            <span className="gs-eye gs-eye-dark">Robinhood Chain</span>
            <h2>Own it quietly.</h2>
            <p>
              Commit an asset, hold it under a key that has never touched
              anything else, and prove it when something asks — without handing
              over the rest of your portfolio.
            </p>
            <Link className="gs-btn" href={links.app}>
              Open the console
            </Link>
            <Link className="gs-btn gs-btn-alt" href={links.whitepaper}>
              Read the whitepaper
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
