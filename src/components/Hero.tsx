import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
  onOpenWalkthrough?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 30 };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
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
          Cut check-in wait times to zero and prevent member churn. PulseServe unifies lightning-fast QR scanning, live member telemetry, and smart re-engagement triggers for gyms & fitness clubs.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.3 }}
          className="flex justify-center pt-2 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(15, 23, 42, 0.3)" }}
            whileTap={{ scale: 0.96 }}
            transition={springConfig}
            onClick={onOpenTrial}
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 border border-slate-700/50 group focus:outline-none"
          >
            <span>Claim Your 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
};
