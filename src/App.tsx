import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { UltimateTechStack } from './components/sections/UltimateTechStack';
import { HowIThink } from './components/sections/HowIThink';
import { Projects } from './components/sections/Projects';
import { OpenSource } from './components/sections/OpenSource';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <UltimateTechStack />
        <HowIThink />
        <Projects />
        <OpenSource />
        <Contact />

      </main>
      <Footer />
    </div>
  );
}

export default App;
