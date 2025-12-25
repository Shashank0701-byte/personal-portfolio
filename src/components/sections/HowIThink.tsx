import { motion } from 'framer-motion';

export const HowIThink = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25 }}
                    layout={false}
                >
                    {/* Headline */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        How I think when building products
                    </h2>

                    {/* Principles - Tight spacing, no bullets */}
                    <div className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed">
                        <p>
                            Performance over polish — fast software feels better than flashy software.
                        </p>
                        <p>
                            Clarity over cleverness — readable systems scale further than smart tricks.
                        </p>
                        <p>
                            Users before abstractions — architecture exists to serve people, not frameworks.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
