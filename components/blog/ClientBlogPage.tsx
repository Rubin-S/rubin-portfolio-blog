// components/blog/ClientBlogPage.tsx
"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string | null;
};

export default function ClientBlogPage({
  initialPosts,
  initialCursor,
  availableTags,
}: {
  initialPosts: Post[];
  initialCursor?: string;
  availableTags: string[];
}) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        search.length === 0 ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());

      const matchesTag = !selectedTag || p.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag, posts]);

  const hasFilters = search.length > 0 || !!selectedTag;

  const handleLoadMore = useCallback(async () => {
    if (!cursor) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts?cursor=${cursor}`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load more posts");
      }

      const data: { posts: Post[]; nextCursor?: string | null } = await res.json();
      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        const merged = data.posts.filter((p) => !seen.has(p.id));
        return [...prev, ...merged];
      });
      setCursor(data.nextCursor ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load more");
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  return (
    <div className="space-y-12">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-b border-zinc-900/15 dark:border-white/15 py-2 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 dark:focus:border-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap text-sm">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1 border rounded-full transition 
            ${selectedTag === tag ? "border-zinc-900 dark:border-white" : "border-zinc-900/15 dark:border-white/15"}
          `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-12">
        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {hasFilters
              ? "No posts match your filters yet."
              : "No posts published yet. Check back soon."}
          </p>
        ) : (
          filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <h2 className="font-serif text-xl tracking-tight group-hover:opacity-70 transition-opacity">
                {post.title}
              </h2>
              {post.publishedAt && (
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              {post.excerpt && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              )}

              {post.tags?.length > 0 && (
                <div className="mt-3 flex gap-2 text-xs opacity-70">
                  {post.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              )}

              <div className="mt-6 border-b border-zinc-900/10 dark:border-white/10" />
            </Link>
          ))
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {cursor && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900 hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black transition"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
