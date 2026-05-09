import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CourseForm from "@/components/admin/CourseForm";
import ModuleForm from "@/components/admin/ModuleForm";
import DeleteButton from "@/components/admin/DeleteButton";
import {
  updateCourse,
  deleteCourse,
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  deleteLesson,
} from "../../_actions";

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
        include: { lessons: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });
  if (!course) notFound();

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
          onConfirm={async () => {
            "use server";
            await deleteCourse(course.id);
          }}
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
          action={async (fd) => {
            "use server";
            await updateCourse(course.id, fd);
          }}
        />
      </section>

      <section>
        <h2 style={sectionTitle}>Modules ({course.modules.length})</h2>

        <div style={{ display: "grid", gap: 18, marginBottom: 32 }}>
          {course.modules.map((m) => (
            <div key={m.id} style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 18 }}>
                <div style={{ flex: 1 }}>
                  <ModuleForm
                    module={{ id: m.id, title: m.title, summary: m.summary, sortOrder: m.sortOrder }}
                    action={async (fd) => {
                      "use server";
                      await updateModule(m.id, fd);
                    }}
                    submitLabel="Save module"
                  />
                </div>
                <DeleteButton
                  onConfirm={async () => {
                    "use server";
                    await deleteModule(m.id);
                  }}
                  label="Delete module"
                  message={`Delete module "${m.title}" and all its lessons?`}
                />
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".14em",
                    color: "var(--cream-soft)",
                    marginBottom: 12,
                  }}
                >
                  Lessons ({m.lessons.length})
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {m.lessons.map((l) => (
                    <div
                      key={l.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "32px 2fr 1.5fr 80px 80px 100px 1fr",
                        gap: 14,
                        alignItems: "center",
                        padding: "10px 14px",
                        background: "var(--ink)",
                        border: "1px solid var(--line)",
                        borderRadius: 3,
                      }}
                    >
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)" }}>
                        {String(l.sortOrder).padStart(2, "0")}
                      </div>
                      <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)" }}>
                        {l.title}
                      </div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--cream-soft)" }}>
                        /{l.slug}
                      </div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--cream-soft)", textAlign: "right" }}>
                        {l.durationMinutes ?? "—"}m
                      </div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--cream-soft)", textAlign: "right" }}>
                        #{l.sortOrder}
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 9,
                            textTransform: "uppercase",
                            letterSpacing: ".1em",
                            padding: "3px 7px",
                            borderRadius: 2,
                            background: l.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                            color: l.published ? "var(--gold)" : "var(--cream-soft)",
                            border: l.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                          }}
                        >
                          {l.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                        <Link
                          href={`/admin/lessons/${l.id}`}
                          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".08em" }}
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          onConfirm={async () => {
                            "use server";
                            await deleteLesson(l.id);
                          }}
                          label="X"
                          message={`Delete lesson "${l.title}"?`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  action={async (fd: FormData) => {
                    "use server";
                    await createLesson(m.id, fd);
                  }}
                  style={{
                    marginTop: 14,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <input
                    name="title"
                    placeholder="New lesson title..."
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      background: "var(--ink)",
                      border: "1px solid var(--line)",
                      borderRadius: 3,
                      color: "var(--cream)",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 14,
                    }}
                    required
                  />
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={m.lessons.length}
                    style={{
                      width: 70,
                      padding: "10px 12px",
                      background: "var(--ink)",
                      border: "1px solid var(--line)",
                      borderRadius: 3,
                      color: "var(--cream)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      padding: "10px 16px",
                      border: "1px solid var(--gold)",
                      color: "var(--gold)",
                      borderRadius: 3,
                      background: "transparent",
                    }}
                  >
                    + Add lesson
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--ink-2)", border: "1px dashed var(--line)", borderRadius: 6, padding: 24 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".14em",
              color: "var(--gold)",
              marginBottom: 14,
            }}
          >
            + Add module
          </div>
          <ModuleForm
            action={async (fd) => {
              "use server";
              await createModule(course.id, fd);
            }}
            submitLabel="Create module"
          />
        </div>
      </section>
    </div>
  );
}
