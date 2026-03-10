import { Metadata } from "next";
import PaperLayout from "@/components/common/PaperLayout";
import EditorialPageHeader from "@/components/ui/EditorialPageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioContent } from "../content/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | Rubin S",
  description: "Profile summary, education, skills, and leadership experience of Rubin S.",
};

export default function AboutPage() {
  const { aboutPage } = portfolioContent;

  return (
    <PaperLayout>
      <section className="space-y-12 py-10 animate-slide-up-fade" style={{ animationDuration: "0.6s" }}>
        <EditorialPageHeader title={aboutPage.title} subtitle={aboutPage.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <SectionHeading title="Profile Summary" className="text-2xl" />
              <div className="prose max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed drop-cap font-serif">
                  {aboutPage.profileSummary}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading title="Leadership & Involvement" className="text-2xl" />
              <div className="space-y-8">
                {aboutPage.leadership.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-xl font-serif font-bold text-highlight">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed font-serif">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section className="space-y-6">
              <SectionHeading title="Education" className="text-xl" />
              <div className="space-y-6">
                {aboutPage.education.map((item, index) => (
                  <div key={item.school}>
                    <h3 className={`text-lg ${index === 0 ? "font-bold nit-highlight" : "font-medium"} text-foreground`}>
                      {item.school}
                    </h3>
                    <p className="text-muted-foreground font-serif italic text-sm">{item.period}</p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {item.details.map((detail) => (
                        <span key={detail}>
                          {detail}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading title="Skills" className="text-xl" />
              <div className="space-y-6 text-muted-foreground">
                {aboutPage.skills.map((skill) => (
                  <div key={skill.title}>
                    <h3 className="font-bold mb-1 text-primary font-serif">{skill.title}</h3>
                    <p className="text-sm">{skill.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <SectionHeading title="Interests" className="text-xl" />
              <p className="text-sm text-foreground/90 leading-relaxed">
                {aboutPage.interests.join(" • ")}
              </p>
            </section>
          </div>
        </div>
      </section>
    </PaperLayout>
  );
}
