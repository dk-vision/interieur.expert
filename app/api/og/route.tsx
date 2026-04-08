import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#000000" }}>interieur</span>
            <span style={{ color: "#0000FF" }}>.</span>
            <span style={{ color: "#0000FF" }}>expert</span>
          </div>
          <p
            style={{
              fontSize: "28px",
              color: "#666666",
              margin: 0,
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            Inspiratie, advies en trends voor je interieur
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
