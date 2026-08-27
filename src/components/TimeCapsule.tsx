import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Radio, Disc } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TimeCapsuleProps {
  recipientName: string;
  senderName: string;
}

export const TimeCapsule: React.FC<TimeCapsuleProps> = ({
  recipientName,
  senderName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceNoteScript = `Hey ${recipientName || 'there'}, I recorded this little message for you on Raksha Bandhan. No matter how far apart we are or how busy life gets, I want you to know how much I love and cherish you. Thank you for always being my strength, my laughter, and my family. Happy Raksha Bandhan!`;

  const togglePlayback = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      soundManager.toggleAmbientMusic(true);
      soundManager.playBlessingSparkle();

      // Read text using Web Speech API if available
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(voiceNoteScript);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setIsPlaying(false);
          soundManager.toggleAmbientMusic(false);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlaying(false), 8000);
      }
    } else {
      setIsPlaying(false);
      soundManager.toggleAmbientMusic(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  return (
    <section id="capsule" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF2E8] to-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center justify-center space-x-1">
            <Radio className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Nostalgic Audio Memory</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C221E] mt-2">
            Vintage Voice Time Capsule
          </h2>
          <p className="mt-3 text-base text-[#2C221E]/75 max-w-xl mx-auto font-light">
            Press Play on the vintage cassette player to hear a heartfelt voice note from {senderName || 'your sibling'}.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#9E2A2B] via-[#D4AF37] to-[#E07A5F] my-4 mx-auto rounded-full" />
        </motion.div>

        {/* Vintage Cassette Tape Player UI */}
        <div className="mt-10 flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-xl p-6 sm:p-10 rounded-3xl bg-[#2C221E] text-white border-4 border-[#D4AF37] shadow-2xl relative overflow-hidden"
          >
            {/* Wooden Texture Frame Details */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Disc className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-cinzel text-xs tracking-widest text-[#F3E5AB] font-bold">
                  STEREO CASSETTE DECK 1998
                </span>
              </div>
              <span className="text-[10px] font-mono text-green-400 bg-black/60 px-2 py-0.5 rounded border border-green-500/30">
                {isPlaying ? '▶ PLAYING 0:14' : '⏹ READY'}
              </span>
            </div>

            {/* Cassette Tape Window with Spinning Reels */}
            <div className="p-6 rounded-2xl bg-black/80 border-2 border-[#D4AF37]/40 shadow-inner flex items-center justify-around relative">
              
              {/* Left Reel */}
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#D4AF37] bg-slate-900 flex items-center justify-center ${isPlaying ? 'animate-spin-reel' : ''}`}>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-800/80 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/50 mt-2">SIDE A</span>
              </div>

              {/* Tape Center Label */}
              <div className="flex flex-col items-center max-w-[140px] text-center">
                <span className="font-handwritten text-xl text-[#F3E5AB] font-bold">
                  "For {recipientName || 'Dear Brother'}"
                </span>
                <span className="text-[10px] font-cinzel text-white/60 mt-1">
                  Recorded with Love
                </span>
              </div>

              {/* Right Reel */}
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#D4AF37] bg-slate-900 flex items-center justify-center ${isPlaying ? 'animate-spin-reel' : ''}`}>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-800/80 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/50 mt-2">STEREO</span>
              </div>
            </div>

            {/* Equalizer Visualizer Bars */}
            <div className="mt-6 h-10 flex items-end justify-center space-x-1.5 px-4 bg-black/40 rounded-xl p-2 border border-white/10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t bg-gradient-to-t from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : '15%',
                  }}
                />
              ))}
            </div>

            {/* Cassette Controls & Play Button */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={togglePlayback}
                className={`px-8 py-3.5 rounded-full text-sm font-serif font-bold shadow-xl transition-all duration-300 flex items-center space-x-2 border-2 ${
                  isPlaying
                    ? 'bg-[#9E2A2B] border-white text-white scale-105'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#E07A5F] border-[#F3E5AB] text-white hover:scale-105'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-white" />
                    <span>Pause Cassette</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>Play Voice Capsule</span>
                  </>
                )}
              </button>
            </div>

            {/* Transcript Preview */}
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/70 italic">
              "{voiceNoteScript}"
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
