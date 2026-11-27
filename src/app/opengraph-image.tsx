import { ImageResponse } from "next/og";

export const alt = "Erick de Paula — Desenvolvedor de Software Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LIME = "#c6ff3d";

export default function OpengraphImage() {
  const stack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 15%, rgba(198,255,61,0.18), transparent 45%), #0a0a0b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 999,
              background: LIME,
              color: "#0a0a0b",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            EP
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>erickdepaula.com.br</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Erick de Paula</div>
          <div style={{ display: "flex", fontSize: 44, color: LIME, marginTop: 18 }}>Desenvolvedor de Software Full Stack</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {stack.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid #2a2a2e",
                fontSize: 24,
                color: "#d4d4d8",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
