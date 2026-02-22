import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function Skills() {
    const skills = {
        "Core Engineering": ["Digital Signal Processing (DSP)", "MATLAB", "Circuit Analysis", "Embedded Systems"],
        "AI & ML": ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Data Analysis"],
        "Web Development": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Node.js"],
        "Tools": ["Git", "Linux", "Figma", "VS Code"]
    };

    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Technical Expertise</h2>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerChildren={0.1}>
                {Object.entries(skills).map(([category, items]) => (
                    <FadeIn key={category} className="space-y-4">
                        <h3 className="font-serif font-bold text-lg text-primary">{category}</h3>
                        <ul className="space-y-2">
                            {items.map((skill) => (
                                <li key={skill} className="text-sm font-sans text-muted-foreground border-l-2 border-border pl-3 hover:border-primary transition-colors cursor-default">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                ))}
            </StaggerContainer>
        </section>
    );
}
