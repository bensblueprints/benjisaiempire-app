import { prisma } from "@/lib/db";
import { deletePost, pinPost } from "@/app/community/_actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminCommunityPage() {
  const posts = await prisma.post.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      author: { select: { name: true, email: true, tier: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Control Room</div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1, margin: 0 }}>
          Community
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", marginTop: 12, fontSize: 15 }}>
          Manage posts — pin, delete, moderate.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {posts.length === 0 && (
          <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "32px 24px", textAlign: "center", color: "var(--cream-soft)", fontFamily: "Fraunces, serif", fontStyle: "italic" }}>
            No posts yet.
          </div>
        )}
        {posts.map((p) => (
          <div key={p.id} style={{
            background: "var(--ink-2)", border: p.pinned ? "1px solid var(--gold)" : "1px solid var(--line)",
            borderRadius: 4, padding: "14px 18px",
            display: "grid", gridTemplateColumns: "auto 2fr 1fr 80px 80px auto auto", gap: 14, alignItems: "center",
          }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--gold)" }}>
              {p.pinned ? "📌" : ""}
            </div>
            <div>
              {p.title && <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 14 }}>{p.title}</div>}
              <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 12, marginTop: 2 }}>
                {p.body.length > 120 ? p.body.slice(0, 120) + "…" : p.body}
              </div>
            </div>
            <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 12 }}>
              {p.author.name ?? p.author.email}
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--cream-soft)", marginTop: 2 }}>{p.author.tier}</div>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)" }}>
              ♥ {p._count.likes} · 💬 {p._count.comments}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)" }}>
              {new Date(p.createdAt).toLocaleDateString()}
            </div>
            <form action={pinPost.bind(null, p.id, !p.pinned)}>
              <button type="submit" style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase",
                letterSpacing: ".08em", padding: "5px 10px", background: "none",
                border: "1px solid var(--line)", color: "var(--cream-soft)", borderRadius: 3, cursor: "pointer",
              }}>
                {p.pinned ? "Unpin" : "Pin"}
              </button>
            </form>
            <DeleteButton
              onConfirm={deletePost.bind(null, p.id)}
              label="Delete"
              message={`Delete post by ${p.author.name ?? p.author.email}?`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
