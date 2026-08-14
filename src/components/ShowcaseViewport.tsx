import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeType } from '../types/crm';
import { Dumbbell, UtensilsCrossed, Sparkles, CheckCircle2, Zap, ShieldCheck, Clock, Users } from 'lucide-react';

interface ShowcaseViewportProps {
  activeMode: ModeType;
}

export const ShowcaseViewport: React.FC<ShowcaseViewportProps> = ({ activeMode }) => {
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  return (
    <div className="w-full glass-panel rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-2xl bg-white/90 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {activeMode === 'gym' ? (
          <motion.div
            key="gym-showcase"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={springConfig}
            className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[16/9] min-h-[320px] sm:min-h-[480px] bg-slate-900 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Background High-Res Gym Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('/gym-bg.png')` }}
            />

            {/* Gradient Overlays for High Contrast Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/70 pointer-events-none" />

            {/* Top Bar Header Badge Overlay */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
                <Dumbbell className="w-4 h-4 text-brand-400 animate-pulse" />
                <span>Equinox Elite Gym & Fitness Club Terminal</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>0.38s Sub-Second Check-in Telemetry Active</span>
              </div>
            </div>

            {/* Bottom Content Micro-Badges Overlay */}
            <div className="relative z-10 space-y-3 pt-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <Zap className="w-3.5 h-3.5 text-brand-400" /> Camera QR & Apple Wallet Pass
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> 142 Active Members Seated
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1-Click Renewal Automation
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/15">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> PulseServe Gym Tablet OS v4.2
                </span>
                <span className="font-mono text-emerald-300 font-bold">100% Operational</span>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="restaurant-showcase"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={springConfig}
            className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[16/9] min-h-[320px] sm:min-h-[480px] bg-slate-900 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Background High-Res Restaurant Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('/restaurant-bg.png')` }}
            />

            {/* Gradient Overlays for High Contrast Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/70 pointer-events-none" />

            {/* Top Bar Header Badge Overlay */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
                <UtensilsCrossed className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Le Bistro Dine-in Dining Room Floor Map</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/40 text-indigo-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>12 Interactive Tables & Waitlist Telemetry Active</span>
              </div>
            </div>

            {/* Bottom Content Micro-Badges Overlay */}
            <div className="relative z-10 space-y-3 pt-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live Table Turnover Status
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Waitlist SMS Notification Engine
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Guest Allergy Badges & Tab POS Sync
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/15">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> PulseServe Restaurant Tablet OS v4.2
                </span>
                <span className="font-mono text-indigo-300 font-bold">100% Operational</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
