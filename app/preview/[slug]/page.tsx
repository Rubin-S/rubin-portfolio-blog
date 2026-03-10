import { notFound } from "next/navigation";
import PostContent from "@/components/blog/PostContent";
import { verifyAdmin } from "@/lib/auth/session";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const adminSession = await verifyAdmin();
  if (!adminSession) {
    return notFound();
  }

  const db = getAdminDb();
  const snapshot = await db.collection("posts").where("slug", "==", params.slug).limit(1).get();
  if (snapshot.empty) {
    return notFound();
  }

  const post = serializePost(snapshot.docs[0], { includeContent: true });

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-6 text-xs opacity-60">Preview - Private</div>
      <PostContent content={post.content} />
    </main>
  );
}
