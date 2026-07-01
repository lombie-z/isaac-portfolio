import { ImageResponse } from "next/og";

export const alt = "Isaac W. R. Lombard | Software and AI Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Minimal OG: the brand blue field with the name + tagline, mirroring the hero.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#0000FF",
        padding: "72px 80px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* three-shapes mark */}
      <svg width="72" height="72" viewBox="0 0 512 512" fill="#ffffff" style={{ marginBottom: 40 }}>
        <path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2l192 0c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312l0 144c0 22.1 17.9 40 40 40l144 0c22.1 0 40-17.9 40-40l0-144c0-22.1-17.9-40-40-40l-144 0c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z" />
      </svg>
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
        Isaac W. R. Lombard
      </div>
      <div style={{ fontSize: 38, marginTop: 28, opacity: 0.92 }}>Software and AI Consulting</div>
    </div>,
    { ...size },
  );
}
