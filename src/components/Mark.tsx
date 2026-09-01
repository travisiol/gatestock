/**
 * The mark: a shield with a portcullis inside it.
 *
 * The shield is the category — this is a defensive product — and the
 * portcullis is the name: a gate that is shut but that you can still see
 * through, which is the whole claim. One bar is lit brighter than the others
 * because exactly one thing passes: the proof.
 */
export function Mark({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gs-plate" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#2a2a12" />
          <stop offset="1" stopColor="#14140a" />
        </linearGradient>
        <linearGradient id="gs-shield" x1="32" y1="10" x2="32" y2="56">
          <stop offset="0" stopColor="#e8fc56" />
          <stop offset="1" stopColor="#b6d004" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="15" fill="url(#gs-plate)" />
      <rect
        x="0.5"
        y="0.5"
        width="63"
        height="63"
        rx="14.5"
        stroke="rgba(204,232,4,0.28)"
      />

      <path
        d="M32 11 L50 17.5 V32.5 C50 43.2 42.6 50.9 32 54 C21.4 50.9 14 43.2 14 32.5 V17.5 Z"
        fill="url(#gs-shield)"
      />

      {/* The portcullis. Drawn in the plate colour so it reads as an opening
          cut out of the shield rather than as ornament laid on top. */}
      <g stroke="#14140a" strokeWidth="2.6" strokeLinecap="round">
        <path d="M24 22 V45" />
        <path d="M32 22 V48" opacity="0.35" />
        <path d="M40 22 V45" />
        <path d="M19 29 H45" />
        <path d="M19 37 H45" />
      </g>
    </svg>
  );
}
