import Link from "next/link";
import { Mark } from "@/components/Mark";
import { links, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="gs-f">
      <div className="gs-f-wrap">
        <div className="gs-f-top">
          <div className="gs-f-brand">
            <Mark size={34} />
            <span>{siteConfig.name}</span>
          </div>
          <p className="gs-f-tag">
            Zero-knowledge ownership for onchain assets. Self-custody
            throughout.
          </p>
        </div>

        <div className="gs-f-cols">
          <div>
            <div className="gs-f-h">Product</div>
            <Link className="gs-f-l" href={links.app}>
              Console
            </Link>
            <Link className="gs-f-l" href={links.whitepaper}>
              Whitepaper
            </Link>
          </div>
          <div>
            <div className="gs-f-h">Community</div>
            {siteConfig.x ? (
              <a
                className="gs-f-l"
                href={siteConfig.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            ) : (
              <span className="gs-f-l" style={{ color: "#6f6e6e" }}>
                Soon
              </span>
            )}
          </div>
          <div>
            <div className="gs-f-h">Legal</div>
            <Link className="gs-f-l" href={links.privacy}>
              Privacy Policy
            </Link>
            <Link className="gs-f-l" href={links.terms}>
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="gs-f-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.wordmark} — an independent,
            self-custody protocol.
          </span>
          <span>
            Not affiliated with, endorsed by, or operated by Robinhood Markets,
            Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
