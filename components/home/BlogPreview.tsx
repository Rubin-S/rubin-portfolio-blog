import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function BlogPreview() {
    return (
        <section className="mb-16">
            <FadeIn>
                <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
                    <h2 className="magazine-header text-2xl">Journal & Notes</h2>
                    <Link href="/blog" className="text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
                        Read All <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerChildren={0.2}>
                <FadeIn className="h-full">
                    <div className="p-6 border border-border bg-muted/20 hover:bg-muted/40 transition-colors h-full">
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Latest Series</span>
                        <h3 className="text-2xl font-serif font-bold mb-3">Technical Deep Dives</h3>
                        <p className="text-foreground/80 mb-6 leading-relaxed">
                            Explorations into DSP, AI architectures, and web engineering patterns. Detailed guides and project breakdowns.
                        </p>
                        <Link href="/blog" className="text-sm font-bold underline decoration-1 underline-offset-4">
                            Explore Series
                        </Link>
                    </div>
                </FadeIn>

                <FadeIn className="h-full">
                    <div className="p-6 border border-border bg-muted/20 hover:bg-muted/40 transition-colors h-full">
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">Personal Blog</span>
                        <h3 className="text-2xl font-serif font-bold mb-3">Reflections</h3>
                        <p className="text-foreground/80 mb-6 leading-relaxed">
                            Thoughts on student life, learning methodologies, and the intersection of technology and society.
                        </p>
                        <Link href="/blog" className="text-sm font-bold underline decoration-1 underline-offset-4">
                            Read Posts
                        </Link>
                    </div>
                </FadeIn>
            </StaggerContainer>
        </section>
    );
}
