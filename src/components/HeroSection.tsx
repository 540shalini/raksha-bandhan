import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  recipientName: string;
  senderName: string;
  onOpenCustomizer?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  senderName,
  onOpenCustomizer,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: -y / 15, y: x / 15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleRakhiClick = () => {
    soundManager.playBlessingSparkle();
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#D4AF37]/20 via-[#E07A5F]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top Festive Subtitle Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-sm text-xs font-cinzel font-semibold text-[#9E2A2B] tracking-widest uppercase mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Celebration of Sacred Sibling Bond</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-[#2C221E] max-w-4xl leading-tight"
      >
        Happy <span className="gold-gradient-text">Raksha Bandhan</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-lg sm:text-xl text-[#2C221E]/80 max-w-2xl font-light"
      >
        For <strong className="text-[#9E2A2B] font-semibold">{recipientName}</strong>, bound by love, protection, and eternal memories from your <strong className="text-[#9E2A2B] font-semibold">{senderName}</strong>.
      </motion.p>

      {/* Heartfelt Emotional Message Card at the Start */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="mt-8 max-w-2xl w-full p-6 sm:p-8 bg-gradient-to-br from-white/90 via-[#FAF7F2] to-[#FFFBEB] rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl relative text-center overflow-hidden"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] text-white text-[11px] font-cinzel font-bold tracking-wider uppercase shadow-md flex items-center space-x-1">
          <Heart className="w-3 h-3 fill-current text-white" />
          <span>A Note From Your Elder Sister</span>
        </div>

        <p className="font-serif italic text-lg sm:text-xl text-[#2C221E] leading-relaxed mt-2 font-medium">
          "Thank you for being the absolute best brother in the whole world. Your elder sister is so immensely proud to walk beside you, watch you grow, and share every chapter of life with you."
        </p>

        <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* 3D Breathing Vector Rakhi Mandala Art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        onClick={handleRakhiClick}
        className="mt-10 relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center cursor-pointer group"
      >
        {/* Outer Thread Ring Lines */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/50 animate-spin" style={{ animationDuration: '30s' }} />

        {/* Breathing Rakhi Art Container */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] p-2 shadow-2xl animate-breathing flex items-center justify-center relative">
          
          {/* Inner Golden Mandala */}
          <div className="w-full h-full rounded-full bg-[#FAF7F2] border-4 border-[#D4AF37] flex items-center justify-center p-6 relative overflow-hidden">
            {/* SVG Ornate Petals */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#9E2A2B] fill-current opacity-90">
              <path d="M50 0 C55 25 75 45 100 50 C75 55 55 75 50 100 C45 75 25 55 0 50 C25 45 45 25 50 0 Z" />
              <circle cx="50" cy="50" r="22" className="fill-[#D4AF37]" />
              <circle cx="50" cy="50" r="14" className="fill-[#9E2A2B]" />
              <circle cx="50" cy="50" r="6" className="fill-[#FAF7F2]" />
            </svg>
          </div>

          {/* Golden Thread Extensions Left & Right */}
          <div className="absolute top-1/2 -left-20 right-auto -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#9E2A2B] rounded-full hidden sm:block" />
          <div className="absolute top-1/2 -right-20 left-auto -translate-y-1/2 w-20 h-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#9E2A2B] rounded-full hidden sm:block" />
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#ritual"
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-medium text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <span>Tie Sacred Rakhi</span>
          <Sparkles className="w-4 h-4" />
        </a>

        {onOpenCustomizer && (
          <button
            onClick={onOpenCustomizer}
            className="px-6 py-3.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#2C221E] font-medium text-sm hover:border-[#9E2A2B] transition-all duration-300 flex items-center space-x-2 shadow-sm"
          >
            <Heart className="w-4 h-4 text-[#9E2A2B]" />
            <span>Customize Names</span>
          </button>
        )}
      </motion.div>
    </section>
  );
};
