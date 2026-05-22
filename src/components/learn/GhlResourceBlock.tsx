import { GHL_BIG_LOOP_STRIPE_URL } from "@/lib/portal-software";

type ModuleDownload = {
  id: string;
  title: string;
  url: string;
  fileType: string | null;
};

export function isGhlModule(moduleTitle: string, sortOrder: number): boolean {
  return (
    sortOrder === 5 ||
    moduleTitle.toLowerCase().includes("gohighlevel") ||
    moduleTitle.toLowerCase().includes("go high level")
  );
}

export default function GhlResourceBlock({
  downloads,
}: {
  downloads: ModuleDownload[];
}) {
  const items =
    downloads.length > 0
      ? downloads
      : [
          {
            id: "ghl-default",
            title: "GoHighLevel — Big Loop Flow ($1/mo)",
            url: GHL_BIG_LOOP_STRIPE_URL,
            fileType: "Link",
          },
        ];

  return (
    <section
      aria-label="Go High Level resources"
      style={{
        marginTop: 8,
        marginBottom: 8,
        padding: "24px 28px",
        background: "rgba(212, 175, 55, 0.08)",
        border: "1px solid var(--gold)",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10.5,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 10,
        }}
      >
        Go High Level Resources
      </div>
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--cream-soft)",
          margin: "0 0 20px 0",
          maxWidth: "52ch",
        }}
      >
        Get your sub-account through <strong style={{ color: "var(--cream)" }}>Big Loop Flow</strong> for{" "}
        <strong style={{ color: "var(--gold)" }}>$1/month</strong> — dialer, pipeline, and CRM. Set this up before
        Day 1 of calling.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((dl) => (
          <a
            key={dl.id}
            href={dl.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-start",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "14px 28px",
              background: "var(--gold)",
              color: "var(--ink)",
              fontWeight: 700,
              borderRadius: 3,
              textDecoration: "none",
              transition: "filter 0.2s ease",
            }}
          >
            {dl.title.includes("Big Loop") ? "Get GHL for $1/mo →" : `${dl.title} →`}
          </a>
        ))}
      </div>
    </section>
  );
}
