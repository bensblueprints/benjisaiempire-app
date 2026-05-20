"use client";

import { useTransition } from "react";
import { deletePost } from "@/app/community/_actions";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  redirectAfter?: string;
}

export default function DeletePostButton({ postId, redirectAfter }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this post?")) return;
        startTransition(async () => {
          await deletePost(postId);
          if (redirectAfter) router.push(redirectAfter);
        });
      }}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: "var(--cream-soft)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: pending ? 0.5 : 1,
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
