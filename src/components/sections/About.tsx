import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { useState, useEffect } from 'react';
import CosmicBackground from '../ui/CosmicBackground';

// Updated to use explicit Tailwind colors that match the Cosmic Theme
const impactStatements = [
  {
    text: "I think in products, not features",
    color: "cyan-400",
    bg: "bg-cyan-400",
    delay: 0.8
  },
  {
    text: "Full-stack depth: frontend polish meets backend reliability",
    color: "purple-400",
    bg: "bg-purple-400",
    delay: 1.0
  },
  {
    text: "Curious builder who ships and learns",
    color: "pink-400",
    bg: "bg-pink-400",
    delay: 1.2
  }
];

const codeSnippets = [
  `const buildProduct = () => {
  // Focus on user experience
  const features = prioritize(
    userNeeds,
    performance,
    accessibility
  );
  
  return ship(features);
};`,
  `const InterviewPrepAI = () => {
  const [question, setQuestion] = useState('');
  
  const generateQuestion = async () => {
    const response = await fetch('/api/generate');
    const data = await response.json();
    setQuestion(data.question);
  };
  
  return <QuestionCard question={question} />;
};`,
  `const reliability = {
  tests: 'comprehensive',
  monitoring: 'real-time',
  deployment: 'automated',
  rollback: 'instant'
};`
];

export const About = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 4000); // Change snippet every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative py-32 min-h-screen flex items-center overflow-hidden"
    >
      {/* --- 1. COSMIC BACKGROUND --- 
          Variant 'about' uses a calmer, starry texture
      */}
      <CosmicBackground variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-cyan-400 text-sm font-mono mb-4 tracking-wider drop-shadow-lg">
              01. ABOUT
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              About <GlowEffect color="primary" intensity="sm">Me</GlowEffect>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6" />
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences through code, creativity, and continuous learning
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
          {/* Left Column - Professional Photo */}
          <div className="flex flex-col items-center lg:items-start">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]">
                {/* Photo Container - Added border glow to match theme */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                  {/* TO ADD YOUR PHOTO:
                    1. Place your photo in the public folder (e.g., public/profile.jpg)
                    2. Update the src below to "/profile.jpg"
                  */}
                  <img
                    src="/your-photo.jpg"
                    alt="Shashank Chakraborty"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{
                      filter: 'brightness(1.05) contrast(1.1)',
                    }}
                  />
                  {/* Inner shadow overlay for better blending */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>

                <p className="text-sm text-slate-400 mt-4 text-center lg:text-left font-mono">
                  Engineering student · Full-stack developer
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Impact Statements & Code */}
          <div className="space-y-8 lg:pt-6">
            {/* Impact Statements */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="space-y-6">
                {impactStatements.map((statement) => (
                  <motion.div
                    key={statement.text}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: statement.delay,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="group cursor-pointer"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Colored Dot */}
                      <div
                        className={`w-2 h-2 rounded-full mt-3 flex-shrink-0 ${statement.bg} group-hover:scale-150 group-hover:shadow-[0_0_10px_currentColor] transition-all duration-300`}
                      />
                      {/* Text */}
                      <p className={`text-lg md:text-xl leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-${statement.color} group-hover:drop-shadow-md`}>
                        {statement.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Animated Code Block */}
            <ScrollReveal direction="right" delay={0.8}>
              {/* Added glass effect background to Card */}
              <Card className="relative overflow-hidden bg-slate-900/60 backdrop-blur-md border-white/10">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                <div className="pt-12 pb-6 px-6 h-64 overflow-hidden relative">
                  {codeSnippets.map((snippet, index) => (
                    <motion.pre
                      key={index}
                      className="absolute inset-x-6 top-12 text-sm text-cyan-100/80 font-mono leading-relaxed whitespace-pre"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentSnippet === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      layout={false}
                    >
                      <code>{snippet}</code>
                    </motion.pre>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
                  {currentSnippet === 0 ? 'philosophy.ts' : currentSnippet === 1 ? 'InterviewPrepAI.tsx' : 'config.ts'}
                </div>
              </Card>
            </ScrollReveal>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <ScrollReveal direction="up" delay={1.4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-sm border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Let's Build Something Amazing
                  </h3>
                  <p className="text-slate-400">
                    Interested in collaborating or have a project in mind?
                  </p>
                </div>
                <motion.a
                  href="#contact"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Get In Touch
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};