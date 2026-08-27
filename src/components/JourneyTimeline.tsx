import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
  imageUrl?: string;
}

interface JourneyTimelineProps {
  recipientName: string;
  senderName: string;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  recipientName,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll progress for the glowing golden SVG thread line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const events: TimelineEvent[] = [
    {
      year: '2010',
      title: 'The Great Vase Incident',
      description: 'The year we accidentally broke Mom’s favorite vase while playing indoor cricket, and vowed never to tell a soul.',
      tag: 'Childhood Shenanigans',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2014',
      title: 'Midnight Snack Heists',
      description: 'Creeping down to the kitchen at 1 AM to steal ice cream and chocolate syrup without waking the household.',
      tag: 'Partners in Crime',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2018',
      title: 'First Big Road Trip',
      description: 'Blasting 90s songs in the car, getting lost on purpose, and realizing how lucky we are to have each other.',
      tag: 'Lifelong Memories',
      imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2022',
      title: 'The Silent Shelter',
      description: 'When life got chaotic, sitting quietly together without needing words was all the reassurance I needed.',
      tag: 'Unconditional Shield',
      imageUrl: 'https://images.unsplash.com/photo-1629837901594-52c6f140fb08?auto=format&fit=crop&w=600&q=80',
    },
    {
      year: '2026',
      title: 'Forever Intertwined',
      description: `Today and always, no matter where life leads us, ${recipientName || 'you'} will always have a special place in my heart.`,
      tag: 'Sacred Bond',
    },
  ];

  return (
    <section id="journey" ref={containerRef} className="relative py-28 px-4 sm:px-8 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center justify-center space-x-1">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Chronicles of Us</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Our Journey Through Time
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Scroll down to trace the golden thread connecting our fondest childhood milestones.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          
          {/* Central Glowing Golden Thread SVG Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 pointer-events-none hidden md:block">
            <svg className="w-full h-full" overflow="visible">
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="4"
              />
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#D4AF37"
                strokeWidth="4"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Timeline Events List */}
          <div className="space-y-12 sm:space-y-16">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Event Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => soundManager.playBlessingSparkle()}
                    className="w-full md:w-1/2 p-6 sm:p-8 glass-card rounded-3xl border border-[#D4AF37]/40 shadow-xl cursor-pointer text-left relative group overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-serif font-extrabold text-[#9E2A2B] group-hover:scale-105 transition-transform">
                        {event.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] text-[11px] font-cinzel font-semibold">
                        {event.tag}
                      </span>
                    </div>

                    {event.imageUrl && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-[#D4AF37]/20 shadow-inner">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-serif font-bold text-[#2C221E] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#2C221E]/80 font-light leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>

                  {/* Central Node Badge */}
                  <div className="my-4 md:my-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-20">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] border-2 border-white shadow-lg flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Grid */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
