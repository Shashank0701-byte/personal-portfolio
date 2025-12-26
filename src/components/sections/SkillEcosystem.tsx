import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillNode {
    name: string;
    description?: string;
    color: string;
    glow: string;
}

interface TreeLevel {
    title: string;
    subtitle: string;
    items: SkillNode[];
    color: string;
}

const skillTree: TreeLevel[] = [
    {
        title: "Roots",
        subtitle: "Foundational Concepts",
        color: "from-amber-600 to-orange-700",
        items: [
            { name: "Problem Solving", description: "Breaking down complex challenges", color: "bg-amber-500/20", glow: "shadow-amber-500/30" },
            { name: "Algorithms & DS", description: "Efficient data structures", color: "bg-orange-500/20", glow: "shadow-orange-500/30" },
            { name: "System Design", description: "Scalable architecture", color: "bg-amber-600/20", glow: "shadow-amber-600/30" },
            { name: "Clean Code", description: "Maintainable patterns", color: "bg-orange-600/20", glow: "shadow-orange-600/30" },
        ],
    },
    {
        title: "Trunk",
        subtitle: "Core Competencies",
        color: "from-cyan-500 to-blue-600",
        items: [
            { name: "JavaScript", description: "Modern ES6+ features", color: "bg-yellow-500/20", glow: "shadow-yellow-500/30" },
            { name: "TypeScript", description: "Type-safe development", color: "bg-blue-500/20", glow: "shadow-blue-500/30" },
            { name: "React", description: "Component architecture", color: "bg-cyan-500/20", glow: "shadow-cyan-500/30" },
            { name: "Node.js", description: "Server-side runtime", color: "bg-green-500/20", glow: "shadow-green-500/30" },
        ],
    },
    {
        title: "Branches",
        subtitle: "Domain Expertise",
        color: "from-green-500 to-emerald-600",
        items: [
            { name: "Frontend", description: "UI/UX implementation", color: "bg-cyan-400/20", glow: "shadow-cyan-400/30" },
            { name: "Backend", description: "APIs & business logic", color: "bg-green-400/20", glow: "shadow-green-400/30" },
            { name: "AI Integration", description: "LLMs & RAG systems", color: "bg-purple-400/20", glow: "shadow-purple-400/30" },
            { name: "DevOps", description: "CI/CD & deployment", color: "bg-orange-400/20", glow: "shadow-orange-400/30" },
        ],
    },
    {
        title: "Leaves",
        subtitle: "Tools & Technologies",
        color: "from-emerald-400 to-green-500",
        items: [
            { name: "Next.js", color: "bg-white/10", glow: "shadow-white/20" },
            { name: "Tailwind", color: "bg-cyan-300/20", glow: "shadow-cyan-300/30" },
            { name: "Express", color: "bg-gray-300/20", glow: "shadow-gray-300/30" },
            { name: "PostgreSQL", color: "bg-blue-400/20", glow: "shadow-blue-400/30" },
            { name: "MongoDB", color: "bg-green-400/20", glow: "shadow-green-400/30" },
            { name: "Docker", color: "bg-blue-300/20", glow: "shadow-blue-300/30" },
            { name: "AWS", color: "bg-orange-400/20", glow: "shadow-orange-400/30" },
            { name: "Git", color: "bg-red-400/20", glow: "shadow-red-400/30" },
        ],
    },
];

export const SkillEcosystem = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section className="relative py-32 overflow-hidden bg-slate-950">
            {/* Cosmic Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        How My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Stack Grows</span>
                    </h3>
                    <p className="text-sm text-slate-400 max-w-2xl mx-auto italic">
                        A visual metaphor: from foundational concepts to specialized tools
                    </p>
                </motion.div>

                {/* Desktop Tree View */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connecting Lines - Trunk */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                            <defs>
                                <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="rgb(251, 146, 60)" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            {/* Vertical trunk line */}
                            <line x1="50%" y1="15%" x2="50%" y2="85%" stroke="url(#trunkGradient)" strokeWidth="3" strokeDasharray="5,5" opacity="0.4" />
                        </svg>

                        {/* Tree Levels */}
                        <div className="space-y-20 relative z-10">
                            {skillTree.map((level, levelIndex) => (
                                <motion.div
                                    key={level.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: levelIndex * 0.15 }}
                                    className="relative"
                                >
                                    {/* Level Header */}
                                    <div className="text-center mb-8">
                                        <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${level.color} bg-opacity-20 border border-white/10 backdrop-blur-sm mb-2`}>
                                            <h4 className="text-lg font-bold text-white">{level.title}</h4>
                                        </div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">{level.subtitle}</p>
                                    </div>

                                    {/* Skills Grid */}
                                    <div className={`grid gap-4 ${level.title === 'Leaves' ? 'grid-cols-4 md:grid-cols-8' : 'grid-cols-2 md:grid-cols-4'
                                        } justify-items-center`}>
                                        {level.items.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                                onHoverStart={() => setHoveredSkill(skill.name)}
                                                onHoverEnd={() => setHoveredSkill(null)}
                                                className="group relative"
                                            >
                                                <div className={`
                          px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm
                          transition-all duration-300 cursor-pointer
                          ${skill.color}
                          hover:border-white/30 hover:scale-110 hover:${skill.glow}
                          ${hoveredSkill === skill.name ? 'ring-2 ring-white/20' : ''}
                        `}>
                                                    <p className="text-sm font-semibold text-white text-center whitespace-nowrap">
                                                        {skill.name}
                                                    </p>
                                                </div>

                                                {/* Tooltip on Hover */}
                                                {skill.description && hoveredSkill === skill.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-900 border border-white/20 rounded-lg shadow-xl z-50 whitespace-nowrap"
                                                    >
                                                        <p className="text-xs text-slate-300">{skill.description}</p>
                                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-l border-t border-white/20 rotate-45" />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Simplified View */}
                <div className="lg:hidden space-y-12">
                    {skillTree.map((level, levelIndex) => (
                        <motion.div
                            key={level.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: levelIndex * 0.1 }}
                            className="relative"
                        >
                            {/* Level Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${level.color}`} />
                                <div>
                                    <h4 className="text-lg font-bold text-white">{level.title}</h4>
                                    <p className="text-xs text-slate-500">{level.subtitle}</p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                                {level.items.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.03 }}
                                        className={`
                      px-3 py-2 rounded-lg border border-white/10 backdrop-blur-sm
                      ${skill.color}
                      transition-all duration-200
                    `}
                                    >
                                        <p className="text-xs font-medium text-white">{skill.name}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-xs text-slate-500 max-w-xl mx-auto">
                        Each layer builds upon the last — from engineering fundamentals to specialized tools, creating a cohesive full-stack skillset.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
