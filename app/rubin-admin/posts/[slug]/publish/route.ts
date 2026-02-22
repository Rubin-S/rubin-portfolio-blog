import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase.admin";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getAdminDb();
    await db.collection("posts").doc(params.id).update({
      published: true,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Publish Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
