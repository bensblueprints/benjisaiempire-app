import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import LessonEditor from "@/components/admin/LessonEditor";
import type { LessonFormFields } from "@/components/admin/LessonForm";
import type { ResourceRow } from "@/components/admin/ResourceList";
import { updateLesson, deleteLesson, saveResources } from "../../_actions";

export const dynamic = "force-dynamic";

export default async function LessonEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      module: { include: { course: true } },
      resources: true,
    },
  });
  if (!lesson) notFound();

  const initialFields: LessonFormFields = {
    title: lesson.title,
    slug: lesson.slug,
    videoUrl: lesson.videoUrl ?? "",
    durationMinutes: lesson.durationMinutes,
    sortOrder: lesson.sortOrder,
    published: lesson.published,
  };

  const initialResources: ResourceRow[] = lesson.resources.map((r) => ({
    id: r.id,
    name: r.name,
    url: r.url,
  }));

  return (
    <div>
      <Link
        href={`/admin/courses/${lesson.module.courseId}`}
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: "var(--cream-soft)",
          marginBottom: 12,
          display: "inline-block",
        }}
      >
        ← {lesson.module.course.title}
      </Link>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            color: "var(--gold)",
            textTransform: "uppercase",
            letterSpacing: ".14em",
            marginBottom: 8,
          }}
        >
          {lesson.module.course.title} <span style={{ color: "var(--cream-soft)" }}>/</span> {lesson.module.title}
        </div>
        <h1
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            textTransform: "uppercase",
            color: "var(--cream)",
            lineHeight: 1,
          }}
        >
          {lesson.title}
        </h1>
      </div>

      <LessonEditor
        lessonId={lesson.id}
        initialFields={initialFields}
        initialBody={lesson.body ?? { type: "doc", content: [{ type: "paragraph" }] }}
        initialResources={initialResources}
        saveAction={updateLesson.bind(null, lesson.id)}
        saveResourcesAction={saveResources.bind(null, lesson.id)}
        deleteAction={deleteLesson.bind(null, lesson.id)}
      />
    </div>
  );
}
