import type { ReactNode } from "react";

/**
 * An unfilled value that only the operator can supply — a legal entity, a
 * jurisdiction, a contract address. It renders as a loud dashed chip rather
 * than as plausible-looking prose, so a page cannot quietly go live with
 * invented facts in it. `legal` in site-config feeds these from env.
 */
export function Blank({ children }: { children: string }) {
  return <span className="gs-blank">{children}</span>;
}

/** A configured value, or the placeholder that names what is missing. */
export function Value({
  value,
  missing,
}: {
  value: string | null;
  missing: string;
}) {
  return value ? <>{value}</> : <Blank>{missing}</Blank>;
}

export type TocItem = { id: string; label: string };

export function DocHead({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta: ReactNode[];
}) {
  return (
    <div className="gs-doc-head">
      <span className="gs-eye">{eyebrow}</span>
      <h1>{title}</h1>
      <div className="gs-doc-meta">
        {meta.map((entry, index) => (
          <span key={index}>{entry}</span>
        ))}
      </div>
    </div>
  );
}

export function Toc({ items }: { items: readonly TocItem[] }) {
  return (
    <nav className="gs-toc" aria-label="Contents">
      <p className="gs-toc-h">Contents</p>
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`}>
          {String(index + 1).padStart(2, "0")} — {item.label}
        </a>
      ))}
    </nav>
  );
}

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <p className="gs-sec-n">{String(n).padStart(2, "0")}</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
