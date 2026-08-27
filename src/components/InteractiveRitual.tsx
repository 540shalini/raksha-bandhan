import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InteractiveRitualProps {
  recipientName: string;
  senderName: string;
}

export const InteractiveRitual: React.FC<InteractiveRitualProps> = ({
  recipientName,
  senderName,
}) => {
  const [isTied, setIsTied] = useState(false);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [hasAppliedTika, setHasAppliedTika] = useState(false);

  // Trigger Gold & Crimson Confetti Explosion
  const triggerGoldConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F4A261', '#E07A5F', '#9E2A2B', '#FFF9D2'],
      scalar: 1.2,
      ticks: 300,
    });
  };

  const handleTieRakhi = () => {
    setIsTied(true);
    soundManager.playBlessingSparkle();
    triggerGoldConfetti();
  };

  const handleLightDiya = () => {
    setIsDiyaLit(true);
    soundManager.playTempleBell();
    triggerGoldConfetti();
  };

  const handleApplyTika = () => {
    setHasAppliedTika(true);
    soundManager.playBlessingSparkle();
  };

  const handleReset = () => {
    setIsTied(false);
    setIsDiyaLit(false);
    setHasAppliedTika(false);
  };

  return (
    <section id="ritual" className="relative py-24 px-4 sm:px-8 bg-[#FAF7F2] overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Sacred Tradition & Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            The Interactive Rakhi Ritual
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Tie the sacred thread for {recipientName || 'your loved one'}, perform the holy Aarti, and shower divine blessings.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Ritual Container Card */}
        <div className="mt-10 p-6 sm:p-12 glass-card rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          
          {/* STEP 1: TIE RAKHI INTERACTION */}
          {!isTied ? (
            <div className="flex flex-col items-center py-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-serif text-[#9E2A2B] mb-8 font-medium"
              >
                ✨ Click or Drag the glowing Rakhi thread to tie it onto the wrist ✨
              </motion.p>

              <div className="relative w-full max-w-md h-72 rounded-2xl bg-gradient-to-b from-[#FAF2E8] to-[#FAF7F2] border-2 border-dashed border-[#D4AF37]/50 flex flex-col items-center justify-center p-6">
                {/* Target Wrist Silhouette */}
                <div className="relative flex flex-col items-center">
                  <div className="w-48 h-16 rounded-full border-4 border-[#E07A5F]/30 bg-[#E07A5F]/10 flex items-center justify-center shadow-inner">
                    <span className="text-xs font-cinzel tracking-wider text-[#9E2A2B]">
                      {recipientName ? `${recipientName}'s Wrist` : 'Sibling Wrist'}
                    </span>
                  </div>
                </div>

                {/* Draggable / Clickable Sacred Rakhi Thread */}
                <motion.div
                  drag
                  dragSnapToOrigin
                  onDragEnd={handleTieRakhi}
                  onClick={handleTieRakhi}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-12 cursor-grab active:cursor-grabbing p-4 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] shadow-xl flex items-center space-x-3 border-2 border-[#F3E5AB] animate-breathing"
                >
                  <Sparkles className="w-5 h-5 text-[#F3E5AB] animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-white font-serif font-bold text-sm sm:text-base tracking-wide px-2 select-none">
                    Tie Sacred Rakhi
                  </span>
                  <Heart className="w-5 h-5 fill-white text-white" />
                </motion.div>
              </div>

              <p className="mt-4 text-xs text-[#2C221E]/60 italic">
                (Tap the button or drag it onto the wrist above)
              </p>
            </div>
          ) : (
            /* STEP 2: DIGITAL AARTI THALI & BLESSING RITUAL */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center py-6"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] text-xs font-cinzel font-semibold mb-6">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Rakhi Successfully Tied with Love!</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C221E] mb-2">
                Digital Aarti Thali
              </h3>
              <p className="text-sm text-[#2C221E]/80 max-w-lg mb-8">
                Perform the sacred blessings: Light the Diya flame and apply the auspicious Kumkum Tika on {recipientName || 'your sibling'}'s forehead.
              </p>

              {/* Ornate Gold Aarti Thali Tray */}
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FBF5B7] to-[#DAA520] p-4 shadow-2xl border-4 border-[#D4AF37] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FAF2E8] via-[#FFF] to-[#FAF2E8] border-2 border-[#9E2A2B]/30 flex items-center justify-center relative p-6">
                  
                  {/* Central Sacred Diya Lamp */}
                  <div className="flex flex-col items-center">
                    {/* Flame Animation */}
                    <div className="relative h-14 flex items-end justify-center mb-1">
                      {isDiyaLit ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center cursor-pointer"
                          onClick={handleLightDiya}
                        >
                          <div className="w-6 h-10 bg-gradient-to-t from-[#EF4444] via-[#F59E0B] to-[#FDE047] rounded-full animate-flame shadow-[0_0_25px_rgba(245,158,11,0.8)]" />
                          <div className="w-1.5 h-3 bg-[#451A03] rounded-full -mt-1" />
                        </motion.div>
                      ) : (
                        <button
                          onClick={handleLightDiya}
                          className="px-3 py-1.5 rounded-full bg-[#E07A5F] text-white text-xs font-medium hover:bg-[#9E2A2B] transition-colors shadow-md flex items-center space-x-1"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>Light Diya</span>
                        </button>
                      )}
                    </div>

                    {/* Clay Diya Base */}
                    <div className="w-16 h-8 bg-gradient-to-b from-[#B45309] to-[#78350F] rounded-b-full border-t-2 border-[#F59E0B] shadow-md flex items-center justify-center">
                      <span className="text-[10px] text-[#F3E5AB] font-cinzel">दीया</span>
                    </div>
                  </div>

                  {/* Kumkum Tika Bowl (Left) */}
                  <div className="absolute left-6 bottom-10 flex flex-col items-center">
                    <button
                      onClick={handleApplyTika}
                      className={`w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-md transition-transform ${
                        hasAppliedTika ? 'bg-[#9E2A2B] text-white scale-110' : 'bg-[#9E2A2B]/20 text-[#9E2A2B] hover:scale-105'
                      }`}
                      title="Apply Kumkum Tika"
                    >
                      <span className="text-xs font-bold">टीका</span>
                    </button>
                    <span className="text-[10px] text-[#2C221E]/70 mt-1 font-medium">Kumkum</span>
                  </div>

                  {/* Sweets / Akshat Bowl (Right) */}
                  <div className="absolute right-6 bottom-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#F4A261]/20 border-2 border-[#D4AF37] flex items-center justify-center shadow-md text-[#9E2A2B]">
                      <span className="text-xs font-bold">मिठाई</span>
                    </div>
                    <span className="text-[10px] text-[#2C221E]/70 mt-1 font-medium">Sweets</span>
                  </div>

                  {/* Tied Rakhi Motif in Center Thali */}
                  <div className="absolute top-6 flex items-center space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9E2A2B] to-[#D4AF37] border border-white flex items-center justify-center text-[8px] text-white font-bold">
                      🌸
                    </div>
                    <span className="text-[11px] font-serif text-[#9E2A2B] font-semibold">Protected</span>
                  </div>
                </div>
              </div>

              {/* Status & Blessing Reveal */}
              <div className="mt-8 text-center max-w-lg">
                {isDiyaLit && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 via-[#E07A5F]/15 to-[#9E2A2B]/15 border border-[#D4AF37]/40 shadow-sm"
                  >
                    <p className="font-serif text-base text-[#2C221E] font-medium italic">
                      "May divine light illuminate your path, keep you safe from every harm, and fill your heart with everlasting joy."
                    </p>
                    <p className="text-xs text-[#9E2A2B] font-cinzel mt-2 font-semibold">
                      — Blessed by {senderName || 'Your Loved One'}
                    </p>
                  </motion.div>
                )}

                {/* Reset Ritual Option */}
                <button
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center space-x-1.5 text-xs text-[#2C221E]/60 hover:text-[#9E2A2B] font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Perform Ritual Again</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
