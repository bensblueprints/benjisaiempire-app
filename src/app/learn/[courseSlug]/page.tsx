// Member view: course landing page.
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type RouteParams = { courseSlug: string };

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> }
): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { title: true, subtitle: true },
  });
  if (!course) return { title: "Course" };
  return {
    title: course.title,
    description: course.subtitle ?? undefined,
  };
}

export default async function CourseLandingPage(
  { params }: { params: Promise<RouteParams> }
) {
  const { courseSlug } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/learn");

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug, published: true },
    include: {
      modules: {
        orderBy: { sortOrder: "asc" },
        include: {
          lessons: {
            where: { published: true },
            orderBy: { sortOrder: "asc" },
            include: { progress: { where: { userId: session.user.id } } },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const totalMinutes = allLessons.reduce((s, l) => s + (l.durationMinutes ?? 0), 0);
  const completedCount = allLessons.filter((l) => l.progress.length > 0).length;
  const progressPct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
  const firstIncomplete = allLessons.find((l) => l.progress.length === 0) ?? allLessons[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 5vw, 72px)" }}>
      {/* HERO */}
      <header style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          <span style={{ width: 24, height: 1, background: "var(--gold)" }} aria-hidden="true" />
          Enrolled · Insider
          <span style={{ color: "var(--cream-soft)" }}>· Course</span>
        </div>

        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 112px)",
            letterSpacing: "0.005em",
            lineHeight: 0.95,
            color: "var(--cream)",
            textTransform: "uppercase",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {course.title}
        </h1>

        {course.subtitle && (
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.35,
              color: "var(--bone)",
              margin: 0,
              maxWidth: "52ch",
            }}
          >
            {course.subtitle}
          </p>
        )}

        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(16px, 2.5vw, 32px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--cream-soft)",
          }}
        >
          <span>{course.modules.length} Modules</span>
          <span aria-hidden="true">·</span>
          <span>{totalLessons} Lessons</span>
          <span aria-hidden="true">·</span>
          <span>{totalMinutes} Minutes Total</span>
        </div>

        {/* PROGRESS + CTA */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 24,
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--cream-soft)",
              }}
            >
              <span>
                <span style={{ color: "var(--gold)" }}>{completedCount}</span> of {totalLessons} lessons complete
              </span>
              <span>{progressPct}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 2,
                background: "var(--ink-3)",
                position: "relative",
                overflow: "hidden",
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, var(--gold), var(--gold-bright))",
                  transition: "width .3s ease",
                }}
              />
            </div>
          </div>

          {firstIncomplete && (
            <Link
              href={`/learn/${course.slug}/${firstIncomplete.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink)",
                background: "var(--gold)",
                border: "1px solid var(--gold)",
                padding: "12px 18px",
                borderRadius: 1,
                whiteSpace: "nowrap",
              }}
            >
              {completedCount === 0 ? "Start Course" : "Continue Where You Left Off"}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </header>

      {/* MODULES */}
      <section
        aria-label="Modules"
        style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 3.5vw, 56px)" }}
      >
        {course.modules.map((m, mi) => {
          const num = String(mi + 1).padStart(2, "0");
          const moduleDone = m.lessons.length > 0 && m.lessons.every((l) => l.progress.length > 0);
          return (
            <article
              key={m.id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px, 160px) 1fr",
                gap: "clamp(20px, 3vw, 48px)",
                paddingTop: 32,
                borderTop: "1px solid var(--line)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(72px, 9vw, 144px)",
                    lineHeight: 0.85,
                    color: moduleDone ? "var(--gold)" : "var(--ink-3)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "var(--cream-soft)",
                  }}
                >
                  Module
                </div>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.6vw, 48px)",
                    letterSpacing: "0.005em",
                    lineHeight: 1,
                    color: "var(--cream)",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {m.title}
                </h2>
                {m.summary && (
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: "'Fraunces', serif",
                      fontStyle: "italic",
                      fontSize: 17,
                      lineHeight: 1.5,
                      color: "var(--bone)",
                      maxWidth: "60ch",
                    }}
                  >
                    {m.summary}
                  </p>
                )}

                <ul
                  style={{
                    listStyle: "none",
                    margin: "20px 0 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
                  {m.lessons.map((l, li) => {
                    const isDone = l.progress.length > 0;
                    return (
                      <li
                        key={l.id}
                        style={{
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <Link
                          href={`/learn/${course.slug}/${l.slug}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto auto",
                            alignItems: "center",
                            gap: 18,
                            padding: "16px 4px",
                            color: "var(--cream)",
                            transition: "background .2s ease, color .2s ease",
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 11,
                              letterSpacing: "0.16em",
                              color: isDone ? "var(--gold)" : "var(--cream-soft)",
                              minWidth: 28,
                            }}
                          >
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: 17,
                              fontWeight: 500,
                              lineHeight: 1.4,
                            }}
                          >
                            {l.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10.5,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: isDone ? "var(--gold)" : "var(--cream-soft)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {isDone
                              ? "✓ Complete"
                              : l.durationMinutes
                              ? `${l.durationMinutes} min`
                              : ""}
                          </span>
                          <span
                            aria-hidden="true"
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: 18,
                              color: "var(--gold)",
                            }}
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                  {m.lessons.length === 0 && (
                    <li
                      style={{
                        padding: "16px 4px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--cream-soft)",
                      }}
                    >
                      No lessons published yet.
                    </li>
                  )}
                </ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
