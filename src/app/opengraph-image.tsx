import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Artem Kalus | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 100%)",
        }}
      >
        <div style={{ fontSize: 28, color: "#a5b4fc" }}>Full-Stack Developer</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>Artem Kalus</div>
        <div style={{ fontSize: 34, color: "#d4d4d8", marginTop: 24 }}>
          Next.js · TypeScript · Supabase · AI automation
        </div>
      </div>
    ),
    size,
  );
}
