"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { EditorContent, useEditor } from "@tiptap/react";
import { updatePost } from "@/actions/posts";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Series } from "@/types/firestore";
import {
  formatTimestamp,
  parseTags,
  toEditorContent,
} from "@/app/rubin-admin/posts/_lib/editor-utils";

type EditorPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  status: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  content?: unknown;
  seriesId?: string;
  seriesIndex?: number;
};

export default function PostEditorClient({
  initialPost,
  allSeries = [],
}: {
  initialPost: EditorPost;
  allSeries?: Series[];
}) {
  const [title, setTitle] = useState(initialPost.title);
  const [excerpt, setExcerpt] = useState(initialPost.excerpt);
  const [tagsInput, setTagsInput] = useState(initialPost.tags.join(", "));
  const [status, setStatus] = useState(initialPost.status || "draft");
  const [seriesId, setSeriesId] = useState(initialPost.seriesId || "");
  const [seriesIndex, setSeriesIndex] = useState(initialPost.seriesIndex || 0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(initialPost.updatedAt ?? null);
  const [isDirty, setIsDirty] = useState(false);
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: toEditorContent(initialPost.content) ?? undefined,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none dark:prose-invert min-h-[300px]",
      },
    },
    onUpdate: () => {
      setIsDirty(true);
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const publishedAtLabel = useMemo(
    () => formatTimestamp(initialPost.publishedAt),
    [initialPost.publishedAt]
  );

  const resetFeedback = useCallback(() => {
    setFeedback(null);
    setError(null);
  }, []);

  const persist = useCallback(
    (nextStatus?: string) => {
      if (!editor) {
        return;
      }

      if (!title.trim()) {
        setError("Title is required");
        return;
      }

      resetFeedback();

      startTransition(async () => {
        try {
          const result = await updatePost(initialPost.slug, {
            title,
            excerpt,
            tags: parseTags(tagsInput),
            content: editor.getJSON(),
            status: nextStatus,
            seriesId: seriesId || null,
            seriesIndex: Number(seriesIndex),
          });

          if (result.error) {
            throw new Error(result.error);
          }

          if (result.success) {
            setStatus(result.status || status);
            setIsDirty(false);
            setLastSavedAt(result.lastSaved || new Date().toISOString());
            setFeedback(nextStatus ? `Marked ${nextStatus}` : "Changes saved");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to save");
        }
      });
    },
    [editor, excerpt, initialPost.slug, resetFeedback, seriesId, seriesIndex, status, tagsInput, title]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="mt-1 inline-flex items-center gap-2">
            <StatusBadge status={status} className="px-3 py-1" />
            {publishedAtLabel ? (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Published {publishedAtLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => persist()}
            disabled={isPending || !isDirty}
            className="rounded-md border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-black transition disabled:opacity-60"
          >
            {isPending && !feedback ? "Saving..." : "Save"}
          </button>
          {status === "published" ? (
            <button
              onClick={() => persist("draft")}
              disabled={isPending}
              className="rounded-md border border-zinc-300 px-4 py-2 text-xs hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-black transition disabled:opacity-60"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={() => persist("published")}
              disabled={isPending}
              className="rounded-md border border-green-500 px-4 py-2 text-xs text-green-600 hover:bg-green-600 hover:text-white dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-black transition disabled:opacity-60"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Title</span>
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsDirty(true);
              }}
              placeholder="Title"
              className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-lg font-semibold focus:border-zinc-500 focus:outline-none"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Excerpt</span>
            <textarea
              value={excerpt}
              onChange={(event) => {
                setExcerpt(event.target.value);
                setIsDirty(true);
              }}
              placeholder="Short summary for listings"
              rows={3}
              className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tags</span>
            <input
              value={tagsInput}
              onChange={(event) => {
                setTagsInput(event.target.value);
                setIsDirty(true);
              }}
              placeholder="design, product, systems"
              className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Series</span>
            <select
              value={seriesId}
              onChange={(event) => {
                setSeriesId(event.target.value);
                setIsDirty(true);
              }}
              className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            >
              <option value="">None</option>
              {allSeries.map((series) => (
                <option key={series.id} value={series.id}>
                  {series.title}
                </option>
              ))}
            </select>
          </label>

          {seriesId ? (
            <label className="block space-y-1">
              <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Series Index
              </span>
              <input
                type="number"
                value={seriesIndex}
                onChange={(event) => {
                  setSeriesIndex(Number(event.target.value));
                  setIsDirty(true);
                }}
                className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
              />
            </label>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 p-4">
        {editor ? (
          <>
            <div className="mb-2 flex gap-2 border-b border-zinc-800 pb-2">
              <button onClick={addImage} className="text-xs bg-zinc-800 px-2 py-1 rounded hover:bg-zinc-700">
                Add Image
              </button>
            </div>
            <EditorContent editor={editor} />
          </>
        ) : (
          <div className="py-20 text-center text-sm text-zinc-500">Loading editor...</div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="space-y-1">
          {feedback ? <div className="font-medium text-green-500">{feedback}</div> : null}
          {error ? <div className="font-medium text-red-500">{error}</div> : null}
          {!feedback && !error && lastSavedAt ? (
            <div>Last saved {formatTimestamp(lastSavedAt)}</div>
          ) : null}
          {isDirty ? <div>Unsaved changes</div> : null}
        </div>

        <div className="text-right">
          <div className="text-xs text-zinc-500">Slug</div>
          <code className="text-sm text-zinc-300 dark:text-zinc-200">/{initialPost.slug}</code>
        </div>
      </div>
    </div>
  );
}
