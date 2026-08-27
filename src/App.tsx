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

export function App() {
  const [recipientName, setRecipientName] = useState('Brother');
  const [senderName, setSenderName] = useState('Sister');
  const [customMessage, setCustomMessage] = useState(
    `Dearest Brother, through every season of life, your love and presence have been my strongest anchor. Distance may separate our paths, but the sacred thread of Rakhi keeps our souls forever intertwined. Thank you for being my protector, my confidant, and my greatest blessing.`
  );

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0F0C1B] text-[#2C221E] dark:text-[#F4F1DE] transition-colors duration-500 relative overflow-x-hidden selection:bg-[#E07A5F] selection:text-white">
      
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

        {/* Mindful Reflection & Poem */}
        <MindfulReflection recipientName={recipientName} />

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
        <MemoriesGallery recipientName={recipientName} />
      </main>

      {/* Footer */}
      <Footer recipientName={recipientName} senderName={senderName} />

      {/* Customizer Modal for Personalization */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onSave={handleSaveCustomization}
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
