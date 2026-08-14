import { useState } from 'react';
import { ModeType } from './types/crm';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { WalkthroughModal } from './components/WalkthroughModal';
import { TrialModal } from './components/TrialModal';
import { GymSuperAdminPanel } from './components/GymSuperAdminPanel';

export function App() {
  const [activeMode, setActiveMode] = useState<ModeType>('gym');
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isSuperAdminLoggedIn, setIsSuperAdminLoggedIn] = useState(false);

  if (isSuperAdminLoggedIn) {
    return <GymSuperAdminPanel onSignOut={() => setIsSuperAdminLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-500 selection:text-white relative">
      
      {/* Floating Navbar */}
      <Navbar 
        onOpenTrial={() => setIsTrialOpen(true)}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero & Interactive Telemetry Viewport Switcher */}
        <Hero 
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onOpenTrial={() => setIsTrialOpen(true)}
          onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        />

        {/* Unified Transparent Pricing Matrix */}
        <Pricing 
          onOpenTrial={() => setIsTrialOpen(true)}
        />
      </main>

      {/* Frictionless Footer & Final CTA Banner */}
      <Footer 
        onOpenTrial={() => setIsTrialOpen(true)}
      />

      {/* Interactive Walkthrough Demo Modal */}
      <WalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onOpenTrial={() => setIsTrialOpen(true)}
      />

      {/* Sign In / Sign Up Auth Modal */}
      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
        onSuperAdminLogin={() => setIsSuperAdminLoggedIn(true)}
      />

    </div>
  );
}

export default App;
