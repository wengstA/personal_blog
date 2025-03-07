"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DawnBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely check theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only render this in light mode
  if (!mounted || theme === 'dark') return null;
  
  return (
    <>
      {/* Dawn effect - fixed position with gradient and slight blur */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Main dawn gradient */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(120deg, rgba(255,210,161,0.7) 0%, rgba(255,236,210,0.7) 40%, rgba(240,248,255,0.7) 100%)',
          }}
        />
        
        {/* Subtle radial gradient simulating sun glow */}
        <div 
          className="absolute opacity-20"
          style={{
            top: '15%',
            left: '20%', 
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,180,107,0.8) 0%, rgba(255,210,161,0.3) 30%, transparent 70%)',
          }}
        />
        
        {/* Light rays effect */}
        <div 
          className="absolute opacity-10"
          style={{
            top: '-20%',
            left: '10%',
            width: '60%',
            height: '150%',
            background: 'conic-gradient(from 135deg at 20% 30%, transparent 0deg, rgba(255,210,161,0.9) 10deg, transparent 20deg, transparent 90deg, rgba(255,236,210,0.6) 100deg, transparent 110deg, transparent 180deg, rgba(255,210,161,0.7) 190deg, transparent 200deg, transparent 270deg, rgba(255,236,210,0.8) 280deg, transparent 290deg, transparent 360deg)',
            transform: 'rotate(-30deg)',
          }}
        />
        
        {/* Subtle grain overlay for texture */}
        <div 
          className="absolute inset-0 opacity-5 mix-blend-overlay bg-repeat"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />
      </div>
      
      {/* Additional blur mask at the bottom for content readability */}
      <div 
        className="fixed bottom-0 left-0 w-full h-[30vh] -z-10 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"
      />
    </>
  );
}
