import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface Memory {
  id: string;
  url: string;
  caption: string;
}

interface MemoriesGalleryProps {
  recipientName: string;
  senderName?: string;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ recipientName, senderName = 'Sister' }) => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      caption: 'Childhood smiles & endless laughter',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
      caption: 'Annual family festival gathering',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
      caption: 'Shared adventures & summer trips',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1629837901594-52c6f140fb08?auto=format&fit=crop&w=600&q=80',
      caption: 'Forever bound by love',
    },
  ]);

  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newCaption) return;

    soundManager.playBlessingSparkle();

    const newMem: Memory = {
      id: Date.now().toString(),
      url: newUrl,
      caption: newCaption,
    };

    setMemories([newMem, ...memories]);
    setNewUrl('');
    setNewCaption('');
    setIsAdding(false);
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Cherished Vault
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Memories Together
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Polaroid moments capturing our journey from childhood mischief to lifelong companionship.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Add Memory Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-xs font-medium text-[#9E2A2B] hover:bg-[#9E2A2B] hover:text-white transition-all duration-300 shadow-sm flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Family Memory</span>
          </button>
        </div>

        {/* Polaroid Masonry Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((mem, idx) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ scale: 1.04, rotate: (idx % 2 === 0 ? 2 : -2), transition: { duration: 0.2 } }}
              onClick={() => {
                setActiveMemory(mem);
                soundManager.playBlessingSparkle();
              }}
              className="p-4 bg-white rounded-2xl shadow-xl border border-[#D4AF37]/30 text-left cursor-pointer group relative overflow-hidden"
            >
              {/* Top Washi Tape Illusion */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rotate-2 z-10 pointer-events-none" />

              {/* Photo Area */}
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-100 relative">
                <img
                  src={mem.url}
                  alt={mem.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Polaroid Caption */}
              <div className="px-1">
                <p className="font-handwritten text-xl text-[#2C221E] font-medium leading-snug line-clamp-2">
                  "{mem.caption}"
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#9E2A2B] font-cinzel">
                  <span>With {recipientName} & {senderName}</span>
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Polaroid Expand Modal */}
        <AnimatePresence>
          {activeMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setActiveMemory(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-video rounded-2xl overflow-hidden mb-4 shadow-inner">
                  <img
                    src={activeMemory.url}
                    alt={activeMemory.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-cinzel text-[#9E2A2B] font-bold">
                    Special Memory
                  </span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>

                <p className="font-handwritten text-2xl text-[#2C221E] font-semibold">
                  "{activeMemory.caption}"
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Memory Modal Form */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#FAF7F2] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setIsAdding(false)}
                  className="absolute top-6 right-6 p-2 rounded-full text-[#2C221E]/60 hover:text-[#2C221E]"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-serif font-bold text-[#2C221E] mb-4 flex items-center space-x-2">
                  <ImageIcon className="w-6 h-6 text-[#9E2A2B]" />
                  <span>Add New Memory</span>
                </h3>

                <form onSubmit={handleAddMemory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                      Photo Image URL
                    </label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                      Caption / Memory Note
                    </label>
                    <input
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      placeholder="e.g. Summer festival celebration"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 text-xs text-[#2C221E]/70"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#D4AF37] text-white text-xs font-medium shadow-md"
                    >
                      Save Memory
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
