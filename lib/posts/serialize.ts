import type { Post } from "@/types/firestore";

export function serializePost(
  doc: FirebaseFirestore.DocumentSnapshot,
  options: { includeContent?: boolean } = {}
): Post {
  const data = doc.data();
  if (!data) {
    throw new Error(`Document ${doc.id} not found`);
  }

  const toISO = (value: unknown) =>
    value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function"
      ? value.toDate().toISOString()
      : null;

  return {
    id: doc.id,
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
