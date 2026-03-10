import { notFound } from "next/navigation";
import SeriesEditorClient from "./SeriesEditorClient";
import { getSeriesBySlug } from "@/lib/series/queries";

export const dynamic = "force-dynamic";

export default async function EditSeriesPage({ params }: { params: { slug: string } }) {
  const series = await getSeriesBySlug(params.slug);

  if (!series) {
    return notFound();
  }

  return (
    <div className="p-10">
      <SeriesEditorClient initialSeries={series} />
    </div>
  );
}
