import { prisma } from "@/lib/db";
import { createDownload, deleteDownload } from "../_actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const FILE_TYPES = ["PDF", "ZIP", "MP3", "MP4", "DOCX", "XLSX", "PNG", "JPG", "Other"];

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

export default async function AdminDownloadsPage() {
  const downloads = await prisma.download.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>
          Control Room
        </div>
        <h1 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: ".01em", textTransform: "uppercase", color: "var(--cream)", lineHeight: 1, margin: 0 }}>
          Downloads
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", marginTop: 12, fontSize: 15 }}>
          Files that appear in the member portal Downloads section. Tier controls who sees them.
        </p>
      </div>

      {/* Add form */}
      <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 28, marginBottom: 40 }}>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 20 }}>
          Add download
        </div>
        <form action={createDownload} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 80px", gap: 14, alignItems: "end" }}>
          <div>
            <span style={label}>Title *</span>
            <input name="title" placeholder="Master Cold Call Script" style={inp} required />
          </div>
          <div>
            <span style={label}>URL *</span>
            <input name="url" type="url" placeholder="https://..." style={inp} required />
          </div>
          <div>
            <span style={label}>File type</span>
            <select name="fileType" style={{ ...inp, cursor: "pointer" }}>
              <option value="">—</option>
              {FILE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <span style={label}>Tier</span>
            <select name="tier" style={{ ...inp, cursor: "pointer" }}>
              <option value="FREE">FREE</option>
              <option value="INSIDER" selected>INSIDER</option>
              <option value="WHOLESALE">WHOLESALE</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase",
              letterSpacing: ".1em", padding: "11px 18px", background: "var(--gold)",
              color: "var(--ink)", borderRadius: 3, fontWeight: 600, cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add
          </button>
        </form>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 14, marginTop: 14, alignItems: "end" }}>
          <div>
            <span style={label}>Description (optional)</span>
            <input name="description" placeholder="Short description shown below the title" style={inp} form="add-download-form" />
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", paddingBottom: 2 }}>
            <label style={{ ...label, display: "flex", gap: 8, alignItems: "center", cursor: "pointer", marginBottom: 0 }}>
              <input type="checkbox" name="published" defaultChecked style={{ width: 14, height: 14 }} />
              Published
            </label>
            <div>
              <span style={label}>Sort order</span>
              <input name="sortOrder" type="number" defaultValue={0} style={{ ...inp, width: 80 }} />
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 16 }}>
          {downloads.length} {downloads.length === 1 ? "file" : "files"}
        </div>
        {downloads.length === 0 ? (
          <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "32px 24px", textAlign: "center", fontFamily: "Fraunces, serif", fontStyle: "italic", color: "var(--cream-soft)" }}>
            No downloads yet. Add the first one above.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {downloads.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 2fr 2fr 80px 80px 80px 60px",
                  gap: 16, alignItems: "center",
                  padding: "14px 18px",
                  background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 4,
                }}
              >
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--cream-soft)", letterSpacing: ".1em" }}>
                  #{d.sortOrder}
                </div>
                <div>
                  <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)", fontWeight: 600, fontSize: 15 }}>{d.title}</div>
                  {d.description && <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 12, marginTop: 2 }}>{d.description}</div>}
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {d.url}
                </div>
                <div>
                  {d.fileType && (
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: ".1em", padding: "3px 8px", background: "var(--ink-3)", color: "var(--cream-soft)", borderRadius: 2 }}>
                      {d.fileType}
                    </span>
                  )}
                </div>
                <div>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: ".1em",
                    padding: "3px 8px", borderRadius: 2, textTransform: "uppercase",
                    background: d.tier === "FREE" ? "transparent" : d.tier === "INSIDER" ? "rgba(212,175,55,.15)" : "var(--gold)",
                    color: d.tier === "FREE" ? "var(--cream-soft)" : d.tier === "INSIDER" ? "var(--gold)" : "var(--ink)",
                    border: d.tier === "FREE" ? "1px solid var(--line)" : d.tier === "INSIDER" ? "1px solid var(--gold)" : "none",
                  }}>
                    {d.tier}
                  </span>
                </div>
                <div>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: 9, padding: "3px 7px", borderRadius: 2,
                    background: d.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                    color: d.published ? "var(--gold)" : "var(--cream-soft)",
                    border: d.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                  }}>
                    {d.published ? "Live" : "Draft"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <DeleteButton
                    onConfirm={async () => {
                      "use server";
                      await deleteDownload(d.id);
                    }}
                    label="Remove"
                    message={`Remove "${d.title}" from the downloads library?`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
