import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, HardDrive } from 'lucide-react';
import CosmicBackground from '../ui/CosmicBackground';

interface SystemProject {
    title: string;
    subtitle: string;
    scope: string; // One-line scope clarifier
    icon: any;
    description: string[];
    concepts: string[];
    githubUrl: string;
    color: string;
}

const systemsProjects: SystemProject[] = [
    {
        title: "CoreX OS - A Custom x86 Operating System",
        subtitle: "C, x86 Assembly",
        scope: "Single-core, educational OS",
        icon: Cpu,
        description: [
            "Built a minimal x86 operating system from scratch",
            "Implemented bootloader, memory setup, and basic kernel routines",
            "Focused on understanding OS boot process, low-level memory, and hardware interaction"
        ],
        concepts: ["Bootloader", "Memory Management", "Kernel Development", "x86 Architecture"],
        githubUrl: "https://github.com/Shashank0701-byte/CoreX",
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "myshell",
        subtitle: "C, Unix System Calls",
        scope: "POSIX-style shell (subset)",
        icon: Terminal,
        description: [
            "Implemented command parsing, process forking, piping, and I/O redirection",
            "Worked extensively with Unix system calls and process lifecycle",
            "Strengthened understanding of operating system abstractions"
        ],
        concepts: ["Process Management", "System Calls", "I/O Redirection", "Piping"],
        githubUrl: "https://github.com/Shashank0701-byte/myshell",
        color: "from-blue-500/20 to-cyan-500/20"
    }
];

export const SystemsProjects = () => {
    return (
        <section className="relative py-20 min-h-screen flex items-center">
            {/* Cosmic Background - Same as Projects section */}
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
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <HardDrive size={20} className="text-slate-400" />
                        <h2 className="text-sm font-mono text-slate-400 tracking-wider uppercase">
                            Systems & Low-Level Projects
                        </h2>
                    </div>

                    {/* Bridge Text */}
                    <p className="text-slate-400 text-sm max-w-3xl mb-3 italic">
                        Beyond full-stack applications, I enjoy exploring how software works at the operating system and hardware level.
                    </p>

                    <p className="text-slate-300 text-sm max-w-3xl">
                        Foundational work exploring OS internals, process management, and Unix systems.
                        Built for learning and understanding how software interacts with hardware.
                    </p>
                </motion.div>

                {/* Projects List */}
                <div className="space-y-6">
                    {systemsProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-6 rounded-lg border border-white/5 bg-slate-900/30 hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300">
                                {/* Subtle gradient background */}
                                <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                                            <project.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title & Subtitle */}
                                        <div className="mb-3">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs font-mono text-slate-400 mb-1">
                                                {project.subtitle}
                                            </p>
                                            {/* Scope Clarifier */}
                                            <p className="text-xs text-slate-500 italic">
                                                {project.scope}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <ul className="space-y-1.5 mb-4">
                                            {project.description.map((point, i) => (
                                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                                    <span className="text-slate-500 mt-0.1 flex-shrink-0">•</span>
                                                    <span className="flex-1">{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Concepts Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.concepts.map((concept) => (
                                                <span
                                                    key={concept}
                                                    className="px-2 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded text-slate-300"
                                                >
                                                    {concept}
                                                </span>
                                            ))}
                                        </div>

                                        {/* GitHub Link - Enhanced */}
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors group/link underline decoration-slate-600 hover:decoration-cyan-400 underline-offset-4"
                                        >
                                            <span className="font-semibold">View Repository</span>
                                            <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
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
                        These projects demonstrate systems-level understanding and engineering fundamentals
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
