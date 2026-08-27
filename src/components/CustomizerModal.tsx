import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  senderName: string;
  onUpdateRecipient: (name: string) => void;
  onUpdateSender: (name: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  senderName,
  onUpdateRecipient,
  onUpdateSender,
}) => {
  if (!isOpen) return null;

  const quickPresets = ['Brother', 'Sister', 'Bhaiya & Bhabhi', 'Sister-in-Law', 'Little Brother'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playBlessingSparkle();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#FAF6EE] max-w-md w-full p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl relative text-left"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] flex items-center justify-center hover:bg-[#9E2A2B] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-5 h-5 fill-[#9E2A2B] text-[#9E2A2B]" />
            <h3 className="text-2xl font-serif font-bold text-[#2C221E]">
              Personalize Greeting
            </h3>
          </div>
          <p className="text-xs text-[#2C221E]/75 mb-6 font-light">
            Enter your names to tailor all animations, wishes, and cards on this page.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1.5">
                Recipient's Name / Relation
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => onUpdateRecipient(e.target.value)}
                placeholder="e.g. Rohan / Dearest Sister"
                className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm font-medium text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
              />
              
              {/* Quick Preset Badges */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {quickPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onUpdateRecipient(preset)}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-white border border-[#D4AF37]/30 text-[#9E2A2B] hover:bg-[#9E2A2B] hover:text-white transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1.5">
                Your Name (Sender)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => onUpdateSender(e.target.value)}
                placeholder="e.g. Aanya"
                className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm font-medium text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                <span>Save & Apply Personalization</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
