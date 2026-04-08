import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { GlobalBackground } from '@/components/site/global-background';
import { Navigation } from '@/components/site/navigation';
import { CustomCursor } from '@/components/site/custom-cursor';

export default function HomePage() {
  return (
    <>
      <GlobalBackground />
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
