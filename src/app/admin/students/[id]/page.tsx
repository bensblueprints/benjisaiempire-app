import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminDeleteUser from "@/components/admin/AdminDeleteUser";
import { setUserRoleFromForm, setUserTierFromForm } from "../../_actions";

export const dynamic = "force-dynamic";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".14em",
  color: "var(--cream-soft)",
  marginBottom: 8,
};

const fieldRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "200px 1fr",
  gap: 18,
  padding: "12px 0",
  borderBottom: "1px solid var(--line)",
  alignItems: "center",
};

const dt: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".14em",
  color: "var(--cream-soft)",
};

const dd: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  color: "var(--cream)",
  fontSize: 14,
};

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  const [progressCount, recentProgress] = await Promise.all([
    prisma.lessonProgress.count({ where: { userId: id } }),
    prisma.lessonProgress.findMany({
      where: { userId: id },
      take: 20,
      orderBy: { completedAt: "desc" },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    }),
  ]);

  return (
    <div>
      <Link
        href="/admin/students"
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
        ← All students
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "var(--gold)",
              textTransform: "uppercase",
              letterSpacing: ".18em",
              marginBottom: 8,
            }}
          >
            Student
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
            {user.name ?? user.email}
          </h1>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--cream-soft)", marginTop: 8 }}>
            {user.email}
          </div>
        </div>
        {user.airwallexBillingCustomerId && (
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              padding: "10px 16px",
              border: "1px solid var(--line)",
              color: "var(--cream-soft)",
              borderRadius: 3,
            }}
          >
            Airwallex {user.airwallexBillingCustomerId}
          </span>
        )}
        {user.stripeCustomerId && (
          <a
            href={`https://dashboard.stripe.com/customers/${user.stripeCustomerId}`}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              padding: "10px 16px",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              borderRadius: 3,
            }}
          >
            View Stripe customer ↗
          </a>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
        <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 24 }}>
          <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 14, letterSpacing: ".02em" }}>
            Account
          </h2>
          <div style={fieldRow}>
            <span style={dt}>ID</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>{user.id}</span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Email</span>
            <span style={dd}>{user.email}</span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Name</span>
            <span style={dd}>{user.name ?? "—"}</span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Joined</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.createdAt.toLocaleString()}
            </span>
          </div>
          <div style={{ ...fieldRow, borderBottom: "none" }}>
            <span style={dt}>Lessons completed</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, color: "var(--gold)" }}>
              {String(progressCount).padStart(2, "0")}
            </span>
          </div>
        </section>

        <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 24 }}>
          <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 14, letterSpacing: ".02em" }}>
            Billing
          </h2>
          <div style={fieldRow}>
            <span style={dt}>Provider</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.paymentProvider ?? "—"}
            </span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Stripe customer</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.stripeCustomerId ?? "—"}
            </span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Stripe subscription</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.stripeSubscriptionId ?? "—"}
            </span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Airwallex customer</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.airwallexBillingCustomerId ?? "—"}
            </span>
          </div>
          <div style={fieldRow}>
            <span style={dt}>Airwallex subscription</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.airwallexSubscriptionId ?? "—"}
            </span>
          </div>
          <div style={{ ...fieldRow, borderBottom: "none" }}>
            <span style={dt}>Status</span>
            <span style={{ ...dd, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              {user.subscriptionStatus ?? "—"}
            </span>
          </div>
        </section>
      </div>

      <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 24, marginBottom: 40 }}>
        <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 18, letterSpacing: ".02em" }}>
          Permissions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <form action={setUserRoleFromForm.bind(null, user.id)}>
            <label style={labelStyle}>Role</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                name="role"
                defaultValue={user.role}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  background: "var(--ink)",
                  border: "1px solid var(--line)",
                  borderRadius: 3,
                  color: "var(--cream)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 13,
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button
                type="submit"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  padding: "10px 16px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                Set role
              </button>
            </div>
          </form>

          <form action={setUserTierFromForm.bind(null, user.id)}>
            <label style={labelStyle}>Tier</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                name="tier"
                defaultValue={user.tier}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  background: "var(--ink)",
                  border: "1px solid var(--line)",
                  borderRadius: 3,
                  color: "var(--cream)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 13,
                }}
              >
                <option value="FREE">FREE</option>
                <option value="INSIDER">INSIDER</option>
                <option value="WHOLESALE">WHOLESALE</option>
                <option value="DONE_WITH_YOU">DONE_WITH_YOU</option>
              </select>
              <button
                type="submit"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  padding: "10px 16px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                Set tier
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 14, letterSpacing: ".02em" }}>
          Recent progress
        </h2>
        <div style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6 }}>
          {recentProgress.length === 0 ? (
            <div style={{ padding: 22, color: "var(--cream-soft)", fontFamily: "Manrope, sans-serif" }}>
              No progress yet.
            </div>
          ) : (
            recentProgress.map((p) => (
              <div
                key={`${p.userId}-${p.lessonId}`}
                style={{
                  padding: "14px 22px",
                  borderBottom: "1px solid var(--line)",
                  display: "grid",
                  gridTemplateColumns: "1.5fr 2fr 1fr",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--gold)", fontSize: 14 }}>
                  {p.lesson.module.course.title}
                </div>
                <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 13 }}>
                  {p.lesson.module.title} · {p.lesson.title}
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)", textAlign: "right" }}>
                  {new Date(p.completedAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {session?.user?.id ? (
        <AdminDeleteUser
          userId={user.id}
          userEmail={user.email}
          currentAdminId={session.user.id}
        />
      ) : null}
    </div>
  );
}
