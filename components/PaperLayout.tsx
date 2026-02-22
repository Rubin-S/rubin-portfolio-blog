export default function PaperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="max-w-6xl mx-auto md:px-6 prose prose-zinc dark:prose-invert">
        {children}
      </main>
    </>
  );
}