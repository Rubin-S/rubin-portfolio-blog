import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function Experience() {
    const experiences = [
        {
            role: "Vice President and Co-founder",
            org: "NeuroVerse (AI Club NITPY)",
            description: "Co-founded the official AI-focused student community at NIT Puducherry. Leading technical activities, workshops, and promoting AI literacy on campus."
        },
        {
            role: "Public Outreach Team",
            org: "ECE Association, NITPY",
            description: "Supporting academic seminars and technical workshops for the ECE department through strategic planning and student outreach."
        },
        {
            role: "Web Team Coordinator",
            org: "NSS LEAP Initiative",
            description: "Managed web development tasks and contributed to outreach for an NSS program dedicated to teaching local school students."
        }
    ];

    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Leadership & Experience</h2>
            </FadeIn>

            <StaggerContainer className="space-y-8" staggerChildren={0.15}>
                {experiences.map((exp, index) => (
                    <FadeIn key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start border-b border-border/40 pb-8 last:border-0">
                        <div className="md:col-span-1">
                            <h3 className="font-serif font-bold text-lg leading-tight text-highlight">{exp.org}</h3>
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{exp.role}</p>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                                {exp.description}
                            </p>
                        </div>
                    </FadeIn>
                ))}
            </StaggerContainer>
        </section>
    );
}
