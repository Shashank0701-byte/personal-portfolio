import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { EnchantTableSection } from '@/components/sections/enchant-table-section';
import { QuestLogSection } from '@/components/sections/quest-log-section';
import { Navigation } from '@/components/site/navigation';
import { CustomCursor } from '@/components/site/custom-cursor';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EnchantTableSection />
        <QuestLogSection />
        <ContactSection />
      </main>
    </>
  );
}
