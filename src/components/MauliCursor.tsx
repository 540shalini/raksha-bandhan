import React, { useEffect, useState } from 'react';

interface MauliCursorProps {
  isReducedMotion: boolean;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export const MauliCursor: React.FC<MauliCursorProps> = ({ isReducedMotion }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isReducedMotion) return;

    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      counter++;
      if (counter % 2 === 0) {
        setTrail((prev) => [
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            opacity: 0.8,
            size: Math.random() * 4 + 3,
          },
          ...prev.slice(0, 12),
        ]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion, isVisible]);

  // Fade out trail dots
  useEffect(() => {
    if (isReducedMotion || trail.length === 0) return;

    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((dot) => ({ ...dot, opacity: dot.opacity - 0.08, size: dot.size * 0.95 }))
          .filter((dot) => dot.opacity > 0.05)
      );
    }, 40);

    return () => clearInterval(interval);
  }, [trail, isReducedMotion]);

  if (isReducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Sparkle Trail */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] blur-[0.5px]"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main Mauli Diya Cursor */}
      <div
        className="absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Glowing Golden Ring */}
        <div className="absolute inset-0 rounded-full border border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)] animate-pulse" />
        
        {/* Tiny Diya Flame Center */}
        <div className="w-2.5 h-3.5 bg-gradient-to-t from-[#EF4444] via-[#F59E0B] to-[#FDE047] rounded-full shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-flame" />
      </div>
    </div>
  );
};
