import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const card: React.CSSProperties = {
  background: "var(--ink-2)",
  border: "1px solid var(--line)",
  borderRadius: 6,
  padding: "28px 24px",
};

const statNumber: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 56,
  lineHeight: 1,
  color: "var(--gold)",
  fontWeight: 500,
  letterSpacing: "-.02em",
};

const statLabel: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 11,
  color: "var(--cream-soft)",
  textTransform: "uppercase",
  letterSpacing: ".12em",
  marginTop: 14,
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "Anton, sans-serif",
  fontSize: 28,
  letterSpacing: ".02em",
  textTransform: "uppercase",
  color: "var(--cream)",
  marginBottom: 18,
};

export default async function AdminDashboard() {
  const [coursesCount, lessonsCount, studentsCount, adminsCount, recent] = await Promise.all([
    prisma.course.count(),
    prisma.lesson.count(),
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.lessonProgress.findMany({
      take: 10,
      orderBy: { completedAt: "desc" },
      include: { user: true, lesson: { include: { module: { include: { course: true } } } } },
    }),
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>
            Control Room
          </div>
          <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1 }}>
            Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
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
          <Link
            href="/admin/students"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              padding: "12px 20px",
              border: "1px solid var(--line)",
              color: "var(--cream)",
              borderRadius: 3,
            }}
          >
            Manage students
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 56 }}>
        <div style={card}>
          <div style={statNumber}>{String(coursesCount).padStart(2, "0")}</div>
          <div style={statLabel}>Courses</div>
        </div>
        <div style={card}>
          <div style={statNumber}>{String(lessonsCount).padStart(2, "0")}</div>
          <div style={statLabel}>Lessons</div>
        </div>
        <div style={card}>
          <div style={statNumber}>{String(studentsCount).padStart(3, "0")}</div>
          <div style={statLabel}>Students</div>
        </div>
        <div style={card}>
          <div style={statNumber}>{String(adminsCount).padStart(2, "0")}</div>
          <div style={statLabel}>Admins</div>
        </div>
      </div>

      <div>
        <h2 style={sectionTitle}>Recent activity</h2>
        <div style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6 }}>
          {recent.length === 0 ? (
            <div style={{ padding: 24, color: "var(--cream-soft)", fontFamily: "Manrope, sans-serif" }}>
              No lesson completions yet.
            </div>
          ) : (
            recent.map((p) => (
              <div
                key={`${p.userId}-${p.lessonId}`}
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid var(--line)",
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)" }}>
                  {p.user.email}
                </div>
                <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14 }}>
                  <span style={{ color: "var(--gold)" }}>{p.lesson.module.course.title}</span>
                  {" · "}
                  {p.lesson.module.title}
                  {" · "}
                  {p.lesson.title}
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)", textAlign: "right" }}>
                  {new Date(p.completedAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
