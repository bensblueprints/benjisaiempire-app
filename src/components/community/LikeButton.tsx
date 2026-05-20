"use client";

import { useTransition } from "react";
import { toggleLikePost } from "@/app/community/_actions";

interface Props {
  postId: string;
  count: number;
  liked: boolean;
  canLike: boolean;
}

export default function LikeButton({ postId, count, liked, canLike }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={!canLike || pending}
      onClick={() => {
        if (!canLike) return;
        startTransition(() => toggleLikePost(postId));
      }}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: liked ? "var(--gold)" : "var(--cream-soft)",
        background: liked ? "rgba(212,175,55,.12)" : "none",
        border: liked ? "1px solid var(--gold)" : "1px solid var(--line)",
        borderRadius: 3,
        padding: "4px 10px",
        cursor: canLike ? "pointer" : "default",
        opacity: pending ? 0.6 : 1,
        transition: "all 0.15s",
      }}
    >
      ♥ {count}
    </button>
  );
}
