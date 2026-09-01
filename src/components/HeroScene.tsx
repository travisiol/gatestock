/**
 * The hero backdrop: a ridge, a shaft of light, and one figure at the crest.
 *
 * It is drawn rather than filmed or photographed so the headline never waits
 * on a download, and so the lime reads as the same lime as the rest of the
 * page instead of whatever a camera happened to record. The figure is small
 * on purpose — the page is about not being seen, and a face would undo that.
 */
export function HeroScene() {
  return (
    <div className="gs-hero-scene" aria-hidden="true">
      <div className="gs-hero-beam" />
      <div className="gs-hero-beam-core" />

      <svg
        className="gs-hero-ridge"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          <filter id="gs-ridge-glow" x="-20%" y="-60%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="gs-ridge-mid" x="-20%" y="-60%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <linearGradient id="gs-ridge-line" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0" stopColor="#cce804" stopOpacity="0.15" />
            <stop offset="0.42" stopColor="#e8fc56" stopOpacity="1" />
            <stop offset="0.78" stopColor="#cce804" stopOpacity="0.55" />
            <stop offset="1" stopColor="#cce804" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* A second, further ridge — without it the horizon reads as a single
            drawn line rather than as ground. */}
        <path
          d="M-60 600 L-60 470 C 220 452 430 392 640 322 C 880 244 1120 212 1500 176 L1500 600 Z"
          fill="#0a0809"
          opacity="0.85"
        />

        <path
          d="M-60 600 L-60 566 C 210 524 392 430 566 336 C 742 242 980 196 1500 148 L1500 600 Z"
          fill="#060506"
        />

        {/* Three passes over the same curve: a wide bloom, a soft halo, and a
            hairline that is never blurred. Drop the hairline and the horizon
            reads as fog; drop the bloom and it reads as a stroke in a diagram. */}
        <path
          d="M-60 566 C 210 524 392 430 566 336 C 742 242 980 196 1500 148"
          stroke="url(#gs-ridge-line)"
          strokeWidth="12"
          filter="url(#gs-ridge-glow)"
          opacity="0.8"
        />
        <path
          d="M-60 566 C 210 524 392 430 566 336 C 742 242 980 196 1500 148"
          stroke="url(#gs-ridge-line)"
          strokeWidth="3.5"
          filter="url(#gs-ridge-mid)"
          opacity="0.9"
        />
        <path
          d="M-60 566 C 210 524 392 430 566 336 C 742 242 980 196 1500 148"
          stroke="url(#gs-ridge-line)"
          strokeWidth="1.4"
        />

        {/* The figure stands where the curve is brightest, so it reads as a
            cut-out in the light rather than as a shape drawn on the dark. */}
        <g fill="#050405">
          <circle cx="566" cy="311" r="3.6" />
          <path d="M562.2 316 h7.6 l-1.3 9.5 1.8 8.4 h-2.4 l-1.9-7 -1.9 7 h-2.4 l1.8-8.4 z" />
        </g>
      </svg>

      <div className="gs-hero-haze" />
    </div>
  );
}
