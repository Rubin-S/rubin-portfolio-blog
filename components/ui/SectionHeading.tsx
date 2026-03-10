interface SectionHeadingProps {
  title: string;
  className?: string;
}

export default function SectionHeading({
  title,
  className = "text-2xl mb-8",
}: SectionHeadingProps) {
  return (
    <h2 className={`magazine-header ${className} border-b border-border pb-2`}>
      {title}
    </h2>
  );
}
