import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";

export default function Hero() {
    return (
        <StaggerContainer className="border-b-4 border-foreground pb-8 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                    <FadeIn delay={0.1}>
                        <div className="flex items-center gap-3 text-sm font-serif italic text-muted-foreground">
                            <span>Vol. 1, Issue 1</span>
                            <span className="h-px w-8 bg-border"></span>
                            <span>{new Date().getFullYear()}</span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-foreground leading-[0.9]">
                            RUBIN S.
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-xl md:text-2xl font-sans font-light text-muted-foreground max-w-2xl">
                            <span className="text-highlight">Engineering Student</span> • <span className="text-highlight">Full-Stack Developer</span> • <span className="text-highlight">Researcher</span>
                        </p>
                    </FadeIn>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <FadeIn delay={0.4} direction="left">
                        <div className="flex gap-4">
                            <Link href="https://github.com/Rubin-S" target="_blank" className="p-2 hover:bg-muted transition-colors rounded-full">
                                <Github className="w-6 h-6" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/rubin-s-355169255" target="_blank" className="p-2 hover:bg-muted transition-colors rounded-full">
                                <Linkedin className="w-6 h-6" />
                            </Link>
                            <Link href="mailto:rubins022007@gmail.com" className="p-2 hover:bg-muted transition-colors rounded-full">
                                <Mail className="w-6 h-6" />
                            </Link>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.5} direction="left">
                        <div className="text-right">
                            <span className="block text-sm font-bold uppercase tracking-widest">NIT Puducherry</span>
                            <span className="block text-xs text-muted-foreground">2024 — 2028</span>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </StaggerContainer>
    );
}
