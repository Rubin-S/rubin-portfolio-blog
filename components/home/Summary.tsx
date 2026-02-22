import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";

export default function Summary() {
    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Abstract</h2>

                <div className="prose max-w-none text-foreground/90 columns-1 md:columns-2 gap-12 space-y-0">
                    <p className="text-lg leading-relaxed mt-0 mb-6 drop-cap text-muted-foreground">
                        Hi, I’m <strong className="font-serif font-bold text-foreground">Rubin S.</strong> I’m a second‑year <span className="text-highlight">Electronics and Communication Engineering</span> student at NIT Puducherry with a strong foundation in <span className="text-highlight">AI/ML</span>, <span className="text-highlight">Digital Signal Processing</span>, and <span className="text-highlight">full‑stack web development</span>. I build practical systems—designing DSP filters in MATLAB, shipping production web apps with Next.js and Firebase, and exploring ideas through research and software.
                    </p>

                    <p className="text-lg leading-relaxed mt-0 mb-6 text-muted-foreground">
                        This site is my personal corner of the web: part portfolio, part digital lab notebook, and part blog. You’ll find my projects and technical work here — and a blog where I post whatever I feel like writing. Sometimes it’s technical notes or research thoughts; sometimes it’s reflections, opinions, or the occasional offbeat piece. The tone is honest, the work remains professional.
                    </p>

                    <p className="text-lg leading-relaxed mt-0 text-muted-foreground">
                        Current focuses include <em className="text-highlight not-italic">AI/ML applications</em>, <em className="text-highlight not-italic">DSP experiments</em>, and <em className="text-highlight not-italic">production‑grade web systems</em>. If you’re here for collaborations, research internships, or to read something that made me think twice — welcome.
                    </p>
                </div>

                <div className="mt-8">
                    <Link href="/about" className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Read Full Bio →
                    </Link>
                </div>
            </FadeIn>
        </section>
    );
}
