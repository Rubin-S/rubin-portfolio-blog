import "server-only";
import { getAdminDb } from "@/lib/firebase.admin";
import type { Post } from "@/types/firestore";

export function serializePost(doc: FirebaseFirestore.DocumentSnapshot, options: { includeContent?: boolean } = {}): Post {
  const data = doc.data();
  if (!data) throw new Error(`Document ${doc.id} not found`);

  const toISO = (val: any) => (val && typeof val.toDate === "function" ? val.toDate().toISOString() : null);

  return {
    id: doc.id, // <--- Mapped ID here
    slug: data.slug || doc.id,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    content: options.includeContent ? data.content : undefined,
    published: data.published ?? false,
    status: data.status || "draft",
    tags: data.tags || [],
    seriesId: data.seriesId || undefined,
    seriesIndex: data.seriesIndex || 0,
    coverImage: data.coverImage || undefined,

    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,

    publishedAt: toISO(data.publishedAt),
    updatedAt: toISO(data.updatedAt) || new Date().toISOString(),
    createdAt: toISO(data.createdAt) || new Date().toISOString(),

    metrics: {
      views: data.metrics?.views || 0,
      likes: data.metrics?.likes || 0,
    },
  };
}

export async function getPaginatedPosts(limitCount: number, startAfterIsoDate?: string | null) {
  const db = getAdminDb();
  let query = db.collection("posts")
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(limitCount);

  if (startAfterIsoDate) {
    const dateObj = new Date(startAfterIsoDate);
    query = query.startAfter(dateObj);
  }

  try {
    const snapshot = await query.get();
    const posts = snapshot.docs.map(doc => serializePost(doc));

    let nextCursor: string | undefined = undefined;
    if (posts.length === limitCount) {
      const lastPost = posts[posts.length - 1];
      if (lastPost.publishedAt) {
        nextCursor = lastPost.publishedAt;
      }
    }

    return { posts, nextCursor };
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return { posts: [], nextCursor: undefined };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = getAdminDb();
  try {
    const snapshot = await db.collection("posts")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return serializePost(snapshot.docs[0], { includeContent: true });
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
}