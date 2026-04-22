import { ImageResponse } from "next/og";

export const alt = "2026 Soccer World Cup — history, predictions, fan stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 8,
              background: "#39ff8c",
              borderRadius: 4,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            World Cup
          </span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          2026 Soccer World Cup
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          History, data, 2026 predictions, and fan stories in one place.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
