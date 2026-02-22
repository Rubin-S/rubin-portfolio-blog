import { SiteHeader } from "@/components/layout/site-header";
import Header from "@/components/Header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container max-w-screen-2xl mx-auto px-4 md:px-8 py-6">
                {children}
            </main>

            <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
                <section className="text-xs text-center text-muted-foreground border-t border-border/40 py-6">
                    <p>
                        © {new Date().getFullYear()} Rubin S. — Posts reflect my thinking and do not represent any organisation.
                    </p>
                </section>
            </footer>
        </div>
    );
}
