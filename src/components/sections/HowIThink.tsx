import { motion } from 'framer-motion';
import CosmicBackground from "../ui/CosmicBackground";

export const HowIThink = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* --- 1. COSMIC BACKGROUND --- 
                Variant 'about' (Starry Void) works best for text-heavy sections 
            */}
            <CosmicBackground variant="about" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">
                        How I think when <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">building products</span>
                    </h2>

                    {/* Principles - Wrapped in a Glass Card for readability */}
                    <div className="space-y-8 text-base md:text-xl leading-relaxed bg-slate-900/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 hover:border-white/20 transition-colors shadow-2xl">
                        <p className="text-slate-300 flex items-start gap-3">
                            <span className="text-cyan-400 font-semibold whitespace-nowrap">Performance over polish</span>
                            <span className="text-slate-500 hidden sm:inline">—</span>
                            <span className="opacity-90">fast software feels better than flashy software.</span>
                        </p>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                        <p className="text-slate-300 flex items-start gap-3">
                            <span className="text-purple-400 font-semibold whitespace-nowrap">Clarity over cleverness</span>
                            <span className="text-slate-500 hidden sm:inline">—</span>
                            <span className="opacity-90">readable systems scale further than smart tricks.</span>
                        </p>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                        <p className="text-slate-300 flex items-start gap-3">
                            <span className="text-pink-400 font-semibold whitespace-nowrap">Users before abstractions</span>
                            <span className="text-slate-500 hidden sm:inline">—</span>
                            <span className="opacity-90">architecture exists to serve people, not frameworks.</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};