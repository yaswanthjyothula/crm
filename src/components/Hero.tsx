import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeType } from '../types/crm';
import { ModeSwitcher } from './ModeSwitcher';
import { ShowcaseViewport } from './ShowcaseViewport';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  activeMode: ModeType;
  onModeChange: (mode: ModeType) => void;
  onOpenTrial: () => void;
  onOpenWalkthrough?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeMode,
  onModeChange,
  onOpenTrial
}) => {
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 30 };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Dynamic Ambient Background Image Crossfade */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {activeMode === 'gym' ? (
            <motion.div
              key="bg-gym"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.18, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: `url('/gym-bg.png')` }}
            />
          ) : (
            <motion.div
              key="bg-restaurant"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.18, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: `url('/restaurant-bg.png')` }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/15 via-indigo-500/10 to-blue-400/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        
        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-3xl"
        >
          Turn first-time visitors into{' '}
          <span className="text-gradient-indigo">loyal regulars automatically.</span>
        </motion.h1>

        {/* Minimalist Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
        >
          Cut check-in wait times to zero and prevent customer churn. PulseServe unifies lightning-fast QR scanning, live table turnover maps, and smart re-engagement triggers.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.3 }}
          className="flex justify-center pt-2 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.96 }}
            transition={springConfig}
            onClick={onOpenTrial}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-500 via-indigo-600 to-indigo-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-brand-500/20 border border-brand-400/30 group focus:outline-none"
          >
            <span>Claim Your 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Segmented Mode Switcher */}
      <div className="mt-12 mb-8 flex justify-center">
        <ModeSwitcher activeMode={activeMode} onModeChange={onModeChange} />
      </div>

      {/* Image Showcase Viewport Area */}
      <div className="mt-4">
        <ShowcaseViewport activeMode={activeMode} />
      </div>

    </section>
  );
};
