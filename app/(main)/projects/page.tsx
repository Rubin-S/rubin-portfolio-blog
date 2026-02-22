import PaperLayout from "@/components/PaperLayout";
import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Projects | Rubin S",
    description: "Technical projects and experiments by Rubin S.",
};

export default function ProjectsPage() {
    return (
        <PaperLayout>
            <section className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.6s" }}>
                <header className="border-b-4 border-foreground pb-6">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">Projects</h1>
                    <p className="mt-4 text-xl text-muted-foreground font-sans max-w-2xl">
                        A selection of technical work in DSP, Web Development, and AI.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {/* FIR & IIR Filter Design */}
                    <article className="group magazine-card">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                    FIR and IIR Filter Design
                                </h2>
                                <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">MATLAB</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-serif">
                                I designed and implemented low pass FIR and IIR filters, analyzing trade offs in performance and complexity. I performed comprehensive frequency response analysis and stability evaluations, including impulse response and pole zero plots. This project gave me a practical understanding of digital filter coefficients, transformation methods, and system behavior.
                            </p>
                        </div>
                    </article>

                    {/* IC3DCM Website */}
                    <article className="group magazine-card">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                    IC3DCM Conference Site
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">React • Firebase</span>
                                    <Link href="https://ic3dcm.in" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-serif">
                                I developed the official, production grade website for an international conference, handling landing pages, information architecture, and registration workflows. I implemented a Firebase backend for data storage and reliable content management, ensuring a fully responsive, high performance UI deployed globally on Vercel.
                            </p>
                        </div>
                    </article>

                    {/* Personal Portfolio */}
                    <article className="group magazine-card">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                    Portfolio & Blog System
                                </h2>
                                <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">Next.js • Firebase</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-serif">
                                I architected and built a full stack personal portfolio and blog from the ground up. I integrated Firebase (Firestore) for dynamic content management, allowing for seamless blog post creation and updates. The focus was on SEO, fast load times, and responsive design using Next.js static generation and server side rendering.
                            </p>
                        </div>
                    </article>

                    {/* Freelance Service Platform */}
                    <article className="group magazine-card">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                    Freelance Service Platform
                                </h2>
                                <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">React • Cloud</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-serif">
                                I am building the complete frontend for a service based startup, translating client requirements and Figma designs into responsive, functional components. I am responsible for UI and UX implementation, state management, and API integration planning.
                            </p>
                        </div>
                    </article>

                    {/* College Fest Web Contributions */}
                    <article className="group magazine-card">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                    College Fest Web
                                </h2>
                                <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">HTML • Bootstrap</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed font-serif">
                                I contributed to official fest websites (Le Ciel and Gynith) with a combined digital reach of over 10,000 users. I developed event pages, hero banners, and registration logic, significantly improving site wide responsiveness.
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </PaperLayout>
    );
}
