export const revalidate = 3600;

import { getAdminDb } from "@/lib/firebase.admin";
import { getPostBySlug } from "@/lib/posts.server";

export async function generateStaticParams() {
  const db = getAdminDb();
  const snapshot = await db.collection("posts").where("status", "==", "published").get();
  
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug || doc.id,
  }));
}

import { notFound } from "next/navigation";
import RenderPost from "@/components/blog/RenderPost";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PaperLayout from "@/components/PaperLayout";

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <PaperLayout>

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Publications
      </Link>

      {/* Header */}
      <header className="space-y-6 border-b border-border/40 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground uppercase tracking-wider">
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "Draft"}</span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <span>{post.tags[0]}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>
        </div>

        {post.excerpt && (
          <div className="bg-muted/30 p-6 rounded-sm border-l-2 border-primary/20">
            <p className="text-lg text-foreground/80 italic font-serif leading-relaxed">
              &quot;{post.excerpt}&quot;
            </p>
          </div>
        )}
      </header>

      {/* Content */}
      <RenderPost post={post} />

    </PaperLayout>
  );
}
