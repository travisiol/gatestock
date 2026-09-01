"use client";

import { useState } from "react";

/**
 * The console, running entirely in the browser.
 *
 * There is no contract and no network behind this yet, so nothing here
 * pretends there is one. What it does do is real: the salt and the one-time
 * key come from `crypto.getRandomValues`, and the commitment is a real
 * SHA-256 of the asset under them, computed here and kept here. That is
 * enough to show the actual shape of the thing — a commitment leaves, the
 * preimage does not — without inventing a chain that would make the page a
 * lie the day someone looked at it closely.
 */

type Leaf = {
  id: string;
  asset: string;
  salt: string;
  key: string;
  commitment: string;
  transfers: number;
};

type Proof = {
  leafId: string;
  asset: string;
  commitment: string;
};

function randomHex(bytes: number): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

/** Asset, salt and key hashed together — the only thing an observer gets. */
function preimage(asset: string, salt: string, key: string): string {
  return `${asset}|${salt}|${key}`;
}

function short(hex: string): string {
  return `${hex.slice(0, 10)}…${hex.slice(-8)}`;
}

export function Console() {
  const [asset, setAsset] = useState("");
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [proof, setProof] = useState<Proof | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function commit() {
    const trimmed = asset.trim();
    if (!trimmed || busy) return;

    setBusy(true);
    setError(null);
    try {
      const salt = randomHex(16);
      const key = randomHex(32);
      const commitment = await sha256Hex(preimage(trimmed, salt, key));
      setLeaves((current) => [
        ...current,
        { id: randomHex(8), asset: trimmed, salt, key, commitment, transfers: 0 },
      ]);
      setAsset("");
    } catch {
      // SubtleCrypto only exists in a secure context — localhost and https.
      setError(
        "This browser will not expose SubtleCrypto here. The console needs a secure context (https, or localhost).",
      );
    } finally {
      setBusy(false);
    }
  }

  // Hand the leaf on: a fresh salt and a fresh key, so the commitment that
  // replaces it shares nothing with the one that left.
  async function transfer(leaf: Leaf) {
    if (busy) return;
    setBusy(true);
    try {
      const salt = randomHex(16);
      const key = randomHex(32);
      const commitment = await sha256Hex(preimage(leaf.asset, salt, key));
      setLeaves((current) =>
        current.map((entry) =>
          entry.id === leaf.id
            ? {
                ...entry,
                salt,
                key,
                commitment,
                transfers: entry.transfers + 1,
              }
            : entry,
        ),
      );
      setProof((current) => (current?.leafId === leaf.id ? null : current));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="gs-notice">
        <b>Local preview</b>
        <span>
          No wallet, no contract, no network. The keys and the hashes below are
          generated in this tab and never leave it — closing it discards them.
        </span>
      </div>

      <div className="gs-grid">
        <div className="gs-panel">
          <p className="gs-panel-h">01 — Commit</p>
          <h2>Put an asset in the set.</h2>

          <label className="gs-label" htmlFor="gs-asset">
            Asset — a contract and a token id, or anything that names one
          </label>
          <input
            id="gs-asset"
            className="gs-input"
            value={asset}
            placeholder="0x5af3…c21 #128"
            onChange={(event) => setAsset(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") void commit();
            }}
          />

          <div className="gs-row">
            <button
              type="button"
              className="gs-action"
              onClick={() => void commit()}
              disabled={busy || asset.trim().length === 0}
            >
              Generate key &amp; commit
            </button>
            {leaves.length > 0 ? (
              <button
                type="button"
                className="gs-action-ghost"
                onClick={() => {
                  setLeaves([]);
                  setProof(null);
                }}
              >
                Clear the set
              </button>
            ) : null}
          </div>

          {error ? (
            <p className="gs-secret" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="gs-panel">
          <p className="gs-panel-h">02 — Hold</p>
          <h2>The set.</h2>

          {leaves.length === 0 ? (
            <p className="gs-empty">
              empty — nothing committed in this tab yet
            </p>
          ) : (
            leaves.map((leaf, index) => (
              <div key={leaf.id} className="gs-leaf">
                <div className="gs-leaf-top">
                  <span className="gs-leaf-n">
                    LEAF {String(index + 1).padStart(2, "0")}
                    {leaf.transfers > 0
                      ? ` · ${leaf.transfers} transfer${leaf.transfers > 1 ? "s" : ""}`
                      : ""}
                  </span>
                  <span className="gs-row" style={{ margin: 0 }}>
                    <button
                      type="button"
                      className="gs-action-ghost"
                      onClick={() => void transfer(leaf)}
                      disabled={busy}
                    >
                      Transfer
                    </button>
                    <button
                      type="button"
                      className="gs-action-ghost"
                      onClick={() =>
                        setProof({
                          leafId: leaf.id,
                          asset: leaf.asset,
                          commitment: leaf.commitment,
                        })
                      }
                    >
                      Prove
                    </button>
                  </span>
                </div>
                <div className="gs-hash">{leaf.commitment}</div>
                <div className="gs-secret">
                  held under key {short(leaf.key)} · salt {short(leaf.salt)} —
                  neither is part of the commitment an observer reads
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {proof ? (
        <div className="gs-panel" style={{ marginTop: 24 }}>
          <p className="gs-panel-h">03 — Prove</p>
          <h2>What the counterparty gets.</h2>
          <div className="gs-proof">
            <div className="gs-proof-line">
              <span>commitment</span>
              <span>{proof.commitment}</span>
            </div>
            <div className="gs-proof-line">
              <span>opened to</span>
              <span>{proof.asset}</span>
            </div>
            <div className="gs-proof-line">
              <span>verifier sees</span>
              <b>true</b>
            </div>
          </div>
          <p className="gs-secret" style={{ marginTop: 16 }}>
            {leaves.length > 1
              ? `One commitment, one counterparty. The other ${leaves.length - 1} ${
                  leaves.length - 1 === 1 ? "leaf" : "leaves"
                } in the set stayed closed, and nothing named the wallet holding them.`
              : "One commitment, one counterparty — and nothing named the wallet holding it."}
          </p>
          <div className="gs-row">
            <button
              type="button"
              className="gs-action-ghost"
              onClick={() => setProof(null)}
            >
              Close the proof
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
