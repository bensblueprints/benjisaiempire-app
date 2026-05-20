"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user;
}

async function requirePaidOrAdmin() {
  const user = await requireUser();
  if (user.role === "ADMIN") return user;
  if (user.tier === "FREE") throw new Error("Upgrade required to post");
  return user;
}

async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new Error("Forbidden");
  return user;
}

/* ── POSTS ── */

export async function createPost(formData: FormData) {
  const user = await requirePaidOrAdmin();
  const body = (formData.get("body") as string)?.trim();
  const title = (formData.get("title") as string)?.trim() || null;
  const category = (formData.get("category") as string)?.trim() || "General";
  if (!body) throw new Error("Post body required");
  await prisma.post.create({
    data: { authorId: user.id, body, title, category },
  });
  revalidatePath("/community");
}

export async function deletePost(postId: string) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return;
  if (post.authorId !== user.id && user.role !== "ADMIN") throw new Error("Forbidden");
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/community");
}

export async function pinPost(postId: string, pinned: boolean) {
  await requireAdmin();
  await prisma.post.update({ where: { id: postId }, data: { pinned } });
  revalidatePath("/community");
}

/* ── LIKES ── */

export async function toggleLikePost(postId: string) {
  const user = await requirePaidOrAdmin();
  const existing = await prisma.postLike.findUnique({
    where: { userId_postId: { userId: user.id, postId } },
  });
  if (existing) {
    await prisma.postLike.delete({ where: { userId_postId: { userId: user.id, postId } } });
  } else {
    await prisma.postLike.create({ data: { userId: user.id, postId } });
  }
  revalidatePath("/community");
}

export async function toggleLikeComment(commentId: string) {
  const user = await requirePaidOrAdmin();
  const existing = await prisma.commentLike.findUnique({
    where: { userId_commentId: { userId: user.id, commentId } },
  });
  if (existing) {
    await prisma.commentLike.delete({ where: { userId_commentId: { userId: user.id, commentId } } });
  } else {
    await prisma.commentLike.create({ data: { userId: user.id, commentId } });
  }
  revalidatePath("/community");
}

/* ── COMMENTS ── */

export async function createComment(postId: string, formData: FormData) {
  const user = await requirePaidOrAdmin();
  const body = (formData.get("body") as string)?.trim();
  if (!body) throw new Error("Comment required");
  await prisma.comment.create({
    data: { postId, authorId: user.id, body },
  });
  revalidatePath(`/community/post/${postId}`);
}

export async function deleteComment(commentId: string) {
  const user = await requireUser();
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) return;
  if (comment.authorId !== user.id && user.role !== "ADMIN") throw new Error("Forbidden");
  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath(`/community/post/${comment.postId}`);
}

/* ── EVENTS ── */

export async function createEvent(formData: FormData) {
  await requireAdmin();
  const title = (formData.get("title") as string)?.trim();
  if (!title) throw new Error("Title required");
  const startsAt = new Date(formData.get("startsAt") as string);
  const endsAtRaw = formData.get("endsAt") as string;
  const endsAt = endsAtRaw ? new Date(endsAtRaw) : null;
  await prisma.event.create({
    data: {
      title,
      description: (formData.get("description") as string)?.trim() || null,
      startsAt,
      endsAt,
      joinUrl: (formData.get("joinUrl") as string)?.trim() || null,
      recurring: (formData.get("recurring") as string)?.trim() || null,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/community/events");
  revalidatePath("/admin/events");
}

export async function deleteEvent(eventId: string) {
  await requireAdmin();
  await prisma.event.delete({ where: { id: eventId } });
  revalidatePath("/community/events");
  revalidatePath("/admin/events");
}

export async function toggleRsvp(eventId: string) {
  const user = await requireUser();
  const existing = await prisma.eventRsvp.findUnique({
    where: { userId_eventId: { userId: user.id, eventId } },
  });
  if (existing) {
    await prisma.eventRsvp.delete({ where: { userId_eventId: { userId: user.id, eventId } } });
  } else {
    await prisma.eventRsvp.create({ data: { userId: user.id, eventId } });
  }
  revalidatePath("/community/events");
}
