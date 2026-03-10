"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, Eye, Plus, Search, Trash2 } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types/firestore";

export interface AdminPostRow extends Post {
  metrics: {
    views: number;
    likes: number;
  };
}

export default function PostTableClient({ initialPosts }: { initialPosts: AdminPostRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filtered = initialPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.slug.toLowerCase().includes(query.toLowerCase())
  );

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsDeleting(slug);

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card border border-border/50 p-4 rounded-lg shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search posts..."
            className="pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <Link
          href="/rubin-admin/posts/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="rounded-md border border-border/50 bg-card overflow-hidden shadow-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b border-border/50 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[40%]">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Stats
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="h-24 text-center text-muted-foreground">
                    No posts found.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border/50 transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium truncate max-w-[300px]">{post.title}</span>
                        <span className="text-xs text-muted-foreground font-mono truncate max-w-[300px]">
                          /{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.metrics.views || 0}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/rubin-admin/posts/${post.slug}/edit`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={isDeleting === post.slug}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
