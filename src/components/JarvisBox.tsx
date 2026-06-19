"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ── JARVIS command box ────────────────────────────────────────────────────────
// A floating AI box on the home page. Today it does one thing — download the
// highest-quality version of a YouTube / Instagram / Facebook short. The intent
// parser is built so more skills can slot in later (just add more matchers).

type Status = "idle" | "resolving" | "downloading" | "done" | "error";

interface Preview {
  title: string;
  uploader: string | null;
  duration: number | null;
  thumbnail: string | null;
  platformLabel: string;
}

const URL_RE = /(https?:\/\/[^\s]+)/i;
const DL_WORDS = /\b(download|grab|save|rip|dl|fetch|pull)\b/i;

function detectLabel(url: string): string | null {
  try {
    const h = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    if (h.includes("youtu")) return "YouTube";
    if (h.includes("instagr")) return "Instagram";
    if (h.includes("facebook") || h === "fb.watch" || h === "fb.com")
      return "Facebook Reel";
  } catch {
    /* not a url */
  }
  return null;
}

function filenameFromHeader(cd: string | null): string | null {
  if (!cd) return null;
  const star = /filename\*=UTF-8''([^;]+)/i.exec(cd);
  if (star) {
    try {
      return decodeURIComponent(star[1]);
    } catch {
      /* fall through */
    }
  }
  const plain = /filename="?([^";]+)"?/i.exec(cd);
  return plain ? plain[1] : null;
}

export default function JarvisBox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const busy = status === "resolving" || status === "downloading";

  const handleDownload = useCallback(async (url: string) => {
    const label = detectLabel(url);
    if (!label) {
      setStatus("error");
      setPreview(null);
      setMessage(
        "I grab YouTube, Instagram, and Facebook Reels. Paste one of those links."
      );
      return;
    }

    // 1) Resolve metadata for the preview card.
    setStatus("resolving");
    setPreview(null);
    setMessage(`Reading the ${label}…`);
    try {
      const res = await fetch("/api/download/info", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't read that link.");
      setPreview(data as Preview);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Couldn't read that link.");
      return;
    }

    // 2) Pull the highest-quality file and hand it to the browser.
    setStatus("downloading");
    setMessage("Grabbing the highest-quality version…");
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Download failed.");
      }
      const name = filenameFromHeader(res.headers.get("content-disposition")) || "clip.mp4";
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
      setStatus("done");
      setMessage(`Saved “${name}”.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Download failed.");
    }
  }, []);

  const submit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (busy) return;
      const text = input.trim();
      if (!text) return;
      const url = URL_RE.exec(text)?.[1];

      // Intent routing. For now: anything with a link, or an explicit download
      // word, runs the downloader. Unknown commands get a gentle nudge.
      if (url && (DL_WORDS.test(text) || text === url || text.startsWith("http"))) {
        void handleDownload(url.replace(/[.,)]+$/, ""));
        return;
      }
      if (url) {
        void handleDownload(url.replace(/[.,)]+$/, ""));
        return;
      }
      setStatus("error");
      setPreview(null);
      setMessage(
        "Paste a YouTube, Instagram, or Facebook link and I'll grab the highest-quality version."
      );
    },
    [input, busy, handleDownload]
  );

  return (
    <>
      <style>{CSS}</style>

      {!open && (
        <button className="jbx-fab" onClick={() => setOpen(true)} aria-label="Open JARVIS">
          <span className="jbx-fab-dot" />
          Ask JARVIS
        </button>
      )}

      {open && (
        <div className="jbx-panel" role="dialog" aria-label="JARVIS">
          <div className="jbx-head">
            <div className="jbx-brand">
              <span className="jbx-logo">⚡</span>
              <div>
                <div className="jbx-title">JARVIS</div>
                <div className="jbx-sub">Shorts downloader</div>
              </div>
            </div>
            <button className="jbx-x" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>

          <form className="jbx-form" onSubmit={submit}>
            <input
              ref={inputRef}
              className="jbx-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="download https://youtube.com/shorts/…"
              spellCheck={false}
              autoComplete="off"
            />
            <button className="jbx-send" disabled={busy} aria-label="Run">
              {busy ? <span className="jbx-spin" /> : "↑"}
            </button>
          </form>

          {message && (
            <div className={`jbx-msg jbx-msg-${status}`}>
              {busy && <span className="jbx-spin jbx-spin-sm" />}
              <span>{message}</span>
            </div>
          )}

          {preview && (
            <div className="jbx-card">
              {preview.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="jbx-thumb" src={preview.thumbnail} alt="" />
              ) : (
                <div className="jbx-thumb jbx-thumb-empty">▶</div>
              )}
              <div className="jbx-meta">
                <span className="jbx-badge">{preview.platformLabel}</span>
                <div className="jbx-vtitle">{preview.title}</div>
                {preview.uploader && <div className="jbx-uploader">{preview.uploader}</div>}
              </div>
            </div>
          )}

          <div className="jbx-hint">YouTube · Instagram · Facebook Reels — highest quality</div>
        </div>
      )}
    </>
  );
}

const CSS = `
.jbx-fab{position:fixed;right:20px;bottom:20px;z-index:9000;display:flex;align-items:center;gap:8px;
  padding:12px 18px;border-radius:999px;background:#0b0b0c;color:#f4ecd8;font:600 14px/1 'Manrope',system-ui,sans-serif;
  letter-spacing:.02em;border:1px solid #d4af37;box-shadow:0 10px 30px rgba(0,0,0,.45);cursor:pointer;transition:transform .15s ease,box-shadow .15s ease}
.jbx-fab:hover{transform:translateY(-2px);box-shadow:0 14px 38px rgba(212,175,55,.28)}
.jbx-fab-dot{width:8px;height:8px;border-radius:50%;background:#f5d061;box-shadow:0 0 10px #f5d061;animation:jbxpulse 2s infinite}
@keyframes jbxpulse{0%,100%{opacity:1}50%{opacity:.4}}

.jbx-panel{position:fixed;right:20px;bottom:20px;z-index:9000;width:380px;max-width:calc(100vw - 32px);
  background:#15161a;color:#f4ecd8;border:1px solid rgba(244,236,216,.14);border-radius:18px;
  box-shadow:0 24px 60px rgba(0,0,0,.55);overflow:hidden;font-family:'Manrope',system-ui,sans-serif;
  animation:jbxin .2s ease}
@keyframes jbxin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.jbx-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid rgba(244,236,216,.1)}
.jbx-brand{display:flex;align-items:center;gap:12px}
.jbx-logo{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:#0b0b0c;border:1px solid #d4af37;font-size:18px}
.jbx-title{font-weight:800;letter-spacing:.12em;font-size:15px}
.jbx-sub{font-size:11px;color:rgba(244,236,216,.55);letter-spacing:.04em;margin-top:2px}
.jbx-x{font-size:24px;line-height:1;color:rgba(244,236,216,.5);background:none;border:none;cursor:pointer;padding:0 4px}
.jbx-x:hover{color:#f4ecd8}

.jbx-form{display:flex;gap:8px;padding:16px 18px 8px}
.jbx-input{flex:1;min-width:0;background:#0b0b0c;border:1px solid rgba(244,236,216,.16);border-radius:12px;
  color:#f4ecd8;padding:12px 14px;font-size:14px;outline:none;transition:border-color .15s ease}
.jbx-input::placeholder{color:rgba(244,236,216,.38)}
.jbx-input:focus{border-color:#d4af37}
.jbx-send{flex:0 0 auto;width:44px;border-radius:12px;background:#d4af37;color:#0b0b0c;font-size:18px;font-weight:800;
  border:none;cursor:pointer;display:grid;place-items:center;transition:background .15s ease}
.jbx-send:hover:not(:disabled){background:#f5d061}
.jbx-send:disabled{opacity:.6;cursor:default}

.jbx-msg{display:flex;align-items:center;gap:8px;margin:4px 18px 0;padding:10px 12px;border-radius:10px;font-size:13px;
  background:rgba(244,236,216,.05);color:rgba(244,236,216,.85)}
.jbx-msg-error{background:rgba(196,41,46,.14);color:#ffb4b4}
.jbx-msg-done{background:rgba(96,180,110,.14);color:#a9e6b4}

.jbx-card{display:flex;gap:12px;margin:12px 18px 0;padding:10px;border:1px solid rgba(244,236,216,.1);border-radius:12px;background:#0b0b0c}
.jbx-thumb{width:84px;height:84px;object-fit:cover;border-radius:8px;flex:0 0 auto;background:#1d1f25}
.jbx-thumb-empty{display:grid;place-items:center;color:rgba(244,236,216,.4);font-size:22px}
.jbx-meta{min-width:0;display:flex;flex-direction:column;gap:4px;justify-content:center}
.jbx-badge{align-self:flex-start;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#0b0b0c;background:#d4af37;
  padding:3px 8px;border-radius:6px;font-weight:700}
.jbx-vtitle{font-size:13px;font-weight:600;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.jbx-uploader{font-size:11px;color:rgba(244,236,216,.5)}

.jbx-hint{padding:12px 18px 16px;font-size:11px;color:rgba(244,236,216,.4);letter-spacing:.02em}

.jbx-spin{width:16px;height:16px;border-radius:50%;border:2px solid rgba(11,11,12,.3);border-top-color:#0b0b0c;animation:jbxspin .7s linear infinite}
.jbx-spin-sm{width:13px;height:13px;border-color:rgba(244,236,216,.25);border-top-color:#f4ecd8}
@keyframes jbxspin{to{transform:rotate(360deg)}}

@media (max-width:480px){.jbx-panel{right:8px;left:8px;bottom:8px;width:auto}}
`;
