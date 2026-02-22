import { getAdminDb } from "@/lib/firebase.admin";
import { serializePost } from "@/lib/posts.server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export const dynamic = "force-dynamic";

export default async function AdminPostPreview({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const db = getAdminDb();
  const doc = await db.collection("posts").doc(slug).get();

  if (!doc.exists) return notFound();
  const post = serializePost(doc, { includeContent: true });
  const html = typeof post.content === "string"
    ? post.content
    : post.content
    ? generateHTML(post.content as any, [StarterKit])
    : "";

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="text-xs uppercase tracking-wider text-zinc-500">
        <Link href="/rubin-admin" className="hover:underline">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link href="/rubin-admin/posts" className="hover:underline">Posts</Link>
        <span className="mx-2">/</span>
        {slug}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold">{post.title}</h1>

      {/* Status */}
      <span
        className={`inline-block px-3 py-1 text-xs rounded-full ${
          post.status === "published"
            ? "bg-green-600 text-white"
            : "bg-yellow-600 text-white"
        }`}
      >
        {post.status?.toUpperCase() ?? "UNKNOWN"}
      </span>

      {/* Excerpt */}
      <p className="text-lg text-zinc-500">{post.excerpt}</p>

      {/* Rendered Content */}
      <div className="border border-zinc-800 rounded p-6">
        <article className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>

      {/* Actions */}
      <div className="pt-6 flex gap-3">
        <Link
          href={`/rubin-admin/posts/${slug}/edit`}
          className="px-5 py-2 rounded border border-zinc-700 hover:bg-zinc-800 transition"
        >
          Edit Post
        </Link>

        <Link
          href={`/blog/${slug}`}
          className="px-5 py-2 rounded border border-zinc-700 hover:bg-zinc-800 transition"
        >
          View Public Page
        </Link>
      </div>
    </div>
  );
}
