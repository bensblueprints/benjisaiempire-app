import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import RsvpButton from "@/components/community/RsvpButton";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
}

export default async function EventsPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  const now = new Date();

  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, startsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
      include: { rsvps: { select: { userId: true } } },
    }),
    prisma.event.findMany({
      where: { published: true, startsAt: { lt: now } },
      orderBy: { startsAt: "desc" },
      take: 10,
      include: { rsvps: { select: { userId: true } } },
    }),
  ]);

  return (
    <div style={{ maxWidth: 780 }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Community</div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1, margin: 0 }}>
          Events
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", marginTop: 10, fontSize: 15 }}>
          Live sessions every <strong style={{ color: "var(--cream)" }}>Tuesday & Thursday</strong>. RSVP to get reminders and the join link.
        </p>
      </div>

      {upcoming.length === 0 ? (
        <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "40px 24px", textAlign: "center", color: "var(--cream-soft)", fontFamily: "Fraunces, serif", fontStyle: "italic", marginBottom: 40 }}>
          No upcoming events. Check back soon.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          {upcoming.map((ev) => {
            const rsvped = ev.rsvps.some((r) => r.userId === userId);
            const isLive = ev.startsAt <= new Date() && (!ev.endsAt || ev.endsAt >= new Date());
            return (
              <div key={ev.id} style={{
                background: "var(--ink-2)", border: isLive ? "1px solid var(--gold)" : "1px solid var(--line)",
                borderRadius: 6, padding: "22px 24px",
              }}>
                {isLive && (
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--gold)", marginBottom: 8 }}>
                    🔴 Happening now
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", letterSpacing: ".02em" }}>
                      {ev.title}
                    </div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--gold)", marginTop: 6 }}>
                      {formatDate(ev.startsAt)} · {formatTime(ev.startsAt)}
                      {ev.endsAt && ` — ${formatTime(ev.endsAt)}`}
                    </div>
                    {ev.description && (
                      <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
                        {ev.description}
                      </div>
                    )}
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginTop: 8 }}>
                      {ev.rsvps.length} going
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    {ev.joinUrl && (
                      <a
                        href={ev.joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase",
                          letterSpacing: ".1em", padding: "9px 16px", background: "var(--gold)",
                          color: "var(--ink)", borderRadius: 3, fontWeight: 600, whiteSpace: "nowrap",
                        }}
                      >
                        Join ↗
                      </a>
                    )}
                    <RsvpButton eventId={ev.id} rsvped={rsvped} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {past.length > 0 && (
        <div>
          <div style={{ fontFamily: "Anton, sans-serif", fontSize: 18, textTransform: "uppercase", color: "var(--cream-soft)", marginBottom: 14 }}>Past Events</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {past.map((ev) => (
              <div key={ev.id} style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 4, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: "var(--cream-soft)", fontSize: 14 }}>{ev.title}</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginTop: 4 }}>
                    {formatDate(ev.startsAt)}
                  </div>
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)" }}>
                  {ev.rsvps.length} attended
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
