import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
  onOpenWalkthrough?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 28 };

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-slate-900/10 via-slate-800/5 to-slate-900/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        
        {/* Floating Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springConfig, delay: 0.05 }}
          className="animate-float"
        >
          <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs font-bold text-slate-800 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-slate-900" />
              <span>0.38s Sub-Second Check-in Telemetry Active</span>
            </span>
          </div>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-3xl"
        >
          Turn first-time visitors into{' '}
          <span className="text-gradient-indigo relative inline-block">
            loyal regulars automatically.
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-1 left-0 right-0 h-1 bg-slate-900/10 rounded-full origin-left -z-10"
            />
          </span>
        </motion.h1>

        {/* Minimalist Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.25 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
        >
          Cut check-in wait times to zero and prevent member churn. PulseServe unifies lightning-fast QR scanning, live member telemetry, and smart re-engagement triggers for gyms & fitness clubs.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.05, translateY: -2, boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.25)" }}
            whileTap={{ scale: 0.96, translateY: 0 }}
            transition={springConfig}
            onClick={onOpenTrial}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 border border-slate-700/50 group focus:outline-none relative overflow-hidden"
          >
            <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-30" />
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Claim Your 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* SSL Security Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No Credit Card Required • Instant Setup in 2 Minutes</span>
        </motion.div>

      </div>

    </section>
  );
};
