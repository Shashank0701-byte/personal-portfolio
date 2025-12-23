import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section
      id="projects"
      className="relative py-section-lg min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-section font-bold mb-4">
            Featured <GlowEffect color="accent">Projects</GlowEffect>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of projects I've built with passion and attention to detail.
          </p>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.1}
              direction="up"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card
                  className="h-full flex flex-col cursor-pointer group overflow-hidden"
                  onClick={() => openModal(project)}
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 group-hover:from-neon-primary/30 group-hover:to-neon-secondary/30 transition-all">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-4xl font-bold text-white/20 group-hover:text-white/40 transition-colors"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        {project.title.charAt(0)}
                      </motion.span>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-neon-primary/10 text-neon-primary border border-neon-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View More */}
                    <div className="flex items-center text-neon-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>View Details</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:max-h-[90vh] z-50 overflow-y-auto"
            >
              <div className="glass-strong rounded-2xl p-6 md:p-8 h-full">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-neon-primary/20 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Modal Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-400">{selectedProject.longDescription}</p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-neon-primary/10 text-neon-primary border border-neon-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <ChevronRight size={20} className="text-neon-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-primary to-neon-secondary text-white font-semibold hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} />
                        Live Demo
                      </motion.a>
                    )}
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg glass border border-white/20 hover:border-neon-primary/50 text-white font-semibold hover:scale-105 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

