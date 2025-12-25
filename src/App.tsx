import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
// import { TechStackGrid } from './components/sections/TechStackGrid';
import { HowIThink } from './components/sections/HowIThink';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { UltimateTechStack } from './components/sections/UltimateTechStack';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>
        <Hero />
        <About />
        <UltimateTechStack />
        {/* <TechStackGrid /> */}
        <HowIThink />
        <Projects />
        <Contact />

      </main>
      <Footer />
    </div>
  );
}

export default App;
