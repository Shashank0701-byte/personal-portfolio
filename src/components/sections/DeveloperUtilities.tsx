import { motion } from 'framer-motion';
import { ExternalLink, Wrench, Code2 } from 'lucide-react';
import CosmicBackground from '../ui/CosmicBackground';

interface UtilityProject {
    title: string;
    subtitle: string;
    icon: any;
    description: string[];
    githubUrl: string;
    color: string;
}

const utilityProjects: UtilityProject[] = [
    {
        title: "Route-Linter",
        subtitle: "Python · CLI Tool",
        icon: Code2,
        description: [
            "Analyzes backend and frontend directories to detect route mismatches",
            "Maintains route consistency across full-stack codebases",
            "Provides lightweight command-line utility for developer workflows"
        ],
        githubUrl: "https://github.com/Shashank0701-byte/route-linter",
        color: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "Product Review Scraper",
        subtitle: "Python · Scrapy",
        icon: Code2,
        description: [
            "Scrapes product reviews from multiple e-commerce platforms",
            "Detects site structure and extracts ratings and metadata",
            "Supports extensibility across different website architectures"
        ],
        githubUrl: "https://github.com/Shashank0701-byte/product-review-scraper",
        color: "from-green-500/20 to-emerald-500/20"
    },
    {
        title: "Folder Monitor & File Organizer",
        subtitle: "Python · Automation",
        icon: Code2,
        description: [
            "Monitors Downloads directory continuously for new files",
            "Organizes files automatically by type and extension",
            "Reduces manual file management through background automation"
        ],
        githubUrl: "https://github.com/Shashank0701-byte/Files-Monitoring",
        color: "from-purple-500/20 to-pink-500/20"
    }
];

export const DeveloperUtilities = () => {
    return (
        <section className="relative py-16 min-h-screen flex items-center">
            {/* Cosmic Background - Same as other sections */}
            <CosmicBackground variant="projects" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Subtle Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-8" />

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Wrench size={20} className="text-slate-400" />
                        <h2 className="text-sm font-mono text-slate-400 tracking-wider uppercase">
                            Developer Utilities & Automation
                        </h2>
                    </div>

                    <p className="text-slate-300 text-sm max-w-3xl">
                        Practical Python tools built to improve developer workflows, automate repetitive tasks, and solve real-world scripting challenges.
                    </p>
                </motion.div>

                {/* Projects Grid - Compact 3-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {utilityProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-5 rounded-lg border border-white/5 bg-slate-900/30 hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                                {/* Subtle gradient background */}
                                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                                {/* Icon */}
                                <div className="mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                                        <project.icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <div className="mb-3">
                                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs font-mono text-slate-400">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {/* Description */}
                                <ul className="space-y-1.5 mb-4 flex-1">
                                    {project.description.map((point, i) => (
                                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                            <span className="text-slate-500 mt-0.5 flex-shrink-0">•</span>
                                            <span className="flex-1">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* GitHub Link */}
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors group/link underline decoration-slate-600 hover:decoration-cyan-400 underline-offset-4 mt-auto"
                                >
                                    <span className="font-semibold">View Repository</span>
                                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-slate-500 italic">
                        Lightweight utilities focused on developer productivity and workflow automation
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
