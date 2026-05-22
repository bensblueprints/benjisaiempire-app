import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const DOWNLOADS_DIR = path.join(process.cwd(), "public", "downloads");
const MAX_BYTES = 25 * 1024 * 1024;
const BLOB_STORE = "member-downloads";

function sanitizeFilename(name: string): string {
  const base = path.basename(name);
  return base.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").slice(0, 120) || "file";
}

export function fileTypeFromName(name: string): string {
  const ext = path.extname(name).slice(1).toLowerCase();
  const map: Record<string, string> = {
    pdf: "PDF",
    md: "MD",
    txt: "TXT",
    zip: "ZIP",
    mp3: "MP3",
    mp4: "MP4",
    docx: "DOCX",
    xlsx: "XLSX",
    png: "PNG",
    jpg: "JPG",
    jpeg: "JPG",
    webp: "WEBP",
  };
  return map[ext] ?? (ext ? ext.toUpperCase() : "Other");
}

export function blobKeyFromUrl(url: string): string | null {
  if (!url.includes("/api/downloads/file?")) return null;
  try {
    return new URL(url, "http://localhost").searchParams.get("key");
  } catch {
    return null;
  }
}

export async function saveUploadedDownload(
  file: File,
): Promise<{ url: string; fileType: string; filename: string }> {
  if (!file.size) throw new Error("Choose a file to upload");
  if (file.size > MAX_BYTES) throw new Error("File too large (max 25 MB)");

  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const arrayBuffer = await file.arrayBuffer();
  const fileType = fileTypeFromName(file.name);

  if (process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(BLOB_STORE);
    await store.set(filename, arrayBuffer, {
      metadata: { contentType: file.type || "application/octet-stream" },
    });
    const key = encodeURIComponent(filename);
    return {
      url: `/api/downloads/file?key=${key}`,
      fileType,
      filename,
    };
  }

  await mkdir(DOWNLOADS_DIR, { recursive: true });
  await writeFile(path.join(DOWNLOADS_DIR, filename), Buffer.from(arrayBuffer));
  return {
    url: `/downloads/${filename}`,
    fileType,
    filename,
  };
}

export async function readStoredDownload(url: string): Promise<{
  data: Buffer;
  contentType: string;
  filename: string;
} | null> {
  const key = blobKeyFromUrl(url);
  if (key && process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(BLOB_STORE);
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (!blob) return null;
    return {
      data: Buffer.from(blob),
      contentType: "application/octet-stream",
      filename: key,
    };
  }

  if (url.startsWith("/downloads/")) {
    const name = url.replace(/^\/downloads\//, "");
    if (name.includes("..") || name.includes("/")) return null;
    const filepath = path.join(DOWNLOADS_DIR, name);
    const { readFile } = await import("fs/promises");
    try {
      const data = await readFile(filepath);
      return {
        data,
        contentType: "application/octet-stream",
        filename: name,
      };
    } catch {
      return null;
    }
  }

  return null;
}

export async function deleteStoredDownload(url: string): Promise<void> {
  const key = blobKeyFromUrl(url);
  if (key && process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    await getStore(BLOB_STORE).delete(key);
    return;
  }

  if (url.startsWith("/downloads/")) {
    const name = url.replace(/^\/downloads\//, "");
    if (name.includes("..") || name.includes("/")) return;
    try {
      await unlink(path.join(DOWNLOADS_DIR, name));
    } catch {
      /* already gone */
    }
  }
}
