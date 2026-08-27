import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TraceThreadUnlockProps {
  recipientName: string;
  senderName: string;
}

export const TraceThreadUnlock: React.FC<TraceThreadUnlockProps> = ({
  recipientName,
  senderName,
}) => {
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleDragThread = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isUnlocked) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const width = rect.width;

    const currentPct = Math.min(Math.max((x / width) * 100, 0), 100);
    setProgress(currentPct);

    if (currentPct >= 92 && !isUnlocked) {
      setIsUnlocked(true);
      soundManager.playBlessingSparkle();
      soundManager.playTempleBell();

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#9E2A2B', '#E07A5F', '#FFF9D2'],
      });
    }
  };

  return (
    <section id="secret" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center justify-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Sacred Secret</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Trace the Thread to Unlock
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Slide your finger or mouse along the sacred Rakhi thread to unseal the final secret letter.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Tracing Canvas / Track */}
        <div className="mt-10 max-w-2xl mx-auto p-8 glass-card rounded-3xl border border-[#D4AF37]/50 shadow-2xl relative">
          {!isUnlocked ? (
            <div className="flex flex-col items-center">
              <p className="text-xs font-cinzel text-[#9E2A2B] font-semibold mb-6 uppercase tracking-wider">
                👉 Drag the glowing knot across the thread to unlock 👈
              </p>

              {/* Slider Track */}
              <div
                onMouseMove={handleDragThread}
                onTouchMove={handleDragThread}
                onClick={handleDragThread}
                className="relative w-full h-16 rounded-full bg-gradient-to-r from-[#FAF2E8] via-[#FFF] to-[#FAF2E8] border-2 border-dashed border-[#D4AF37] flex items-center px-3 cursor-pointer select-none shadow-inner"
              >
                {/* Background Progress Fill Thread */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] opacity-80"
                  style={{ width: `${progress}%` }}
                />

                {/* Draggable Glowing Knot */}
                <motion.div
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FBF5B7] to-[#DAA520] border-2 border-[#78350F] shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing text-white"
                  style={{ left: `calc(${Math.min(progress, 90)}% + 4px)` }}
                >
                  <Sparkles className="w-5 h-5 text-[#78350F] animate-spin" style={{ animationDuration: '6s' }} />
                </motion.div>

                {/* End Lock Icon */}
                <div className="absolute right-4 text-[#9E2A2B]">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2 text-xs text-[#2C221E]/60">
                <span>Progress: {Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            /* UNLOCKED SECRET MESSAGE REVEAL */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="py-6 text-center space-y-4"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] text-white text-xs font-cinzel font-bold shadow-md">
                <Unlock className="w-4 h-4 text-[#F3E5AB]" />
                <span>Sacred Secret Unlocked!</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C221E] pt-2">
                A Sacred Promise for {recipientName || 'You'}
              </h3>

              <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#D4AF37]/40 text-left space-y-3 shadow-sm">
                <p className="text-xl sm:text-2xl font-handwritten text-[#9E2A2B] leading-relaxed">
                  "No matter where life takes us, how old we grow, or what challenges we face, my love, prayers, and shelter will always be right beside you. This Rakhi thread is not just a tradition—it is my solemn vow to stand by your side forever."
                </p>
                <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-[#2C221E]/70 font-cinzel">
                    <Heart className="w-3.5 h-3.5 fill-[#9E2A2B] text-[#9E2A2B]" />
                    <span>Sealed with Eternal Love</span>
                  </div>
                  <span className="font-handwritten text-xl font-bold text-[#9E2A2B]">
                    — {senderName || 'Your Sibling'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
