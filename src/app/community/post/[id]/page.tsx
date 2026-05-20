import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createComment, deleteComment } from "../../_actions";
import LikeButton from "@/components/community/LikeButton";
import CommentLikeButton from "@/components/community/CommentLikeButton";
import DeletePostButton from "@/components/community/DeletePostButton";

export const dynamic = "force-dynamic";

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

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id ?? "";
  const userTier = session?.user?.tier ?? "FREE";
  const isAdmin = session?.user?.role === "ADMIN";
  const canPost = isAdmin || userTier !== "FREE";

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true, tier: true } },
      likes: { select: { userId: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, name: true, image: true, tier: true } },
          likes: { select: { userId: true } },
        },
      },
    },
  });

  if (!post || !post.published) notFound();

  const liked = post.likes.some((l) => l.userId === userId);

  return (
    <div style={{ maxWidth: 780 }}>
      <Link href="/community" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--cream-soft)", marginBottom: 20, display: "inline-block" }}>
        ← Back to feed
      </Link>

      {/* Post */}
      <article style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 28, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%", background: "var(--gold)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Anton, sans-serif", fontSize: 16, color: "var(--ink)", flexShrink: 0,
          }}>
            {post.author.image
              ? <img src={post.author.image} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
              : (post.author.name?.[0] ?? "?").toUpperCase()
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
              <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 15 }}>
                {post.author.name ?? "Member"}
              </span>
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 9, padding: "2px 7px", borderRadius: 2, textTransform: "uppercase",
                background: post.author.tier === "INSIDER" ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                color: post.author.tier === "INSIDER" ? "var(--gold)" : "var(--cream-soft)",
                border: post.author.tier === "INSIDER" ? "1px solid var(--gold)" : "1px solid var(--line)",
              }}>
                {post.author.tier}
              </span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginLeft: "auto" }}>
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            {post.title && (
              <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: 28, textTransform: "uppercase", color: "var(--cream)", marginBottom: 12, letterSpacing: ".02em" }}>
                {post.title}
              </h1>
            )}
            <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {post.body}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
              <LikeButton postId={post.id} count={post.likes.length} liked={liked} canLike={canPost} />
              {(post.authorId === userId || isAdmin) && (
                <DeletePostButton postId={post.id} redirectAfter="/community" />
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Comments */}
      <section>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 20, textTransform: "uppercase", color: "var(--cream)", marginBottom: 16 }}>
          {post.comments.length} {post.comments.length === 1 ? "Reply" : "Replies"}
        </div>

        {canPost && (
          <form action={createComment.bind(null, post.id)} style={{ marginBottom: 20 }}>
            <textarea
              name="body"
              placeholder="Write a reply…"
              required
              rows={3}
              style={{ ...inp, resize: "vertical", marginBottom: 10 }}
            />
            <button type="submit" style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase",
              letterSpacing: ".1em", padding: "9px 20px", background: "var(--gold)",
              color: "var(--ink)", borderRadius: 3, fontWeight: 600, cursor: "pointer",
            }}>
              Reply
            </button>
          </form>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {post.comments.map((c) => {
            const cLiked = c.likes.some((l) => l.userId === userId);
            return (
              <div key={c.id} style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 5, padding: "16px 20px" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: "var(--ink-3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Anton, sans-serif", fontSize: 12, color: "var(--cream)", flexShrink: 0,
                  }}>
                    {c.author.image
                      ? <img src={c.author.image} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                      : (c.author.name?.[0] ?? "?").toUpperCase()
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 13 }}>
                        {c.author.name ?? "Member"}
                      </span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)" }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {c.body}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 10, alignItems: "center" }}>
                      <CommentLikeButton commentId={c.id} count={c.likes.length} liked={cLiked} canLike={canPost} />
                      {(c.authorId === userId || isAdmin) && (
                        <form action={deleteComment.bind(null, c.id)}>
                          <button type="submit" style={{
                            fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase",
                            letterSpacing: ".08em", color: "var(--cream-soft)", background: "none",
                            border: "none", cursor: "pointer", padding: 0,
                          }}>
                            Delete
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
