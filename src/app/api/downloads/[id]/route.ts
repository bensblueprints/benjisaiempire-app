import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { readStoredDownload } from "@/lib/member-download-storage";
import type { Tier } from "@prisma/client";

function canAccessTier(userTier: Tier | undefined, role: string | undefined, required: Tier): boolean {
  if (role === "ADMIN") return true;
  if (!userTier) return false;
  if (required === "FREE") return true;
  if (required === "INSIDER") return userTier === "INSIDER" || userTier === "WHOLESALE";
  if (required === "WHOLESALE") return userTier === "WHOLESALE";
  return false;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const download = await prisma.download.findUnique({ where: { id } });
  if (!download?.published) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (
    !canAccessTier(
      session.user.tier as Tier | undefined,
      session.user.role,
      download.tier,
    )
  ) {
    return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
  }

  if (download.url.startsWith("http://") || download.url.startsWith("https://")) {
    return NextResponse.redirect(download.url);
  }

  const stored = await readStoredDownload(download.url);
  if (!stored) {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }

  const safeName = stored.filename.replace(/[^\w.\-]/g, "_");
  return new NextResponse(new Uint8Array(stored.data), {
    headers: {
      "Content-Type": stored.contentType,
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
