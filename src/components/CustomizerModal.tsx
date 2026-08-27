import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, UserCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  senderName: string;
  onSave?: (recipient: string, sender: string) => void;
  onSaveCustomization?: (recipient: string, sender: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  recipientName: initialRecipient,
  senderName: initialSender,
  onSave,
  onSaveCustomization,
}) => {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [sender, setSender] = useState(initialSender);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playBlessingSparkle();
    if (onSave) onSave(recipient, sender);
    if (onSaveCustomization) onSaveCustomization(recipient, sender);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-[#FAF7F2] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#2C221E]/60 hover:text-[#2C221E] hover:bg-[#FAF2E8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-2 text-[#9E2A2B] mb-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-cinzel text-xs font-semibold uppercase tracking-wider">
                Personalize Experience
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C221E]">
              Customize Names
            </h3>
            <p className="text-xs text-[#2C221E]/70 mt-1 mb-6 font-light">
              Enter the recipient and sender names to personalize all greetings and wishes throughout the site.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] uppercase tracking-wider mb-1.5">
                  Recipient Name (Who is this for?)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Rahul / Priyanka"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/50 text-sm font-medium text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] uppercase tracking-wider mb-1.5">
                  Sender Name (Your Name)
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. Ananya / Vikram"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/50 text-sm font-medium text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] shadow-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-[#2C221E]/70 hover:text-[#2C221E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white text-xs font-medium shadow-md hover:scale-105 transition-transform flex items-center space-x-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Save Personalization</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
