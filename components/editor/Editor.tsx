"use client";

import { useState } from "react";

export default function Editor({
    postId,
    initialSlug,
    initialTitle,
    initialExcerpt,
    initialContent,
    initialStatus,
}: {
    postId: string;
    initialSlug: string;
    initialTitle: string;
    initialExcerpt: string;
    initialContent: any;
    initialStatus: string;
}) {

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [excerpt, setExcerpt] = useState(initialExcerpt);
    const [status] = useState(initialStatus);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);


    async function save() {
        if (!title.trim()) {
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`/api/admin/posts/${postId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, excerpt })
            });

            if (!res.ok) {
                throw new Error(`Failed to save post (${res.status})`);
            }

            setLastSaved(new Date());
        } catch (error) {
            console.error("Failed to save post", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="text-xs tracking-wide uppercase opacity-50">
                    {status}
                </div>

                {lastSaved && (
                    <div className="text-xs opacity-50">
                        Saved {lastSaved.toLocaleTimeString()}
                    </div>
                )}
            </div>

            <input
                className="w-full text-4xl bg-transparent outline-none border-b border-neutral-700 pb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <textarea
                className="w-full h-[400px] bg-transparent outline-none border border-neutral-700 p-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content (Markdown)"
            />

            <textarea
                className="w-full bg-transparent outline-none border border-neutral-700 p-4"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Meta Description"
            />

            <button
                onClick={save}
                disabled={saving}
                className="px-6 py-2 border border-neutral-700 hover:bg-neutral-800"
            >
                {saving ? "Saving..." : "Save"}
            </button>
        </div>
    );
}
