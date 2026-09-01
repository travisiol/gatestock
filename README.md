# GATESTOCK

A privacy layer for onchain ownership. Hold, receive, transfer and prove what
you own behind zero-knowledge proofs — without revealing your wallet, your
balance, or the rest of your portfolio.

No wallet connection, no contract calls, no backend. `/app` is a real page —
a console that runs the commit-and-prove flow locally in the browser, using
real `getRandomValues` keys and a real SHA-256 commitment, with nothing sent
anywhere. `/whitepaper` is a design document — an intended construction, with
every unmade choice shown as a placeholder rather than filled in with a
plausible one. `/privacy` describes what this codebase actually does; `/terms`
is a starting draft. **Neither legal page has been reviewed by a lawyer.**
Every outbound destination is defined in one place (`links` in
`src/lib/site-config.ts`).

Values only the operator can supply — legal entity, jurisdiction, contact,
host, last-updated date — come from `NEXT_PUBLIC_GATESTOCK_*` env vars via
`legal` in site-config. Anything unset renders as a loud dashed chip, so no
page can go live with invented facts in it. Search the built site for
`gs-blank` to find what is still missing.

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
| `src/app/page.tsx` | The landing page: hero, four sections, closing panel |
| `src/app/app/page.tsx` | `/app` — the console |
| `src/app/not-found.tsx` | Branded 404; Next's default renders black-on-black here |
| `src/app/whitepaper/page.tsx` | Design document, draft 0.1 |
| `src/app/privacy/page.tsx` | Privacy policy — unreviewed |
| `src/app/terms/page.tsx` | Terms of service — unreviewed |
| `src/components/Console.tsx` | The local commit / hold / transfer / prove flow |
| `src/components/Doc.tsx` | Document shell, TOC, and the `Blank` placeholder |
| `src/components/Nav.tsx` | Sticky pill nav — shrinks past 24px of scroll |
| `src/components/HeroScene.tsx` | Drawn ridge, light shaft and figure |
| `src/components/Mark.tsx` | The shield-and-portcullis mark |
| `src/components/Footer.tsx` | Footer |
| `src/lib/site-config.ts` | Name, copy, outbound links, nav items |
