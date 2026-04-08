import { motion, useReducedMotion } from 'framer-motion';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const contourPaths = [
  'M0 188 C180 170 320 214 470 198 S760 150 930 176 S1220 226 1440 196',
  'M0 276 C140 254 300 310 470 286 S780 224 980 246 S1240 310 1440 282',
  'M0 370 C180 344 350 404 560 376 S900 302 1100 332 S1320 390 1440 360',
  'M0 472 C150 446 340 512 550 486 S860 410 1070 438 S1290 504 1440 470',
  'M0 592 C190 564 360 638 580 608 S900 528 1120 556 S1320 618 1440 584',
  'M0 720 C170 692 360 760 590 734 S940 650 1160 680 S1330 744 1440 714',
];

const nodes = [
  { top: '18%', left: '64%', delay: 0.4, duration: 4.6 },
  { top: '36%', left: '22%', delay: 1.2, duration: 5.1 },
  { top: '72%', left: '78%', delay: 0.9, duration: 5.8 },
];

function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let intervalId = 0;

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(255, 255, 255, 0.035)';

      const density = Math.floor((width * height) / 2200);
      for (let index = 0; index < density; index += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        context.fillRect(x, y, 1, 1);
      }
    };

    resize();
    draw();

    const handleResize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        resize();
        draw();
      });
    };

    window.addEventListener('resize', handleResize);
    intervalId = window.setInterval(draw, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(intervalId);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1] opacity-100" aria-hidden="true" />;
}

export const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  const itemTransition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#081018] pt-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#081018_0%,#09111a_52%,#0b131d_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.14,
          }}
        />

        <motion.div
          className="absolute left-[-12%] top-[2%] h-[42rem] w-[42rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.04) 28%, transparent 72%)',
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 54, 0], y: [0, -32, 0], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-8%] top-[12%] h-[34rem] w-[34rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.025) 34%, transparent 70%)',
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -46, 0], y: [0, 28, 0], scale: [1, 1.03, 1] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={shouldReduceMotion ? undefined : { y: [0, -36, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
            {contourPaths.map((path, index) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke="rgba(34, 211, 238, 0.07)"
                strokeWidth="1"
                opacity={1 - index * 0.08}
              />
            ))}
          </svg>
        </motion.div>

        {nodes.map((node, index) => (
          <div key={`${node.left}-${node.top}`} className="absolute z-[1]" style={{ top: node.top, left: node.left }}>
            <div className="h-1 w-1 rounded-full bg-cyan-300/80" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full border border-cyan-300/60"
              style={{ x: '-50%', y: '-50%' }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      width: [4, 34, 34],
                      height: [4, 34, 34],
                      opacity: [0.2, 0, 0],
                    }
              }
              transition={{
                duration: node.duration,
                repeat: Infinity,
                ease: 'easeOut',
                delay: node.delay + index * 0.2,
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.38)_64%,rgba(0,0,0,0.7)_100%)]" />
        <GrainOverlay />
      </div>

      <motion.div
        className="relative z-30 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative z-30 space-y-6">
            <motion.div
              variants={itemVariants}
              transition={itemTransition}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/45 px-4 py-2 backdrop-blur-md"
            >
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-sm text-cyan-300">Currently building AI-powered tools</span>
            </motion.div>

            <motion.div variants={itemVariants} transition={itemTransition}>
              <h2 className="mb-2 text-4xl font-bold text-white md:text-5xl">Hello, I&apos;m</h2>
              <h3 className="mb-8 text-3xl font-bold text-white md:text-4xl">
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  Shashank Chakraborty
                </span>
              </h3>
            </motion.div>

            <motion.div variants={itemVariants} transition={itemTransition}>
              <h1 className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl">
                <span>FULLSTACK</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  BACKEND
                </span>
                <br />
                <span>DEVELOPER</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} transition={itemTransition} className="space-y-4">
              <p className="max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                I build products that feel <span className="font-semibold text-white">fast</span>, look{' '}
                <span className="font-semibold text-white">polished</span>, and solve{' '}
                <span className="font-semibold text-white">real problems</span>. Currently exploring how AI can
                make development more intuitive.
              </p>
              <p className="max-w-xl text-sm uppercase tracking-[0.22em] text-slate-500">
                React • Node.js • FastAPI • Neo4j • Docker • AWS
              </p>
            </motion.div>

            <motion.div variants={itemVariants} transition={itemTransition} className="flex items-center gap-3 pt-4">
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-cyan-400/60"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </motion.div>
              <span className="font-mono text-sm text-slate-500">Scroll to see what I&apos;ve built</span>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            variants={itemVariants}
            transition={itemTransition}
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <motion.div
                className="absolute inset-[-12%] rounded-[2.8rem] border border-white/[0.08]"
                animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle,rgba(56,189,248,0.18),rgba(14,165,233,0.08)_45%,transparent_72%)] blur-3xl"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1],
                        opacity: [0.55, 0.85, 0.55],
                      }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-[7%] rounded-[2.3rem] border border-cyan-300/[0.08]" />
              <div className="absolute inset-[10%] rounded-[2rem] border border-white/[0.08] bg-black/10 backdrop-blur-sm" />

              <div className="group relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-all duration-500">
                <img
                  src="/profile-hero.jpeg"
                  alt="Shashank Chakraborty - Full Stack Developer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(1.03) contrast(1.08)' }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                />

                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 via-slate-900 to-violet-500/20">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <span className="text-2xl font-semibold text-white/70">SC</span>
                      </div>
                      <p className="text-sm font-mono text-white/40">Add your photo</p>
                      <p className="mt-1 text-xs font-mono text-white/20">/profile-hero.jpeg</p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_28%,transparent_72%,rgba(0,0,0,0.32))] mix-blend-screen" />
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(0,0,0,0.42)]" />
                <div className="absolute inset-0 rounded-[2.5rem] border border-cyan-300/0 transition-all duration-500 group-hover:border-cyan-300/20" />
              </div>

              <motion.div
                className="absolute -right-6 top-8 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">Focus</p>
                <p className="mt-2 text-sm font-medium text-stone-200">Backend systems</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 rounded-2xl border border-cyan-400/15 bg-cyan-400/8 px-4 py-3 backdrop-blur-md"
                animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/60">Building</p>
                <p className="mt-2 text-sm font-medium text-cyan-100">AI + infra tools</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-6 z-30 flex flex-col gap-4 lg:right-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <a
          href="https://github.com/Shashank0701-byte"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:scale-110 hover:text-cyan-400"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/shashank-chakraborty/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:scale-110 hover:text-cyan-400"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://www.instagram.com/shashank_0701/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:scale-110 hover:text-cyan-400"
        >
          <Instagram size={24} />
        </a>
      </motion.div>
    </section>
  );
};
