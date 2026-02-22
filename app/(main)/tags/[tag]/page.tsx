// app/tags/[tag]/page.tsx
import { getAdminDb } from "@/lib/firebase.admin";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 120;

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);

  const db = getAdminDb();
  const snap = await db
    .collection("posts")
    .where("tags", "array-contains", tag)
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .get();

  if (snap.empty) return notFound();

  const posts = snap.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
    };
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 space-y-14">
      <h1 className="text-4xl font-semibold tracking-tight">
        Posts tagged <span className="opacity-70">#{tag}</span>
      </h1>

      <div className="space-y-10">
        {posts.map(post => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="block space-y-2">
              <h2 className="text-xl font-medium group-hover:opacity-70">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
