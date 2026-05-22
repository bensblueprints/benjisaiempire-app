import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { createPost } from "./_actions";
import DeletePostButton from "@/components/community/DeletePostButton";
import LikeButton from "@/components/community/LikeButton";
import ProfilePhotoUploader from "@/components/community/ProfilePhotoUploader";

export const dynamic = "force-dynamic";

const CATEGORIES = ["General", "Win", "Question", "Intro", "Resource", "Strategy"];

const inp: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  width: "100%",
};

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const session = await auth();
  const userId = session?.user?.id ?? "";
  const userTier = session?.user?.tier ?? "FREE";

  const profileUser =
    userId
      ? await prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true, image: true },
        })
      : null;
  const isAdmin = session?.user?.role === "ADMIN";
  const canPost = isAdmin || userTier !== "FREE";

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(cat ? { category: cat } : {}),
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 50,
    include: {
      author: { select: { id: true, name: true, image: true, tier: true } },
      likes: { select: { userId: true } },
      comments: { select: { id: true } },
    },
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
      {/* Main feed */}
      <div>
        {/* Post composer */}
        {canPost ? (
          <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 24, marginBottom: 28 }}>
            <div style={{ fontFamily: "Anton, sans-serif", fontSize: 18, textTransform: "uppercase", color: "var(--cream)", marginBottom: 16 }}>New Post</div>
            <form action={createPost} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 12 }}>
                <input name="title" placeholder="Title (optional)" style={inp} />
                <select name="category" style={{ ...inp, cursor: "pointer" }}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <textarea
                name="body"
                placeholder="What's on your mind?"
                required
                rows={4}
                style={{ ...inp, resize: "vertical" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase",
                  letterSpacing: ".1em", padding: "10px 22px", background: "var(--gold)",
                  color: "var(--ink)", borderRadius: 3, fontWeight: 600, cursor: "pointer",
                }}>
                  Post
                </button>
              </div>
            </form>
          </section>
        ) : (
          <div style={{ background: "var(--ink-2)", border: "1px solid var(--gold)", borderRadius: 6, padding: "18px 24px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14 }}>
              Upgrade to Insider to post, like, and comment.
            </span>
            <Link href="/portal?upgrade=1" style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase",
              letterSpacing: ".1em", padding: "8px 16px", background: "var(--gold)",
              color: "var(--ink)", borderRadius: 3, fontWeight: 600,
            }}>
              Upgrade
            </Link>
          </div>
        )}

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {posts.length === 0 && (
            <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "40px 24px", textAlign: "center", color: "var(--cream-soft)", fontFamily: "Fraunces, serif", fontStyle: "italic" }}>
              No posts yet. Be the first!
            </div>
          )}
          {posts.map((p) => {
            const liked = p.likes.some((l) => l.userId === userId);
            return (
              <article key={p.id} style={{
                background: "var(--ink-2)", border: p.pinned ? "1px solid var(--gold)" : "1px solid var(--line)",
                borderRadius: 6, padding: 20,
              }}>
                {p.pinned && (
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--gold)", marginBottom: 8 }}>
                    📌 Pinned
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "var(--gold)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Anton, sans-serif", fontSize: 14, color: "var(--ink)", flexShrink: 0,
                  }}>
                    {p.author.image
                      ? <img src={p.author.image} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                      : (p.author.name?.[0] ?? "?").toUpperCase()
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 14 }}>
                        {p.author.name ?? "Member"}
                      </span>
                      <span style={{
                        fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: ".08em",
                        padding: "2px 7px", borderRadius: 2, textTransform: "uppercase",
                        background: p.author.tier === "WHOLESALE" ? "var(--gold)" : p.author.tier === "INSIDER" ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                        color: p.author.tier === "WHOLESALE" ? "var(--ink)" : p.author.tier === "INSIDER" ? "var(--gold)" : "var(--cream-soft)",
                        border: p.author.tier === "INSIDER" ? "1px solid var(--gold)" : "1px solid var(--line)",
                      }}>
                        {p.author.tier}
                      </span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--cream-soft)", padding: "2px 7px", background: "var(--ink-3)", borderRadius: 2 }}>
                        {p.category}
                      </span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginLeft: "auto" }}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {p.title && (
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 16, marginBottom: 6 }}>
                        {p.title}
                      </div>
                    )}
                    <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {p.body.length > 400 ? (
                        <>
                          {p.body.slice(0, 400)}…{" "}
                          <Link href={`/community/post/${p.id}`} style={{ color: "var(--gold)", fontWeight: 600 }}>Read more</Link>
                        </>
                      ) : p.body}
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 14, alignItems: "center" }}>
                      <LikeButton
                        postId={p.id}
                        count={p.likes.length}
                        liked={liked}
                        canLike={canPost}
                      />
                      <Link href={`/community/post/${p.id}`} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                        💬 {p.comments.length} {p.comments.length === 1 ? "reply" : "replies"}
                      </Link>
                      {(p.authorId === userId || isAdmin) && (
                        <DeletePostButton postId={p.id} />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {profileUser && (
          <ProfilePhotoUploader
            name={profileUser.name}
            email={profileUser.email}
            imageUrl={profileUser.image}
          />
        )}

        {/* Category filter */}
        <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontFamily: "Anton, sans-serif", fontSize: 14, textTransform: "uppercase", color: "var(--cream)", letterSpacing: ".04em", marginBottom: 12 }}>Categories</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link href="/community" style={{
              fontFamily: "Manrope, sans-serif", fontSize: 13, color: !cat ? "var(--gold)" : "var(--cream-soft)", padding: "5px 0", textDecoration: "none", fontWeight: !cat ? 700 : 400,
            }}>
              All posts
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c} href={`/community?cat=${c}`} style={{
                fontFamily: "Manrope, sans-serif", fontSize: 13, color: cat === c ? "var(--gold)" : "var(--cream-soft)", padding: "5px 0", textDecoration: "none", fontWeight: cat === c ? 700 : 400,
              }}>
                {c}
              </Link>
            ))}
          </div>
        </section>

        {/* Live sessions */}
        <section style={{ background: "rgba(212,175,55,.08)", border: "1px solid var(--gold)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontFamily: "Anton, sans-serif", fontSize: 14, textTransform: "uppercase", color: "var(--gold)", letterSpacing: ".04em", marginBottom: 10 }}>🔴 Live Sessions</div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "var(--cream-soft)", lineHeight: 1.6 }}>
            Every <strong style={{ color: "var(--cream)" }}>Tuesday & Thursday</strong>
            <br />Check Events for join links.
          </div>
          <Link href="/community/events" style={{
            display: "inline-block", marginTop: 12,
            fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase",
            letterSpacing: ".1em", padding: "7px 14px", border: "1px solid var(--gold)",
            color: "var(--gold)", borderRadius: 3,
          }}>
            View Events
          </Link>
        </section>
      </aside>
    </div>
  );
}
