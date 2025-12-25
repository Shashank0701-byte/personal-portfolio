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
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const techStack = [
    { name: "React", icon: Atom, color: "text-cyan-400", glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]" },
    { name: "TypeScript", icon: FileCode2, color: "text-blue-500", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]" },
    { name: "Next.js", icon: Triangle, color: "text-white", glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]" },
    { name: "Tailwind", icon: Wind, color: "text-cyan-300", glow: "group-hover:shadow-[0_0_30px_rgba(103,232,249,0.6)]" },
    { name: "Framer Motion", icon: Sparkles, color: "text-purple-400", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]" },
    { name: "Node.js", icon: Hexagon, color: "text-green-500", glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]" },
    { name: "Express", icon: Server, color: "text-gray-400", glow: "group-hover:shadow-[0_0_30px_rgba(156,163,175,0.6)]" },
    { name: "Python", icon: Box, color: "text-yellow-300", glow: "group-hover:shadow-[0_0_30px_rgba(253,224,71,0.6)]" },
    { name: "Flask", icon: Beaker, color: "text-gray-300", glow: "group-hover:shadow-[0_0_30px_rgba(209,213,219,0.6)]" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.6)]" },
    { name: "MongoDB", icon: Leaf, color: "text-green-400", glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]" },
    { name: "Docker", icon: Container, color: "text-blue-300", glow: "group-hover:shadow-[0_0_30px_rgba(147,197,253,0.6)]" },
    { name: "AWS", icon: Cloud, color: "text-orange-400", glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.6)]" },
    { name: "Git", icon: GitBranch, color: "text-red-500", glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]" },
    { name: "GitHub", icon: Github, color: "text-purple-300", glow: "group-hover:shadow-[0_0_30px_rgba(216,180,254,0.6)]" },
    { name: "Postman", icon: Send, color: "text-orange-500", glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]" },
];

// Placeholder Aurora Image - Feel free to replace with your own!
const AURORA_IMAGE_URL = "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function UltimateTechStack() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative min-h-screen w-full overflow-hidden py-24 text-white"
            onMouseMove={handleMouseMove}
            // Keep the mask for perfect edge blending into your main background
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
            }}
        >
            {/* ------------------------------------------------------------
        LAYER 1: The Aurora Image Background (Z-Index 0)
        ------------------------------------------------------------
      */}
            <div className="absolute inset-0 z-0">
                {/* The Image */}
                <img
                    src={AURORA_IMAGE_URL}
                    alt="Aurora Background"
                    className="h-full w-full object-cover object-center opacity-60"
                />
                {/* A dark overlay to ensure text readability and blending */}
                <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
            </div>


            {/* ------------------------------------------------------------
        LAYER 2: The Scrolling Code (Z-Index 10)
        ------------------------------------------------------------
      */}
            <div className="absolute inset-0 z-10 opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: "-50%" }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-full text-xs font-mono text-cyan-300/50 whitespace-pre leading-relaxed select-none"
                >
                    {Array(30).fill(`import React, { useState } from 'react';\n// Initiating warp drive sequences...\nconst Universe = () => {\n  const [stars, setStars] = useState([]);\n  return <div className="cosmos">{stars.map(s => <Star />)}</div>\n};\nexport default Universe;\n`).join('\n')}
                </motion.div>
            </div>

            {/* ------------------------------------------------------------
        LAYER 3: The Mouse Spotlight (Z-Index 20)
        ------------------------------------------------------------
      */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.2), 
              rgba(139, 92, 246, 0.1), 
              transparent 70%
            )
          `,
                }}
            />

            {/* ------------------------------------------------------------
        LAYER 4: Content Grid (Z-Index 30)
        ------------------------------------------------------------
      */}
            <div className="relative z-30 mx-auto max-w-7xl px-6">
                {/* Header section remains the same... */}
                <div className="mb-16 text-center">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 shadow-cyan-500/50 drop-shadow-md">
                        02. My Stack
                    </h2>
                    <h3 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl drop-shadow-lg">
                        Technologies I Use
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300/80">
                        I build with tools that prioritize performance and developer experience.
                    </p>
                </div>

                {/* Grid section remains the same... */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-transparent p-8 transition-all duration-300 hover:scale-[1.05] hover:border-white/10 hover:bg-white/5 hover:shadow-2xl"
                        >
                            {/* Card Hover Gradient Background */}
                            <div
                                className={cn(
                                    "absolute inset-0 -z-10 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent",
                                    tech.glow
                                )}
                            />

                            {/* Icon Container */}
                            <div className={cn(
                                "relative p-4 rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-2 shadow-lg",
                                tech.color.replace('text-', 'ring-'),
                                "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            )}>
                                <tech.icon
                                    size={32}
                                    strokeWidth={1.5}
                                    className={cn("transition-all duration-300 group-hover:scale-110", tech.color, "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")}
                                />
                            </div>

                            {/* Tech Name */}
                            <span className="font-semibold tracking-wide text-slate-300 transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}