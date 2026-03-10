import Link from "next/link";
import PostListItem from "@/components/blog/PostListItem";
import PaperLayout from "@/components/common/PaperLayout";
import EditorialPageHeader from "@/components/ui/EditorialPageHeader";
import { getPaginatedPosts } from "@/lib/posts/queries";
import { getAllSeries } from "@/lib/series/queries";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export default async function BlogPage({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "series" ? "series" : "blogs";

  const { posts } = view === "blogs" ? await getPaginatedPosts(20) : { posts: [] };
  const series = view === "series" ? await getAllSeries() : [];

  return (
    <PaperLayout>
      <div className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.5s" }}>
        <EditorialPageHeader
          title="Publications"
          subtitle="Selected writings, notes, and technical reports."
        />

        <div className="space-y-8">
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest border-b border-border pb-1">
            <Link
              href="/blog?view=blogs"
              className={cn(
                "pb-3 border-b-2 transition-colors",
                view === "blogs"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              All Posts
            </Link>
            <Link
              href="/blog?view=series"
              className={cn(
                "pb-3 border-b-2 transition-colors",
                view === "series"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Series
            </Link>
          </div>

          <div className="space-y-12">
            {view === "blogs" ? (
              posts.length === 0 ? (
                <p className="text-muted-foreground italic font-serif">No publications found.</p>
              ) : (
                posts.map((post, index) => (
                  <PostListItem
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    title={post.title}
                    excerpt={post.excerpt}
                    publishedAt={post.publishedAt}
                    tags={post.tags}
                    animationDelay={`${0.1 + index * 0.05}s`}
                  />
                ))
              )
            ) : (
              series.length === 0 ? (
                <p className="text-muted-foreground italic font-serif">No series found.</p>
              ) : (
                series.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/series/${item.slug}`}
                    className="block group space-y-4 animate-slide-up-fade opacity-0 border-b border-border/40 pb-8 last:border-0"
                    style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed font-serif text-lg max-w-3xl">
                      {item.description}
                    </p>
                  </Link>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </PaperLayout>
  );
}
