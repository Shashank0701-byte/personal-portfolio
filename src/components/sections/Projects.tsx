import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Card } from '../ui/Card';
import { GlowEffect } from '../ui/GlowEffect';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import CosmicBackground from "../ui/CosmicBackground";

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
      className="relative py-24 min-h-screen flex items-center"
    >
      {/* --- 1. COSMIC BACKGROUND --- 
          Variant 'projects' uses a dark, abstract fluid texture perfect for grids.
      */}
      <CosmicBackground variant="projects" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-12" />

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Featured <GlowEffect color="accent">Projects</GlowEffect>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
                {/* UPDATED CARD STYLE: 
                   - Removed solid bg, added transparent bg-slate-900/40
                   - Added backdrop-blur-md for the "Glass" effect
                   - Added border-white/10 for subtlety
                */}
                <Card
                  className="h-full flex flex-col cursor-pointer group overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
                  onClick={() => openModal(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/5">

                    {project.imageUrl ? (
                      <>
                        {/* Actual Project Image */}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={false}
                        />
                      </>
                    ) : (
                      <>
                        {/* Fallback: Placeholder Icon/Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            className="text-6xl font-black text-white/5 group-hover:text-cyan-400/20 transition-colors duration-500"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                          >
                            {project.title.charAt(0)}
                          </motion.span>
                        </div>

                        {/* Gradient Overlay on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={false}
                        />
                      </>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col p-2">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-cyan-950/30 text-cyan-300 border border-cyan-500/20 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800/50 text-slate-400 border border-white/10">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View More Link */}
                    <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all mt-auto">
                      <span>View Details</span>
                      <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:max-h-[90vh] w-full z-50 overflow-y-auto"
            >
              {/* Modal Container: Solid Dark Glass */}
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 h-full shadow-2xl relative">

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>

                {/* Modal Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl font-bold mb-3 text-white">{selectedProject.title}</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{selectedProject.longDescription}</p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-md bg-slate-800 text-cyan-200 border border-white/10 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-purple-500 mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <ChevronRight size={18} className="text-cyan-500 mt-1 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-lg shadow-cyan-900/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={20} />
                        Live Demo
                      </motion.a>
                    )}
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-white/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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