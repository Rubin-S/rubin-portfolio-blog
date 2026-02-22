export const dynamic = "force-dynamic";

import PostEditor from "@/components/admin/PostEditor";
import { getAdminDb } from "@/lib/firebase.admin";
import { serializePost } from "@/lib/posts.server";
import { getAllSeries } from "@/lib/series.server";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const db = getAdminDb();
  const doc = await db.collection("posts").doc(slug).get();

  if (!doc.exists) {
    return notFound();
  }

  const post = serializePost(doc, { includeContent: true });
  const allSeries = await getAllSeries();

  return (
    <div className="space-y-8 p-10">
      <PostEditor initialPost={post} allSeries={allSeries} />
    </div>
  );
}
