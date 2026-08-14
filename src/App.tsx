import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { WalkthroughModal } from './components/WalkthroughModal';
import { TrialModal } from './components/TrialModal';
import { GymSuperAdminPanel } from './components/GymSuperAdminPanel';
import { GymTenantPanel } from './components/GymTenantPanel';

export function App() {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [userRole, setUserRole] = useState<'superadmin' | 'tenant' | null>(null);

  if (userRole === 'superadmin') {
    return <GymSuperAdminPanel onSignOut={() => setUserRole(null)} />;
  }

  if (userRole === 'tenant') {
    return <GymTenantPanel onSignOut={() => setUserRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative">
      
      {/* Floating Navbar */}
      <Navbar 
        onOpenTrial={() => setIsTrialOpen(true)}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero & Interactive Telemetry Viewport Switcher */}
        <Hero 
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
        onTenantLogin={() => setUserRole('tenant')}
        onSuperAdminLogin={() => setUserRole('superadmin')}
      />

    </div>
  );
}

export default App;
