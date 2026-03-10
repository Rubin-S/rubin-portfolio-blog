import Link from "next/link";
import { getAllSeries } from "@/lib/series/queries";

export const dynamic = "force-dynamic";

export default async function AdminSeriesPage() {
  const series = await getAllSeries();

  return (
    <div className="p-10 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Series</h1>
          <p className="text-muted-foreground">Manage your blog series.</p>
        </div>
        <Link
          href="/rubin-admin/series/new"
          className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create Series
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Slug
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Description
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {series.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-muted-foreground">
                    No series found.
                  </td>
                </tr>
              ) : (
                series.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">{item.title}</td>
                    <td className="p-4 align-middle">{item.slug}</td>
                    <td className="p-4 align-middle truncate max-w-xs">{item.description}</td>
                    <td className="p-4 align-middle text-right">
                      <Link
                        href={`/rubin-admin/series/${item.slug}/edit`}
                        className="text-primary hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
