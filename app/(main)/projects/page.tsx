import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import PaperLayout from "@/components/common/PaperLayout";
import EditorialPageHeader from "@/components/ui/EditorialPageHeader";
import { portfolioContent } from "../content/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Rubin S",
  description: "Technical projects and experiments by Rubin S.",
};

export default function ProjectsPage() {
  const { projectsPage } = portfolioContent;

  return (
    <PaperLayout>
      <section className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.6s" }}>
        <EditorialPageHeader title={projectsPage.title} subtitle={projectsPage.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projectsPage.items.map((project) => (
            <article key={project.title} className="group magazine-card">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-1 border border-border rounded-none text-muted-foreground uppercase tracking-wider">
                      {project.tech}
                    </span>
                    {"link" in project && project.link ? (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed font-serif">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PaperLayout>
  );
}
