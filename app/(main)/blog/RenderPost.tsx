"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RenderPost({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false
  });

  if (!editor) return null;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}
