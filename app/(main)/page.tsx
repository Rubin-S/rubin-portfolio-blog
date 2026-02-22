import PaperLayout from "@/components/PaperLayout";
import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Interests from "@/components/home/Interests";
import BlogPreview from "@/components/home/BlogPreview";
import Summary from "@/components/home/Summary";
import Education from "@/components/home/Education";

export default function Home() {
  return (
    <PaperLayout>
      <Hero />
      <Summary />
      <Skills />
      <Projects />
      <Experience />
      <Interests />
      <BlogPreview />
      <Education />
    </PaperLayout>
  );
}
