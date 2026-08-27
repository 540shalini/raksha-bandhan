import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plus, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface Memory {
  id: string;
  title: string;
  caption: string;
  year: string;
  imageUrl: string;
}

interface MemoriesGalleryProps {
  recipientName: string;
  senderName: string;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  recipientName,
}) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Default Nostalgic Sibling & Festival Memories
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      title: 'First Childhood Rakhi',
      caption: 'The innocence of little hands tying silk threads and giggling over sweet boxes.',
      year: '2012',
      imageUrl: 'https://images.unsplash.com/photo-1629837901594-52c6f140fb08?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Festival Laughter',
      caption: 'When we stayed up late sharing stories, stealing festival sweets, and making promises.',
      year: '2016',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Aarti & Blessings',
      caption: 'The sacred flame reflecting the warmth of your smile and unconditional protection.',
      year: '2020',
      imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      title: 'Unspoken Bond',
      caption: 'Through every triumph and challenge, knowing I always have a home in your heart.',
      year: '2024',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newYear, setNewYear] = useState('2026');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCaption) return;

    const newMem: Memory = {
      id: Date.now().toString(),
      title: newTitle,
      caption: newCaption,
      year: newYear || '2026',
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1629837901594-52c6f140fb08?auto=format&fit=crop&w=800&q=80',
    };

    setMemories([newMem, ...memories]);
    soundManager.playBlessingSparkle();
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-8 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
            Nostalgic Keepsakes
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Memories Gallery
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Polaroid moments capturing our laughter, shared secrets, and lifelong togetherness with {recipientName || 'each other'}.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Add Memory Button */}
        <div className="mt-4 mb-12 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/60 text-[#9E2A2B] text-xs font-semibold hover:bg-[#9E2A2B] hover:text-white transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Photo Memory</span>
          </button>
        </div>

        {/* Polaroid Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((memory, idx) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{
                y: -10,
                rotate: (idx % 2 === 0 ? 2 : -2),
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              onClick={() => {
                setSelectedMemory(memory);
                soundManager.playBlessingSparkle();
              }}
              className="cursor-pointer group bg-white p-4 rounded-xl shadow-lg border border-[#D4AF37]/20 relative text-left flex flex-col justify-between"
            >
              {/* Tape Effect on Top of Polaroid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#F59E0B]/20 border border-[#F59E0B]/30 rotate-1 backdrop-blur-sm z-20" />

              {/* Photo Container */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-4">
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-cinzel">
                  <span>✨ Tap to expand memory</span>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-[#2C221E] group-hover:text-[#9E2A2B] transition-colors">
                    {memory.title}
                  </h3>
                  <span className="text-xs font-cinzel text-[#9E2A2B] font-semibold">
                    {memory.year}
                  </span>
                </div>
                <p className="mt-1 text-sm font-handwritten text-[#2C221E]/80 line-clamp-2">
                  "{memory.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MEMORY EXPAND MODAL */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FAF6EE] max-w-xl w-full p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] flex items-center justify-center hover:bg-[#9E2A2B] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/30 shadow-md">
                  <img
                    src={selectedMemory.imageUrl}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#2C221E]">
                    {selectedMemory.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] text-xs font-cinzel font-bold">
                    {selectedMemory.year}
                  </span>
                </div>

                <p className="text-xl font-handwritten text-[#9E2A2B] leading-relaxed">
                  "{selectedMemory.caption}"
                </p>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#E07A5F] text-white text-xs font-medium shadow-md"
                  >
                    Close Memory
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ADD NEW MEMORY MODAL */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setIsAddModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FAF6EE] max-w-lg w-full p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#9E2A2B]/10 text-[#9E2A2B] flex items-center justify-center hover:bg-[#9E2A2B] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-2xl font-serif font-bold text-[#2C221E] mb-2 flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-[#9E2A2B]" />
                  <span>Add Sibling Memory</span>
                </h3>
                <p className="text-xs text-[#2C221E]/70 mb-6">
                  Add your own childhood photo URL and heartfelt caption to personalize the gallery.
                </p>

                <form onSubmit={handleAddMemory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                      Memory Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Summer Vacation Battle"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        placeholder="2024"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                        Photo Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-semibold text-[#9E2A2B] mb-1">
                      Heartfelt Caption
                    </label>
                    <textarea
                      placeholder="Describe this cherished moment..."
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      rows={3}
                      required
                      className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-sm font-handwritten text-lg focus:outline-none focus:ring-2 focus:ring-[#9E2A2B]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9E2A2B] to-[#E07A5F] text-white text-xs font-medium shadow-md"
                    >
                      Save Memory
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
