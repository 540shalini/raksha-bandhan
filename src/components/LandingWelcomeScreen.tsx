import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface LandingWelcomeScreenProps {
  recipientName: string;
  senderName: string;
  onEnter: () => void;
}

export const LandingWelcomeScreen: React.FC<LandingWelcomeScreenProps> = ({
  recipientName,
  senderName,
  onEnter,
}) => {
  const handleUnseal = () => {
    soundManager.playBlessingSparkle();

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#9E2A2B', '#E07A5F', '#2A9D8F'],
    });

    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#18132B] via-[#0F0C1B] to-[#18132B] text-[#F4F1DE] text-center overflow-hidden"
    >
      {/* Background Animated Glowing Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#D4AF37]/25 via-[#E07A5F]/15 to-transparent blur-3xl pointer-events-none rounded-full animate-pulse" />

      {/* Floating Sparkles decorative overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="w-6 h-6 text-[#D4AF37] absolute top-12 left-12 animate-bounce opacity-60" />
        <Sparkles className="w-8 h-8 text-[#E07A5F] absolute bottom-20 right-16 animate-pulse opacity-60" />
        <Heart className="w-5 h-5 text-[#9E2A2B] absolute top-1/4 right-1/4 animate-spin opacity-40" style={{ animationDuration: '12s' }} />
      </div>

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Top Sacred Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-xs font-cinzel font-semibold text-[#D4AF37] tracking-widest uppercase mb-8 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
          <span>Sacred Sibling Surprise</span>
        </motion.div>

        {/* Animated Clickable Medallion / Gift Box */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnseal}
          className="relative w-56 h-56 sm:w-72 sm:h-72 cursor-pointer group flex items-center justify-center my-4"
        >
          {/* Outer Rotating Glowing Dash Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/60 group-hover:border-[#D4AF37] animate-spin"
            style={{ animationDuration: '20s' }}
          />

          {/* Central Pulsing Medallion */}
          <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] p-2.5 shadow-2xl animate-breathing flex items-center justify-center relative">
            <div className="w-full h-full rounded-full bg-[#18132B] border-4 border-[#D4AF37] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:bg-[#201838] transition-colors">
              
              {/* Inner Heart & Gift Animation */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#9E2A2B] to-[#D4AF37] flex items-center justify-center text-white shadow-xl mb-2 group-hover:rotate-12 transition-transform">
                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <span className="text-xs font-cinzel font-bold text-[#D4AF37] uppercase tracking-wider">
                Click to Open
              </span>
            </div>

            {/* Left & Right Glowing Threads */}
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent to-[#D4AF37] rounded-full hidden sm:block" />
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-12 h-1 bg-gradient-to-l from-transparent to-[#D4AF37] rounded-full hidden sm:block" />
          </div>
        </motion.div>

        {/* Message Below Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 max-w-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Dearest {recipientName},
          </h2>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl my-4">
            <p className="text-base sm:text-lg font-serif italic text-[#D4AF37] font-semibold">
              Your sister {senderName} has a beautiful message for you. To know more, click on the above!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUnseal}
            className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-semibold text-sm shadow-2xl hover:shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Click to Reveal Message</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
};
