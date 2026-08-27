import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MindfulReflectionProps {
  recipientName?: string;
}

export const MindfulReflection: React.FC<MindfulReflectionProps> = ({ recipientName = 'Brother' }) => {
  const poemWords = [
    "A", "sacred", "thread,", "a", "silent", "vow,",
    "Through", "every", "storm,", "then", "and", "now.",
    "Bound", "by", "love,", "protected", "by", "grace,",
    "No", "distance", "can", "our", "bond", "erase."
  ];

  const pillars = [
    {
      icon: Shield,
      title: "The Silent Shield",
      description: "An unspoken commitment to stand by each other through life's trials and triumphs.",
    },
    {
      icon: Sparkles,
      title: "The Secret Keeper",
      description: "A vault of shared laughter, childhood mischief, and unbreakable trust.",
    },
    {
      icon: Heart,
      title: "The Eternal Friend",
      description: "A relationship that grows richer with time, rooted in pure, unshakeable love.",
    },
  ];

  return (
    <section id="bond" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Mindful Reflection
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            The Essence of Raksha Bandhan
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Word-by-Word Mindful Poem Reveal */}
        <div className="mt-10 p-8 sm:p-12 glass-card rounded-3xl border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl font-serif leading-relaxed text-[#2C221E]/90 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {poemWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={idx % 6 === 0 ? 'text-[#9E2A2B] font-semibold' : ''}
              >
                {word}
              </motion.span>
            ))}
          </p>
          <p className="mt-6 text-xs font-cinzel text-[#E07A5F] tracking-widest uppercase">
            Dedicated to {recipientName}
          </p>
        </div>

        {/* Pillars of the Sacred Bond */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => soundManager.playBlessingSparkle()}
                className="p-8 glass-card rounded-3xl text-left border border-[#D4AF37]/20 shadow-lg hover:border-[#D4AF37] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9E2A2B] to-[#E07A5F] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C221E] mb-2 group-hover:text-[#9E2A2B] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#2C221E]/75 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
