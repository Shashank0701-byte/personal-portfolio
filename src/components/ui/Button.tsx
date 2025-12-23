import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-primary to-neon-secondary text-white hover:scale-105 hover:box-glow',
    secondary: 'bg-gradient-to-r from-neon-accent to-neon-primary text-white hover:scale-105 hover:box-glow-green',
    outline: 'border-2 border-neon-primary text-neon-primary hover:bg-neon-primary/10 hover:scale-105',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

