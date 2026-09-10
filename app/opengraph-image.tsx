import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#cc4a14",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#78716c",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Satori requires an explicit display on any node with more than
            one child, so each line is its own single-text-child div. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          <div style={{ display: "flex", color: "#1c1917" }}>
            I build AI products
          </div>
          <div style={{ display: "flex", color: "#1c1917" }}>
            that make it to
          </div>
          <div style={{ display: "flex", color: "#cc4a14" }}>production.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#78716c",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.role}</div>
          <div style={{ display: "flex" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
