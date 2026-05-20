import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CommunityLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/community");

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--ink-2)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 32, height: 56 }}>
          <Link href="/community" style={{ fontFamily: "Anton, sans-serif", fontSize: 18, textTransform: "uppercase", color: "var(--gold)", letterSpacing: ".05em", textDecoration: "none" }}>
            Community
          </Link>
          <nav style={{ display: "flex", gap: 4, flex: 1 }}>
            {[
              { href: "/community", label: "Feed" },
              { href: "/community/events", label: "Events" },
              { href: "/community/members", label: "Members" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: ".12em",
                color: "var(--cream-soft)",
                padding: "6px 14px",
                borderRadius: 3,
                textDecoration: "none",
              }}>
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/portal" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--cream-soft)", textDecoration: "none" }}>
            ← Portal
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}
