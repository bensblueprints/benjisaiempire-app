import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { getAvatarBlobStore } from "@/lib/avatar-storage";
import { isNetlifyRuntime } from "@/lib/netlify-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export async function GET(req: Request): Promise<Response> {
  const key = new URL(req.url).searchParams.get("key");
  if (!key || key.includes("..") || key.includes("/")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const ext = path.extname(key).slice(1).toLowerCase();
  const contentType = MIME[ext] ?? "image/jpeg";

  if (isNetlifyRuntime()) {
    try {
      const store = await getAvatarBlobStore();
      const blob = await store.get(key, { type: "arrayBuffer" });
      if (!blob) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return new NextResponse(blob, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch (err) {
      console.error("[api/avatars/file] blob read failed:", err);
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const filepath = path.join(process.cwd(), "public", "avatars", key);
  try {
    const data = await readFile(filepath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
