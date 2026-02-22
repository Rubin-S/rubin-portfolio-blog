import { ExternalLink } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function Projects() {
    const projects = [
        {
            title: "IC3DCM International Conference Website",
            tech: "React.js • Firebase",
            link: "https://ic3dcm.in",
            description: "Developed the official, production-grade website for an international conference, handling landing pages, information architecture, and registration workflows. Implemented a Firebase backend for data storage and reliable content management."
        },
        {
            title: "Personal Portfolio and Blog System",
            tech: "Next.js • Firebase",
            description: "Architected and built a full-stack personal portfolio and blog. Integrated Firebase for dynamic content management, allowing for seamless blog post creation and updates. Focused on SEO, fast load times, and responsive design."
        },
        {
            title: "FIR and IIR Filter Design (DSP Mini Project)",
            tech: "MATLAB",
            description: "Designed and implemented low-pass FIR and IIR filters, analyzing trade-offs in performance and complexity. Performed comprehensive frequency response analysis and stability evaluations."
        },
        {
            title: "Freelance Service Platform (Ongoing)",
            tech: "React.js • Cloud",
            description: "Building the complete frontend for a service-based startup, translating client requirements and Figma designs into responsive, functional components. Responsible for UI/UX implementation and state management."
        },
        {
            title: "College Fest Web Contributions",
            tech: "HTML • CSS • Bootstrap",
            description: "Contributed to official fest websites (Le Ciel and Gynith) with a combined digital reach of over 10,000 users. Developed event pages, hero banners, and registration logic."
        }
    ];

    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Selected Works</h2>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12" staggerChildren={0.15}>
                {projects.map((project, index) => (
                    <FadeIn key={index} className="h-full">
                        <article className="group magazine-card h-full">
                            <div className="flex flex-col h-full justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                                            {project.title}
                                        </h3>
                                        {project.link && (
                                            <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                    <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                        {project.tech}
                                    </p>
                                    <p className="text-base font-sans text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </FadeIn>
                ))}
            </StaggerContainer>

            <FadeIn delay={0.4} className="mt-8 text-right">
                <Link href="/projects" className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                    View All Projects →
                </Link>
            </FadeIn>
        </section>
    );
}
