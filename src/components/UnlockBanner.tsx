"use client";

import { useSearchParams } from "next/navigation";

const PLANS_URL =
  process.env.NEXT_PUBLIC_PLANS_URL ||
  "https://drive.google.com/drive/folders/1I--Aa_uMJMtv5p95IHHBcEGPJj1gEA0u";

export default function UnlockBanner() {
  const sp = useSearchParams();
  if (sp.get("unlocked") !== "1") return null;
  return (
    <div
      role="status"
      style={{
        background: "linear-gradient(90deg,#d4af37,#f5d061)",
        color: "#0b0b0c",
        padding: "12px 18px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px 16px",
        fontWeight: 700,
        fontSize: "15px",
        textAlign: "center",
      }}
    >
      <span>✓ You&apos;re in — your free business plans are ready.</span>
      <a
        href={PLANS_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#0b0b0c",
          color: "#f5d061",
          padding: "8px 16px",
          borderRadius: "8px",
          fontWeight: 800,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Open the plans folder →
      </a>
      <span style={{ fontWeight: 600, opacity: 0.85 }}>
        We also emailed the link to you.
      </span>
    </div>
  );
}
