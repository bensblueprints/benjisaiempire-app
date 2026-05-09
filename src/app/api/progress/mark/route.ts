// POST /api/progress/mark
// Body: { lessonId: string, completed: boolean }
// Auth: INSIDER tier or ADMIN role required.
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const isInsider = session.user.tier === "INSIDER";
  const isAdmin = session.user.role === "ADMIN";
  if (!isInsider && !isAdmin) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 401 });
  }

  let body: { lessonId?: unknown; completed?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const lessonId = typeof body.lessonId === "string" ? body.lessonId : "";
  const completed = body.completed === true;

  if (!lessonId) {
    return NextResponse.json({ ok: false, error: "Missing lessonId" }, { status: 400 });
  }

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    return NextResponse.json({ ok: false, error: "Lesson not found" }, { status: 404 });
  }

  const userId = session.user.id;

  if (completed) {
    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId },
      update: { completedAt: new Date() },
    });
  } else {
    await prisma.lessonProgress
      .delete({
        where: { userId_lessonId: { userId, lessonId } },
      })
      .catch(() => {
        // already absent — no-op
      });
  }

  return NextResponse.json({ ok: true, completed });
}
