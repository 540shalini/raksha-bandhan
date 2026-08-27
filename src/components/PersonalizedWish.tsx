import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Share2, Check, Edit3, Heart, Sparkles, Copy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PersonalizedWishProps {
  recipientName: string;
  senderName: string;
  customMessage: string;
  onUpdateMessage: (msg: string) => void;
}

export const PersonalizedWish: React.FC<PersonalizedWishProps> = ({
  recipientName,
  senderName,
  customMessage,
  onUpdateMessage,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const presetWishes = [
    {
      label: "Heartfelt & Emotional",
      text: `Dearest ${recipientName || 'Brother'}, through every season of life, your love and presence have been my strongest anchor. Distance may separate our paths, but the sacred thread of Rakhi keeps our souls forever intertwined. Thank you for being my protector, my confidant, and my greatest blessing.`
    },
    {
      label: "Childhood Nostalgia",
      text: `Remember fighting over the TV remote, sharing secret snacks, and making promises we never forgot? Dear ${recipientName || 'Sister'}, no matter how old we grow, you will always be my favourite childhood companion. Happy Raksha Bandhan!`
    },
    {
      label: "Blessing & Gratitude",
      text: `May your life be filled with boundless laughter, sound health, and unwavering success. Dear ${recipientName || 'Sibling'}, on this holy occasion of Raksha Bandhan, I pray for your eternal happiness and safety wherever life takes you.`
    }
  ];

  const handleShare = async () => {
    soundManager.playBlessingSparkle();
    
    // Confetti burst
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E07A5F', '#9E2A2B'],
    });

    const shareText = `🪔 Happy Raksha Bandhan! 🪔\n\n"${customMessage}"\n\nWith love,\n${senderName || 'Your Loved One'}\n\nCreated with ❤️ on Raksha Bandhan Sanctuary`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Raksha Bandhan Wish',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Heartfelt Expression
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Personalized Greeting Letter
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Preset Wish Selector Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {presetWishes.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                onUpdateMessage(preset.text);
                setIsEditing(false);
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#2C221E]/80 hover:border-[#9E2A2B] hover:text-[#9E2A2B] transition-all duration-300 shadow-sm"
            >
              ✨ {preset.label}
            </button>
          ))}
        </div>

        {/* Traditional Textured Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 p-8 sm:p-14 rounded-3xl bg-[#FAF6EE] border-2 border-[#D4AF37]/50 shadow-2xl relative text-left max-w-2xl mx-auto overflow-hidden"
        >
          {/* Gold Filigree Ornate Corners */}
          <div className="absolute top-3 left-3 text-[#D4AF37] text-xl select-none font-serif">❖</div>
          <div className="absolute top-3 right-3 text-[#D4AF37] text-xl select-none font-serif">❖</div>
          <div className="absolute bottom-3 left-3 text-[#D4AF37] text-xl select-none font-serif">❖</div>
          <div className="absolute bottom-3 right-3 text-[#D4AF37] text-xl select-none font-serif">❖</div>

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-cinzel text-sm font-semibold tracking-wider text-[#9E2A2B]">
                Raksha Bandhan Wish
              </span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-1 text-xs text-[#E07A5F] hover:text-[#9E2A2B] font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Edit Letter'}</span>
            </button>
          </div>

          {/* Card Body */}
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl font-handwritten text-[#9E2A2B] font-bold">
              Dearest {recipientName || 'Loved One'},
            </p>

            {isEditing ? (
              <textarea
                value={customMessage}
                onChange={(e) => onUpdateMessage(e.target.value)}
                rows={6}
                className="w-full p-4 rounded-xl bg-white/80 border border-[#D4AF37]/40 text-lg font-handwritten text-[#2C221E] focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
              />
            ) : (
              <p className="text-xl sm:text-2xl font-handwritten text-[#2C221E]/90 leading-relaxed font-normal">
                "{customMessage}"
              </p>
            )}

            <div className="pt-6 flex items-center justify-between border-t border-[#D4AF37]/30 mt-6">
              <div className="flex items-center space-x-1.5 text-xs text-[#2C221E]/60 font-cinzel">
                <Heart className="w-3.5 h-3.5 fill-[#9E2A2B] text-[#9E2A2B]" />
                <span>Bound by Love</span>
              </div>
              <p className="text-xl font-handwritten font-bold text-[#9E2A2B]">
                Yours always, {senderName || 'Your Sibling'}
              </p>
            </div>
          </div>

          {/* Action Footer: Share & Copy */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white text-sm font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share this Wish</span>
            </button>

            <button
              onClick={() => copyToClipboard(`"${customMessage}" - From ${senderName || 'Your Sibling'}`)}
              className="px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#2C221E]/80 text-sm font-medium hover:border-[#9E2A2B] transition-all duration-300 shadow-sm flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#9E2A2B]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
