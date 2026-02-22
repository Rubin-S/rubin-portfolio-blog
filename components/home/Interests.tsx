import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function Interests() {
    const interests = [
        "Artificial Intelligence",
        "Digital Signal Processing",
        "Teaching & Mentoring",
        "Technical Writing",
        "Music"
    ];

    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Interests</h2>
            </FadeIn>

            <StaggerContainer className="flex flex-wrap gap-4" staggerChildren={0.05}>
                {interests.map((interest, index) => (
                    <FadeIn key={index} direction="up" duration={0.3}>
                        <span
                            className="px-4 py-2 border border-border rounded-full text-sm font-sans text-foreground/80 hover:bg-muted transition-colors cursor-default block"
                        >
                            {interest}
                        </span>
                    </FadeIn>
                ))}
            </StaggerContainer>
        </section>
    );
}
