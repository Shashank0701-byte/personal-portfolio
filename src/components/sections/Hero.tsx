import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import CosmicBackground from '../ui/CosmicBackground';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const itemTransition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
    >
      {/* --- 1. COSMIC BACKGROUND BASE --- 
          This provides the nebula image and the blending edges. 
          It sits at z-index -50 so everything else floats on top.
      */}
      <CosmicBackground variant="hero" />

      {/* --- 2. EXISTING WATERMARK PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-32 rotate-12">
            {['design', 'code', 'develop', 'deploy', 'stack', 'web', 'build', 'create'].map((word, i) => (
              <motion.div
                key={word}
                className="text-6xl font-bold text-white"
                style={{ writingMode: 'vertical-rl' }}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <motion.div
        className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 relative z-30">
            <motion.div variants={itemVariants} transition={itemTransition}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Hello
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                I'm <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Shashank Chakraborty</span>
              </h3>
            </motion.div>

            <motion.div variants={itemVariants} transition={itemTransition}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                <span className="text-white drop-shadow-2xl">FULLSTACK</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">WEB</span>
                <br />
                <span className="text-white drop-shadow-2xl">DEVELOPER</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              transition={itemTransition}
              className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
            >
              I am a passionate and creative Full Stack Developer with experience in creating
              highly polished Interfaces for the web & mobile.
            </motion.p>
          </div>

          {/* Right Column - 3D Shapes */}
          <div className="relative h-96 lg:h-[500px] hidden lg:block">
            {/* Torus */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 rounded-full border-4 border-white/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            {/* Rounded Rectangle */}
            <motion.div
              className="absolute top-20 left-10 w-24 h-32 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm"
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Sphere */}
            <motion.div
              className="absolute bottom-20 right-20 w-24 h-24 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Small Pill */}
            <motion.div
              className="absolute top-10 right-32 w-16 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              animate={{
                rotate: [0, 180, 360],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Right - Social Icons */}
      <motion.div
        className="absolute bottom-12 right-6 lg:right-12 z-30 flex flex-col gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200"
        >
          <Github size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200"
        >
          <Instagram size={24} />
        </a>
      </motion.div>
    </section>
  );
};