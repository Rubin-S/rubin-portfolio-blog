"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createSeries } from "@/actions/series";
import FormField from "@/components/ui/FormField";

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
  }, [router, state.slug]);

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Create New Series</h1>

      <form action={formAction} className="space-y-4">
        <FormField label="Title">
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            placeholder="Enter series title..."
          />
        </FormField>

        <FormField label="Slug (optional)" hint="Leave blank to generate from title.">
          <input
            type="text"
            id="slug"
            name="slug"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            placeholder="custom-slug"
          />
        </FormField>

        {state.error ? <p className="text-red-500 text-sm">{state.error}</p> : null}

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
