import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const TIER_COLOR: Record<string, { bg: string; color: string; border: string }> = {
  WHOLESALE: { bg: "var(--gold)", color: "var(--ink)", border: "none" },
  INSIDER: { bg: "rgba(212,175,55,.15)", color: "var(--gold)", border: "1px solid var(--gold)" },
  FREE: { bg: "var(--ink-3)", color: "var(--cream-soft)", border: "1px solid var(--line)" },
};

export default async function MembersPage() {
  const members = await prisma.user.findMany({
    orderBy: [{ tier: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      image: true,
      tier: true,
      createdAt: true,
      _count: {
        select: { posts: true, comments: true },
      },
    },
  });

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Community</div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1, margin: 0 }}>
          Members
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", marginTop: 10, fontSize: 15 }}>
          {members.length} member{members.length !== 1 ? "s" : ""} in the community.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {members.map((m) => {
          const tc = TIER_COLOR[m.tier] ?? TIER_COLOR.FREE;
          return (
            <div key={m.id} style={{
              background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 20,
              display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%", background: "var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Anton, sans-serif", fontSize: 18, color: "var(--ink)", flexShrink: 0, overflow: "hidden",
              }}>
                {m.image
                  ? <img src={m.image} alt="" style={{ width: 46, height: 46, objectFit: "cover" }} />
                  : (m.name?.[0] ?? "?").toUpperCase()
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 14, marginBottom: 4 }}>
                  {m.name ?? "Member"}
                </div>
                <span style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: ".08em",
                  padding: "2px 7px", borderRadius: 2, textTransform: "uppercase",
                  background: tc.bg, color: tc.color, border: tc.border,
                }}>
                  {m.tier}
                </span>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginTop: 8 }}>
                  {m._count.posts} posts · {m._count.comments} replies
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--cream-soft)", marginTop: 4 }}>
                  Joined {new Date(m.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
