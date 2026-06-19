import "server-only";
import { spawn } from "node:child_process";
import { promises as fs, createReadStream } from "node:fs";
import path from "node:path";
import os from "node:os";

// ── Engine: yt-dlp (+ ffmpeg for merging) ─────────────────────────────────────
// This is the same engine the "grab the highest-quality version" sites wrap.
// In production (Alpine/Coolify) both binaries are installed via the Dockerfile.
// Locally, they're resolved from PATH (set YT_DLP_PATH / FFMPEG_PATH to override).
const YT_DLP =
  process.env.YT_DLP_PATH ||
  (process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");

export type Platform = "youtube" | "instagram" | "facebook";

export const PLATFORM_LABEL: Record<Platform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  facebook: "Facebook Reel",
};

export class DownloadError extends Error {}

/** Only these hosts are accepted — both a feature scope and an SSRF/abuse guard. */
export function detectPlatform(raw: string): Platform | null {
  let host: string;
  try {
    host = new URL(raw.trim()).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
  if (
    host === "youtube.com" ||
    host.endsWith(".youtube.com") ||
    host === "youtu.be" ||
    host === "youtube-nocookie.com"
  )
    return "youtube";
  if (
    host === "instagram.com" ||
    host.endsWith(".instagram.com") ||
    host === "instagr.am"
  )
    return "instagram";
  if (
    host === "facebook.com" ||
    host.endsWith(".facebook.com") ||
    host === "fb.watch" ||
    host === "fb.com"
  )
    return "facebook";
  return null;
}

/** Highest-quality format selection, merged to a single clean mp4 file. */
function formatArgs(platform: Platform): string[] {
  switch (platform) {
    case "youtube":
      // best video + best audio, prefer mp4/m4a, fall back to best progressive
      return ["-f", "bv*[ext=mp4]+ba[ext=m4a]/bv*+ba/b", "--merge-output-format", "mp4"];
    case "instagram":
    case "facebook":
      return ["-f", "bv*+ba/b", "--merge-output-format", "mp4"];
  }
}

function baseArgs(): string[] {
  const args = ["--no-playlist", "--no-warnings", "--no-progress"];
  // Optional cookies file for login-gated content (private reels, age-gated, etc.)
  if (process.env.YT_DLP_COOKIES) args.push("--cookies", process.env.YT_DLP_COOKIES);
  if (process.env.FFMPEG_PATH) args.push("--ffmpeg-location", process.env.FFMPEG_PATH);
  return args;
}

function run(
  args: string[],
  opts: { cwd?: string; timeoutMs: number }
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    let child;
    try {
      child = spawn(YT_DLP, args, { cwd: opts.cwd });
    } catch (err) {
      return reject(err);
    }
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new DownloadError("Timed out fetching that video."));
    }, opts.timeoutMs);
    child.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    child.on("error", (err: NodeJS.ErrnoException) => {
      clearTimeout(timer);
      if (err.code === "ENOENT") {
        reject(
          new DownloadError(
            "yt-dlp isn't installed in this environment. (Deploy via Docker or set YT_DLP_PATH.)"
          )
        );
      } else {
        reject(err);
      }
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? -1, stdout, stderr });
    });
  });
}

/** Turn yt-dlp's noisy stderr into something a human wants to read. */
function friendlyError(stderr: string): string {
  const line = stderr
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("ERROR:"))
    .pop();
  if (!line) return "Couldn't fetch that video.";
  const msg = line.replace(/^ERROR:\s*/, "");
  if (/login|cookies|rate-limit|429|sign in/i.test(msg))
    return "This one needs a login. Add a cookies file (YT_DLP_COOKIES) to grab private/age-gated posts.";
  if (/private/i.test(msg)) return "That post is private.";
  if (/unavailable|not available|removed|deleted/i.test(msg))
    return "That video is unavailable or has been removed.";
  if (/unsupported url/i.test(msg)) return "That link isn't a downloadable video.";
  return msg.length > 180 ? msg.slice(0, 180) + "…" : msg;
}

export interface VideoInfo {
  platform: Platform;
  title: string;
  uploader: string | null;
  duration: number | null;
  thumbnail: string | null;
}

/** Metadata only (no download) — powers the preview card. */
export async function getInfo(url: string, platform: Platform): Promise<VideoInfo> {
  const { code, stdout, stderr } = await run([...baseArgs(), "-J", url], {
    timeoutMs: 90_000,
  });
  if (code !== 0) throw new DownloadError(friendlyError(stderr));
  let j: Record<string, unknown>;
  try {
    j = JSON.parse(stdout);
  } catch {
    throw new DownloadError("Couldn't read video info.");
  }
  return {
    platform,
    title: (j.title as string) || "video",
    uploader: (j.uploader as string) || (j.channel as string) || null,
    duration: typeof j.duration === "number" ? j.duration : null,
    thumbnail: (j.thumbnail as string) || null,
  };
}

export interface DownloadedFile {
  /** Absolute path to the finished mp4 on disk. */
  filePath: string;
  /** Safe filename to hand the browser. */
  fileName: string;
  size: number;
  /** Call once the file has been streamed to clean up the temp dir. */
  cleanup: () => void;
}

/**
 * Where yt-dlp does its (potentially large) download + merge work before we
 * stream the file out. Defaults to the OS temp dir, but set DOWNLOAD_TMP_DIR to
 * a folder on a roomy drive so big 4K pulls never fill the system disk.
 */
const SCRATCH_DIR = process.env.DOWNLOAD_TMP_DIR || os.tmpdir();

/** Download the best-quality merged mp4 into a throwaway temp dir. */
export async function download(url: string, platform: Platform): Promise<DownloadedFile> {
  await fs.mkdir(SCRATCH_DIR, { recursive: true });
  const dir = await fs.mkdtemp(path.join(SCRATCH_DIR, "jarvis-dl-"));
  try {
    const { code, stderr } = await run(
      [
        ...baseArgs(),
        ...formatArgs(platform),
        "--restrict-filenames", // ascii-safe filename, header-friendly
        "-o",
        "%(title).80s.%(ext)s",
        url,
      ],
      { cwd: dir, timeoutMs: 300_000 }
    );
    if (code !== 0) throw new DownloadError(friendlyError(stderr));

    // The only surviving file (fragments/temp files are cleaned by yt-dlp after merge).
    const entries = await fs.readdir(dir);
    const candidates = await Promise.all(
      entries
        .filter((f) => !f.endsWith(".part") && !/\.f\d+\./.test(f))
        .map(async (f) => {
          const p = path.join(dir, f);
          const st = await fs.stat(p);
          return { f, p, size: st.size };
        })
    );
    const best = candidates.sort((a, b) => b.size - a.size)[0];
    if (!best) throw new DownloadError("Download produced no file.");

    return {
      filePath: best.p,
      fileName: best.f,
      size: best.size,
      cleanup: () => {
        fs.rm(dir, { recursive: true, force: true }).catch(() => {});
      },
    };
  } catch (err) {
    fs.rm(dir, { recursive: true, force: true }).catch(() => {});
    throw err;
  }
}

export { createReadStream };
