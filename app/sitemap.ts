import { MetadataRoute } from "next";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.rubz.fun";
  const db = getAdminDb();

  // 1. Static Routes
  const routes = ["", "/blog", "/projects", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  try {
    const snapshot = await db
      .collection("posts")
      .where("status", "==", "published")
      .orderBy("publishedAt", "desc")
      .get();

    const posts = snapshot.docs.map((doc) => {
      const post = serializePost(doc);
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

    return [...routes, ...posts];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
