import { cn } from '../../utils/cn';
// --- THEME PACK ---
// I selected these 4 images to flow together perfectly.
const BACKGROUNDS = {
  hero: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop", // Nebula (Grand & Bright)
  about: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2048&auto=format&fit=crop", // Starry Void (Calm & Readable)
  projects: "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2048&auto=format&fit=crop", // Dark Fluid (Abstract & Textured)
  contact: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2048&auto=format&fit=crop", // Earth/Horizon (Conclusion)
};

interface CosmicBackgroundProps {
  variant: 'hero' | 'about' | 'projects' | 'contact';
  className?: string;
}

export default function CosmicBackground({ variant, className }: CosmicBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 -z-50 overflow-hidden pointer-events-none", className)}>
      {/* 1. THE IMAGE 
        - We apply a 'mask-image' to fade the top/bottom edges so sections blend.
        - We lower opacity to 30-40% so it doesn't distract from text.
      */}
      <img
        src={BACKGROUNDS[variant]}
        alt="Cosmic Background"
        className="h-full w-full object-cover object-center opacity-40 transition-opacity duration-1000"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }}
      />

      {/* 2. THE TINT 
        - Blue/Purple tint to unify all images with your brand colors.
      */}
      <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" />

      {/* 3. THE GRAIN (Optional)
        - Adds texture to prevent it from looking like a flat picture.
      */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}