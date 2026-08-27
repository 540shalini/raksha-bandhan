import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, CheckCircle, Ticket, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ShagunEnvelopeProps {
  recipientName: string;
  senderName: string;
}

export const ShagunEnvelope: React.FC<ShagunEnvelopeProps> = ({
  recipientName,
  senderName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const coupons = [
    {
      id: 'dinner',
      title: 'Free Dinner Voucher 🍕',
      description: 'Valid for one sumptuous dinner & dessert of your choice, fully paid by me!',
      code: 'SHAGUN-DINNER-2026',
    },
    {
      id: 'movie',
      title: 'Movie Night & Snacks 🍿',
      description: 'Redeemable for movie tickets & endless popcorn without any complaint.',
      code: 'SHAGUN-MOVIE-2026',
    },
    {
      id: 'no-fight',
      title: '1-Month Zero Fight Pass 🤝',
      description: 'I promise not to argue or tease you for 30 whole days. Pure peace guaranteed!',
      code: 'SHAGUN-PEACE-2026',
    },
  ];

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundManager.playBlessingSparkle();

    // Mobile Haptic Feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 150]);
    }

    // Confetti shower
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#9E2A2B', '#E07A5F', '#FFF9D2', '#FFB703'],
      scalar: 1.3,
    });
  };

  return (
    <section id="shagun" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Token of Love & Blessings
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Digital Shagun Envelope
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Tap or unseal the sacred red and gold envelope to unlock your personalized festive treat & gift vouchers!
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* 3D Realistic Red & Gold Shagun Envelope */}
        <div className="mt-12 flex justify-center perspective-1000">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-80 sm:w-96 min-h-[320px] rounded-3xl bg-gradient-to-br from-[#9E2A2B] via-[#7F1D1D] to-[#450A0A] p-6 shadow-2xl border-4 border-[#D4AF37] flex flex-col justify-between overflow-hidden cursor-pointer group"
            onClick={handleOpenEnvelope}
          >
            {/* Gold Filigree Mandala Pattern Background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Envelope Top Triangular Flap */}
            <motion.div
              animate={isOpen ? { rotateX: -180, zIndex: 0 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#B71C1C] to-[#9E2A2B] border-b-2 border-[#D4AF37] origin-top flex items-center justify-center shadow-lg"
              style={{ transformStyle: 'preserve-3d', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              {/* Wax Seal Symbol */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FBF5B7] border-2 border-[#78350F] shadow-xl flex items-center justify-center -mb-16">
                <span className="font-cinzel text-xs font-bold text-[#78350F]">शुभ</span>
              </div>
            </motion.div>

            {/* Front Label when Closed */}
            {!isOpen ? (
              <div className="pt-32 pb-8 flex flex-col items-center justify-center text-center relative z-10">
                <Gift className="w-10 h-10 text-[#F3E5AB] mb-3 animate-bounce" />
                <p className="font-cinzel text-sm font-semibold tracking-wider text-[#F3E5AB] uppercase">
                  Shagun for {recipientName || 'You'}
                </p>
                <p className="text-xs text-white/70 mt-1 font-light">
                  From {senderName || 'Your Loved One'}
                </p>
                <div className="mt-6 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-xs text-[#F3E5AB] font-medium group-hover:bg-[#D4AF37] group-hover:text-[#450A0A] transition-colors">
                  ✨ Tap to Unseal Envelope
                </div>
              </div>
            ) : (
              /* Inside Envelope Revealed Vouchers & Cards */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-6 relative z-10 text-left space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3">
                  <div className="flex items-center space-x-2 text-[#F3E5AB]">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-serif text-lg font-bold">Your Shagun Treats</span>
                  </div>
                  <span className="text-[10px] font-cinzel text-[#F3E5AB] px-2 py-0.5 rounded-full bg-[#D4AF37]/20">
                    3 Vouchers
                  </span>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCoupon(coupon.title);
                        soundManager.playBlessingSparkle();
                      }}
                      className="p-3 rounded-xl bg-white/95 border border-[#D4AF37] text-[#2C221E] hover:bg-[#FFF9D2] transition-colors shadow-md flex items-center justify-between group/c cursor-pointer"
                    >
                      <div>
                        <p className="font-serif font-bold text-sm text-[#9E2A2B]">
                          {coupon.title}
                        </p>
                        <p className="text-[11px] text-[#2C221E]/80 font-light line-clamp-1">
                          {coupon.description}
                        </p>
                      </div>
                      <Ticket className="w-4 h-4 text-[#D4AF37] group-hover/c:scale-125 transition-transform" />
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#F3E5AB] italic">
                    ❤️ Redeemable anytime on demand from {senderName || 'Your Sibling'}!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Selected Coupon Toast Modal */}
        <AnimatePresence>
          {selectedCoupon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-[#9E2A2B] text-white border-2 border-[#D4AF37] shadow-xl"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-serif text-sm font-medium">
                Claimed: <strong>{selectedCoupon}</strong>!
              </span>
              <button
                onClick={() => setSelectedCoupon(null)}
                className="ml-2 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
