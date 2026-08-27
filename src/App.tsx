import { useState, useEffect } from 'react';
import { PetalParticles } from './components/PetalParticles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MindfulReflection } from './components/MindfulReflection';
import { InteractiveRitual } from './components/InteractiveRitual';
import { PersonalizedWish } from './components/PersonalizedWish';
import { MemoriesGallery } from './components/MemoriesGallery';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';

// Phase 2 Personalization & Micro-interaction Components
import { MauliCursor } from './components/MauliCursor';
import { ShagunEnvelope } from './components/ShagunEnvelope';
import { JourneyTimeline } from './components/JourneyTimeline';
import { TimeCapsule } from './components/TimeCapsule';
import { ReasonsFlipCards } from './components/ReasonsFlipCards';
import { TraceThreadUnlock } from './components/TraceThreadUnlock';
import { DayNightToggle } from './components/DayNightToggle';
import { KnowMoreStoryModal } from './components/KnowMoreStoryModal';
import { RakhiTreasureHunt } from './components/RakhiTreasureHunt';
import { LandingWelcomeScreen } from './components/LandingWelcomeScreen';
import { AdminModal } from './components/AdminModal';
import type { AdminMemory } from './components/AdminModal';
import { Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [recipientName, setRecipientName] = useState('Brijesh');
  const [senderName, setSenderName] = useState('Madhuri');
  const [customMessage, setCustomMessage] = useState(
    `Dearest Brijesh, thank you for everything. Through every season of life, your love and presence have been my strongest anchor. Distance may separate our paths, but the sacred thread of Rakhi keeps our souls forever intertwined. Thank you Brijesh for everything. Lots of love from your sister Madhuri.`
  );

  const [hasEnteredLanding, setHasEnteredLanding] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminMemories, setAdminMemories] = useState<AdminMemory[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSaveCustomization = (recipient: string, sender: string) => {
    setRecipientName(recipient);
    setSenderName(sender);
  };

  const handleMemoryAdded = (memory: AdminMemory) => {
    setAdminMemories((prev) => [memory, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0C1B] text-[#2C221E] dark:text-[#F4F1DE] transition-colors duration-500 relative overflow-x-hidden selection:bg-[#E07A5F] selection:text-white">
      
      {/* Landing Welcome Screen Gate */}
      <AnimatePresence>
        {!hasEnteredLanding && (
          <LandingWelcomeScreen
            recipientName={recipientName}
            senderName={senderName}
            onEnter={() => setHasEnteredLanding(true)}
          />
        )}
      </AnimatePresence>

      {/* Custom Glowing Mauli Cursor & Sparkle Trail */}
      <MauliCursor isReducedMotion={isReducedMotion} />

      {/* Floating Marigold Petals Particle Canvas */}
      <PetalParticles isReducedMotion={isReducedMotion} />

      {/* Dynamic Navbar */}
      <Navbar
        recipientName={recipientName}
        senderName={senderName}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section with Breathing 3D Rakhi & Mouse Parallax */}
        <HeroSection
          recipientName={recipientName}
          senderName={senderName}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Animated "Click on this to Know More" Interactive Banner */}
        <section className="py-12 px-4 sm:px-8 bg-gradient-to-r from-[#9E2A2B]/10 via-[#D4AF37]/15 to-[#E07A5F]/10 border-y border-[#D4AF37]/30 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-left sm:text-left">
              <div className="inline-flex items-center space-x-2 text-[#9E2A2B] text-xs font-cinzel font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
                <span>Uncover Sacred Heritage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C221E] dark:text-[#F4F1DE]">
                The Story Behind the Sacred Thread
              </h3>
              <p className="text-sm text-[#2C221E]/70 dark:text-[#F4F1DE]/70 mt-1 font-light max-w-xl">
                Explore ancient legends, Lord Krishna & Draupadi's covenant, Queen Karnavati's vow, and the spiritual secrets of Raksha Bandhan.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsKnowMoreOpen(true)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#9E2A2B] via-[#E07A5F] to-[#D4AF37] text-white font-medium text-sm shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 shrink-0 group border border-[#D4AF37]/50"
            >
              <BookOpen className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>Click on this to Know More</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </section>

        {/* Mindful Reflection & Poem */}
        <MindfulReflection recipientName={recipientName} />

        {/* Interactive Rakhi Treasure Hunt Game */}
        <RakhiTreasureHunt recipientName={recipientName} senderName={senderName} />

        {/* Phase 2: "Our Journey" Interactive Scroll-Driven Timeline */}
        <JourneyTimeline recipientName={recipientName} senderName={senderName} />

        {/* Interactive Rakhi Tying & Digital Aarti Ritual */}
        <InteractiveRitual recipientName={recipientName} senderName={senderName} />

        {/* Phase 2: Digital 3D Shagun Gift Envelope */}
        <ShagunEnvelope recipientName={recipientName} senderName={senderName} />

        {/* Phase 2: Vintage Voice Time Capsule */}
        <TimeCapsule recipientName={recipientName} senderName={senderName} />

        {/* Phase 2: "Reasons I Cherish You" 3D Flip Cards */}
        <ReasonsFlipCards recipientName={recipientName} senderName={senderName} />

        {/* Personalized Wish Greeting Letter */}
        <PersonalizedWish
          recipientName={recipientName}
          senderName={senderName}
          customMessage={customMessage}
          onUpdateMessage={setCustomMessage}
        />

        {/* Phase 2: "Trace the Thread" Secret Unlock */}
        <TraceThreadUnlock recipientName={recipientName} senderName={senderName} />

        {/* Memory Polaroid Gallery */}
        <MemoriesGallery
          recipientName={recipientName}
          senderName={senderName}
          adminMemories={adminMemories}
        />
      </main>

      {/* Footer with small unhighlighted Admin Login link */}
      <Footer
        recipientName={recipientName}
        senderName={senderName}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Customizer Modal for Personalization */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onSave={handleSaveCustomization}
      />

      {/* Animated Story Lore "Know More" Modal */}
      <KnowMoreStoryModal
        isOpen={isKnowMoreOpen}
        onClose={() => setIsKnowMoreOpen(false)}
        recipientName={recipientName}
      />

      {/* Protected Admin Photo Uploader Portal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onSaveNames={handleSaveCustomization}
        onMemoryAdded={handleMemoryAdded}
      />

      {/* Day/Night & Reduced Motion Accessibility Floating Controls */}
      <DayNightToggle
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={() => setIsReducedMotion(!isReducedMotion)}
      />

    </div>
  );
}

export default App;
