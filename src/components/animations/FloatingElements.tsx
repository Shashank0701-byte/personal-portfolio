import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const elements: FloatingElement[] = [
  { id: 1, x: 10, y: 20, size: 60, duration: 6, delay: 0 },
  { id: 2, x: 80, y: 40, size: 40, duration: 8, delay: 1 },
  { id: 3, x: 50, y: 70, size: 80, duration: 7, delay: 2 },
  { id: 4, x: 20, y: 60, size: 50, duration: 9, delay: 0.5 },
  { id: 5, x: 70, y: 10, size: 70, duration: 6.5, delay: 1.5 },
];

export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 100%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

