import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ChevronDown, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  recipientName: string;
  senderName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ recipientName, senderName }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleRakhiClick = () => {
    soundManager.playBlessingSparkle();
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Soft Radial Glowing Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-radial from-[#F4A261]/25 via-[#E07A5F]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-radial from-[#D4AF37]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Festival Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#9E2A2B]/10 border border-[#D4AF37]/40 text-[#9E2A2B] text-xs sm:text-sm font-cinzel font-semibold tracking-widest uppercase mb-6 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Sacred Thread of Eternal Bond</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
      </motion.div>

      {/* Central 3D Ornate Sacred Rakhi */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleRakhiClick}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-4 cursor-pointer group"
      >
        {/* Breathing Outer Aura Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#E07A5F]/40 to-[#9E2A2B]/30 blur-2xl group-hover:scale-125 transition-transform duration-700 animate-breathing" />

        {/* Vector SVG Rakhi Artwork */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center select-none">
          {/* Thread Extensions Left & Right */}
          <div className="absolute left-[-60px] sm:left-[-100px] w-28 sm:w-36 h-2 bg-gradient-to-r from-transparent via-[#9E2A2B] to-[#D4AF37] rounded-full shadow-lg opacity-80" />
          <div className="absolute right-[-60px] sm:right-[-100px] w-28 sm:w-36 h-2 bg-gradient-to-l from-transparent via-[#9E2A2B] to-[#D4AF37] rounded-full shadow-lg opacity-80" />

          {/* Golden Thread Tassels */}
          <div className="absolute left-[-90px] sm:left-[ -130px] flex space-x-1">
            <div className="w-2 h-10 bg-gradient-to-b from-[#D4AF37] to-[#E07A5F] rounded-full transform -rotate-12 blur-[0.3px]" />
            <div className="w-1.5 h-12 bg-gradient-to-b from-[#9E2A2B] to-[#D4AF37] rounded-full transform rotate-6" />
          </div>
          <div className="absolute right-[-90px] sm:right-[-130px] flex space-x-1">
            <div className="w-1.5 h-12 bg-gradient-to-b from-[#9E2A2B] to-[#D4AF37] rounded-full transform -rotate-6" />
            <div className="w-2 h-10 bg-gradient-to-b from-[#D4AF37] to-[#E07A5F] rounded-full transform rotate-12 blur-[0.3px]" />
          </div>

          <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF9D2" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="80%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
              <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4A261" />
                <stop offset="50%" stopColor="#E07A5F" />
                <stop offset="100%" stopColor="#9E2A2B" />
              </linearGradient>
              <linearGradient id="silkCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
            </defs>

            {/* Outer Sacred Floral Mandala Petals */}
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                <path
                  d="M100 25 C108 40 108 55 100 70 C92 55 92 40 100 25 Z"
                  fill="url(#marigoldGrad)"
                  stroke="#F3E5AB"
                  strokeWidth="0.8"
                  className="transition-opacity duration-300 group-hover:opacity-100"
                />
                <circle cx="100" cy="24" r="3" fill="#D4AF37" />
              </g>
            ))}

            {/* Inner Pearl / Diamond Ring */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="4 2" />
            
            {[...Array(8)].map((_, i) => (
              <g key={`bead-${i}`} transform={`rotate(${i * 45} 100 100)`}>
                <circle cx="100" cy="48" r="4.5" fill="url(#goldGlow)" stroke="#78350F" strokeWidth="0.5" />
              </g>
            ))}

            {/* Central Crimson Velvet Base */}
            <circle cx="100" cy="100" r="38" fill="url(#silkCrimson)" stroke="#D4AF37" strokeWidth="2" />

            {/* Central Ornate Golden Swirl / Om & Lotus Motif */}
            <circle cx="100" cy="100" r="28" fill="url(#marigoldGrad)" opacity="0.9" />
            <circle cx="100" cy="100" r="18" fill="url(#goldGlow)" />
            
            {/* Center Gem Ruby */}
            <circle cx="100" cy="100" r="8" fill="#9E2A2B" stroke="#FFF" strokeWidth="1" />
            <circle cx="98" cy="98" r="2.5" fill="#FFF" opacity="0.8" />
          </svg>

          {/* Hover Hint */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-6 px-3 py-1 bg-[#2C221E]/90 text-[#F3E5AB] text-[11px] font-sans rounded-full shadow-lg border border-[#D4AF37]/40 pointer-events-none"
            >
              ✨ Click to receive divine blessing
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-[#2C221E] max-w-4xl leading-[1.15]"
      >
        Happy <span className="gold-gradient-text">Raksha Bandhan</span>
        {recipientName && (
          <span className="block text-3xl sm:text-5xl font-handwritten text-[#9E2A2B] mt-2 font-normal">
            Dearest {recipientName} ❤️
          </span>
        )}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 text-base sm:text-xl text-[#2C221E]/80 max-w-2xl font-light leading-relaxed px-4"
      >
        Celebrating the sacred thread of unconditional love, lifelong protection, and the cherished memories we share.
        {senderName && (
          <span className="block mt-2 font-medium text-[#E07A5F]">
            With endless affection from {senderName}
          </span>
        )}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#ritual"
          className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
        >
          <span>Tie the Rakhi Ritual</span>
          <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
        </a>
        <a
          href="#wishes"
          className="px-7 py-3.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/60 text-[#9E2A2B] font-medium text-sm sm:text-base hover:bg-[#D4AF37]/10 transition-all duration-300 shadow-sm"
        >
          Read Heartfelt Wish
        </a>
      </motion.div>

      {/* Smooth Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-16 sm:mt-20 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
      >
        <a href="#bond" className="flex flex-col items-center text-xs font-cinzel tracking-widest text-[#9E2A2B]">
          <span>Begin Mindful Journey</span>
          <ChevronDown className="w-5 h-5 text-[#E07A5F] mt-1" />
        </a>
      </motion.div>
    </section>
  );
};
