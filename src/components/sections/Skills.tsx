import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { primarySkills, supportingSkills } from '../../data/skills';
import type { PrimarySkill } from '../../data/skills';

export const Skills = () => {
  const [activeSkill, setActiveSkill] = useState<PrimarySkill>(primarySkills[0]);
  const [hoveredSupportingSkill, setHoveredSupportingSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
    return IconComponent;
  };

  const getSupportingSkillsForActive = () => {
    const allSupporting = supportingSkills.filter(skill =>
      activeSkill.supportingSkills?.includes(skill.name)
    );
    // Show only first 4 supporting skills
    return allSupporting.slice(0, 4);
  };

  const isSupportingSkillRelevant = (skillName: string) => {
    return activeSkill.supportingSkills?.includes(skillName);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-section-lg min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-neon-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neon-primary/3 via-transparent to-neon-secondary/3 rounded-full blur-3xl" />
      </motion.div>

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
              02. SKILLS
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My <GlowEffect color="secondary">Skills</GlowEffect>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-primary to-neon-secondary mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A focused approach to technology, emphasizing depth over breadth
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Main Skills Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Active Skill Focus */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-8">
              {/* Primary Skills Selector */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {primarySkills.map((skill, index) => {
                  const IconComponent = getIcon(skill.icon);
                  const isActive = activeSkill.name === skill.name;

                  return (
                    <motion.button
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 100
                      }}
                      onClick={() => setActiveSkill(skill)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'border-neon-primary bg-neon-primary/10 scale-110'
                          : 'border-white/10 bg-white/5 hover:border-neon-primary/50 hover:bg-neon-primary/5'
                      }`}
                      whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent
                        size={24}
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-neon-primary' : 'text-gray-400'
                        }`}
                      />
                      <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${
                        isActive ? 'bg-neon-primary/5' : 'group-hover:opacity-100 bg-neon-primary/5'
                      }`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Skill Details */}
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 border border-neon-primary/30 mb-6"
                  >
                    {(() => {
                      const IconComponent = getIcon(activeSkill.icon);
                      return <IconComponent size={40} className="text-neon-primary" />;
                    })()}
                  </motion.div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {activeSkill.name}
                  </h3>

                  <blockquote className="text-lg text-neon-primary font-medium italic mb-6 border-l-4 border-neon-primary/50 pl-4">
                    "{activeSkill.belief}"
                  </blockquote>

                  <p className="text-xl text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                    {activeSkill.longDescription}
                  </p>

                  {/* Proof Points */}
                  <div className="space-y-3">
                    {activeSkill.proof.map((proof, index) => (
                      <motion.div
                        key={proof}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-neon-primary rounded-full flex-shrink-0" />
                        <span className="text-gray-300">{proof}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column - Supporting Skills */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">Supporting Skills</h4>
                <p className="text-gray-400">Tools and concepts that enable {activeSkill.name} mastery</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {getSupportingSkillsForActive().map((skill, index) => {
                  const IconComponent = getIcon(skill.icon);

                  return (
                    <motion.div
                      key={`${activeSkill.name}-${skill.name}`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 100
                      }}
                      className="group"
                    >
                      <Card className="h-full p-4 hover:border-neon-primary/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-primary/30 transition-colors">
                            <IconComponent size={16} className="text-gray-400 group-hover:text-neon-primary transition-colors" />
                          </div>
                          <h5 className="text-sm font-semibold text-white group-hover:text-neon-primary transition-colors">
                            {skill.name}
                          </h5>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {skill.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Summary */}
        <ScrollReveal direction="up" delay={0.8} className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-neon-primary/10 via-neon-secondary/10 to-neon-accent/10 border-neon-primary/30">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Depth Over Breadth
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                  I focus on mastering core technologies while staying curious about emerging tools.
                  This approach ensures I can build robust, scalable solutions while continuously evolving.
                </p>
                <div className="flex items-center justify-center gap-12 pt-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
                      {primarySkills.length}
                    </div>
                    <div className="text-sm text-gray-400">Core Technologies</div>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-secondary to-neon-accent bg-clip-text text-transparent">
                      {supportingSkills.length}
                    </div>
                    <div className="text-sm text-gray-400">Supporting Skills</div>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-accent to-neon-primary bg-clip-text text-transparent">
                      100%
                    </div>
                    <div className="text-sm text-gray-400">Dedication</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
