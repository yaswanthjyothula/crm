import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Sparkles, Zap, ShieldCheck, Users } from 'lucide-react';

export const ShowcaseViewport: React.FC = () => {
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  return (
    <div className="w-full glass-panel rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-2xl bg-white/90 overflow-hidden relative">
      <motion.div
        key="gym-showcase"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springConfig}
        className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-[16/9] min-h-[320px] sm:min-h-[480px] bg-slate-900 flex flex-col justify-between p-4 sm:p-8"
      >
        {/* High-Tech Dark Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />

        {/* Top Bar Header Badge Overlay */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
            <Dumbbell className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>Equinox Elite Gym & Fitness Club Operating System</span>
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
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Live Member Access Stream
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1-Click Renewal Automation
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/15">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> PulseServe Gym Operating System v4.2
            </span>
            <span className="font-mono text-emerald-300 font-bold">100% Operational</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
