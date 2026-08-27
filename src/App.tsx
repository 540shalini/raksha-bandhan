import { useState } from 'react';
import { PetalParticles } from './components/PetalParticles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MindfulReflection } from './components/MindfulReflection';
import { InteractiveRitual } from './components/InteractiveRitual';
import { PersonalizedWish } from './components/PersonalizedWish';
import { MemoriesGallery } from './components/MemoriesGallery';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';

export function App() {
  const [recipientName, setRecipientName] = useState('Brother');
  const [senderName, setSenderName] = useState('Your Sibling');
  const [customMessage, setCustomMessage] = useState(
    'Through every season of life, your love and presence have been my strongest anchor. Distance may separate our paths, but the sacred thread of Rakhi keeps our souls forever intertwined. Thank you for being my protector, my confidant, and my greatest blessing.'
  );
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C221E] relative overflow-x-hidden">
      {/* Floating Marigold Petals Particle Canvas */}
      <PetalParticles />

      {/* Top Navbar */}
      <Navbar
        recipientName={recipientName}
        senderName={senderName}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Single-Page Sections */}
      <main>
        {/* Section 1: Hero Welcome */}
        <HeroSection recipientName={recipientName} senderName={senderName} />

        {/* Section 2: Mindful Reflection */}
        <MindfulReflection />

        {/* Section 3: Interactive Ritual (Tie Rakhi & Aarti) */}
        <InteractiveRitual recipientName={recipientName} senderName={senderName} />

        {/* Section 4: Personalized Wishes Greeting Card */}
        <PersonalizedWish
          recipientName={recipientName}
          senderName={senderName}
          customMessage={customMessage}
          onUpdateMessage={setCustomMessage}
        />

        {/* Section 5: Memories Gallery */}
        <MemoriesGallery recipientName={recipientName} senderName={senderName} />
      </main>

      {/* Footer */}
      <Footer recipientName={recipientName} senderName={senderName} />

      {/* Name & Greeting Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onUpdateRecipient={setRecipientName}
        onUpdateSender={setSenderName}
      />
    </div>
  );
}

export default App;
