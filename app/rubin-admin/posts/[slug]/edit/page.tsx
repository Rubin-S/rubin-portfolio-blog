import { notFound } from "next/navigation";
import PostEditorClient from "./PostEditorClient";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";
import { getAllSeries } from "@/lib/series/queries";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: { slug: string } }) {
  const db = getAdminDb();
  const doc = await db.collection("posts").doc(params.slug).get();

  if (!doc.exists) {
    return notFound();
  }

  const post = serializePost(doc, { includeContent: true });
  const allSeries = await getAllSeries();

  return (
    <div className="space-y-8 p-10">
      <PostEditorClient initialPost={post} allSeries={allSeries} />
    </div>
  );
}
