import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminDb } from "@/lib/firebase.admin";
import { requireAdmin } from "@/lib/auth";
import { serializePost } from "@/lib/posts.server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await requireAdmin();

  const db = getAdminDb();
  const doc = await db.collection("posts").doc(params.slug).get();
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializePost(doc, { includeContent: true }));
}

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await requireAdmin();

  const payload = await req.json();
  const db = getAdminDb();
  const ref = db.collection("posts").doc(params.slug);
  const existing = await ref.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};

  if (typeof payload.title === "string") updates.title = payload.title;
  if (typeof payload.excerpt === "string") updates.excerpt = payload.excerpt;
  if (payload.content !== undefined) updates.content = payload.content;

  if (payload.tags !== undefined) {
    updates.tags = Array.isArray(payload.tags)
      ? payload.tags
      : typeof payload.tags === "string"
      ? payload.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];
  }

  const nextStatus = typeof payload.status === "string" ? payload.status : undefined;
  if (nextStatus) {
    updates.status = nextStatus;
    updates.published = nextStatus === "published";
    updates.publishedAt = nextStatus === "published" ? new Date() : null;
  }

  updates.updatedAt = new Date();

  await ref.update(updates);

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${params.slug}`);

  return NextResponse.json({ ok: true, status: nextStatus ?? existing.data()?.status ?? "draft" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await requireAdmin();

  const db = getAdminDb();
  await db.collection("posts").doc(params.slug).delete();

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${params.slug}`);

  return NextResponse.json({ ok: true });
}
