import { NextResponse } from "next/server";
import { getAdminDb, getAdminApp } from "@/lib/firebase/admin"; // <--- Fixed Import
import * as admin from "firebase-admin"; // <--- Direct import for FieldValue

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: "missing-slug" }, { status: 400 });

    const db = getAdminDb();
    const postsRef = db.collection("posts");
    const snap = await postsRef.where("slug", "==", slug).limit(1).get();

    if (snap.empty) return NextResponse.json({ ok: false }, { status: 404 });

    const doc = snap.docs[0];

    // doc is retrieved, but we disabled the write for cost optimization
    /*
    await doc.ref.update({
      "metrics.views": admin.firestore.FieldValue.increment(1),
      "metrics.lastViewedAt": new Date(),
    });
    */

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("track-view error", err);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}
