import "server-only";
import { cache } from "react";
import { getAdminDb } from "@/lib/firebase/admin";
import type { Post } from "@/types/firestore";
import { serializePost } from "@/lib/posts/serialize";

export const getPaginatedPosts = cache(async function getPaginatedPosts(
  limitCount: number,
  startAfterIsoDate?: string | null
) {
  const db = getAdminDb();
  let query = db
    .collection("posts")
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(limitCount);

  if (startAfterIsoDate) {
    const dateObj = new Date(startAfterIsoDate);
    query = query.startAfter(dateObj);
  }

  try {
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => serializePost(doc));

    let nextCursor: string | undefined;
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
});

export const getPostBySlug = cache(async function getPostBySlug(
  slug: string
): Promise<Post | null> {
  const db = getAdminDb();

  try {
    const snapshot = await db
      .collection("posts")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return serializePost(snapshot.docs[0], { includeContent: true });
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
});
