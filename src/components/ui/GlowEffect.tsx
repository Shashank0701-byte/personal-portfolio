import type { ReactNode } from 'react';

interface GlowEffectProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'purple';
  intensity?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GlowEffect = ({
  children,
  color = 'primary',
  intensity = 'md',
  className = '',
}: GlowEffectProps) => {
  const colorClasses = {
    primary: 'text-neon-primary',
    secondary: 'text-neon-secondary',
    accent: 'text-neon-accent',
    purple: 'text-neon-purple',
  };

  const intensityClasses = {
    sm: 'text-glow-sm',
    md: 'text-glow',
    lg: 'text-glow text-[1.1em]',
  };

  return (
    <span className={`${colorClasses[color]} ${intensityClasses[intensity]} ${className}`}>
      {children}
    </span>
  );
};

