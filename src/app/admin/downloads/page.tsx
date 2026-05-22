import { prisma } from "@/lib/db";
import { createDownload, deleteDownload } from "../_actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const FILE_TYPES = ["PDF", "MD", "TXT", "ZIP", "MP3", "MP4", "DOCX", "XLSX", "PNG", "JPG", "Script", "Other"];

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
          Upload a file for members to download, or paste an external link. Copyable script text is optional.
        </p>
      </div>

      <section style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6, padding: 28, marginBottom: 40 }}>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 20 }}>
          Add download
        </div>
        <form
          action={createDownload}
          encType="multipart/form-data"
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div
            style={{
              padding: 24,
              border: "1px dashed var(--gold)",
              borderRadius: 4,
              background: "rgba(212,175,55,.06)",
            }}
          >
            <span style={label}>Upload file *</span>
            <input
              type="file"
              name="file"
              accept=".pdf,.md,.txt,.zip,.docx,.xlsx,.mp3,.mp4,.png,.jpg,.jpeg,.webp"
              style={{
                ...inp,
                padding: 12,
                cursor: "pointer",
              }}
            />
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "var(--cream-soft)", marginTop: 10, marginBottom: 0 }}>
              PDF, ZIP, Markdown, etc. Max 25 MB. File type is detected from the extension.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, alignItems: "end" }}>
            <div>
              <span style={label}>Title *</span>
              <input name="title" placeholder="Cold Calling Script Pack" style={inp} required />
            </div>
            <div>
              <span style={label}>Tier</span>
              <select name="tier" defaultValue="INSIDER" style={{ ...inp, cursor: "pointer" }}>
                <option value="FREE">FREE</option>
                <option value="INSIDER">INSIDER</option>
                <option value="WHOLESALE">WHOLESALE</option>
              </select>
            </div>
            <div>
              <span style={label}>Sort order</span>
              <input name="sortOrder" type="number" defaultValue={0} style={inp} />
            </div>
          </div>

          <div>
            <span style={label}>Description (optional)</span>
            <input name="description" placeholder="Short note shown in the portal" style={inp} />
          </div>

          <details style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "var(--cream-soft)" }}>
            <summary style={{ cursor: "pointer", color: "var(--gold)", marginBottom: 12 }}>
              Or use an external URL instead of uploading
            </summary>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
              <div>
                <span style={label}>External URL</span>
                <input name="url" type="url" placeholder="https://..." style={inp} />
              </div>
              <div>
                <span style={label}>File type (optional)</span>
                <select name="fileType" style={{ ...inp, cursor: "pointer" }}>
                  <option value="">Auto</option>
                  {FILE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </details>

          <div>
            <span style={label}>Copyable text (optional)</span>
            <textarea
              name="copyText"
              rows={6}
              placeholder="Paste script text for the Copy button in the member portal"
              style={{ ...inp, resize: "vertical", minHeight: 120, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <label style={{ ...label, display: "flex", gap: 8, alignItems: "center", cursor: "pointer", marginBottom: 0 }}>
              <input type="checkbox" name="published" defaultChecked style={{ width: 14, height: 14 }} />
              Published
            </label>
            <button
              type="submit"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                padding: "12px 22px",
                background: "var(--gold)",
                color: "var(--ink)",
                borderRadius: 3,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              Upload &amp; add
            </button>
          </div>
        </form>
      </section>

      <section>
        <div style={{ fontFamily: "Anton, sans-serif", fontSize: 22, textTransform: "uppercase", color: "var(--cream)", marginBottom: 16 }}>
          {downloads.length} {downloads.length === 1 ? "file" : "files"}
        </div>
        {downloads.length === 0 ? (
          <div style={{ border: "1px dashed var(--line)", borderRadius: 6, padding: "32px 24px", textAlign: "center", fontFamily: "Fraunces, serif", fontStyle: "italic", color: "var(--cream-soft)" }}>
            No downloads yet. Upload the first file above.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {downloads.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 2fr 2fr 80px 80px 80px 60px",
                  gap: 16,
                  alignItems: "center",
                  padding: "14px 18px",
                  background: "var(--ink-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 4,
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
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      letterSpacing: ".1em",
                      padding: "3px 8px",
                      borderRadius: 2,
                      textTransform: "uppercase",
                      background: d.tier === "FREE" ? "transparent" : d.tier === "INSIDER" ? "rgba(212,175,55,.15)" : "var(--gold)",
                      color: d.tier === "FREE" ? "var(--cream-soft)" : d.tier === "INSIDER" ? "var(--gold)" : "var(--ink)",
                      border: d.tier === "FREE" ? "1px solid var(--line)" : d.tier === "INSIDER" ? "1px solid var(--gold)" : "none",
                    }}
                  >
                    {d.tier}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      padding: "3px 7px",
                      borderRadius: 2,
                      background: d.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                      color: d.published ? "var(--gold)" : "var(--cream-soft)",
                      border: d.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                    }}
                  >
                    {d.published ? "Live" : "Draft"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <DeleteButton
                    onConfirm={deleteDownload.bind(null, d.id)}
                    label="Remove"
                    message={`Remove "${d.title}" and delete the stored file?`}
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
