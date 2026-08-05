import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { EnchantTableSection } from '@/components/sections/enchant-table-section';
import { QuestLogSection } from '@/components/sections/quest-log-section';
import { WorkbenchSection } from '@/components/sections/workbench-section';
import { Navigation } from '@/components/site/navigation';
import { CustomCursor } from '@/components/site/custom-cursor';
import { AdvancementTrigger } from '@/components/site/advancement-trigger';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <AdvancementTrigger />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EnchantTableSection />
        <WorkbenchSection />
        <QuestLogSection />
        <ContactSection />
      </main>
    </>
  );
}
