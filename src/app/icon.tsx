import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#c6ff3d",
          color: "#0a0a0b",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        EP
      </div>
    ),
    size,
  );
}
