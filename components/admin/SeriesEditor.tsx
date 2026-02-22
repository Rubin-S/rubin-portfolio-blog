"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSeries } from "@/actions/series";

type EditorSeries = {
    slug: string;
    title: string;
    description: string;
};

export default function SeriesEditor({ initialSeries }: { initialSeries: EditorSeries }) {
    const router = useRouter();
    const [title, setTitle] = useState(initialSeries.title);
    const [description, setDescription] = useState(initialSeries.description);

    const [isPending, startTransition] = useTransition();
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const persist = useCallback(() => {
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        setFeedback(null);
        setError(null);

        startTransition(async () => {
            try {
                const result = await updateSeries(initialSeries.slug, {
                    title,
                    description,
                });

                if (result.error) {
                    throw new Error(result.error);
                }

                if (result.success) {
                    setIsDirty(false);
                    setFeedback("Changes saved");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to save");
            }
        });
    }, [title, description, initialSeries.slug]);

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-800 pb-4">
                <h2 className="text-lg font-semibold">Edit Series</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={persist}
                        disabled={isPending || !isDirty}
                        className="rounded-md border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-zinc-900 hover:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-black transition disabled:opacity-60"
                    >
                        {isPending ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block space-y-1">
                    <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Title</span>
                    <input
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                            setIsDirty(true);
                        }}
                        placeholder="Series Title"
                        className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-lg font-semibold focus:border-zinc-500 focus:outline-none"
                    />
                </label>

                <label className="block space-y-1">
                    <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Description</span>
                    <textarea
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                            setIsDirty(true);
                        }}
                        placeholder="Description of the series..."
                        rows={5}
                        className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                    />
                </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="space-y-1">
                    {feedback && <div className="font-medium text-green-500">{feedback}</div>}
                    {error && <div className="font-medium text-red-500">{error}</div>}
                    {isDirty && <div>Unsaved changes</div>}
                </div>

                <div className="text-right">
                    <div className="text-xs text-zinc-500">Slug</div>
                    <code className="text-sm text-zinc-300 dark:text-zinc-200">/{initialSeries.slug}</code>
                </div>
            </div>
        </div>
    );
}
