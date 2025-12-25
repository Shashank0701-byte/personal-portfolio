import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import CosmicBackground from '../ui/CosmicBackground';
import { useState } from 'react';

export const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
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

      {/* --- 2. AMBIENT COSMIC TEXT PATTERN --- 
          Subtle atmospheric element - like cosmic dust or distant signals
          Barely readable, slow-moving, blends with background
      */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-48 rotate-12 blur-[2px]">
            {['design', 'code', 'develop', 'deploy', 'stack', 'web', 'build', 'create'].map((word, i) => (
              <motion.div
                key={word}
                className="text-5xl font-light text-cyan-300"
                style={{ writingMode: 'vertical-rl', letterSpacing: '0.3em' }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
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

          {/* Right Column - Profile Photo */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            variants={itemVariants}
            transition={itemTransition}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Animated Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Photo Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 bg-slate-900 shadow-2xl hover:border-cyan-500/30 transition-all duration-500 group">
                {/* 
                  TO ADD YOUR PHOTO:
                  1. Place your photo in the public folder (e.g., public/profile-hero.jpg)
                  2. Update the src below to "/profile-hero.jpg"
                  3. Recommended: Use a professional, approachable photo
                  4. Image should be square (1:1 aspect ratio) for best results
                */}
                <img
                  src="/profile-hero.jpeg"
                  alt="Shashank Chakraborty - Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    filter: 'brightness(1.1) contrast(1.15)',
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                />

                {/* Placeholder Gradient (only shows when image not loaded) */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="text-5xl">👤</span>
                      </div>
                      <p className="text-white/40 text-sm font-mono">Add your photo</p>
                      <p className="text-white/20 text-xs font-mono mt-1">/profile-hero.jpg</p>
                    </div>
                  </div>
                )}

                {/* Inner shadow overlay for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none rounded-full" />

                {/* Subtle border highlight on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-500" />
              </div>

              {/* Floating particles around photo */}
              <motion.div
                className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-cyan-400/60 blur-sm"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-2 h-2 rounded-full bg-purple-400/60 blur-sm"
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
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