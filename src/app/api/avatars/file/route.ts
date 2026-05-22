import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

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

  if (process.env.NETLIFY === "true") {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("member-avatars");
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (!blob) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const ext = path.extname(key).slice(1).toLowerCase();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": MIME[ext] ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const filepath = path.join(process.cwd(), "public", "avatars", key);
  try {
    const data = await readFile(filepath);
    const ext = path.extname(key).slice(1).toLowerCase();
    return new NextResponse(data, {
      headers: {
        "Content-Type": MIME[ext] ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
