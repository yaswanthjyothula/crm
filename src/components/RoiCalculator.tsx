import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenTrial: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenTrial }) => {
  const [memberCount, setMemberCount] = useState<number>(850);
  const [avgMonthlyValue, setAvgMonthlyValue] = useState<number>(85);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const churnedMembersPerMonth = Math.round(memberCount * 0.07);
  const recoveredMembersMonthly = Math.max(1, Math.round(churnedMembersPerMonth * 0.35));
  const addedMonthlyRevenue = recoveredMembersMonthly * avgMonthlyValue;
  const addedAnnualRevenue = addedMonthlyRevenue * 12;
  const proTierMonthlyCost = 99;
  const roiMultiplier = Math.max(1, Math.round((addedMonthlyRevenue / proTierMonthlyCost) * 10) / 10);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden bg-white/90">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-700 uppercase tracking-widest mb-3">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Churn & Revenue Engine
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Calculate your venue's <span className="text-gradient-indigo">Monthly Recovered Revenue</span>
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Adjust your customer count and ticket size to project real-time retention savings with PulseServe.
              </p>
            </div>

            {/* Slider 1: Active Member / Diner Count */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-600" />
                  Active Members or Monthly Diners:
                </span>
                <span className="text-brand-700 font-mono font-bold text-base px-2.5 py-0.5 rounded-lg bg-brand-50 border border-brand-200">
                  {memberCount.toLocaleString()} profiles
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={memberCount}
                onChange={(e) => setMemberCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>100</span>
                <span>2,500</span>
                <span>5,000+</span>
              </div>
            </div>

            {/* Slider 2: Average Monthly Customer Value */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Average Monthly Value per Customer:
                </span>
                <span className="text-emerald-700 font-mono font-bold text-base px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  ${avgMonthlyValue} / month
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={avgMonthlyValue}
                onChange={(e) => setAvgMonthlyValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$20</span>
                <span>$150</span>
                <span>$300</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Math Projection Results */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  PulseServe ROI Telemetry
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  {roiMultiplier}x ROI
                </span>
              </div>

              {/* Stat 1: Recovered At-Risk Customers */}
              <div>
                <div className="text-xs text-slate-400">Estimated At-Risk Customers Saved Monthly</div>
                <div className="font-display font-extrabold text-2xl text-white flex items-center gap-2 mt-1">
                  <span>{recoveredMembersMonthly} members / month</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded font-mono">
                    +35% save rate
                  </span>
                </div>
              </div>

              {/* Stat 2: Added Revenue */}
              <div className="p-4 rounded-xl bg-brand-500/15 border border-brand-500/30">
                <div className="text-xs text-brand-300 font-semibold">Added Monthly Revenue Generated</div>
                <div className="font-display font-extrabold text-3xl text-emerald-400 font-mono mt-0.5">
                  +${addedMonthlyRevenue.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">/ mo</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Or <strong className="text-white font-mono">${addedAnnualRevenue.toLocaleString()}</strong> in recovered annual ARR
                </div>
              </div>

              {/* CTA trigger */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springConfig}
                onClick={onOpenTrial}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30"
              >
                <span>Unlock Revenue Engine Today</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
