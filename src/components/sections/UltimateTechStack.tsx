import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    Atom,
    FileCode2,
    Triangle,
    Wind,
    Sparkles,
    Hexagon,
    Server,
    Box,
    Beaker,
    Database,
    Leaf,
    Container,
    Cloud,
    GitBranch,
    Github,
    Send,
    Code2,
    Zap,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CosmicBackground from "../ui/CosmicBackground";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TechItem {
    name: string;
    icon: any;
    color: string;
    glow: string;
    isPrimary?: boolean; // Flag for primary stack technologies
}

interface TechCategory {
    title: string;
    description: string;
    color: string;
    items: TechItem[];
}

const techCategories: TechCategory[] = [
    {
        title: "Frontend Development",
        description: "Production-ready UI with React ecosystem — used in all client projects",
        color: "cyan",
        items: [
            { name: "React", icon: Atom, color: "text-cyan-400", glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]", isPrimary: true },
            { name: "TypeScript", icon: FileCode2, color: "text-blue-500", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]" },
            { name: "Next.js", icon: Triangle, color: "text-white", glow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]", isPrimary: true },
            { name: "Tailwind CSS", icon: Wind, color: "text-cyan-300", glow: "group-hover:shadow-[0_0_40px_rgba(103,232,249,0.8)]", isPrimary: true },
            { name: "Framer Motion", icon: Sparkles, color: "text-purple-400", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]" },
        ],
    },
    {
        title: "Backend Development",
        description: "Scalable APIs and server-side logic — Node.js for all backend services",
        color: "green",
        items: [
            { name: "Node.js", icon: Hexagon, color: "text-green-500", glow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]", isPrimary: true },
            { name: "Express.js", icon: Server, color: "text-gray-400", glow: "group-hover:shadow-[0_0_40px_rgba(156,163,175,0.8)]", isPrimary: true },
            { name: "Python", icon: Box, color: "text-yellow-300", glow: "group-hover:shadow-[0_0_30px_rgba(253,224,71,0.6)]" },
            { name: "Flask", icon: Beaker, color: "text-gray-300", glow: "group-hover:shadow-[0_0_30px_rgba(209,213,219,0.6)]" },
            { name: "REST APIs", icon: Zap, color: "text-green-400", glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]" },
        ],
    },
    {
        title: "Databases & Storage",
        description: "MongoDB for flexible schemas, PostgreSQL for relational data",
        color: "purple",
        items: [
            { name: "PostgreSQL", icon: Database, color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]" },
            { name: "MongoDB", icon: Leaf, color: "text-green-400", glow: "group-hover:shadow-[0_0_40px_rgba(74,222,128,0.8)]", isPrimary: true },
        ],
    },
    {
        title: "DevOps & Cloud",
        description: "Containerized deployments with Docker, hosted on AWS infrastructure",
        color: "orange",
        items: [
            { name: "Docker", icon: Container, color: "text-blue-300", glow: "group-hover:shadow-[0_0_30px_rgba(147,197,253,0.6)]" },
            { name: "AWS", icon: Cloud, color: "text-orange-400", glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.6)]" },
            { name: "Git", icon: GitBranch, color: "text-red-500", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]" },
        ],
    },
    {
        title: "Tools & Workflow",
        description: "Daily development tools for efficient, collaborative workflows",
        color: "pink",
        items: [
            { name: "GitHub", icon: Github, color: "text-purple-300", glow: "group-hover:shadow-[0_0_30px_rgba(216,180,254,0.6)]" },
            { name: "Postman", icon: Send, color: "text-orange-500", glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]" },
            { name: "VS Code", icon: Code2, color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]" },
        ],
    },
];

export function UltimateTechStack() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const categoryColorMap: Record<string, string> = {
        cyan: "from-cyan-500/10 to-cyan-600/5",
        green: "from-green-500/10 to-green-600/5",
        purple: "from-purple-500/10 to-purple-600/5",
        orange: "from-orange-500/10 to-orange-600/5",
        pink: "from-pink-500/10 to-pink-600/5",
    };

    const categoryBorderMap: Record<string, string> = {
        cyan: "border-cyan-500/20",
        green: "border-green-500/20",
        purple: "border-purple-500/20",
        orange: "border-orange-500/20",
        pink: "border-pink-500/20",
    };

    const categoryAccentMap: Record<string, string> = {
        cyan: "bg-cyan-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
        pink: "bg-pink-500",
    };

    return (
        <section
            className="relative min-h-screen w-full overflow-hidden py-24 text-white"
            onMouseMove={handleMouseMove}
        >
            {/* Cosmic Background */}
            <CosmicBackground variant="hero" />

            {/* Mouse Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-20 opacity-0 transition-opacity duration-300 hover:opacity-100 mix-blend-screen"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15), 
              rgba(139, 92, 246, 0.08), 
              transparent 70%
            )
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-30 mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 shadow-cyan-500/50 drop-shadow-md mb-3">
                        02. TECHNICAL SKILLS
                    </h2>
                    <h3 className="text-4xl font-black tracking-tight text-white sm:text-5xl drop-shadow-lg mb-4">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Tech Stack</span>
                    </h3>
                    <p className="mx-auto max-w-2xl text-lg text-slate-300/90 mb-2">
                        Production-ready tools organized by purpose. Core stack highlighted below.
                    </p>
                    <p className="mx-auto max-w-xl text-sm text-slate-400 italic">
                        Primary: React • Next.js • Tailwind • Node.js • Express • MongoDB
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="space-y-12">
                    {techCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        >
                            {/* Category Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn("h-1 w-12 rounded-full", categoryAccentMap[category.color])} />
                                    <h4 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                                        {category.title}
                                    </h4>
                                </div>
                                <p className="text-sm text-slate-400 ml-15">
                                    {category.description}
                                </p>
                            </div>

                            {/* Skills Grid */}
                            <div className={cn(
                                "p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300",
                                `bg-gradient-to-br ${categoryColorMap[category.color]}`,
                                categoryBorderMap[category.color],
                                "hover:border-opacity-40"
                            )}>
                                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {category.items.map((tech, index) => (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className={cn(
                                                "group relative flex flex-col items-center justify-center gap-4 rounded-xl border p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                                                tech.isPrimary
                                                    ? "border-white/10 bg-slate-900/40 hover:border-white/30 hover:bg-slate-900/60"
                                                    : "border-white/5 bg-slate-900/30 hover:border-white/20 hover:bg-slate-900/50"
                                            )}
                                        >
                                            {/* Primary Stack Indicator - Subtle Ring */}
                                            {tech.isPrimary && (
                                                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-50 -z-10" />
                                            )}

                                            {/* Card Hover Gradient */}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 -z-10 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent",
                                                    tech.glow
                                                )}
                                            />

                                            {/* Icon Container */}
                                            <div className={cn(
                                                "relative rounded-full bg-white/5 ring-1 transition-all duration-500 group-hover:ring-2 shadow-lg",
                                                tech.isPrimary ? "p-3.5 ring-white/15" : "p-3 ring-white/10",
                                                tech.color.replace('text-', 'ring-'),
                                                "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            )}>
                                                <tech.icon
                                                    size={tech.isPrimary ? 30 : 28}
                                                    strokeWidth={tech.isPrimary ? 1.75 : 1.5}
                                                    className={cn("transition-all duration-300 group-hover:scale-110", tech.color, "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")}
                                                />
                                            </div>

                                            {/* Tech Name */}
                                            <span className={cn(
                                                "text-sm tracking-wide text-center transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]",
                                                tech.isPrimary ? "font-bold text-slate-200" : "font-semibold text-slate-300"
                                            )}>
                                                {tech.name}
                                            </span>
                                        </motion.div>
                                    ))}
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
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-slate-400 italic max-w-2xl mx-auto drop-shadow-lg">
                        "I reach for boring, proven tools — so users don't feel the complexity."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}