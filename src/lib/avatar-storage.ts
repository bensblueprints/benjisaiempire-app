import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { isNetlifyRuntime } from "@/lib/netlify-runtime";

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

export async function getAvatarBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  const siteID = process.env.NETLIFY_SITE_ID?.trim();
  const token =
    process.env.NETLIFY_BLOBS_TOKEN?.trim() ||
    process.env.NETLIFY_AUTH_TOKEN?.trim();

  if (siteID && token) {
    return getStore({ name: BLOB_STORE, siteID, token });
  }
  return getStore(BLOB_STORE);
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

  if (isNetlifyRuntime()) {
    try {
      const store = await getAvatarBlobStore();
      await store.set(filename, arrayBuffer, {
        metadata: { contentType: mime },
      });
      return `/api/avatars/file?key=${encodeURIComponent(filename)}`;
    } catch (err) {
      const detail = err instanceof Error ? err.message : "unknown error";
      console.error("[avatar-storage] Netlify Blobs upload failed:", detail);
      throw new Error(
        "Photo storage is unavailable. Ask support to enable Netlify Blobs (member-avatars store).",
      );
    }
  }

  try {
    await mkdir(AVATARS_DIR, { recursive: true });
    await writeFile(path.join(AVATARS_DIR, filename), Buffer.from(arrayBuffer));
    return `/avatars/${filename}`;
  } catch (err) {
    const detail = err instanceof Error ? err.message : "unknown error";
    console.error("[avatar-storage] local write failed:", detail);
    throw new Error("Could not save photo. Try again or use a smaller image.");
  }
}

export async function deleteStoredAvatar(url: string | null | undefined): Promise<void> {
  if (!url) return;

  const key = avatarBlobKeyFromUrl(url);
  if (key && isNetlifyRuntime()) {
    try {
      const store = await getAvatarBlobStore();
      await store.delete(key);
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
