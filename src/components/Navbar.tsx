import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Shield } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  recipientName: string;
  senderName: string;
  onOpenCustomizer: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  recipientName,
  onOpenCustomizer,
  onOpenAdmin,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    const state = soundManager.toggleAmbientMusic();
    setIsPlayingMusic(state);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto glass-card rounded-full px-5 py-3 flex items-center justify-between border border-[#D4AF37]/30 shadow-lg">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:scale-105 transition-transform">
             रक्षा
          </div>
          <span className="font-cinzel text-sm sm:text-base font-semibold tracking-wider text-[#2C221E] dark:text-[#F4F1DE] group-hover:text-[#E07A5F] transition-colors">
            Raksha Bandhan
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-medium tracking-wider text-[#2C221E]/80 dark:text-[#F4F1DE]/80 uppercase">
          <a href="#bond" className="hover:text-[#E07A5F] transition-colors">The Bond</a>
          <a href="#treasure-hunt" className="hover:text-[#E07A5F] transition-colors">Treasure Hunt</a>
          <a href="#ritual" className="hover:text-[#E07A5F] transition-colors">Tie Rakhi</a>
          <a href="#wishes" className="hover:text-[#E07A5F] transition-colors">Wish</a>
          <a href="#memories" className="hover:text-[#E07A5F] transition-colors">Memories</a>
        </div>

        {/* Right Actions: Customizer, Admin & Ambient Music */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Admin Upload Trigger */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 text-xs font-semibold text-[#9E2A2B] dark:text-[#E07A5F] hover:bg-[#9E2A2B] hover:text-white transition-all shadow-sm"
              title="Admin Photo Uploader"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Admin Portal</span>
            </button>
          )}

          {/* Customize Name Button */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] dark:bg-white/10 border border-[#D4AF37]/40 text-xs text-[#9E2A2B] dark:text-[#F4F1DE] hover:bg-[#9E2A2B] hover:text-white transition-all duration-300 shadow-sm"
            title="Personalize Names"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#9E2A2B]" />
            <span className="font-medium hidden sm:inline">For {recipientName}</span>
          </button>

          {/* Ambient Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-sm ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-[#E07A5F] to-[#D4AF37] text-white shadow-[#E07A5F]/30 animate-pulse'
                : 'bg-[#FAF7F2] dark:bg-white/10 border border-[#D4AF37]/40 text-[#2C221E]/80 dark:text-[#F4F1DE] hover:border-[#E07A5F]'
            }`}
            title={isPlayingMusic ? 'Mute Meditative Drone' : 'Play Meditative Ambient Music'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#2C221E]/60 dark:text-white/60" />
                <span className="hidden sm:inline">Play Ambient</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
