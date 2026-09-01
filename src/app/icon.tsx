import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The mark reduced to what survives at 16px: a lime plate with the portcullis
 * cut out of it. The shield outline is dropped — at favicon size it collapses
 * into a blob, and the bars are the half that still reads.
 */
export default function Icon() {
  const bar = {
    position: "absolute" as const,
    background: "#14140a",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14140a",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 46,
            height: 46,
            borderRadius: 11,
            background: "#cce804",
          }}
        >
          <div style={{ ...bar, left: 12, top: 6, width: 4, height: 34 }} />
          <div style={{ ...bar, left: 30, top: 6, width: 4, height: 34 }} />
          <div style={{ ...bar, left: 5, top: 15, width: 36, height: 4 }} />
          <div style={{ ...bar, left: 5, top: 27, width: 36, height: 4 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
