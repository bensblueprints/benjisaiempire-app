import { prisma } from "@/lib/db";
import { createEvent, deleteEvent } from "@/app/community/_actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const inp: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  width: "100%",
};

const label: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".14em",
  color: "var(--cream-soft)",
  display: "block",
  marginBottom: 6,
};

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: { _count: { select: { rsvps: true } } },
  });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Control Room</div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1, margin: 0 }}>
          Events
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", marginTop: 12, fontSize: 15 }}>
          Create live sessions. Members can RSVP and get join links.
        </p>
      </div>

      {/* Create form */}
      <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 28, marginBottom: 40 }}>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 20 }}>
          New Event
        </div>
        <form action={createEvent} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
            <div>
              <span style={label}>Title *</span>
              <input name="title" placeholder="Tuesday Live Q&A" style={inp} required />
            </div>
            <div>
              <span style={label}>Starts at *</span>
              <input name="startsAt" type="datetime-local" style={inp} required />
            </div>
            <div>
              <span style={label}>Ends at</span>
              <input name="endsAt" type="datetime-local" style={inp} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
            <div>
              <span style={label}>Join URL (Zoom / Meet)</span>
              <input name="joinUrl" type="url" placeholder="https://zoom.us/j/..." style={inp} />
            </div>
            <div>
              <span style={label}>Recurring note</span>
              <input name="recurring" placeholder="Every Tue & Thu" style={inp} />
            </div>
          </div>
          <div>
            <span style={label}>Description</span>
            <textarea name="description" rows={3} placeholder="What we'll cover…" style={{ ...inp, resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 14, color: "var(--cream-soft)" }}>
              <input type="checkbox" name="published" defaultChecked style={{ width: 14, height: 14 }} />
              Published
            </label>
            <button type="submit" style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase",
              letterSpacing: ".1em", padding: "11px 24px", background: "var(--gold)",
              color: "var(--ink)", borderRadius: 3, fontWeight: 600, cursor: "pointer",
            }}>
              Create Event
            </button>
          </div>
        </form>
      </section>

      {/* List */}
      <section>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 16 }}>
          {events.length} {events.length === 1 ? "event" : "events"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {events.length === 0 && (
            <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "32px 24px", textAlign: "center", color: "var(--cream-soft)", fontFamily: "Fraunces, serif", fontStyle: "italic" }}>
              No events yet.
            </div>
          )}
          {events.map((ev) => (
            <div key={ev.id} style={{
              background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 4, padding: "14px 18px",
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 80px 60px", gap: 14, alignItems: "center",
            }}>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: 15 }}>{ev.title}</div>
                {ev.joinUrl && <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.joinUrl}</div>}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)" }}>
                {new Date(ev.startsAt).toLocaleString()}
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)" }}>
                {ev._count.rsvps} RSVPs
              </div>
              <div>
                <span style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: 9, padding: "3px 7px", borderRadius: 2,
                  background: ev.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                  color: ev.published ? "var(--gold)" : "var(--cream-soft)",
                  border: ev.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                }}>
                  {ev.published ? "Live" : "Draft"}
                </span>
              </div>
              <DeleteButton
                onConfirm={deleteEvent.bind(null, ev.id)}
                label="Delete"
                message={`Delete event "${ev.title}"?`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
