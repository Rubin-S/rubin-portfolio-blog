"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";

export default function Editor({
  postId,
  initialTitle,
  initialExcerpt,
  initialContent,
  initialStatus,
  initialSlug
}: any) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false })
    ],
    content: initialContent,
    autofocus: "end"
  });

  // --- Auto Save Every 3s ---
  useEffect(() => {
    if (!editor) return;

    const interval = setInterval(async () => {
      setSaving(true);
      await fetch(`/api/admin/posts/${initialSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content: editor.getJSON(),
          status,
        }),
      });
      setSaving(false);
      setLastSaved(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [title, excerpt, status, editor, initialSlug]);

  async function publish() {
    await fetch(`/api/admin/posts/${initialSlug}/publish`, { method: "POST" });
    router.refresh();
  }

  async function remove() {
    await fetch(`/api/admin/posts/${initialSlug}/delete`, { method: "DELETE" });
    router.push("/rubin-admin");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">

      {/* Title Input */}
      <input
        className="w-full bg-transparent text-4xl font-medium focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Excerpt */}
      <textarea
        className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded p-3 text-sm focus:outline-none"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Short preview summary…"
      />

      {/* Editor */}
      <div className="prose dark:prose-invert max-w-none border border-zinc-300 dark:border-zinc-700 rounded p-4 min-h-[400px]">
        <EditorContent editor={editor} />
      </div>

      {/* Status */}
      <div className="flex justify-between text-sm text-zinc-500">
        {saving ? "Saving…" : lastSaved ? `Saved at ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}
        <span className="uppercase tracking-wide">{status}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={publish}
          className="px-5 py-2 text-sm rounded border border-zinc-700 hover:bg-zinc-900 hover:text-white transition"
        >
          Publish
        </button>

        <button
          onClick={remove}
          className="px-5 py-2 text-sm rounded border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
