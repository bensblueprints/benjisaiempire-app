// Member dashboard — magazine-grade, not SaaS-grade.
// Reads session, pulls courses w/ per-user progress, and renders by tier.
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import PortalDownloadItem from "@/components/portal/PortalDownloadItem";
import PortalSoftwareItem from "@/components/portal/PortalSoftwareItem";
import { PORTAL_SOFTWARE_CATALOG } from "@/lib/portal-software";
import PortalCancelMembership from "@/components/portal/PortalCancelMembership";
import ProfilePhotoUploader from "@/components/community/ProfilePhotoUploader";
import { portalApiPath, useAirwallex } from "@/lib/payments";
import { downloadTierWhere, isPaidMember } from "@/lib/member-tiers";

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
  searchParams: Promise<{ upgrade?: string; billing?: string; billingError?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");

  const billingUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      airwallexSubscriptionId: true,
      stripeCustomerId: true,
      paymentProvider: true,
      subscriptionStatus: true,
      name: true,
      email: true,
      image: true,
    },
  });

  const tier = session.user.tier;
  const airwallexBilling = useAirwallex();
  const manageHref = portalApiPath();
  const showAirwallexCancel = Boolean(billingUser?.airwallexSubscriptionId);
  const showStripeCancel =
    Boolean(billingUser?.stripeCustomerId) && !billingUser?.airwallexSubscriptionId;
  const paidMember = isPaidMember(tier);
  const showCancelMembership =
    showAirwallexCancel || showStripeCancel || paidMember;
  const cancelViaBillingOnly =
    paidMember && !showAirwallexCancel && !showStripeCancel;
  const isInsiderOrUp = paidMember;
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

  const tierFilter = downloadTierWhere(tier, isAdmin);

  const downloads = await prisma.download.findMany({
    where: {
      published: true,
      NOT: { fileType: "Software" },
      tier: tierFilter,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const softwareFromDb = await prisma.download.findMany({
    where: {
      published: true,
      fileType: "Software",
      tier: tierFilter,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const software =
    softwareFromDb.length > 0
      ? softwareFromDb.map((row) => {
          const catalog = PORTAL_SOFTWARE_CATALOG.find((c) => c.title === row.title);
          return {
            id: row.id,
            title: row.title,
            description: row.description ?? "",
            url: row.url,
            buttonLabel: catalog?.buttonLabel ?? "Get access →",
            badge: catalog?.badge,
            tier: row.tier,
          };
        })
      : PORTAL_SOFTWARE_CATALOG.filter((entry) => {
          if (isAdmin) return true;
          if (tier === "WHOLESALE") return true;
          if (tier === "INSIDER") return entry.tier !== "WHOLESALE";
          return entry.tier === "FREE";
        }).map((entry) => ({
          id: entry.slug,
          title: entry.title,
          description: entry.description,
          url: entry.url,
          buttonLabel: entry.buttonLabel,
          badge: entry.badge,
          tier: entry.tier,
        }));

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
        <div className="portal-hero__grid">
          <div className="portal-hero__main">
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
              <Link href={manageHref} className="portal-hero__manage">
                Manage subscription →
              </Link>
              {isAdmin && (
                <Link href="/admin" className="portal-hero__admin">
                  Admin Console
                </Link>
              )}
            </div>
            {showCancelMembership && (
              <PortalCancelMembership
                stripeCustomer={showStripeCancel}
                airwallexSubscription={showAirwallexCancel}
                manageHref={manageHref}
                billingPortalOnly={cancelViaBillingOnly}
              />
            )}
          </div>
          {billingUser && (
            <div className="portal-hero__profile">
              <ProfilePhotoUploader
                name={billingUser.name}
                email={billingUser.email}
                imageUrl={billingUser.image}
              />
            </div>
          )}
        </div>
      </section>

      {params.billing === "cancel_scheduled" && (
        <aside className="portal-banner" id="manage-billing">
          <span className="portal-banner__eyebrow">Billing</span>
          <p className="portal-banner__text">
            Your subscription is set to cancel at the end of the current billing period.
            You keep access until then.
          </p>
        </aside>
      )}

      {params.billingError && (
        <aside className="portal-banner portal-banner--upgrade">
          <span className="portal-banner__eyebrow">Billing</span>
          <p className="portal-banner__text">{decodeURIComponent(params.billingError)}</p>
        </aside>
      )}

      {showAirwallexCancel && (
        <section className="portal-callout portal-callout--billing" id="manage-billing">
          <span className="portal-callout__eyebrow">Billing</span>
          <p className="portal-callout__body portal-callout__body--compact">
            Need to end access right away?{" "}
            <form action="/api/airwallex/cancel" method="POST" className="portal-billing-inline-form">
              <input type="hidden" name="immediate" value="1" />
              <button type="submit" className="portal-billing-inline-form__btn">
                Cancel immediately
              </button>
            </form>
          </p>
        </section>
      )}

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

      {tier === "FREE" && (
        <aside className="portal-callout portal-callout--free">
          <span className="portal-callout__eyebrow">Membership required</span>
          <h2 className="portal-callout__title">
            You&apos;re signed in — courses unlock with Insider.
          </h2>
          <p className="portal-callout__body">
            The courses, prompts, scripts, and your GoHighLevel sub-account live
            inside AI Empire Insider — <strong>$9/mo</strong>, cancel anytime, no
            contract. Tuesday cold calls still stream on{" "}
            <a
              href="https://www.youtube.com/channel/UCT6RXVsmGY7U_LxcUFoVC0g"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold)" }}
            >
              YouTube
            </a>
            .
          </p>
          <Link href="/checkout/insider" className="portal-callout__cta">
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

      {/* Community */}
      <section className="portal-community">
        <header className="portal-section-head">
          <span className="portal-section-eyebrow">Community</span>
          <h2 className="portal-section-title">The Lounge</h2>
        </header>
        <div className="portal-community__grid">
          {[
            { href: "/community", label: "Feed", desc: "Posts, wins, questions, and strategy from the community." },
            { href: "/community/events", label: "Events", desc: "Live sessions every Tuesday & Thursday. RSVP for links." },
            { href: "/community/members", label: "Members", desc: "Connect with other operators in the empire." },
          ].map(({ href, label, desc }) => (
            <Link key={href} href={href} className="portal-community__card">
              <div className="portal-community__card-label">{label}</div>
              <p className="portal-community__card-desc">{desc}</p>
              <span className="portal-community__card-cta">Enter →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Software */}
      {software.length > 0 && (isInsiderOrUp || isAdmin) && (
        <section className="portal-software">
          <header className="portal-section-head">
            <span className="portal-section-eyebrow">Partner stack</span>
            <h2 className="portal-section-title">Software</h2>
            <span className="portal-section-meta">
              {software.length} {software.length === 1 ? "tool" : "tools"}
            </span>
          </header>
          <ul className="portal-sw-list">
            {software.map((s) => (
              <PortalSoftwareItem
                key={s.id}
                title={s.title}
                description={s.description}
                url={s.url}
                buttonLabel={s.buttonLabel}
                badge={s.badge}
                tier={s.tier}
              />
            ))}
          </ul>
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
              <PortalDownloadItem
                key={d.id}
                id={d.id}
                title={d.title}
                description={d.description}
                url={d.url}
                fileType={d.fileType}
                tier={d.tier}
                copyText={d.copyText}
              />
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
        .portal-hero__grid {
          display: grid;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 900px) {
          .portal-hero__grid {
            grid-template-columns: 1fr minmax(280px, 340px);
          }
        }
        .portal-hero__profile {
          width: 100%;
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
        .portal-cancel-membership {
          margin-top: 1.25rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--line);
        }
        .portal-cancel-membership__link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cream-soft);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .portal-cancel-membership__link:hover { color: var(--rust); }
        .portal-cancel-membership__confirm { margin-top: 0.35rem; }
        .portal-cancel-membership__hint {
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          color: var(--cream-soft);
          margin: 0 0 0.65rem;
        }
        .portal-cancel-membership__form {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
        }
        .portal-cancel-membership__btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 2px;
          cursor: pointer;
          border: 1px solid var(--line);
          background: var(--ink-2);
          color: var(--cream-soft);
        }
        .portal-cancel-membership__btn:hover { border-color: var(--rust); color: var(--rust); }
        .portal-cancel-membership__btn--ghost { background: transparent; }
        .portal-callout--billing {
          border-color: var(--line);
          padding: 1rem 1.25rem;
        }
        .portal-callout__body--compact { margin: 0; font-size: 0.85rem; }
        .portal-billing-inline-form { display: inline; }
        .portal-billing-inline-form__btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--rust);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: underline;
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

        /* COMMUNITY */
        .portal-community__grid {
          display:grid; gap:1rem;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        }
        .portal-community__card {
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 1.5rem 1.75rem;
          display:flex; flex-direction:column; gap:.5rem;
          transition: border-color .2s, transform .2s;
          text-decoration:none;
        }
        .portal-community__card:hover { border-color: var(--gold); transform: translateY(-2px); }
        .portal-community__card-label {
          font-family:'Anton',sans-serif;
          font-size:1.5rem; text-transform:uppercase; letter-spacing:.02em; color:var(--cream);
        }
        .portal-community__card-desc {
          font-family:'Manrope',sans-serif;
          font-size:.88rem; color:var(--cream-soft); line-height:1.5; margin:0; flex:1;
        }
        .portal-community__card-cta {
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
          color:var(--gold); margin-top:.5rem;
        }

        /* SOFTWARE */
        .portal-sw-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }
        .portal-sw-item {
          display: grid;
          grid-template-columns: 140px 1fr auto;
          gap: 20px;
          align-items: center;
          padding: 20px 24px;
          background: rgba(212, 175, 55, 0.06);
          border: 1px solid var(--gold);
        }
        .portal-sw-item__meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .portal-sw-item__badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 8px;
          background: var(--gold);
          color: var(--ink);
          align-self: flex-start;
        }
        .portal-sw-item__tier {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 2px 7px;
          align-self: flex-start;
        }
        .portal-sw-item__tier--insider {
          background: rgba(212, 175, 55, 0.12);
          color: var(--gold);
          border: 1px solid var(--gold);
        }
        .portal-sw-item__body { display: flex; flex-direction: column; gap: 6px; }
        .portal-sw-item__title {
          font-family: 'Manrope', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--cream);
          margin: 0;
        }
        .portal-sw-item__desc {
          font-family: 'Manrope', sans-serif;
          font-size: 0.88rem;
          color: var(--cream-soft);
          line-height: 1.45;
          margin: 0;
        }
        .portal-sw-item__cta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 14px 22px;
          background: var(--gold);
          color: var(--ink);
          font-weight: 700;
          text-decoration: none;
          border-radius: 2px;
          white-space: nowrap;
        }
        .portal-sw-item__cta:hover {
          filter: brightness(1.08);
        }
        @media (max-width: 720px) {
          .portal-sw-item {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .portal-sw-item__cta { justify-self: start; }
        }

        /* DOWNLOADS */
        .portal-dl-list {
          list-style:none; padding:0; margin:0;
          display:grid; gap:8px;
        }
        .portal-dl-item {
          display:grid;
          grid-template-columns: 120px 1fr auto;
          gap: 16px; align-items:start;
          padding: 14px 20px;
          background: var(--ink-2); border: 1px solid var(--line);
          transition: border-color .2s;
        }
        .portal-dl-item--has-copy { align-items:start; }
        .portal-dl-item:hover { border-color: var(--gold); }
        .portal-dl-item__actions {
          display:flex; flex-direction:column; gap:8px; align-items:flex-end;
        }
        .portal-dl-copy { margin-top:10px; }
        .portal-dl-copy__toggle {
          font-family:'JetBrains Mono',monospace;
          font-size:.68rem; letter-spacing:.12em; text-transform:uppercase;
          color:var(--gold); background:transparent; border:none; cursor:pointer;
          padding:0; text-decoration:underline;
        }
        .portal-dl-copy__pre {
          margin:10px 0 0; padding:12px 14px;
          max-height:280px; overflow:auto;
          background:var(--ink); border:1px solid var(--line);
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; line-height:1.55; color:var(--cream-soft);
          white-space:pre-wrap; word-break:break-word;
        }
        .portal-dl-item__cta--copy {
          background:transparent; border:1px solid var(--gold);
          color:var(--gold); cursor:pointer;
          padding:8px 14px; border-radius:2px;
        }
        .portal-dl-item__cta--copy:hover { background:rgba(212,175,55,.12); }
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
