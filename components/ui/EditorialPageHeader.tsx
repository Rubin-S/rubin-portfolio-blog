interface EditorialPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function EditorialPageHeader({
  title,
  subtitle,
}: EditorialPageHeaderProps) {
  return (
    <header className="border-b-4 border-foreground pb-6">
      <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground font-sans max-w-2xl">
        {subtitle}
      </p>
    </header>
  );
}
