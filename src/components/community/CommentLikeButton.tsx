"use client";

import { useTransition } from "react";
import { toggleLikeComment } from "@/app/community/_actions";

interface Props {
  commentId: string;
  count: number;
  liked: boolean;
  canLike: boolean;
}

export default function CommentLikeButton({ commentId, count, liked, canLike }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={!canLike || pending}
      onClick={() => {
        if (!canLike) return;
        startTransition(() => toggleLikeComment(commentId));
      }}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: liked ? "var(--gold)" : "var(--cream-soft)",
        background: liked ? "rgba(212,175,55,.12)" : "none",
        border: liked ? "1px solid var(--gold)" : "1px solid var(--line)",
        borderRadius: 3,
        padding: "3px 8px",
        cursor: canLike ? "pointer" : "default",
        opacity: pending ? 0.6 : 1,
        transition: "all 0.15s",
      }}
    >
      ♥ {count}
    </button>
  );
}
