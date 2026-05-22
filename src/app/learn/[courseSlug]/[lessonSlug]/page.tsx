// Member view: lesson player.
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import VideoEmbed from "@/components/VideoEmbed";
import CourseSidebar from "@/components/CourseSidebar";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import GhlResourceBlock, { isGhlModule } from "@/components/learn/GhlResourceBlock";
import { RenderTiptap } from "@/lib/render-tiptap";

export const dynamic = "force-dynamic";

type RouteParams = { courseSlug: string; lessonSlug: string };

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> }
): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      module: { course: { slug: courseSlug } },
    },
    select: { title: true, module: { select: { course: { select: { title: true } } } } },
  });
  if (!lesson) return { title: "Lesson" };
  return { title: `${lesson.title} — ${lesson.module.course.title}` };
}

export default async function LessonPage(
  { params }: { params: Promise<RouteParams> }
) {
  const { courseSlug, lessonSlug } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/learn");

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      module: { course: { slug: courseSlug, published: true } },
      published: true,
    },
    include: {
      module: {
        include: {
          downloads: { orderBy: { sortOrder: "asc" } },
          course: {
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
          },
        },
      },
      resources: true,
      progress: { where: { userId: session.user.id } },
    },
  });

  if (!lesson) notFound();

  const course = lesson.module.course;
  const modules = course.modules;
  const moduleIndex = modules.findIndex((m) => m.id === lesson.module.id);

  // Flatten all lessons in order to compute prev/next
  const flat = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })));
  const idx = flat.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  const initialCompleted = lesson.progress.length > 0;
  const showGhlResources = isGhlModule(lesson.module.title, lesson.module.sortOrder);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(260px, 320px) minmax(0, 1fr)",
        gap: "clamp(28px, 4vw, 64px)",
        alignItems: "start",
      }}
    >
      <div className="learn-sidebar-col" style={{ minWidth: 0 }}>
        <CourseSidebar
          courseSlug={course.slug}
          courseTitle={course.title}
          currentLessonSlug={lesson.slug}
          modules={modules}
        />
      </div>

      <article style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--cream-soft)",
          }}
        >
          <Link href={`/learn/${course.slug}`} style={{ color: "var(--gold)" }}>
            {course.title}
          </Link>
          <span aria-hidden="true">·</span>
          <span>
            Module {String(moduleIndex + 1).padStart(2, "0")} — {lesson.module.title}
          </span>
        </nav>

        {/* Title */}
        <header style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 5.2vw, 72px)",
              letterSpacing: "0.005em",
              lineHeight: 1,
              color: "var(--cream)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {lesson.title}
          </h1>
          {lesson.durationMinutes ? (
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream-soft)",
              }}
            >
              {lesson.durationMinutes} minute read · Lesson{" "}
              {String(idx + 1).padStart(2, "0")} of {String(flat.length).padStart(2, "0")}
            </div>
          ) : null}
        </header>

        {/* Video */}
        {lesson.videoUrl && <VideoEmbed videoUrl={lesson.videoUrl} />}

        {showGhlResources && <GhlResourceBlock downloads={lesson.module.downloads} />}

        {/* Body */}
        <div style={{ marginTop: 8 }}>
          <RenderTiptap doc={lesson.body} />
        </div>

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <section
            aria-label="Materials"
            style={{
              marginTop: 16,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
            }}
          >
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: "0 0 16px 0",
              }}
            >
              Materials
            </h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {lesson.resources.map((r) => (
                <li key={r.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 4px",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 16,
                      color: "var(--cream)",
                    }}
                  >
                    <span>{r.name}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10.5,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                      }}
                    >
                      Download ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Module Downloads (non-GHL modules; GHL uses callout above) */}
        {!showGhlResources && lesson.module.downloads.length > 0 && (
          <section
            aria-label="Module downloads"
            style={{
              marginTop: 16,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
            }}
          >
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: "0 0 16px 0",
              }}
            >
              Module Downloads
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              {lesson.module.downloads.map((dl) => (
                <li key={dl.id} style={{ borderBottom: "1px solid var(--line)" }}>
                  <a
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 4px",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 16,
                      color: "var(--cream)",
                    }}
                  >
                    <span>{dl.title}</span>
                    {dl.fileType && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cream-soft)", padding: "2px 6px", background: "var(--ink-3)" }}>
                        {dl.fileType}
                      </span>
                    )}
                    <span aria-hidden="true" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>
                      Download ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Mark complete */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <MarkCompleteButton lessonId={lesson.id} initialCompleted={initialCompleted} />
        </div>

        {/* Prev / Next */}
        <nav
          aria-label="Lesson navigation"
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
          }}
        >
          {prev ? (
            <Link
              href={`/learn/${course.slug}/${prev.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "16px 18px",
                border: "1px solid var(--line)",
                borderRadius: 2,
                color: "var(--cream)",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                ← Previous
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {prev.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/learn/${course.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "16px 18px",
                border: "1px solid var(--line)",
                borderRadius: 2,
                color: "var(--cream)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                ← Course Index
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {course.title}
              </span>
            </Link>
          )}

          {next ? (
            <Link
              href={`/learn/${course.slug}/${next.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "16px 18px",
                border: "1px solid var(--gold)",
                borderRadius: 2,
                color: "var(--cream)",
                textAlign: "right",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--gold) 8%, transparent), transparent)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Next →
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/learn/${course.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "16px 18px",
                border: "1px solid var(--gold)",
                borderRadius: 2,
                color: "var(--cream)",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Course Complete →
              </span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Back to {course.title}
              </span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
