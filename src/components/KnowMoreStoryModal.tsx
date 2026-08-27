import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Shield, Sun, ChevronRight, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Story {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  fullStory: string;
  image: string;
  tag: string;
}

interface KnowMoreStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

export const KnowMoreStoryModal: React.FC<KnowMoreStoryModalProps> = ({
  isOpen,
  onClose,
  recipientName,
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 'krishna-draupadi',
      title: 'Lord Krishna & Draupadi',
      subtitle: 'The Sacred Garment of Eternal Protection',
      icon: <Heart className="w-5 h-5 text-[#9E2A2B]" />,
      summary: 'When Krishna cut his finger during the Sudarshana Chakra dispatch, Draupadi tore a piece of her royal saree to bind his wound.',
      fullStory: 'Deep within Indian epic traditions, when Lord Krishna accidentally cut his finger during battle, Queen Draupadi immediately tore a piece of her silk saree and tied it around his hand to stop the bleeding. Moved by her selfless devotion, Krishna promised to protect her honor whenever she was in distress. Years later, during the critical moment in the royal court, Krishna extended her saree infinitely to protect her dignity. This sacred bond represents the ultimate vow of unconditional protection and sisterly care.',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
      tag: 'Mythological Origin',
    },
    {
      id: 'karnavati-humayun',
      title: 'Queen Karnavati & Humayun',
      subtitle: 'The Thread Across Kingdoms',
      icon: <Shield className="w-5 h-5 text-[#D4AF37]" />,
      summary: 'Facing an invasion of Chittorgarh, Queen Karnavati sent a Rakhi thread to Mughal Emperor Humayun, forging a historical treaty of sibling protection.',
      fullStory: 'In the 16th century, Rani Karnavati of Mewar was facing imminent invasion by Bahadur Shah. Realizing her kingdom was vulnerable, she dispatched a sacred thread of Rakhi to Emperor Humayun, addressing him as her brother and asking for aid. Overwhelmed by the sacred honor of the Rakhi thread, Humayun immediately abandoned his ongoing military campaign and marched his army to protect Chittorgarh, establishing Raksha Bandhan as a ritual that transcends all barriers.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      tag: 'Historical Legend',
    },
    {
      id: 'mauli-symbolism',
      title: 'The Sacred Mauli & Tilak',
      subtitle: 'Spiritual Science of the Red Thread',
      icon: <Sun className="w-5 h-5 text-[#E07A5F]" />,
      summary: 'The crimson cotton thread (Mauli) symbolizes cosmic energy, while the vermilion Tilak activates the Ajna Chakra.',
      fullStory: 'The traditional Rakhi thread, crafted from spun cotton (Mauli) dyed in turmeric and vermilion, carries deep spiritual science. When tied around the right wrist, it stimulates essential pressure points connected to vitality and emotional balance. Applying the Akshat (unbroken rice grains) with red Chandan on the forehead during the Aarti ceremony invokes focus, prosperity, and cosmic peace for the loved one.',
      image: 'https://images.unsplash.com/photo-1629837901594-52c6f140fb08?auto=format&fit=crop&w=800&q=80',
      tag: 'Spiritual Significance',
    },
    {
      id: 'modern-vow',
      title: 'The Bond with ' + recipientName,
      subtitle: 'A Modern Tribute to Lifelong Companionship',
      icon: <Award className="w-5 h-5 text-[#3D405B]" />,
      summary: 'Beyond ancient lore, Raksha Bandhan is a celebration of shared secrets, endless support, and a promise to stand by each other always.',
      fullStory: `Raksha Bandhan today is not just about rituals—it is a heartfelt reminder of all the shared laughter, secret compromises, childhood memories, and unspoken vows between siblings. For ${recipientName}, this digital tribute serves as an eternal promise: no matter where life leads, the protective golden thread of unconditional love and togetherness will always keep you connected.`,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
      tag: 'Personalized Tribute',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white text-[#2C221E]/70 hover:text-[#9E2A2B] hover:bg-[#FAF2E8] transition-colors shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] font-cinzel text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Sacred Lore & Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C221E]">
                Discover the Magic of Raksha Bandhan
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#2C221E]/75 font-light">
                Explore the timeless legends, spiritual symbolism, and deep emotional heritage that make this sacred thread unbreakable.
              </p>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] mx-auto mt-4 rounded-full" />
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedStory(story);
                    soundManager.playBlessingSparkle();
                  }}
                  className="p-6 bg-white rounded-2xl border border-[#D4AF37]/30 shadow-lg cursor-pointer hover:border-[#D4AF37] hover:shadow-xl transition-all relative overflow-hidden group flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent rounded-bl-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#9E2A2B] px-2.5 py-1 rounded-md bg-[#9E2A2B]/10">
                        {story.tag}
                      </span>
                      <div className="p-2 rounded-full bg-[#FAF7F2]">
                        {story.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#2C221E] group-hover:text-[#9E2A2B] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs font-medium text-[#D4AF37] mt-0.5 mb-3">
                      {story.subtitle}
                    </p>
                    <p className="text-xs text-[#2C221E]/75 font-light line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#9E2A2B] group-hover:translate-x-1 transition-transform">
                    <span>Click on this to Know More</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detailed Story Reader Modal */}
            <AnimatePresence>
              {selectedStory && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative max-h-[85vh] overflow-y-auto text-left"
                  >
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
                      <img
                        src={selectedStory.image}
                        alt={selectedStory.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="text-xs font-cinzel font-bold text-[#9E2A2B] uppercase tracking-wider">
                      {selectedStory.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C221E] mt-1">
                      {selectedStory.title}
                    </h3>
                    <p className="text-sm font-medium text-[#D4AF37] mb-4">
                      {selectedStory.subtitle}
                    </p>

                    <div className="w-12 h-0.5 bg-[#9E2A2B] mb-4" />

                    <p className="text-sm sm:text-base text-[#2C221E]/85 font-light leading-relaxed whitespace-pre-line">
                      {selectedStory.fullStory}
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setSelectedStory(null)}
                        className="px-6 py-2 rounded-full bg-[#9E2A2B] text-white text-xs font-medium hover:bg-[#802022] transition-colors"
                      >
                        Back to Stories
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
