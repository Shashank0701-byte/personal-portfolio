import { motion } from 'framer-motion';

export const OrbitingKeywords = () => {
  return (
    <div className="relative max-w-2xl">
      {/* Subtle vertical line anchor */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-primary/30 to-transparent" />

      {/* Main Content */}
      <motion.div
        className="pl-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        layout={false}
      >
        {/* Headline */}
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
          I build products — not demos.
        </h3>

        {/* Supporting text */}
        <div className="space-y-3 text-base md:text-lg text-gray-400 leading-relaxed">
          <p>I care about how software feels in the hands of real users.</p>
          <p>Performance, clarity, accessibility, and reliability come first.</p>
          <p>Design and engineering work together — not separately.</p>
        </div>
      </motion.div>

      {/* Quiet gradient glow behind text */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-neon-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
