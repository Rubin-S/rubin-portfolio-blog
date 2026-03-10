interface TagPillProps {
  label: string;
  className?: string;
}

export default function TagPill({
  label,
  className = "",
}: TagPillProps) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 rounded-none ${className}`}
    >
      {label}
    </span>
  );
}
