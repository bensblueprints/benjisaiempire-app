import { prisma } from "@/lib/db";
import StudentsTable from "@/components/admin/StudentsTable";

export const dynamic = "force-dynamic";

export default async function StudentsIndex() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const students = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    tier: u.tier,
    stripeSubscriptionId: u.stripeSubscriptionId,
    subscriptionStatus: u.subscriptionStatus,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
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
          Roster
        </div>
        <h1
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            textTransform: "uppercase",
            color: "var(--cream)",
            lineHeight: 1,
          }}
        >
          Students <span style={{ color: "var(--gold)" }}>·</span> {users.length}
        </h1>
      </div>

      <StudentsTable students={students} />
    </div>
  );
}
