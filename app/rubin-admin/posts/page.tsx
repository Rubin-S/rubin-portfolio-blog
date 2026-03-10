import PostTableClient from "./PostTableClient";
import { serializePost } from "@/lib/posts/serialize";
import { getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const db = getAdminDb();
  const snapshot = await db.collection("posts").orderBy("updatedAt", "desc").limit(200).get();

  const posts = snapshot.docs.map((doc) => {
    const post = serializePost(doc);

    return {
      ...post,
      metrics: post.metrics ?? { views: 0, likes: 0 },
    };
  });

  return (
    <div className="p-10 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog content and portfolio entries.
          </p>
        </div>
      </div>

      <PostTableClient initialPosts={posts} />
    </div>
  );
}
