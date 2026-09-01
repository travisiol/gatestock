"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { XIcon } from "@/components/XIcon";
import { links, nav, siteConfig } from "@/lib/site-config";

export function Nav() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A fixed full-height panel over a scrollable page scrolls the page behind
  // it, so the body is pinned for as long as the panel is up.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const social = siteConfig.x ? (
    <a
      href={siteConfig.x}
      target="_blank"
      rel="noopener noreferrer"
      className="gs-nav-social"
      aria-label={`${siteConfig.wordmark} on X`}
    >
      <XIcon />
    </a>
  ) : null;

  return (
    <>
      <nav className={`gs-nav${shrunk ? " is-shrunk" : ""}`}>
        <div className="gs-nav-left">
          <Link href="/" className="gs-logo" aria-label={siteConfig.wordmark}>
            <Mark className="gs-logo-mark" />
          </Link>
        </div>

        <span className="gs-nav-mobile-title" aria-hidden="true">
          {siteConfig.name}
        </span>

        <div className="gs-nav-center">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="gs-nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="gs-nav-right">
          {social ? <div className="gs-socials">{social}</div> : null}
          <Link href={links.app} className="gs-btn-solid">
            Launch App
          </Link>
        </div>

        <button
          type="button"
          className={`gs-hamburger${open ? " is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* The panel lives outside the pill on purpose: `.gs-nav` carries both a
          backdrop-filter and `overflow: hidden`, and a filtered ancestor becomes
          the containing block for `position: fixed` — a menu rendered inside it
          would be sized against the bar and then clipped by it. */}
      <div className={`gs-mobile-menu${open ? " is-open" : ""}`}>
        <div className="gs-mobile-links">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="gs-mobile-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="gs-mobile-actions">
          {social ? (
            <div className="gs-socials gs-mobile-socials">{social}</div>
          ) : null}
          <Link
            href={links.app}
            className="gs-btn-solid gs-mobile-btn"
            onClick={() => setOpen(false)}
          >
            Launch App
          </Link>
        </div>
      </div>
    </>
  );
}
