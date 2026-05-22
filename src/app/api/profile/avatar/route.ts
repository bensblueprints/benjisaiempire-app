import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteStoredAvatar, saveAvatarUpload } from "@/lib/avatar-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to upload a photo." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const file = formData.get("photo");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image selected." }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    const imageUrl = await saveAvatarUpload(session.user.id, file);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    if (existing?.image && existing.image !== imageUrl) {
      await deleteStoredAvatar(existing.image);
    }

    revalidatePath("/community");
    revalidatePath("/community/members");
    revalidatePath("/portal");

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("[api/profile/avatar]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
