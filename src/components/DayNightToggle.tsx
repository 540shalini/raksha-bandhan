import React from 'react';
import { Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DayNightToggleProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const DayNightToggle: React.FC<DayNightToggleProps> = ({
  isDarkMode,
  onToggleDarkMode,
  isReducedMotion,
  onToggleReducedMotion,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5">
      {/* Reduced Motion Toggle */}
      <button
        onClick={() => {
          onToggleReducedMotion();
          soundManager.playBlessingSparkle();
        }}
        className={`p-3 rounded-full border shadow-lg transition-all duration-300 ${
          isReducedMotion
            ? 'bg-[#9E2A2B] text-white border-white'
            : 'bg-white/90 text-[#2C221E] border-[#D4AF37]/50 hover:bg-[#FAF2E8]'
        }`}
        title={isReducedMotion ? 'Enable Full Animations' : 'Reduce Motion / Animations'}
      >
        {isReducedMotion ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>

      {/* Day / Night Theme Toggle */}
      <button
        onClick={() => {
          onToggleDarkMode();
          soundManager.playBlessingSparkle();
        }}
        className={`p-3 rounded-full border shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#FFB703] text-[#0F0C1B] border-amber-300'
            : 'bg-[#2C221E] text-[#F3E5AB] border-[#D4AF37]/50 hover:bg-slate-800'
        }`}
        title={isDarkMode ? 'Switch to Warm Sunlit Day Mode' : 'Switch to Deep Indigo Night Mode'}
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 fill-current" />
        ) : (
          <Moon className="w-4 h-4 fill-current" />
        )}
      </button>
    </div>
  );
};
