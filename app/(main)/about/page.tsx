import PaperLayout from "@/components/PaperLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Rubin S",
    description: "Profile summary, education, skills, and leadership experience of Rubin S.",
};

export default function AboutPage() {
    return (
        <PaperLayout>
            <section className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.6s" }}>
                <header className="border-b-4 border-foreground pb-6">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">About Me</h1>
                    <p className="mt-4 text-xl text-muted-foreground font-sans max-w-2xl">
                        Electronics and Communication Engineering Student • Developer • Researcher
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Profile Summary */}
                        <section className="space-y-6">
                            <h2 className="magazine-header text-2xl border-b border-border pb-2">
                                Profile Summary
                            </h2>
                            <div className="prose max-w-none text-muted-foreground">
                                <p className="text-lg leading-relaxed drop-cap font-serif">
                                    I am a proactive second year <span className="text-highlight">Electronics and Communication Engineering</span> student at NIT Puducherry with a strong foundation in <span className="text-highlight">AI and ML</span>, <span className="text-highlight">Digital Signal Processing</span>, and <span className="text-highlight">full stack web development</span>. I have proven experience in designing DSP filters in MATLAB and building production grade web applications using React, Next.js, and Firebase. As the Co founder and Vice President of the NeuroVerse AI Club, I am constantly seeking challenging research or engineering internships to apply and expand my skills in AI, ML, or core ECE.
                                </p>
                            </div>
                        </section>

                        {/* Leadership */}
                        <section className="space-y-6">
                            <h2 className="magazine-header text-2xl border-b border-border pb-2">
                                Leadership & Involvement
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-highlight">Vice President and Co founder — NeuroVerse (AI Club NITPY)</h3>
                                    <p className="mt-2 text-muted-foreground leading-relaxed font-serif">
                                        Co founded the official AI focused student community at NIT Puducherry. I lead technical activities, including conducting workshops, managing mini projects, and promoting AI literacy on campus.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-highlight">Public Outreach Team — ECE Association, NITPY</h3>
                                    <p className="mt-2 text-muted-foreground leading-relaxed font-serif">
                                        Support academic seminars and technical workshops for the ECE department through strategic planning and student outreach.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-highlight">Web Team Coordinator — NSS LEAP Initiative</h3>
                                    <p className="mt-2 text-muted-foreground leading-relaxed font-serif">
                                        Managed web development tasks and contributed to outreach for an NSS program dedicated to teaching local school students.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-12">
                        {/* Education */}
                        <section className="space-y-6">
                            <h2 className="magazine-header text-xl border-b border-border pb-2">
                                Education
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground nit-highlight">NIT Puducherry</h3>
                                    <p className="text-muted-foreground font-serif italic text-sm">2024 — 2028</p>
                                    <p className="mt-1 text-muted-foreground text-sm">
                                        B.Tech, ECE
                                        <br />
                                        CGPA: 6.5
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground">Aditya Vidyashram</h3>
                                    <p className="text-muted-foreground font-serif italic text-sm">2024</p>
                                    <p className="mt-1 text-muted-foreground text-sm">
                                        Class XII (412/500)
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground">AKT Memorial</h3>
                                    <p className="text-muted-foreground font-serif italic text-sm">2022</p>
                                    <p className="mt-1 text-muted-foreground text-sm">
                                        Class X (423/500)
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Technical Skills */}
                        <section className="space-y-6">
                            <h2 className="magazine-header text-xl border-b border-border pb-2">
                                Skills
                            </h2>
                            <div className="space-y-6 text-muted-foreground">
                                <div>
                                    <h3 className="font-bold mb-1 text-primary font-serif">Languages</h3>
                                    <p className="text-sm">Python, MATLAB, C, C++, JavaScript</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-primary font-serif">AI & Signal</h3>
                                    <p className="text-sm">DSP Filter Design, NumPy, Pandas, ML Models</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-primary font-serif">Web</h3>
                                    <p className="text-sm">React, Next.js, Node, Firebase, Tailwind</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1 text-primary font-serif">Tools</h3>
                                    <p className="text-sm">Git, VS Code, Figma, Linux</p>
                                </div>
                            </div>
                        </section>

                        {/* Interests */}
                        <section className="space-y-6">
                            <h2 className="magazine-header text-xl border-b border-border pb-2">
                                Interests
                            </h2>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                                Artificial Intelligence • Digital Signal Processing • Teaching • Blogging • Music
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </PaperLayout>
    );
}
