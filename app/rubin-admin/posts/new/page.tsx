"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createPost, CreatePostState } from "@/actions/posts";

const initialState: CreatePostState = {};

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // useActionState hook for form handling
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    // Auto-generate slug from title if user hasn't manually edited slug (simplified logic)
    setSlug(slugify(v, { lower: true, strict: true }));
  };

  useEffect(() => {
    if (state.slug) {
      router.push(`/rubin-admin/posts/${state.slug}/edit`);
    }
  }, [state.slug, router]);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slide-up-fade">
      <div>
        <Link
          href="/rubin-admin/posts"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Draft</h1>
        <p className="text-muted-foreground">Start a new journal entry.</p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Title</label>
            <input
              name="title"
              autoFocus
              placeholder="Enter post title..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Slug (URL)</label>
            <div className="flex items-center rounded-md border border-input bg-muted/50 px-3">
              <span className="text-muted-foreground text-sm mr-1">/blog/</span>
              <input
                name="slug"
                className="flex h-10 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              This will be the permanent URL for your post.
            </p>
          </div>

          {state.error && (
            <div className="text-sm text-destructive font-medium">{state.error}</div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isPending || !title}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create & Edit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}