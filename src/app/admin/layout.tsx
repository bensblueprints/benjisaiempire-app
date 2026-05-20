import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: "color-mix(in srgb, var(--ink) 94%, transparent)",
          backdropFilter: "blur(14px) saturate(140%)",
          borderBottom: "1px solid var(--line)",
          height: 72,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 56px)",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link
              href="/admin"
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: 18,
                letterSpacing: ".06em",
                color: "var(--cream)",
                textTransform: "uppercase",
              }}
            >
              ADMIN <span style={{ color: "var(--gold)" }}>·</span> BENJI&apos;S AI EMPIRE
            </Link>
            <nav style={{ display: "flex", gap: 22, fontFamily: "JetBrains Mono, monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em" }}>
              <Link href="/admin/courses" style={{ color: "var(--cream-soft)" }}>Courses</Link>
              <Link href="/admin/downloads" style={{ color: "var(--cream-soft)" }}>Downloads</Link>
              <Link href="/admin/students" style={{ color: "var(--cream-soft)" }}>Students</Link>
              <Link href="/admin/community" style={{ color: "var(--cream-soft)" }}>Community</Link>
              <Link href="/admin/events" style={{ color: "var(--cream-soft)" }}>Events</Link>
              <Link href="/" style={{ color: "var(--cream-soft)" }}>Site</Link>
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Link
              href="/"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                color: "var(--cream-soft)",
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              ← Back to site
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  border: "1px solid var(--gold)",
                  padding: "6px 12px",
                  borderRadius: 3,
                  background: "transparent",
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "40px clamp(20px, 4vw, 56px) 80px",
          minHeight: "calc(100vh - 72px)",
        }}
      >
        {children}
      </main>
    </>
  );
}
