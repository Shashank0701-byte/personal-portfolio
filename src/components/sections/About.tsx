import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { OrbitingKeywords } from '../ui/OrbitingKeywords';
import { useState, useEffect } from 'react';

const impactStatements = [
  {
    text: "I think in products, not features",
    color: "neon-primary",
    delay: 0.8
  },
  {
    text: "Full-stack depth: frontend polish meets backend reliability",
    color: "neon-secondary",
    delay: 1.0
  },
  {
    text: "Curious builder who ships and learns",
    color: "neon-accent",
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
      className="relative py-section-lg min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-neon-primary text-sm font-mono mb-4 tracking-wider">
              01. ABOUT
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <GlowEffect color="primary">Me</GlowEffect>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-primary to-neon-secondary mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences through code, creativity, and continuous learning
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Orbiting Keywords */}
          <div className="flex items-center justify-center">
            <ScrollReveal direction="left" delay={0.2}>
              <OrbitingKeywords />
            </ScrollReveal>
          </div>

          {/* Right Column - Impact Statements & Code */}
          <div className="space-y-8">
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
                      <div
                        className={`w-2 h-2 rounded-full mt-3 flex-shrink-0 ${statement.color === 'neon-primary'
                          ? 'bg-neon-primary'
                          : statement.color === 'neon-secondary'
                            ? 'bg-neon-secondary'
                            : 'bg-neon-accent'
                          } group-hover:scale-150 transition-transform`}
                      />
                      <p className={`text-lg md:text-xl leading-relaxed group-hover:text-glow-sm transition-all ${statement.color === 'neon-primary'
                        ? 'text-neon-primary'
                        : statement.color === 'neon-secondary'
                          ? 'text-neon-secondary'
                          : 'text-neon-accent'
                        }`}>
                        {statement.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Animated Code Block - Crossfade, No Layout Shift */}
            <ScrollReveal direction="right" delay={0.8}>
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Fixed height container - prevents layout shift */}
                <div className="pt-12 pb-6 px-6 h-64 overflow-hidden relative">
                  {codeSnippets.map((snippet, index) => (
                    <motion.pre
                      key={index}
                      className="absolute inset-x-6 top-12 text-sm text-gray-300 font-mono leading-relaxed whitespace-pre"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentSnippet === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      layout={false}
                    >
                      <code>{snippet}</code>
                    </motion.pre>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
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
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-neon-primary/10 via-neon-secondary/10 to-neon-accent/10 border-neon-primary/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Let's Build Something Amazing
                  </h3>
                  <p className="text-gray-400">
                    Interested in collaborating or have a project in mind?
                  </p>
                </div>
                <motion.a
                  href="#contact"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-neon-primary to-neon-secondary text-white font-semibold hover:shadow-lg hover:shadow-neon-primary/50 transition-all"
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
