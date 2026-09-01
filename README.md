# GATESTOCK

A privacy layer for onchain ownership. Hold, receive, transfer and prove what
you own behind zero-knowledge proofs — without revealing your wallet, your
balance, or the rest of your portfolio.

This repository is the marketing site only. No wallet connection, no contract
calls, no backend: every outbound destination (`/app`, `/whitepaper`,
`/privacy`, `/terms`) is a placeholder route defined in one place.

## Running it

```bash
npm install
npm run dev
```

## Where the name lives

`src/lib/site-config.ts` holds the whole brand:

- `name` — the all-caps lockup used by metadata, the mobile nav title and the
  footer.
- `wordmark` — the title-case form used inside running copy.
- the `NEXT_PUBLIC_GATESTOCK_*` env prefix, mirrored in `.env.example`.

Nothing else in `src/` spells the name out. A rename is those two strings and
the env prefix — never a find-and-replace through the components.

## Where the design lives

`src/app/globals.css`, in one pass, under a `gs-` prefix. The palette is black
with a single rationed lime (`#cce804`); type is Inter at 300 for anything
large and JetBrains Mono, tracked out, for the readouts that state what the
chain actually sees. The hero backdrop is drawn (`src/components/HeroScene.tsx`)
rather than shipped as video or photography, so the headline never waits on a
download.

## Structure

| Path | What it is |
| --- | --- |
| `src/app/layout.tsx` | Shell, metadata, fonts, ambient background |
| `src/app/page.tsx` | The single page: hero, four sections, closing panel |
| `src/components/Nav.tsx` | Sticky pill nav — shrinks past 24px of scroll |
| `src/components/HeroScene.tsx` | Drawn ridge, light shaft and figure |
| `src/components/Mark.tsx` | The shield-and-portcullis mark |
| `src/components/Footer.tsx` | Footer |
| `src/lib/site-config.ts` | Name, copy, outbound links, nav items |
