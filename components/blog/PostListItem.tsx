import Link from "next/link";
import TagPill from "@/components/ui/TagPill";

type PostListItemVariant = "blog" | "series" | "tag";
type DateFormat = "long" | "short";

interface PostListItemProps {
  href: string;
  title: string;
  excerpt?: string;
  publishedAt?: string | null;
  tags?: readonly string[];
  seriesIndex?: number;
  variant?: PostListItemVariant;
  animationDelay?: string;
}

function formatPublishedDate(publishedAt: string | null | undefined, format: DateFormat) {
  if (!publishedAt) {
    return "Draft";
  }

  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: format === "long" ? "long" : "short",
    day: "numeric",
  });
}

export default function PostListItem({
  href,
  title,
  excerpt,
  publishedAt,
  tags = [],
  seriesIndex,
  variant = "blog",
  animationDelay,
}: PostListItemProps) {
  if (variant === "tag") {
    return (
      <article className="group">
        <Link href={href} className="block space-y-2">
          <h2 className="text-xl font-medium group-hover:opacity-70">
            {title}
          </h2>
          {excerpt ? (
            <p className="text-zinc-600 dark:text-zinc-400">{excerpt}</p>
          ) : null}
        </Link>
      </article>
    );
  }

  if (variant === "series") {
    return (
      <article
        className="group space-y-3 animate-slide-up-fade opacity-0"
        style={{ animationDelay, animationFillMode: "forwards" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex gap-3 items-baseline">
            <span className="font-mono text-muted-foreground/50 text-sm">
              #{(seriesIndex ?? 0) + 1}
            </span>
            <Link href={href} className="block">
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {title}
              </h2>
            </Link>
          </div>
          <span className="text-xs font-mono text-muted-foreground shrink-0">
            {formatPublishedDate(publishedAt, "short")}
          </span>
        </div>

        {excerpt ? (
          <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl group-hover:text-foreground/80 transition-colors pl-8">
            {excerpt}
          </p>
        ) : null}
      </article>
    );
  }

  return (
    <article
      className="group space-y-3 animate-slide-up-fade opacity-0"
      style={{ animationDelay, animationFillMode: "forwards" }}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <Link href={href} className="block">
          <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
            {title}
          </h2>
        </Link>
        <span className="text-xs font-mono text-muted-foreground shrink-0 uppercase tracking-wider">
          {formatPublishedDate(publishedAt, "long")}
        </span>
      </div>

      {excerpt ? (
        <p className="text-muted-foreground leading-relaxed font-serif text-lg max-w-3xl group-hover:text-foreground transition-colors">
          {excerpt}
        </p>
      ) : null}

      {tags.length > 0 ? (
        <div className="flex gap-2 pt-2">
          {tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
