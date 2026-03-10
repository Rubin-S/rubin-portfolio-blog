import type { PostStatus } from "@/types/firestore";

interface StatusBadgeProps {
  status: PostStatus | string;
  className?: string;
}

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const badgeClassName =
    status === "published"
      ? "bg-green-500/15 text-green-700 dark:text-green-400"
      : "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${badgeClassName} ${className}`}
    >
      {status}
    </span>
  );
}
