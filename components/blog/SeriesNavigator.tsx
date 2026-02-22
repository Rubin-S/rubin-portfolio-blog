// components/blog/SeriesNavigator.tsx
import Link from "next/link";

export default function SeriesNavigator({
  series,
  currentSlug,
}: {
  series: { slug: string; title: string; seriesIndex: number }[];
  currentSlug: string;
}) {
  if (!series || series.length < 2) return null;

  const currentIndex = series.findIndex((p) => p.slug === currentSlug);
  const prev = series[currentIndex - 1];
  const next = series[currentIndex + 1];

  return (
    <nav className="flex justify-between text-sm opacity-80 my-12">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="hover:opacity-60">
          ← {prev.title}
        </Link>
      ) : <span />}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="hover:opacity-60">
          {next.title} →
        </Link>
      ) : null}
    </nav>
  );
}
