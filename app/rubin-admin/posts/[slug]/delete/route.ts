import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getAdminDb();
    await db.collection("posts").doc(params.slug).delete();

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${params.slug}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
