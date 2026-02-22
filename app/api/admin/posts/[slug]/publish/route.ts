import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminDb } from "@/lib/firebase.admin";
import { requireAdmin } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await requireAdmin();

  const db = getAdminDb();
  const ref = db.collection("posts").doc(params.slug);
  const doc = await ref.get();
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await ref.update({
    status: "published",
    published: true,
    publishedAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${params.slug}`);

  return NextResponse.json({ ok: true, status: "published" });
}
