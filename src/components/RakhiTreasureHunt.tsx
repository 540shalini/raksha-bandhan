import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Key, Gift, Sparkles, CheckCircle2, Lock, Flame, Heart, Award, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Clue {
  id: number;
  riddle: string;
  hint: string;
  answer: string;
  icon: React.ReactNode;
  treasureName: string;
  treasureDesc: string;
  rewardCode: string;
}

interface RakhiTreasureHuntProps {
  recipientName: string;
  senderName: string;
}

export const RakhiTreasureHunt: React.FC<RakhiTreasureHuntProps> = ({
  recipientName,
  senderName,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [unlockedTreasures, setUnlockedTreasures] = useState<number[]>([]);
  const [activeTreasureModal, setActiveTreasureModal] = useState<Clue | null>(null);
  const [isGrandChestOpen, setIsGrandChestOpen] = useState(false);

  const clues: Clue[] = [
    {
      id: 1,
      riddle: 'I burn with warmth, illuminating every prayer and blessing for your wellness.',
      hint: 'Click on the sacred Diya flame to ignite the first blessing.',
      answer: 'Light Sacred Diya',
      icon: <Flame className="w-6 h-6 text-[#E07A5F]" />,
      treasureName: 'Golden Diya Blessing of Health',
      treasureDesc: 'A divine aura of good health, peace, and long life bestowed upon ' + recipientName + '.',
      rewardCode: 'HEALTH-PROTECTION-2026',
    },
    {
      id: 2,
      riddle: 'Spinning crimson and gold, I am tied around the wrist to seal an unbroken vow.',
      hint: 'Click to tie the knot of the Golden Mauli Thread.',
      answer: 'Tie Golden Mauli',
      icon: <Heart className="w-6 h-6 text-[#9E2A2B]" />,
      treasureName: 'Unbreakable Sacred Thread Pact',
      treasureDesc: 'An eternal vow that no matter the distance, ' + senderName + ' and ' + recipientName + ' will always stand together.',
      rewardCode: 'SACRED-BOND-FOREVER',
    },
    {
      id: 3,
      riddle: 'Sweet like Kaju Katli and Gulab Jamun, I hold the memories of our childhood treats.',
      hint: 'Click on the Royal Sweets box to share the sweetness.',
      answer: 'Open Royal Sweets',
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      treasureName: 'Childhood Sweetness Pass',
      treasureDesc: 'A permanent pass guaranteeing unlimited chocolates and zero arguments for a full month!',
      rewardCode: 'SWEET-MEMORIES-PASS',
    },
    {
      id: 4,
      riddle: 'The ultimate royal vault holding the master key to our lifelong camaraderie.',
      hint: 'Unlock the Royal Rakhi Treasure Chest!',
      answer: 'Unlock Grand Chest',
      icon: <Trophy className="w-6 h-6 text-[#D4AF37]" />,
      treasureName: 'Grand Royal Rakhi Chest',
      treasureDesc: `Congratulations! You have solved all clues and unlocked the ultimate Raksha Bandhan surprise for ${recipientName}!`,
      rewardCode: 'GRAND-RAKHI-TREASURE',
    },
  ];

  const handleSolveClue = (clue: Clue) => {
    if (unlockedTreasures.includes(clue.id)) {
      setActiveTreasureModal(clue);
      return;
    }

    soundManager.playBlessingSparkle();
    
    // Confetti effect on unlock
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#9E2A2B', '#E07A5F'],
    });

    const newUnlocked = [...unlockedTreasures, clue.id];
    setUnlockedTreasures(newUnlocked);
    setActiveTreasureModal(clue);

    if (newUnlocked.length === clues.length) {
      setTimeout(() => {
        setIsGrandChestOpen(true);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#9E2A2B', '#E07A5F', '#2A9D8F'],
        });
      }, 800);
    } else {
      setCurrentStep(Math.min(currentStep + 1, clues.length - 1));
    }
  };

  return (
    <section id="treasure-hunt" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center justify-center space-x-1.5">
            <Key className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Quest</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            The Sacred Rakhi Treasure Hunt
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Solve the 4 festive riddles to unlock secret blessings, sacred gifts, and open the Grand Royal Rakhi Chest!
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Quest Progress Bar */}
        <div className="mt-8 max-w-md mx-auto bg-white/80 p-3 rounded-2xl border border-[#D4AF37]/30 shadow-md">
          <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[#9E2A2B] mb-2">
            <span>Treasures Unlocked:</span>
            <span>{unlockedTreasures.length} / {clues.length}</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-[#D4AF37]/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedTreasures.length / clues.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] rounded-full"
            />
          </div>
        </div>

        {/* Clues & Treasure Chest Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clues.map((clue) => {
            const isUnlocked = unlockedTreasures.includes(clue.id);

            return (
              <motion.div
                key={clue.id}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => handleSolveClue(clue)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer text-left relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-white via-[#FAF7F2] to-[#FFFBEB] border-[#D4AF37] shadow-xl'
                    : 'bg-white/60 border-slate-200 hover:border-[#D4AF37]/50 shadow-md'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B]">
                    Clue #{clue.id}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2A9D8F]" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Icon & Riddle */}
                <div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] w-fit mb-3 border border-[#D4AF37]/30">
                    {clue.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2C221E] mb-2">
                    {clue.treasureName}
                  </h3>
                  <p className="text-xs text-[#2C221E]/75 font-light leading-relaxed mb-4">
                    "{clue.riddle}"
                  </p>
                </div>

                {/* Action Trigger */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      isUnlocked
                        ? 'bg-[#2A9D8F] text-white shadow-sm'
                        : 'bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] text-white shadow-md hover:scale-102'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isUnlocked ? 'View Treasure' : clue.answer}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Treasure Detail Popup Modal */}
        <AnimatePresence>
          {activeTreasureModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setActiveTreasureModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <Key className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40">
                    {activeTreasureModal.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-cinzel font-bold text-[#9E2A2B] uppercase">
                      Treasure Unlocked #{activeTreasureModal.id}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#2C221E]">
                      {activeTreasureModal.treasureName}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#2C221E]/80 font-light leading-relaxed mb-6 bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20">
                  {activeTreasureModal.treasureDesc}
                </p>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#9E2A2B]/10 border border-[#9E2A2B]/20">
                  <span className="text-xs font-cinzel font-semibold text-[#9E2A2B]">
                    Treasure Code:
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2C221E]">
                    {activeTreasureModal.rewardCode}
                  </span>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setActiveTreasureModal(null)}
                    className="px-6 py-2 rounded-full bg-[#9E2A2B] text-white text-xs font-medium"
                  >
                    Continue Quest
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Grand Chest Final Victory Popup */}
        <AnimatePresence>
          {isGrandChestOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-xl bg-gradient-to-b from-[#FAF7F2] via-white to-[#FFFBEB] rounded-3xl p-8 sm:p-10 border-4 border-[#D4AF37] shadow-2xl text-center relative overflow-hidden"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] flex items-center justify-center text-white shadow-xl mb-4 animate-bounce">
                  <Gift className="w-10 h-10" />
                </div>

                <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-bold">
                  Quest Victory Achieved!
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C221E] mt-1 mb-3">
                  Royal Rakhi Treasure Unlocked!
                </h3>
                <p className="text-sm text-[#2C221E]/80 font-light leading-relaxed max-w-md mx-auto mb-6">
                  Dearest {recipientName}, you have solved every riddle and unlocked all sacred treasures! May your life be filled with boundless happiness, protection, and eternal love.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#D4AF37] shadow-inner mb-6">
                  <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-cinzel font-bold text-sm text-[#9E2A2B]">
                      Official Certificate of Sibling Love
                    </span>
                  </div>
                  <p className="text-xs font-serif italic text-[#2C221E] mt-2">
                    "Bound by blood, elevated by love, protected for eternity."
                  </p>
                </div>

                <button
                  onClick={() => setIsGrandChestOpen(false)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-semibold text-sm shadow-xl hover:scale-105 transition-transform"
                >
                  Claim Royal Blessing
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
