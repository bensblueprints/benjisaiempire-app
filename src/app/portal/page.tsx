// Member dashboard — magazine-grade, not SaaS-grade.
// Reads session, pulls courses w/ per-user progress, and renders by tier.
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function firstName(session: { user: { name?: string | null; email: string } }) {
  if (session.user.name) {
    const n = session.user.name.trim().split(/\s+/)[0];
    if (n) return n;
  }
  // Fall back to local-part of email, capitalized
  const local = session.user.email.split("@")[0] ?? "Operator";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ upgrade?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");

  const tier = session.user.tier;
  const isInsiderOrUp = tier === "INSIDER" || tier === "WHOLESALE";
  const isAdmin = session.user.role === "ADMIN";

  // Load courses w/ this user's progress (only if they can access them)
  const courses = isInsiderOrUp || isAdmin
    ? await prisma.course.findMany({
        where: { published: true },
        include: {
          modules: {
            include: {
              lessons: {
                include: {
                  progress: { where: { userId: session.user.id } },
                },
              },
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      })
    : [];

  const downloads = await prisma.download.findMany({
    where: {
      published: true,
      tier: isAdmin ? undefined : tier === "WHOLESALE" ? { in: ["FREE", "INSIDER", "WHOLESALE"] } : tier === "INSIDER" ? { in: ["FREE", "INSIDER"] } : "FREE",
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  type CourseRow = (typeof courses)[number];

  const courseRows = courses.map((c: CourseRow) => {
    let total = 0;
    let done = 0;
    for (const m of c.modules) {
      for (const l of m.lessons) {
        if (!l.published) continue;
        total += 1;
        if (l.progress.length > 0) done += 1;
      }
    }
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { course: c, total, done, pct };
  });

  const showUpgradeBanner = params.upgrade === "1";

  return (
    <div className="portal-shell">
      {/* Hero strip */}
      <section className="portal-hero">
        <div className="portal-hero__meta">
          <span className="portal-hero__date">
            Issue 01 · {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className={`portal-hero__pill portal-hero__pill--${tier.toLowerCase()}`}>
            {tier}
          </span>
        </div>
        <h1 className="portal-hero__title">
          Welcome back,&nbsp;{firstName(session)}.
        </h1>
        <p className="portal-hero__lede">
          The build floor is open. Today&apos;s call sheet, this week&apos;s
          lessons, and every course you&apos;ve unlocked — all in one room.
        </p>
        <div className="portal-hero__actions">
          <Link href="/api/stripe/portal" className="portal-hero__manage">
            Manage subscription →
          </Link>
          {isAdmin && (
            <Link href="/admin" className="portal-hero__admin">
              Admin Console
            </Link>
          )}
        </div>
      </section>

      {/* Upgrade banner from middleware redirect */}
      {showUpgradeBanner && (
        <aside className="portal-banner portal-banner--upgrade">
          <span className="portal-banner__eyebrow">Locked Door</span>
          <p className="portal-banner__text">
            Lessons live behind AI Empire Insider. <strong>$9/mo</strong> opens
            every course, prompt, script, and your free GoHighLevel sub-account.
          </p>
          <Link href="/insider" className="portal-banner__cta">
            Join AI Empire Insider →
          </Link>
        </aside>
      )}

      {/* Wholesale callout */}
      {tier === "WHOLESALE" && (
        <aside className="portal-callout portal-callout--wholesale">
          <span className="portal-callout__eyebrow">Wholesale GHL · Operator</span>
          <h2 className="portal-callout__title">Your reseller credentials</h2>
          <p className="portal-callout__body">
            Your wholesale GHL account at <strong>$0.015/min</strong> is
            provisioned. Login + sub-account API key drop here once Ben hands
            them over manually — usually within 24 hours of payment.
          </p>
          <p className="portal-callout__placeholder">
            <em>Credentials pending — check your email.</em>
          </p>
        </aside>
      )}

      {/* FREE tier callout */}
      {tier === "FREE" && (
        <aside className="portal-callout portal-callout--free">
          <span className="portal-callout__eyebrow">Free Tier</span>
          <h2 className="portal-callout__title">
            You&apos;re in the lobby. Course room is one floor up.
          </h2>
          <p className="portal-callout__body">
            Every Tuesday cold call is free, forever. But the courses, prompts,
            scripts, and your free GoHighLevel sub-account live inside AI Empire Insider —{" "}
            <strong>$9/mo</strong>, cancel anytime, no contract.
          </p>
          <Link href="/insider" className="portal-callout__cta">
            Join AI Empire Insider →
          </Link>
        </aside>
      )}

      {/* Course grid — Insider / Wholesale / Admin */}
      {(isInsiderOrUp || isAdmin) && (
        <section className="portal-courses">
          <header className="portal-section-head">
            <span className="portal-section-eyebrow">Course Room</span>
            <h2 className="portal-section-title">Pick up where you left off.</h2>
            <span className="portal-section-meta">
              {courseRows.length} {courseRows.length === 1 ? "course" : "courses"} live
            </span>
          </header>

          {courseRows.length === 0 ? (
            <div className="portal-empty">
              <p>
                No published courses yet. Ben is filming Module 01 of the Empire
                Challenge right now — first lessons land this week.
              </p>
            </div>
          ) : (
            <ul className="portal-course-grid">
              {courseRows.map(({ course, total, done, pct }) => (
                <li key={course.id} className="portal-course">
                  <div className="portal-course__bar">
                    <span
                      className="portal-course__bar-fill"
                      style={{ width: `${pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="portal-course__top">
                    <span className="portal-course__num">
                      {String(course.sortOrder + 1).padStart(2, "0")}
                    </span>
                    <span className="portal-course__pct">{pct}%</span>
                  </div>
                  <h3 className="portal-course__title">{course.title}</h3>
                  {course.subtitle && (
                    <p className="portal-course__sub">{course.subtitle}</p>
                  )}
                  <p className="portal-course__progress">
                    {done} of {total}{" "}
                    {total === 1 ? "lesson" : "lessons"} complete
                  </p>
                  <Link
                    href={`/learn/${course.slug}`}
                    className="portal-course__cta"
                  >
                    {done === 0 ? "Start →" : done === total && total > 0 ? "Re-watch →" : "Continue →"}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Downloads */}
      {downloads.length > 0 && (
        <section className="portal-downloads">
          <header className="portal-section-head">
            <span className="portal-section-eyebrow">Resource Library</span>
            <h2 className="portal-section-title">Downloads</h2>
            <span className="portal-section-meta">
              {downloads.length} {downloads.length === 1 ? "file" : "files"}
            </span>
          </header>
          <ul className="portal-dl-list">
            {downloads.map((d) => (
              <li key={d.id} className="portal-dl-item">
                <div className="portal-dl-item__meta">
                  {d.fileType && (
                    <span className="portal-dl-item__type">{d.fileType}</span>
                  )}
                  <span className={`portal-dl-item__tier portal-dl-item__tier--${d.tier.toLowerCase()}`}>
                    {d.tier}
                  </span>
                </div>
                <div className="portal-dl-item__body">
                  <div className="portal-dl-item__title">{d.title}</div>
                  {d.description && (
                    <div className="portal-dl-item__desc">{d.description}</div>
                  )}
                </div>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-dl-item__cta"
                >
                  Download →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <style>{`
        .portal-shell {
          max-width: var(--container, 1280px);
          margin: 0 auto;
          display: grid; gap: 3.5rem;
        }

        /* HERO */
        .portal-hero {
          border-top: 3px solid var(--gold);
          border-bottom: 1px solid var(--line);
          padding: 2.5rem 0 3rem;
        }
        .portal-hero__meta {
          display:flex; justify-content:space-between; align-items:center;
          margin-bottom: 1.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .portal-hero__date {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.18em; text-transform:uppercase;
          color: var(--cream-soft);
        }
        .portal-hero__pill {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.2em; text-transform:uppercase;
          padding: .4rem .85rem;
          border: 1px solid var(--gold);
          color: var(--gold);
        }
        .portal-hero__pill--free { border-color: var(--cream-soft); color: var(--cream-soft); }
        .portal-hero__pill--insider { border-color: var(--gold); color: var(--gold); }
        .portal-hero__pill--wholesale {
          background: var(--gold); color: var(--ink); border-color: var(--gold);
        }
        .portal-hero__title {
          font-family:'Anton',sans-serif;
          font-size: clamp(2.6rem, 6.5vw, 5rem);
          line-height:.92; letter-spacing:-.01em; text-transform:uppercase;
          color: var(--cream); margin: 0 0 1.25rem;
        }
        .portal-hero__lede {
          font-family:'Fraunces',serif; font-style:italic;
          font-size: 1.2rem; line-height:1.5;
          color: var(--cream-soft); max-width: 56ch; margin: 0 0 2rem;
        }
        .portal-hero__actions {
          display:flex; gap:2rem; align-items:center; flex-wrap:wrap;
        }
        .portal-hero__manage {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--gold); border-bottom:1px solid var(--gold);
          padding-bottom: .25rem;
        }
        .portal-hero__manage:hover { color: var(--gold-bright); border-color: var(--gold-bright); }
        .portal-hero__admin {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--cream-soft); border-bottom:1px solid var(--line);
          padding-bottom: .25rem;
        }
        .portal-hero__admin:hover { color: var(--cream); border-color: var(--cream); }

        /* BANNER */
        .portal-banner {
          border-left: 3px solid var(--rust);
          background: var(--ink-2);
          padding: 1.5rem 1.75rem;
          display:flex; gap:1rem; align-items:center; flex-wrap:wrap;
        }
        .portal-banner__eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.18em; text-transform:uppercase;
          color: var(--rust);
        }
        .portal-banner__text {
          font-family:'Manrope',sans-serif;
          color: var(--cream); margin:0; flex:1; min-width: 240px;
        }
        .portal-banner__cta {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--gold); border-bottom:1px solid var(--gold);
          padding-bottom:.2rem;
        }
        .portal-banner__cta:hover { color: var(--gold-bright); border-color: var(--gold-bright); }

        /* CALLOUTS */
        .portal-callout {
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 2.25rem 2rem;
          position: relative;
        }
        .portal-callout--wholesale { border-color: var(--gold); }
        .portal-callout__eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.2em; text-transform:uppercase;
          color: var(--gold); display:block; margin-bottom:1rem;
        }
        .portal-callout__title {
          font-family:'Anton',sans-serif;
          font-size: clamp(1.7rem, 3.5vw, 2.4rem);
          line-height:1; letter-spacing:-.005em; text-transform:uppercase;
          color: var(--cream); margin: 0 0 1rem;
        }
        .portal-callout__body {
          font-family:'Fraunces',serif; font-style:italic;
          font-size: 1.05rem; line-height:1.55;
          color: var(--cream-soft); max-width: 60ch; margin: 0 0 1.5rem;
        }
        .portal-callout__body strong { color: var(--gold); font-style:normal; }
        .portal-callout__placeholder {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.06em; text-transform:uppercase;
          color: var(--cream-soft); margin:0;
          padding: .85rem 1rem; border:1px dashed var(--line);
        }
        .portal-callout__placeholder em { color: var(--gold); font-style:normal; }
        .portal-callout__cta {
          font-family:'JetBrains Mono',monospace;
          font-size:.82rem; letter-spacing:.14em; text-transform:uppercase;
          background: var(--gold); color: var(--ink);
          padding: 1rem 1.4rem; font-weight:600;
          display:inline-block;
        }
        .portal-callout__cta:hover { background: var(--gold-bright); }

        /* COURSES */
        .portal-section-head {
          display:grid; gap:.5rem;
          padding-bottom: 1.5rem; border-bottom: 1px solid var(--line);
          margin-bottom: 2rem;
        }
        .portal-section-eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.22em; text-transform:uppercase;
          color: var(--gold);
        }
        .portal-section-title {
          font-family:'Anton',sans-serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height:.95; letter-spacing:-.005em; text-transform:uppercase;
          color: var(--cream); margin:0;
        }
        .portal-section-meta {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--cream-soft);
        }
        .portal-empty {
          border:1px dashed var(--line);
          padding: 3rem 2rem; text-align:center;
          font-family:'Fraunces',serif; font-style:italic;
          color: var(--cream-soft); font-size:1.05rem;
        }
        .portal-course-grid {
          display:grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          list-style:none; padding:0; margin:0;
        }
        .portal-course {
          position:relative;
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 1.75rem 1.75rem 1.75rem;
          display:flex; flex-direction:column; gap:.6rem;
          transition: border-color .25s var(--ease), transform .25s var(--ease);
        }
        .portal-course:hover { border-color: var(--gold); transform: translateY(-2px); }
        .portal-course__bar {
          position:absolute; top:0; left:0; right:0; height:3px;
          background: var(--ink-3); overflow:hidden;
        }
        .portal-course__bar-fill {
          display:block; height:100%;
          background: linear-gradient(90deg, var(--gold), var(--gold-bright));
          transition: width .4s var(--ease);
        }
        .portal-course__top {
          display:flex; justify-content:space-between; align-items:baseline;
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.18em; text-transform:uppercase;
          color: var(--cream-soft);
        }
        .portal-course__pct { color: var(--gold); }
        .portal-course__title {
          font-family:'Anton',sans-serif;
          font-size: 1.7rem; line-height:1; letter-spacing:-.005em;
          text-transform:uppercase; color: var(--cream); margin:.25rem 0;
        }
        .portal-course__sub {
          font-family:'Fraunces',serif; font-style:italic;
          font-size: .98rem; line-height:1.45;
          color: var(--cream-soft); margin: 0;
        }
        .portal-course__progress {
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.1em; text-transform:uppercase;
          color: var(--cream-soft); margin:.25rem 0 1rem;
        }
        .portal-course__cta {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--gold); border-bottom: 1px solid var(--gold);
          padding-bottom:.25rem; align-self:flex-start;
        }
        .portal-course__cta:hover { color: var(--gold-bright); border-color: var(--gold-bright); }

        /* DOWNLOADS */
        .portal-dl-list {
          list-style:none; padding:0; margin:0;
          display:grid; gap:8px;
        }
        .portal-dl-item {
          display:grid;
          grid-template-columns: 120px 1fr auto;
          gap: 16px; align-items:center;
          padding: 14px 20px;
          background: var(--ink-2); border: 1px solid var(--line);
          transition: border-color .2s;
        }
        .portal-dl-item:hover { border-color: var(--gold); }
        .portal-dl-item__meta {
          display:flex; flex-direction:column; gap:5px;
        }
        .portal-dl-item__type {
          font-family:'JetBrains Mono',monospace;
          font-size:.65rem; letter-spacing:.12em; text-transform:uppercase;
          padding: 2px 7px; background: var(--ink-3);
          color: var(--cream-soft); align-self:flex-start;
        }
        .portal-dl-item__tier {
          font-family:'JetBrains Mono',monospace;
          font-size:.6rem; letter-spacing:.14em; text-transform:uppercase;
          padding: 2px 7px; align-self:flex-start;
        }
        .portal-dl-item__tier--free { background:transparent; color:var(--cream-soft); border:1px solid var(--line); }
        .portal-dl-item__tier--insider { background:rgba(212,175,55,.12); color:var(--gold); border:1px solid var(--gold); }
        .portal-dl-item__tier--wholesale { background:var(--gold); color:var(--ink); }
        .portal-dl-item__body { display:flex; flex-direction:column; gap:4px; }
        .portal-dl-item__title {
          font-family:'Manrope',sans-serif;
          font-size:.98rem; font-weight:600; color:var(--cream);
        }
        .portal-dl-item__desc {
          font-family:'Manrope',sans-serif;
          font-size:.82rem; color:var(--cream-soft); line-height:1.4;
        }
        .portal-dl-item__cta {
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; letter-spacing:.12em; text-transform:uppercase;
          color: var(--gold); border-bottom:1px solid var(--gold);
          padding-bottom:.2rem; white-space:nowrap;
        }
        .portal-dl-item__cta:hover { color:var(--gold-bright); border-color:var(--gold-bright); }
        @media (max-width: 640px) {
          .portal-dl-item { grid-template-columns: 1fr; }
          .portal-dl-item__meta { flex-direction:row; }
        }
      `}</style>
    </div>
  );
}
