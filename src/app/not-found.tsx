import Link from "next/link";
import { links } from "@/lib/site-config";

/**
 * Next's built-in 404 sets its own colours and renders black-on-black inside
 * this layout, so a missing route looked to the visitor like a click that did
 * nothing at all. Any route that does not exist yet says so here instead.
 */
export default function NotFound() {
  return (
    <div className="gs-nf">
      <span className="gs-nf-code">404 — NOT IN THE SET</span>
      <h1>Nothing at this address.</h1>
      <p>
        The page you asked for does not exist yet. The console does, and it runs
        the whole commit-and-prove flow in your browser.
      </p>
      <div className="gs-cta-row">
        <Link href={links.app} className="gs-cta">
          Open the console
        </Link>
        <Link href="/" className="gs-cta-ghost">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
