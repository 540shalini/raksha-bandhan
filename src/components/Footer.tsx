import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  recipientName: string;
  senderName: string;
}

export const Footer: React.FC<FooterProps> = ({ recipientName, senderName }) => {
  const handleHeartClick = () => {
    soundManager.playBlessingSparkle();
  };

  return (
    <footer className="relative pt-16 pb-12 bg-gradient-to-b from-[#FAF7F2] to-[#FAF2E8] border-t border-[#D4AF37]/30 text-center overflow-hidden">
      
      {/* Animated Rakhi Thread Divider Line Ending in Glowing Heart */}
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-center space-x-3 mb-10">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#E07A5F] to-[#D4AF37] rounded-full" />
        
        <motion.div
          whileHover={{ scale: 1.3, rotate: 12 }}
          onClick={handleHeartClick}
          className="relative cursor-pointer p-2 rounded-full bg-[#9E2A2B]/10 border border-[#D4AF37] shadow-md group"
        >
          <div className="absolute inset-0 rounded-full bg-[#9E2A2B]/20 blur-md group-hover:scale-150 transition-transform" />
          <Heart className="w-5 h-5 text-[#9E2A2B] fill-[#9E2A2B] relative z-10 animate-pulse" />
        </motion.div>

        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#E07A5F] to-[#D4AF37] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Core Attribution */}
        <p className="font-serif text-lg sm:text-xl text-[#2C221E] font-medium">
          Made with endless love for{' '}
          <span className="font-handwritten text-2xl text-[#9E2A2B] font-bold underline underline-offset-4 decoration-[#D4AF37]">
            {recipientName || 'My Beloved Siblings'}
          </span>
        </p>

        {senderName && (
          <p className="mt-1 text-sm text-[#2C221E]/70 font-light">
            Crafted with affection by {senderName}
          </p>
        )}

        {/* Traditional Sanskrit Shloka for Sibling Well-being */}
        <div className="mt-6 p-4 max-w-md mx-auto rounded-2xl glass-card border border-[#D4AF37]/30">
          <p className="font-cinzel text-xs text-[#9E2A2B] tracking-wider font-semibold">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।
          </p>
          <p className="text-[11px] text-[#2C221E]/70 mt-1 font-light italic">
            "May all beings be happy, may all be free from illness, may all see good fortune."
          </p>
        </div>

        {/* Footer Subtext */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-[#2C221E]/60 font-cinzel">
          <span>🪔 Happy Raksha Bandhan</span>
          <span className="hidden sm:inline">•</span>
          <span>Sacred Thread of Eternal Bond</span>
          <span className="hidden sm:inline">•</span>
          <span>Forever & Always</span>
        </div>
      </div>
    </footer>
  );
};
