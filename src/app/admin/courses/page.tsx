import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteCourse } from "../_actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function CoursesIndex() {
  const courses = await prisma.course.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      modules: {
        include: { _count: { select: { lessons: true } } },
      },
    },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>
            Library
          </div>
          <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1 }}>
            Courses
          </h1>
        </div>
        <Link
          href="/admin/courses/new"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            padding: "12px 20px",
            background: "var(--gold)",
            color: "var(--ink)",
            borderRadius: 3,
            fontWeight: 600,
          }}
        >
          + New course
        </Link>
      </div>

      <div style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr 80px 80px 100px 1fr",
            gap: 16,
            padding: "12px 24px",
            borderBottom: "1px solid var(--line)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "var(--cream-soft)",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          <div>Title</div>
          <div>Slug</div>
          <div style={{ textAlign: "right" }}>Modules</div>
          <div style={{ textAlign: "right" }}>Lessons</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>
        {courses.length === 0 && (
          <div style={{ padding: 28, color: "var(--cream-soft)", fontFamily: "Manrope, sans-serif" }}>
            No courses yet. Create one to get started.
          </div>
        )}
        {courses.map((c) => {
          const totalLessons = c.modules.reduce((sum, m) => sum + m._count.lessons, 0);
          return (
            <div
              key={c.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 80px 80px 100px 1fr",
                gap: 16,
                padding: "18px 24px",
                borderBottom: "1px solid var(--line)",
                alignItems: "center",
              }}
            >
              <div style={{ fontFamily: "Anton, sans-serif", fontSize: 18, textTransform: "uppercase", letterSpacing: ".02em", color: "var(--cream)" }}>
                {c.title}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--cream-soft)" }}>
                /{c.slug}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--gold)", textAlign: "right" }}>
                {String(c.modules.length).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--gold)", textAlign: "right" }}>
                {String(totalLessons).padStart(2, "0")}
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    padding: "4px 8px",
                    borderRadius: 2,
                    background: c.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                    color: c.published ? "var(--gold)" : "var(--cream-soft)",
                    border: c.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                  }}
                >
                  {c.published ? "Published" : "Draft"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", alignItems: "center" }}>
                <Link
                  href={`/admin/courses/${c.id}`}
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "var(--gold)",
                  }}
                >
                  Edit →
                </Link>
                <DeleteButton
                  onConfirm={async () => {
                    "use server";
                    await deleteCourse(c.id);
                  }}
                  label="Delete"
                  message={`Delete "${c.title}" and all its modules/lessons?`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
