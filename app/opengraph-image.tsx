import { ImageResponse } from "next/og"

import { profile } from "@/content/profile"

export const alt = `${profile.name} — ${profile.role}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14110f",
          color: "#faf8f5",
          padding: "56px 64px",
          border: "2px solid #2e2621",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #2e2621",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#efae7c",
            }}
          >
            <span>PORTFOLIO & JOURNAL</span>
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a89d93",
            }}
          >
            {profile.location}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#faf8f5",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#d4c8be",
              maxWidth: "960px",
            }}
          >
            {`${profile.role} — ${profile.focus}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2e2621",
            paddingTop: "24px",
            fontSize: 18,
            color: "#a89d93",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {profile.focusAreas.slice(0, 4).map((area) => (
              <div
                key={area}
                style={{
                  display: "flex",
                  border: "1px solid #3a3029",
                  backgroundColor: "#1d1815",
                  padding: "6px 14px",
                  color: "#efae7c",
                  fontSize: 16,
                }}
              >
                {area}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#d4c8be" }}>
            {profile.institution}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

