import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ReasonCard {
  id: number;
  frontTitle: string;
  reasonText: string;
  icon: string;
  gradient: string;
}

interface ReasonsFlipCardsProps {
  recipientName: string;
  senderName: string;
}

export const ReasonsFlipCards: React.FC<ReasonsFlipCardsProps> = ({
  recipientName,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    soundManager.playBlessingSparkle();
  };

  const reasons: ReasonCard[] = [
    {
      id: 1,
      frontTitle: 'Reason #1',
      reasonText: 'For always covering for me whenever I broke curfew or got into silly trouble.',
      icon: '🛡️',
      gradient: 'from-[#9E2A2B] to-[#E07A5F]',
    },
    {
      id: 2,
      frontTitle: 'Reason #2',
      reasonText: 'For your terrible but hilarious jokes that always make me laugh during stressful days.',
      icon: '😄',
      gradient: 'from-[#E07A5F] to-[#F4A261]',
    },
    {
      id: 3,
      frontTitle: 'Reason #3',
      reasonText: 'For keeping every single secret I ever trusted you with without judgment.',
      icon: '🔐',
      gradient: 'from-[#F4A261] to-[#D4AF37]',
    },
    {
      id: 4,
      frontTitle: 'Reason #4',
      reasonText: 'For giving the warmest, most reassuring hugs whenever I feel low or overwhelmed.',
      icon: '🤗',
      gradient: 'from-[#D4AF37] to-[#9E2A2B]',
    },
    {
      id: 5,
      frontTitle: 'Reason #5',
      reasonText: 'For stealing my favorite hoodie/snacks and pretending you have no idea where it went.',
      icon: '🍕',
      gradient: 'from-[#9E2A2B] to-[#F4A261]',
    },
    {
      id: 6,
      frontTitle: 'Reason #6',
      reasonText: 'Simply for existing and being the most wonderful sibling anyone could ever ask for!',
      icon: '❤️',
      gradient: 'from-[#E07A5F] to-[#D4AF37]',
    },
  ];

  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-8 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Heartfelt Gratitude
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Reasons I Cherish You
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Hover over or tap each card to flip it and reveal why {recipientName || 'you'} mean the world to me.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* 3D Flip Card Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => {
            const isFlipped = flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className="w-full h-56 perspective-1000 cursor-pointer select-none group"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative transform-style-3d shadow-xl rounded-3xl"
                >
                  {/* FRONT OF CARD */}
                  <div className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br ${item.gradient} text-white flex flex-col justify-between items-center text-center border-2 border-[#D4AF37] backface-hidden`}>
                    <div className="w-full flex justify-between items-center">
                      <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
                      <span className="font-cinzel text-xs uppercase tracking-wider font-semibold text-[#F3E5AB]">
                        {item.frontTitle}
                      </span>
                    </div>

                    <div className="my-2">
                      <span className="text-5xl group-hover:scale-125 transition-transform duration-300 inline-block">
                        {item.icon}
                      </span>
                    </div>

                    <div className="inline-flex items-center space-x-1 text-xs text-[#F3E5AB] font-medium bg-black/20 px-3 py-1 rounded-full border border-white/20">
                      <span>Tap to Flip Secret</span>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div className="absolute inset-0 rounded-3xl p-6 bg-[#FAF6EE] border-2 border-[#D4AF37] text-[#2C221E] flex flex-col justify-between items-center text-center rotate-y-180 backface-hidden shadow-inner">
                    <div className="w-full flex justify-between items-center">
                      <Heart className="w-4 h-4 fill-[#9E2A2B] text-[#9E2A2B]" />
                      <span className="font-cinzel text-xs font-bold text-[#9E2A2B]">
                        Revealed Blessing
                      </span>
                    </div>

                    <p className="font-handwritten text-xl sm:text-2xl text-[#2C221E] leading-relaxed px-2 font-medium">
                      "{item.reasonText}"
                    </p>

                    <div className="inline-flex items-center space-x-1 text-[11px] text-[#9E2A2B] font-cinzel font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span>Forever True</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
