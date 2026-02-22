import FadeIn from "@/components/anim/FadeIn";

export default function Education() {
    return (
        <section className="mb-16">
            <FadeIn>
                <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">Academic Background</h2>

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-foreground nit-highlight">
                                National Institute of Technology Puducherry (NITPY)
                            </h3>
                            <p className="text-muted-foreground font-serif italic mt-1">Karaikal, PY • 2024 to 2028</p>
                            <p className="mt-2 text-foreground/90 font-sans">
                                B.Tech, Electronics and Communication Engineering
                                <br />
                                <span className="text-sm text-muted-foreground">CGPA: 6.5</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/40">
                        <div>
                            <h3 className="text-lg font-serif font-medium text-foreground">Aditya Vidyashram Residential School</h3>
                            <p className="text-muted-foreground font-serif italic text-sm">Puducherry, PY • 2024</p>
                            <p className="mt-1 text-foreground/90 text-sm">
                                Class XII CBSE (Score: 412/500)
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-serif font-medium text-foreground">AKT Memorial Vidya Saaket Senior Secondary School</h3>
                            <p className="text-muted-foreground font-serif italic text-sm">Kallakurichi, TN • 2022</p>
                            <p className="mt-1 text-foreground/90 text-sm">
                                Class X CBSE (Score: 423/500)
                            </p>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
