import { requireAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function GET() {
  await requireAdmin();

  const db = getAdminDb();
  const snap = await db
    .collection("posts")
    .orderBy("metrics.views", "desc")
    .limit(50)
    .get();

  const posts = snap.docs.map((d) => d.data());

  return Response.json({ posts });
}
