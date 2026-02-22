// app/preview/[slug]/page.tsx
import { getAdminDb } from "@/lib/firebase.admin";
import { notFound } from "next/navigation";
import RenderPost from "@/components/blog/RenderPost";
import { verifyAdmin } from "@/lib/auth";

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const adminSession = await verifyAdmin();
  if (!adminSession) return notFound();

  const db = getAdminDb();
  const snap = await db.collection("posts").where("slug", "==", params.slug).limit(1).get();
  if (snap.empty) return notFound();
  const post = { id: snap.docs[0].id, ...snap.docs[0].data() } as any;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-6 text-xs opacity-60">Preview — Private</div>
      <RenderPost post={post} />
    </main>
  );
}
