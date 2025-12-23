import { motion } from 'framer-motion';
import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { skillsByCategory } from '../../data/skills';

const categoryLabels = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  database: 'Databases',
  tool: 'Tools & Technologies',
};

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
    return IconComponent;
  };

  return (
    <section
      id="skills"
      className="relative py-section-lg min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-section font-bold mb-4">
            My <GlowEffect color="secondary">Skills</GlowEffect>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </ScrollReveal>

        {/* Skills by Category */}
        <div className="space-y-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <ScrollReveal
              key={category}
              delay={categoryIndex * 0.1}
              direction="up"
            >
              <div>
                <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {categorySkills.map((skill, index) => {
                    const IconComponent = getIcon(skill.icon);
                    const isHovered = hoveredSkill === skill.name;
                    
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="perspective-1000"
                      >
                        <Card
                          hover={false}
                          className="h-full flex flex-col items-center justify-center p-6 cursor-pointer group relative overflow-hidden"
                        >
                          <motion.div
                            className="mb-4 relative z-10"
                            animate={{
                              rotateY: isHovered ? 360 : 0,
                              scale: isHovered ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <IconComponent
                              size={40}
                              className={`transition-colors ${
                                isHovered
                                  ? 'text-neon-primary text-glow-sm'
                                  : 'text-gray-400 group-hover:text-neon-primary'
                              }`}
                            />
                          </motion.div>
                          
                          <h4 className="text-sm font-semibold text-center mb-2">
                            {skill.name}
                          </h4>
                          
                          {skill.proficiency && (
                            <div className="w-full bg-dark-surface rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-neon-primary to-neon-secondary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

