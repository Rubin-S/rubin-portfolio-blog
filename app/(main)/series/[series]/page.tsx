// app/series/[series]/page.tsx
import { getAdminDb } from "@/lib/firebase.admin";
import { getSeriesBySlug } from "@/lib/series.server";
import Link from "next/link";
import { notFound } from "next/navigation";
import PaperLayout from "@/components/PaperLayout";

export const revalidate = 120;

export default async function SeriesPage({ params }: { params: { series: string } }) {
  const seriesSlug = decodeURIComponent(params.series);
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) return notFound();

  const db = getAdminDb();
  const snap = await db
    .collection("posts")
    .where("seriesId", "==", series.id) // Use series.id, assuming posts store seriesId
    .where("status", "==", "published")
    .orderBy("seriesIndex", "asc")
    .get();

  const posts = snap.docs.map(d => ({
    id: d.id,
    slug: d.data().slug,
    title: d.data().title,
    index: d.data().seriesIndex ?? 0,
    excerpt: d.data().excerpt,
    publishedAt: d.data().publishedAt ? d.data().publishedAt.toDate().toISOString() : null,
  }));

  return (
    <PaperLayout>
      <div className="space-y-12 animate-slide-up-fade" style={{ animationDuration: "0.5s" }}>
        <div className="space-y-4 border-b border-border pb-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            <Link href="/blog?view=series" className="hover:underline">Series</Link>
            <span className="mx-2">/</span>
            <span>{series.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{series.title}</h1>
          <p className="text-muted-foreground font-sans max-w-2xl">
            {series.description}
          </p>
        </div>

        <div className="space-y-10">
          {posts.length === 0 ? (
            <p className="text-muted-foreground italic">No posts in this series yet.</p>
          ) : (
            posts.map((post, i) => (
              <article
                key={post.id}
                className="group space-y-3 animate-slide-up-fade opacity-0"
                style={{ animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: "forwards" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex gap-3 items-baseline">
                    <span className="font-mono text-muted-foreground/50 text-sm">#{post.index + 1}</span>
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "Draft"}
                  </span>
                </div>

                {post.excerpt && (
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl group-hover:text-foreground/80 transition-colors pl-8">
                    {post.excerpt}
                  </p>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </PaperLayout>
  );
}
