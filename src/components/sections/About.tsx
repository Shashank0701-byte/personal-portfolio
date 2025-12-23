import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';

const stats = [
  { label: 'Projects Completed', value: '10+' },
  { label: 'Technologies Mastered', value: '15+' },
  { label: 'Years Learning', value: '3+' },
];

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-section-lg min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-section font-bold mb-4">
            About <GlowEffect color="primary">Me</GlowEffect>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions
            and beautiful user experiences.
          </p>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1} direction="up">
              <Card className="text-center">
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Main About Content */}
        <ScrollReveal direction="up" delay={0.3}>
          <Card className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a <span className="text-neon-primary font-semibold">full-stack developer</span> and{' '}
                <span className="text-neon-primary font-semibold">engineering student</span> with hands-on experience 
                building scalable web applications, AI-driven tools, and secure backend systems. I enjoy turning ideas 
                into production-ready solutions—whether it's designing RESTful APIs, integrating Generative AI models, 
                or developing responsive, modern user interfaces.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
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
          </Card>
        </ScrollReveal>

        {/* Tech Stack Highlights */}
        <ScrollReveal direction="up" delay={0.4} className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">
              Core <GlowEffect color="secondary">Expertise</GlowEffect>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'Node.js', 'Express.js', 'Python', 'Flask',
                'MongoDB', 'PostgreSQL', 'AWS', 'RESTful APIs', 'Generative AI'
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-primary/10 to-neon-secondary/10 border border-neon-primary/20 text-neon-primary text-sm font-medium hover:border-neon-primary/50 transition-all cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
