import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import FadeIn from "@/components/anim/FadeIn";
import StaggerContainer from "@/components/anim/StaggerContainer";
import PaperLayout from "@/components/common/PaperLayout";
import { portfolioContent } from "./content/portfolio";

export const revalidate = 3600;

export default function Home() {
  const {
    homeHero,
    homeSummary,
    homeSkills,
    homeProjects,
    homeExperience,
    homeInterests,
    homeBlogPreview,
    homeEducation,
  } = portfolioContent;

  return (
    <PaperLayout>
      <StaggerContainer className="border-b-4 border-foreground pb-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 text-sm font-serif italic text-muted-foreground">
                <span>{homeHero.issueLabel}</span>
                <span className="h-px w-8 bg-border"></span>
                <span>{new Date().getFullYear()}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-foreground leading-[0.9]">
                {homeHero.name}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl font-sans font-light text-muted-foreground max-w-2xl">
                {homeHero.roles.map((role, index) => (
                  <span key={role}>
                    <span className="text-highlight">{role}</span>
                    {index < homeHero.roles.length - 1 ? " • " : ""}
                  </span>
                ))}
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col items-end gap-4">
            <FadeIn delay={0.4} direction="left">
              <div className="flex gap-4">
                {homeHero.links.map((link) => {
                  const Icon =
                    link.label === "GitHub"
                      ? Github
                      : link.label === "LinkedIn"
                        ? Linkedin
                        : Mail;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="p-2 hover:bg-muted transition-colors rounded-full"
                    >
                      <Icon className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="left">
              <div className="text-right">
                <span className="block text-sm font-bold uppercase tracking-widest">
                  {homeHero.institution}
                </span>
                <span className="block text-xs text-muted-foreground">{homeHero.period}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </StaggerContainer>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            {homeSummary.heading}
          </h2>

          <div className="prose max-w-none text-foreground/90 columns-1 md:columns-2 gap-12 space-y-0">
            {homeSummary.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-lg leading-relaxed mt-0 mb-6 drop-cap text-muted-foreground"
                    : "text-lg leading-relaxed mt-0 mb-6 text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={homeSummary.cta.href}
              className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
            >
              {homeSummary.cta.label}
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            Technical Expertise
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          staggerChildren={0.1}
        >
          {homeSkills.map((group) => (
            <FadeIn key={group.title} className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-primary">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-sans text-muted-foreground border-l-2 border-border pl-3 hover:border-primary transition-colors cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </StaggerContainer>
      </section>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            Selected Works
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12" staggerChildren={0.15}>
          {homeProjects.map((project) => (
            <FadeIn key={project.title} className="h-full">
              <article className="group magazine-card h-full">
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors text-highlight">
                        {project.title}
                      </h3>
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
          <Link
            href="/projects"
            className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
          >
            View All Projects →
          </Link>
        </FadeIn>
      </section>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            Leadership & Experience
          </h2>
        </FadeIn>

        <StaggerContainer className="space-y-8" staggerChildren={0.15}>
          {homeExperience.map((experience) => (
            <FadeIn
              key={experience.org}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start border-b border-border/40 pb-8 last:border-0"
            >
              <div className="md:col-span-1">
                <h3 className="font-serif font-bold text-lg leading-tight text-highlight">
                  {experience.org}
                </h3>
              </div>
              <div className="md:col-span-3 space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {experience.role}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {experience.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </section>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            Interests
          </h2>
        </FadeIn>

        <StaggerContainer className="flex flex-wrap gap-4" staggerChildren={0.05}>
          {homeInterests.map((interest) => (
            <FadeIn key={interest} direction="up" duration={0.3}>
              <span className="px-4 py-2 border border-border rounded-full text-sm font-sans text-foreground/80 hover:bg-muted transition-colors cursor-default block">
                {interest}
              </span>
            </FadeIn>
          ))}
        </StaggerContainer>
      </section>

      <section className="mb-16">
        <FadeIn>
          <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
            <h2 className="magazine-header text-2xl">Journal & Notes</h2>
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 flex items-center gap-1"
            >
              Read All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerChildren={0.2}>
          {homeBlogPreview.map((preview) => (
            <FadeIn key={preview.title} className="h-full">
              <div className="p-6 border border-border bg-muted/20 hover:bg-muted/40 transition-colors h-full">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
                  {preview.eyebrow}
                </span>
                <h3 className="text-2xl font-serif font-bold mb-3">{preview.title}</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">{preview.description}</p>
                <Link href={preview.href} className="text-sm font-bold underline decoration-1 underline-offset-4">
                  {preview.ctaLabel}
                </Link>
              </div>
            </FadeIn>
          ))}
        </StaggerContainer>
      </section>

      <section className="mb-16">
        <FadeIn>
          <h2 className="magazine-header text-2xl mb-8 border-b border-border pb-2">
            Academic Background
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground nit-highlight">
                  {homeEducation[0].school}
                </h3>
                <p className="text-muted-foreground font-serif italic mt-1">
                  {homeEducation[0].location} • {homeEducation[0].period}
                </p>
                <p className="mt-2 text-foreground/90 font-sans">
                  {homeEducation[0].credential}
                  <br />
                  <span className="text-sm text-muted-foreground">{homeEducation[0].score}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/40">
              {homeEducation.slice(1).map((education) => (
                <div key={education.school}>
                  <h3 className="text-lg font-serif font-medium text-foreground">
                    {education.school}
                  </h3>
                  <p className="text-muted-foreground font-serif italic text-sm">
                    {education.location} • {education.period}
                  </p>
                  <p className="mt-1 text-foreground/90 text-sm">
                    {education.credential} ({education.score})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </PaperLayout>
  );
}
