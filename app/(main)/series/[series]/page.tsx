import Link from "next/link";
import { notFound } from "next/navigation";
import PostListItem from "@/components/blog/PostListItem";
import PaperLayout from "@/components/common/PaperLayout";
import { getAdminDb } from "@/lib/firebase/admin";
import { serializePost } from "@/lib/posts/serialize";
import { getSeriesBySlug } from "@/lib/series/queries";

export const revalidate = 120;

export default async function SeriesPage({ params }: { params: { series: string } }) {
  const seriesSlug = decodeURIComponent(params.series);
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    return notFound();
  }

  const db = getAdminDb();
  const snapshot = await db
    .collection("posts")
    .where("seriesId", "==", series.id)
    .where("status", "==", "published")
    .orderBy("seriesIndex", "asc")
    .get();

  const posts = snapshot.docs.map((doc) => serializePost(doc));

  return (
    <PaperLayout>
      <div className="space-y-12 animate-slide-up-fade" style={{ animationDuration: "0.5s" }}>
        <div className="space-y-4 border-b border-border pb-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            <Link href="/blog?view=series" className="hover:underline">
              Series
            </Link>
            <span className="mx-2">/</span>
            <span>{series.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{series.title}</h1>
          <p className="text-muted-foreground font-sans max-w-2xl">{series.description}</p>
        </div>

        <div className="space-y-10">
          {posts.length === 0 ? (
            <p className="text-muted-foreground italic">No posts in this series yet.</p>
          ) : (
            posts.map((post, index) => (
              <PostListItem
                key={post.id}
                href={`/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                seriesIndex={post.seriesIndex}
                variant="series"
                animationDelay={`${0.1 + index * 0.05}s`}
              />
            ))
          )}
        </div>
      </div>
    </PaperLayout>
  );
}
