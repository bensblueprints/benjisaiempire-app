import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CourseForm from "@/components/admin/CourseForm";
import CourseModulesBuilder from "@/components/admin/CourseModulesBuilder";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateCourse, deleteCourse } from "../../_actions";

export const dynamic = "force-dynamic";

const sectionTitle: React.CSSProperties = {
  fontFamily: "Anton, sans-serif",
  fontSize: 28,
  letterSpacing: ".02em",
  textTransform: "uppercase",
  color: "var(--cream)",
  marginBottom: 18,
};

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: { orderBy: { sortOrder: "asc" } },
          downloads: { orderBy: { sortOrder: "asc" } },
        },
      },
    },
  });
  if (!course) notFound();

  const builderModules = course.modules.map((m) => ({
    id: m.id,
    title: m.title,
    summary: m.summary,
    sortOrder: m.sortOrder,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      slug: l.slug,
      sortOrder: l.sortOrder,
      durationMinutes: l.durationMinutes,
      published: l.published,
    })),
    downloads: m.downloads.map((dl) => ({
      id: dl.id,
      title: dl.title,
      url: dl.url,
      fileType: dl.fileType,
      sortOrder: dl.sortOrder,
    })),
  }));

  return (
    <div>
      <Link
        href="/admin/courses"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: "var(--cream-soft)",
          marginBottom: 18,
          display: "inline-block",
        }}
      >
        ← All courses
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 30 }}>
        <h1
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            textTransform: "uppercase",
            color: "var(--cream)",
            lineHeight: 1,
          }}
        >
          {course.title}
        </h1>
        <DeleteButton
          onConfirm={deleteCourse.bind(null, course.id)}
          label="Delete course"
          message={`Delete "${course.title}" and all its modules/lessons? This cannot be undone.`}
        />
      </div>

      <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 32, marginBottom: 56 }}>
        <h2 style={sectionTitle}>Course details</h2>
        <CourseForm
          course={{
            id: course.id,
            title: course.title,
            slug: course.slug,
            subtitle: course.subtitle,
            description: course.description,
            heroImage: course.heroImage,
            sortOrder: course.sortOrder,
            published: course.published,
          }}
          action={updateCourse.bind(null, course.id)}
        />
      </section>

      <CourseModulesBuilder courseId={course.id} initialModules={builderModules} />
    </div>
  );
}
