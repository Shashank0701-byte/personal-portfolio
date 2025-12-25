import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';

interface Tool {
    name: string;
    icon: string;
    color: string;
}

const tools: Tool[] = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
    { name: 'Next.js', icon: '▲', color: '#FFFFFF' },
    { name: 'Tailwind', icon: '🌊', color: '#06B6D4' },
    { name: 'Framer Motion', icon: '✨', color: '#0055FF' },
    { name: 'Node.js', icon: '⬢', color: '#339933' },
    { name: 'Express', icon: '⚡', color: '#FFFFFF' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Flask', icon: '⚗️', color: '#FFFFFF' },
    { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Git', icon: '📌', color: '#F05032' },
    { name: 'GitHub', icon: '🐙', color: '#FFFFFF' },
    { name: 'Postman', icon: '📮', color: '#FF6C37' },
];

export const TechStackGrid = () => {
    return (
        <section
            id="stack"
            className="relative py-32 md:py-40 overflow-hidden"
        >
            {/* Subtle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-neon-primary/2 via-transparent to-neon-secondary/2 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-mono text-neon-primary/70 tracking-wider uppercase mb-2">
                        02. MY STACK
                    </h2>
                    <p className="text-sm text-gray-500">
                        Tools I use in production
                    </p>
                </motion.div>

                {/* Spotlight Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.03,
                            }}
                        >
                            <SpotlightCard>
                                <div className="flex flex-col items-center gap-3 text-center">
                                    {/* Icon */}
                                    <div
                                        className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            color: tool.color,
                                            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.4))'
                                        }}
                                    >
                                        {tool.icon}
                                    </div>

                                    {/* Name */}
                                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                        {tool.name}
                                    </span>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                {/* Micro-copy */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-center text-sm text-gray-500 italic max-w-2xl mx-auto"
                >
                    I reach for boring, proven tools — so users don't feel the complexity.
                </motion.p>
            </div>
        </section>
    );
};
