"use client";

import { createSeries } from "@/actions/series";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
    error: "",
    slug: "",
};

export default function NewSeriesPage() {
    const [state, formAction] = useFormState(createSeries, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.slug) {
            router.push(`/rubin-admin/series/${state.slug}/edit`);
        }
    }, [state.slug, router]);

    return (
        <div className="max-w-md mx-auto py-20">
            <h1 className="text-2xl font-bold mb-6">Create New Series</h1>

            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Enter series title..."
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-1">
                        Slug (optional)
                    </label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="custom-slug"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Leave blank to generate from title.
                    </p>
                </div>

                {state.error && (
                    <p className="text-red-500 text-sm">{state.error}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground rounded-md py-2 font-medium hover:bg-primary/90"
                >
                    Create Series
                </button>
            </form>
        </div>
    );
}
