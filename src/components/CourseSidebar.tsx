// Server component — course outline navigation for the lesson player.
import Link from "next/link";

type Lesson = {
  id: string;
  slug: string;
  title: string;
  videoUrl?: string | null;
  durationMinutes: number | null;
  sortOrder: number;
  progress?: { userId: string; lessonId: string }[];
};

const iconWrap: React.CSSProperties = {
  width: 16,
  height: 16,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "var(--gold)",
};

function LessonTypeIcon({ hasVideo }: { hasVideo: boolean }) {
  const label = hasVideo ? "Video lesson" : "Article lesson";
  if (hasVideo) {
    return (
      <span aria-label={label} title={label} style={iconWrap}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M16 10l6-3.5v11L16 14V10z" fill="currentColor" />
        </svg>
      </span>
    );
  }
  return (
    <span aria-label={label} title={label} style={{ ...iconWrap, color: "var(--cream-soft)" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </span>
  );
}

type Module = {
  id: string;
  title: string;
  sortOrder: number;
  lessons: Lesson[];
};

type Props = {
  courseSlug: string;
  courseTitle: string;
  currentLessonSlug: string;
  modules: Module[];
};

export default function CourseSidebar({
  courseSlug,
  courseTitle,
  currentLessonSlug,
  modules,
}: Props) {
  return (
    <aside
      aria-label="Course outline"
      style={{
        position: "sticky",
        top: 96,
        alignSelf: "flex-start",
        width: "100%",
        borderRight: "1px solid var(--line)",
        paddingRight: 28,
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <Link
        href={`/learn/${courseSlug}`}
        style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10.5,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 6,
        }}
      >
        ← Course Index
      </Link>
      <h2
        style={{
          fontFamily: "'Anton', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(20px, 1.8vw, 24px)",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          color: "var(--cream)",
          lineHeight: 1.05,
          margin: "0 0 24px 0",
        }}
      >
        {courseTitle}
      </h2>

      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {modules.map((m, mi) => {
          const num = String(mi + 1).padStart(2, "0");
          return (
            <li key={m.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  marginBottom: 10,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "var(--gold)",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--cream-soft)",
                  }}
                >
                  {m.title}
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {m.lessons.map((l, li) => {
                  const isCurrent = l.slug === currentLessonSlug;
                  const isDone = (l.progress?.length ?? 0) > 0;
                  const hasVideo = Boolean(l.videoUrl?.trim());
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/learn/${courseSlug}/${l.slug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto auto 1fr auto",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 10px",
                          borderRadius: 2,
                          background: isCurrent
                            ? "color-mix(in srgb, var(--gold) 12%, transparent)"
                            : "transparent",
                          borderLeft: isCurrent
                            ? "2px solid var(--gold)"
                            : "2px solid transparent",
                          color: isCurrent ? "var(--cream)" : "var(--cream-soft)",
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 13.5,
                          lineHeight: 1.35,
                          transition: "background .2s ease, color .2s ease",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: isDone ? "var(--gold)" : "var(--cream-soft)",
                            opacity: isDone ? 1 : 0.6,
                            width: 18,
                            display: "inline-flex",
                            justifyContent: "center",
                          }}
                        >
                          {isDone ? "✓" : String(li + 1).padStart(2, "0")}
                        </span>
                        <LessonTypeIcon hasVideo={hasVideo} />
                        <span
                          style={{
                            fontWeight: isCurrent ? 600 : 400,
                          }}
                        >
                          {l.title}
                        </span>
                        {l.durationMinutes ? (
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10,
                              color: "var(--cream-soft)",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {l.durationMinutes}m
                          </span>
                        ) : (
                          <span />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
