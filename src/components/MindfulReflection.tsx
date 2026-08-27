import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Smile, Sparkles, Feather } from 'lucide-react';

export const MindfulReflection: React.FC = () => {
  const poemLines = [
    "Across the quiet distance of years,",
    "Through silent laughter and gentle tears,",
    "A thread woven with devotion holds us near.",
    "Not merely silk, but a sacred promise forever clear."
  ];

  const [visibleWordIndex, setVisibleWordIndex] = useState<number>(0);
  const fullPoem = poemLines.join(" ");
  const words = fullPoem.split(" ");

  useEffect(() => {
    if (visibleWordIndex < words.length) {
      const timer = setTimeout(() => {
        setVisibleWordIndex((prev) => prev + 1);
      }, 140); // Gentle pacing for slow, mindful reading
      return () => clearTimeout(timer);
    }
  }, [visibleWordIndex, words.length]);

  const bondPillars = [
    {
      icon: ShieldCheck,
      title: "The Silent Shield",
      description: "An unwritten vow to stand by each other through life's unpredictable storms, offering shelter without asking for return.",
      gradient: "from-[#E07A5F]/20 to-[#9E2A2B]/10"
    },
    {
      icon: HeartHandshake,
      title: "The Secret Keeper",
      description: "A vault of childhood confessions, midnight conversations, and shared glances that speak volumes without a single word.",
      gradient: "from-[#D4AF37]/20 to-[#E07A5F]/10"
    },
    {
      icon: Smile,
      title: "The Eternal Friend",
      description: "No matter how far life's roads diverge, coming back together always feels like stepping right back home.",
      gradient: "from-[#F4A261]/20 to-[#D4AF37]/10"
    }
  ];

  return (
    <section id="bond" className="relative py-24 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2]">
      {/* Shifting Soft Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E07A5F]/10 to-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#9E2A2B]/10 to-[#F4A261]/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Feather className="w-6 h-6 text-[#E07A5F] mb-3" />
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Mindful Pause & Reflection
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            The Eternal Thread of Belonging
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 rounded-full" />
        </motion.div>

        {/* Mindful Word-by-Word Poetic Reading Box */}
        <div className="mt-8 mb-16 p-8 sm:p-12 glass-card rounded-3xl border border-[#D4AF37]/30 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-5 h-5 text-[#D4AF37]/50" />
          <p className="text-xl sm:text-2xl font-serif text-[#2C221E] italic leading-relaxed min-h-[120px] flex flex-wrap justify-center items-center gap-1.5">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{
                  opacity: idx <= visibleWordIndex ? 1 : 0.1,
                  y: idx <= visibleWordIndex ? 0 : 6
                }}
                transition={{ duration: 0.4 }}
                className={idx <= visibleWordIndex ? 'text-[#9E2A2B] font-medium' : 'text-[#2C221E]/20'}
              >
                {word}
              </motion.span>
            ))}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setVisibleWordIndex(0)}
              className="text-xs text-[#E07A5F] hover:text-[#9E2A2B] font-medium tracking-wider uppercase underline underline-offset-4 transition-colors"
            >
              Replay Meditation
            </button>
          </div>
        </div>

        {/* Pillars of Sibling Bond Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {bondPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-b ${pillar.gradient} border border-[#D4AF37]/30 glass-card text-left flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#9E2A2B]/10 border border-[#9E2A2B]/20 flex items-center justify-center mb-5 text-[#9E2A2B]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2C221E] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#2C221E]/80 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center text-xs font-cinzel text-[#9E2A2B] font-semibold">
                  <span>Forever Cherished</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
