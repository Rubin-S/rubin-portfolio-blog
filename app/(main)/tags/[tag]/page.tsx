import { notFound } from "next/navigation";
import PostListItem from "@/components/blog/PostListItem";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";

export const revalidate = 120;

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);

  const db = getAdminDb();
  const snapshot = await db
    .collection("posts")
    .where("tags", "array-contains", tag)
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .get();

  if (snapshot.empty) {
    return notFound();
  }

  const posts = snapshot.docs.map((doc) => serializePost(doc));

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 space-y-14">
      <h1 className="text-4xl font-semibold tracking-tight">
        Posts tagged <span className="opacity-70">#{tag}</span>
      </h1>

      <div className="space-y-10">
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            href={`/blog/${post.slug}`}
            title={post.title}
            excerpt={post.excerpt}
            variant="tag"
          />
        ))}
      </div>
    </main>
  );
}
