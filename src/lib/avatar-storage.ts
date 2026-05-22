import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const AVATARS_DIR = path.join(process.cwd(), "public", "avatars");
const MAX_BYTES = 5 * 1024 * 1024;
const BLOB_STORE = "member-avatars";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extFromMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "jpg";
}

export function avatarBlobKeyFromUrl(url: string): string | null {
  if (!url.includes("/api/avatars/file?")) return null;
  try {
    return new URL(url, "http://localhost").searchParams.get("key");
  } catch {
    return null;
  }
}

export async function saveAvatarUpload(
  userId: string,
  file: File,
): Promise<string> {
  if (!file.size) throw new Error("Choose an image to upload");
  if (file.size > MAX_BYTES) throw new Error("Image too large (max 5 MB)");
  const mime = file.type || "image/jpeg";
  if (!ALLOWED.has(mime)) {
    throw new Error("Use JPG, PNG, WebP, or GIF");
  }

  const ext = extFromMime(mime);
  const filename = `${userId}-${Date.now()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  if (process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(BLOB_STORE);
    await store.set(filename, arrayBuffer, {
      metadata: { contentType: mime },
    });
    return `/api/avatars/file?key=${encodeURIComponent(filename)}`;
  }

  await mkdir(AVATARS_DIR, { recursive: true });
  await writeFile(path.join(AVATARS_DIR, filename), Buffer.from(arrayBuffer));
  return `/avatars/${filename}`;
}

export async function deleteStoredAvatar(url: string | null | undefined): Promise<void> {
  if (!url) return;

  const key = avatarBlobKeyFromUrl(url);
  if (key && process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    try {
      await getStore(BLOB_STORE).delete(key);
    } catch {
      /* gone */
    }
    return;
  }

  if (url.startsWith("/avatars/")) {
    const name = url.replace(/^\/avatars\//, "");
    if (name.includes("..") || name.includes("/")) return;
    try {
      await unlink(path.join(AVATARS_DIR, name));
    } catch {
      /* gone */
    }
  }
}
