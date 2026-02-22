import SeriesEditor from "@/components/admin/SeriesEditor";
import { getSeriesBySlug } from "@/lib/series.server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditSeriesPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const series = await getSeriesBySlug(slug);

    if (!series) {
        return notFound();
    }

    return (
        <div className="p-10">
            <SeriesEditor initialSeries={series} />
        </div>
    );
}
