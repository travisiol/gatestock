import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/** The hero, flattened: black, one lime bloom off the top right, thin type. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 84,
          background: "#000",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -140,
            width: 760,
            height: 760,
            borderRadius: 380,
            background:
              "radial-gradient(circle, rgba(204,232,4,0.42), rgba(0,0,0,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 14,
            color: "#cce804",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: -3,
            color: "#ffffff",
          }}
        >
          Own without being watched.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            maxWidth: 760,
            fontSize: 28,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {siteConfig.seoDescription}
        </div>
      </div>
    ),
    { ...size },
  );
}
