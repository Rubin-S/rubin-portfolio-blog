import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminDb } from "@/lib/firebase.admin";
import { requireAdmin } from "@/lib/auth";

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
