import PostTable from "@/components/admin/PostTable";
import { serializePost } from "@/lib/posts.server";
import { getAdminDb } from "@/lib/firebase.admin";

// Ensure this page never caches statically so you always see fresh data
export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const db = getAdminDb();
  
  // Fetch latest posts
  const snap = await db
    .collection("posts")
    .orderBy("updatedAt", "desc")
    .limit(200)
    .get();

  // Transform data to satisfy the strict 'AdminPostRow' type
  const posts = snap.docs.map((doc) => {
    const post = serializePost(doc);
    
    return {
      ...post,
      // FIX: Provide fallback for optional metrics to satisfy UI requirement
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

      <PostTable initialPosts={posts} />
    </div>
  );
}