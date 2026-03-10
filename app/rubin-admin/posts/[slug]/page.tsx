import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "@/components/blog/PostContent";
import StatusBadge from "@/components/ui/StatusBadge";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";

export const dynamic = "force-dynamic";

export default async function AdminPostPreview({ params }: { params: { slug: string } }) {
  const db = getAdminDb();
  const doc = await db.collection("posts").doc(params.slug).get();

  if (!doc.exists) {
    return notFound();
  }

  const post = serializePost(doc, { includeContent: true });

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-10">
      <div className="text-xs uppercase tracking-wider text-zinc-500">
        <Link href="/rubin-admin" className="hover:underline">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link href="/rubin-admin/posts" className="hover:underline">
          Posts
        </Link>
        <span className="mx-2">/</span>
        {params.slug}
      </div>

      <h1 className="text-4xl font-semibold">{post.title}</h1>

      <StatusBadge status={post.status || "draft"} />

      <p className="text-lg text-zinc-500">{post.excerpt}</p>

      <div className="border border-zinc-800 rounded p-6">
        <PostContent content={post.content} />
      </div>

      <div className="pt-6 flex gap-3">
        <Link
          href={`/rubin-admin/posts/${params.slug}/edit`}
          className="px-5 py-2 rounded border border-zinc-700 hover:bg-zinc-800 transition"
        >
          Edit Post
        </Link>

        <Link
          href={`/blog/${params.slug}`}
          className="px-5 py-2 rounded border border-zinc-700 hover:bg-zinc-800 transition"
        >
          View Public Page
        </Link>
      </div>
    </div>
  );
}
