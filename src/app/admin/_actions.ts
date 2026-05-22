"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import type { UserRole, Tier } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function s(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v : "";
}

function n(v: FormDataEntryValue | null, fallback = 0): number {
  const num = Number(s(v));
  return Number.isFinite(num) ? num : fallback;
}

function b(v: FormDataEntryValue | null): boolean {
  const val = s(v).toLowerCase();
  return val === "on" || val === "true" || val === "1";
}

/* ───────── COURSES ───────── */

export async function createCourse(formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  if (!title) throw new Error("Title required");
  const slugInput = s(formData.get("slug")).trim();
  const slug = slugify(slugInput || title);

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      subtitle: s(formData.get("subtitle")) || null,
      description: s(formData.get("description")) || null,
      heroImage: s(formData.get("heroImage")) || null,
      sortOrder: n(formData.get("sortOrder")),
      published: b(formData.get("published")),
    },
  });
  revalidatePath("/admin/courses");
  redirect(`/admin/courses/${course.id}`);
}

export async function updateCourse(id: string, formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  if (!title) throw new Error("Title required");
  const slugInput = s(formData.get("slug")).trim();
  const slug = slugify(slugInput || title);

  await prisma.course.update({
    where: { id },
    data: {
      title,
      slug,
      subtitle: s(formData.get("subtitle")) || null,
      description: s(formData.get("description")) || null,
      heroImage: s(formData.get("heroImage")) || null,
      sortOrder: n(formData.get("sortOrder")),
      published: b(formData.get("published")),
    },
  });
  revalidatePath("/admin/courses");
  revalidatePath(`/admin/courses/${id}`);
}

export async function deleteCourse(id: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

/* ───────── MODULES ───────── */

export async function createModule(courseId: string, formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  if (!title) throw new Error("Title required");

  await prisma.module.create({
    data: {
      courseId,
      title,
      summary: s(formData.get("summary")) || null,
      sortOrder: n(formData.get("sortOrder")),
    },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateModule(id: string, formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  if (!title) throw new Error("Title required");

  const updated = await prisma.module.update({
    where: { id },
    data: {
      title,
      summary: s(formData.get("summary")) || null,
      sortOrder: n(formData.get("sortOrder")),
    },
  });
  revalidatePath(`/admin/courses/${updated.courseId}`);
}

export async function deleteModule(id: string) {
  await requireAdmin();
  const mod = await prisma.module.findUnique({ where: { id } });
  await prisma.module.delete({ where: { id } });
  if (mod) revalidatePath(`/admin/courses/${mod.courseId}`);
}

export async function reorderModules(courseId: string, orderedIds: string[]) {
  await requireAdmin();
  if (!orderedIds.length) return;

  const owned = await prisma.module.findMany({
    where: { courseId, id: { in: orderedIds } },
    select: { id: true },
  });
  if (owned.length !== orderedIds.length) {
    throw new Error("Invalid module order");
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.module.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );
  revalidatePath(`/admin/courses/${courseId}`);
}

/* ───────── LESSONS ───────── */

export async function createLesson(moduleId: string, formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim() || "Untitled lesson";
  const slugInput = s(formData.get("slug")).trim();
  const slug = slugify(slugInput || title) || `lesson-${Date.now()}`;

  const lesson = await prisma.lesson.create({
    data: {
      moduleId,
      title,
      slug,
      sortOrder: n(formData.get("sortOrder")),
      body: { type: "doc", content: [{ type: "paragraph" }] },
    },
  });
  redirect(`/admin/lessons/${lesson.id}`);
}

export async function updateLesson(
  id: string,
  fields: {
    title: string;
    slug: string;
    videoUrl: string;
    durationMinutes: number | null;
    sortOrder: number;
    published: boolean;
  },
  body: unknown
) {
  await requireAdmin();
  const slug = slugify(fields.slug || fields.title) || `lesson-${Date.now()}`;
  const updated = await prisma.lesson.update({
    where: { id },
    data: {
      title: fields.title.trim() || "Untitled",
      slug,
      videoUrl: fields.videoUrl.trim() || null,
      durationMinutes: fields.durationMinutes,
      sortOrder: fields.sortOrder,
      published: fields.published,
      body: body as never,
    },
    include: { module: true },
  });
  revalidatePath(`/admin/lessons/${id}`);
  revalidatePath(`/admin/courses/${updated.module.courseId}`);
}

export async function deleteLesson(id: string) {
  await requireAdmin();
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { module: true },
  });
  await prisma.lesson.delete({ where: { id } });
  if (lesson) {
    revalidatePath(`/admin/courses/${lesson.module.courseId}`);
    redirect(`/admin/courses/${lesson.module.courseId}`);
  }
  redirect("/admin/courses");
}

/* ───────── RESOURCES ───────── */

export async function saveResources(
  lessonId: string,
  resources: { id?: string; name: string; url: string }[]
) {
  await requireAdmin();
  const existing = await prisma.lessonResource.findMany({ where: { lessonId } });
  const incomingIds = new Set(resources.filter((r) => r.id).map((r) => r.id!));

  // delete missing
  const toDelete = existing.filter((e) => !incomingIds.has(e.id));
  if (toDelete.length) {
    await prisma.lessonResource.deleteMany({
      where: { id: { in: toDelete.map((d) => d.id) } },
    });
  }

  // upsert all
  for (const r of resources) {
    if (!r.name.trim() || !r.url.trim()) continue;
    if (r.id) {
      await prisma.lessonResource.update({
        where: { id: r.id },
        data: { name: r.name, url: r.url },
      });
    } else {
      await prisma.lessonResource.create({
        data: { lessonId, name: r.name, url: r.url },
      });
    }
  }
  revalidatePath(`/admin/lessons/${lessonId}`);
}

/* ───────── MODULE DOWNLOADS ───────── */

export async function createModuleDownload(moduleId: string, formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  const url = s(formData.get("url")).trim();
  if (!title || !url) throw new Error("Title and URL required");
  const mod = await prisma.moduleDownload.create({
    data: {
      moduleId,
      title,
      url,
      fileType: s(formData.get("fileType")) || null,
      sortOrder: n(formData.get("sortOrder")),
    },
    include: { module: true },
  });
  revalidatePath(`/admin/courses/${mod.module.courseId}`);
}

export async function deleteModuleDownload(id: string) {
  await requireAdmin();
  const dl = await prisma.moduleDownload.findUnique({ where: { id }, include: { module: true } });
  await prisma.moduleDownload.delete({ where: { id } });
  if (dl) revalidatePath(`/admin/courses/${dl.module.courseId}`);
}

/* ───────── GLOBAL DOWNLOADS ───────── */

export async function createDownload(formData: FormData) {
  await requireAdmin();
  const title = s(formData.get("title")).trim();
  let url = s(formData.get("url")).trim();
  let fileType = s(formData.get("fileType")).trim() || null;

  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    const { saveUploadedDownload } = await import("@/lib/member-download-storage");
    const saved = await saveUploadedDownload(file);
    url = saved.url;
    if (!fileType) fileType = saved.fileType;
  }

  if (!title) throw new Error("Title is required");
  if (!url) throw new Error("Upload a file or paste a download URL");

  const rawTier = s(formData.get("tier"));
  const tier = rawTier === "FREE" ? "FREE" : rawTier === "WHOLESALE" ? "WHOLESALE" : "INSIDER";
  const copyText = s(formData.get("copyText")).trim();
  await prisma.download.create({
    data: {
      title,
      url,
      description: s(formData.get("description")) || null,
      copyText: copyText || null,
      fileType,
      sortOrder: n(formData.get("sortOrder")),
      published: b(formData.get("published")),
      tier: tier as "FREE" | "INSIDER" | "WHOLESALE",
    },
  });
  revalidatePath("/admin/downloads");
  revalidatePath("/portal");
}

export async function deleteDownload(id: string) {
  await requireAdmin();
  const row = await prisma.download.findUnique({ where: { id } });
  if (row?.url) {
    const { deleteStoredDownload } = await import("@/lib/member-download-storage");
    await deleteStoredDownload(row.url);
  }
  await prisma.download.delete({ where: { id } });
  revalidatePath("/admin/downloads");
  revalidatePath("/portal");
}

/* ───────── USERS ───────── */

export async function setUserRole(userId: string, role: UserRole) {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath(`/admin/students/${userId}`);
  revalidatePath("/admin/students");
}

export async function setUserTier(userId: string, tier: Tier) {
  await requireAdmin();
  await prisma.user.update({ where: { id: userId }, data: { tier } });
  revalidatePath(`/admin/students/${userId}`);
  revalidatePath("/admin/students");
}

export async function setUserRoleFromForm(userId: string, formData: FormData) {
  const role = s(formData.get("role")) as UserRole;
  await setUserRole(userId, role);
}

export async function setUserTierFromForm(userId: string, formData: FormData) {
  const tier = s(formData.get("tier")) as Tier;
  await setUserTier(userId, tier);
}

export async function deleteUserAccount(userId: string, confirmPhrase: string) {
  const session = await requireAdmin();

  if (confirmPhrase.trim().toUpperCase() !== "DELETE") {
    throw new Error('Type DELETE to confirm.');
  }

  if (session.user.id === userId) {
    throw new Error("You cannot delete your own account while signed in.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, image: true, role: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.role === "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      throw new Error("Cannot delete the only admin account.");
    }
  }

  if (user.image) {
    const { deleteStoredAvatar } = await import("@/lib/avatar-storage");
    await deleteStoredAvatar(user.image);
  }

  await prisma.user.delete({ where: { id: userId } });

  revalidatePath("/admin/students");
  revalidatePath("/portal");
  revalidatePath("/community");
}
