import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { Code, Rocket, Brain, Zap } from 'lucide-react';

const stats = [
  { 
    label: 'Projects Completed', 
    value: '10+',
    icon: Rocket,
    color: 'neon-primary',
    description: 'Production-ready applications'
  },
  { 
    label: 'Technologies Mastered', 
    value: '15+',
    icon: Brain,
    color: 'neon-secondary',
    description: 'Modern tech stack'
  },
  { 
    label: 'Years Learning', 
    value: '3+',
    icon: Zap,
    color: 'neon-accent',
    description: 'Continuous growth'
  },
];

const techStack = [
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', icon: '🟢' },
  { name: 'Express.js', category: 'Backend', icon: '🚀' },
  { name: 'Python', category: 'Language', icon: '🐍' },
  { name: 'Flask', category: 'Backend', icon: '🌶️' },
  { name: 'MongoDB', category: 'Database', icon: '🍃' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
  { name: 'AWS', category: 'Cloud', icon: '☁️' },
  { name: 'RESTful APIs', category: 'Architecture', icon: '🔌' },
  { name: 'Generative AI', category: 'AI/ML', icon: '🤖' },
];

export const About = () => {
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
          {/* Left Column - Visual/Stats */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/0 via-neon-primary/5 to-neon-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-center gap-6">
                        <div 
                          className={`p-4 rounded-xl border ${
                            stat.color === 'neon-primary' 
                              ? 'bg-neon-primary/10 border-neon-primary/20' 
                              : stat.color === 'neon-secondary'
                              ? 'bg-neon-secondary/10 border-neon-secondary/20'
                              : 'bg-neon-accent/10 border-neon-accent/20'
                          }`}
                        >
                          <Icon 
                            className={`w-8 h-8 ${
                              stat.color === 'neon-primary' 
                                ? 'text-neon-primary' 
                                : stat.color === 'neon-secondary'
                                ? 'text-neon-secondary'
                                : 'text-neon-accent'
                            }`} 
                          />
                        </div>
                        <div className="flex-1">
                          <motion.div
                            className={`text-4xl font-bold bg-clip-text text-transparent mb-1 ${
                              stat.color === 'neon-primary' 
                                ? 'bg-gradient-to-r from-neon-primary to-neon-secondary' 
                                : stat.color === 'neon-secondary'
                                ? 'bg-gradient-to-r from-neon-secondary to-neon-accent'
                                : 'bg-gradient-to-r from-neon-accent to-neon-primary'
                            }`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          >
                            {stat.value}
                          </motion.div>
                          <p className="text-white font-semibold mb-1">{stat.label}</p>
                          <p className="text-sm text-gray-400">{stat.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Visual Element */}
            <ScrollReveal direction="left" delay={0.4}>
              <div className="relative h-64 rounded-2xl overflow-hidden glass-strong border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-primary/10 via-transparent to-neon-secondary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Code className="w-16 h-16 text-neon-primary mx-auto animate-pulse" />
                    <p className="text-gray-300 font-mono text-sm">
                      {'<'} Full Stack Developer {'/>'}
                    </p>
                  </div>
                </div>
                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 gap-4 h-full w-full">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="border border-white/10"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Description */}
          <div className="space-y-8">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-4"
                >
                  <p>
                    I'm a <span className="text-neon-primary font-semibold text-glow-sm">full-stack developer</span> and{' '}
                    <span className="text-neon-secondary font-semibold text-glow-sm">engineering student</span> with hands-on experience 
                    building scalable web applications, AI-driven tools, and secure backend systems. I enjoy turning ideas 
                    into production-ready solutions—whether it's designing RESTful APIs, integrating Generative AI models, 
                    or developing responsive, modern user interfaces.
                  </p>
                  
                  <p>
                    My projects span interview-preparation platforms, cyber-safety applications, and real-time stock dashboards, 
                    where I've worked across the entire development lifecycle. I have practical expertise in{' '}
                    <span className="text-neon-accent font-medium">React</span>,{' '}
                    <span className="text-neon-accent font-medium">Node.js</span>,{' '}
                    <span className="text-neon-accent font-medium">Express.js</span>,{' '}
                    <span className="text-neon-accent font-medium">Python</span>,{' '}
                    <span className="text-neon-accent font-medium">Flask</span>,{' '}
                    <span className="text-neon-accent font-medium">SQL/NoSQL databases</span>, and cloud tools like{' '}
                    <span className="text-neon-accent font-medium">AWS</span>, along with a strong foundation in data handling, 
                    authentication flows, and system reliability.
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Tech Stack Grid */}
            <ScrollReveal direction="right" delay={0.4}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Tech <GlowEffect color="secondary">Stack</GlowEffect>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative"
                    >
                      <div className="glass rounded-lg p-4 border border-white/10 hover:border-neon-primary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tech.icon}</span>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{tech.name}</p>
                            <p className="text-xs text-gray-400">{tech.category}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/0 via-neon-primary/10 to-neon-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <ScrollReveal direction="up" delay={0.6}>
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
