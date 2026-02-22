import Link from "next/link";
import { getPaginatedPosts } from "@/lib/posts.server";
import { getAllSeries } from "@/lib/series.server";
import PaperLayout from "@/components/PaperLayout";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export default async function BlogPage({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "series" ? "series" : "blogs";

  const { posts } = view === "blogs" ? await getPaginatedPosts(20) : { posts: [] };
  const series = view === "series" ? await getAllSeries() : [];

  return (
    <PaperLayout>
      <div className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.5s" }}>
        <header className="border-b-4 border-foreground pb-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">Publications</h1>
          <p className="mt-4 text-xl text-muted-foreground font-sans max-w-2xl">
            Selected writings, notes, and technical reports.
          </p>
        </header>

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
                posts.map((post, i) => (
                  <article
                    key={post.slug}
                    className="group space-y-3 animate-slide-up-fade opacity-0"
                    style={{ animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                          {post.title}
                        </h2>
                      </Link>
                      <span className="text-xs font-mono text-muted-foreground shrink-0 uppercase tracking-wider">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "Draft"}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="text-muted-foreground leading-relaxed font-serif text-lg max-w-3xl group-hover:text-foreground transition-colors">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex gap-2 pt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 rounded-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )
            ) : (
              series.length === 0 ? (
                <p className="text-muted-foreground italic font-serif">No series found.</p>
              ) : (
                series.map((s, i) => (
                  <Link
                    key={s.id}
                    href={`/series/${s.slug}`}
                    className="block group space-y-4 animate-slide-up-fade opacity-0 border-b border-border/40 pb-8 last:border-0"
                    style={{ animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                      {s.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed font-serif text-lg max-w-3xl">
                      {s.description}
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