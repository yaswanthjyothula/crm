import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle2, QrCode, Utensils, MessageSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial: () => void;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({
  isOpen,
  onClose,
  onOpenTrial
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const steps = [
    {
      title: '01. Sub-Second QR Check-in',
      subtitle: 'Tablet Front-Desk Velocity',
      description: 'Members present their camera QR pass or NFC wallet card. PulseServe verifies active status, flags expiring memberships, and logs entry in under 400ms.',
      icon: QrCode,
      tag: '0.38s Lookup Speed',
      previewContent: (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
            <QrCode className="w-8 h-8 animate-pulse" />
          </div>
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Verified: Marcus Vance (CrossFit Elite)
            </span>
            <p className="text-[11px] text-slate-400 mt-2">NFC Wallet pass detected • Streak: 12 Days</p>
          </div>
        </div>
      )
    },
    {
      title: '02. Interactive Floor Telemetry',
      subtitle: 'Live Dining & Gym Floor Map',
      description: 'Inspect live table occupancy, seated durations, tab balances, and allergy alerts (Gluten-Free, VIP Guest) across 12 customizable interactive floor plan zones.',
      icon: Utensils,
      tag: 'SVG Live Telemetry',
      previewContent: (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white flex flex-col items-center justify-center space-y-3">
          <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 text-center">T1 Available</div>
            <div className="p-2 rounded-lg bg-brand-500/20 border border-brand-500/40 text-[10px] font-bold text-brand-300 text-center">T2 Seated (42m)</div>
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-400 text-center">T3 Bill Printed</div>
          </div>
          <p className="text-[11px] text-slate-400">Waitlist SMS dispatcher automatically seats walk-in parties.</p>
        </div>
      )
    },
    {
      title: '03. WhatsApp Retention Drips',
      subtitle: 'Meta WhatsApp Business API',
      description: 'Trigger personalized WhatsApp renewal passes automatically when member inactivity passes 10 days. Recovers up to 35% of churning subscriptions.',
      icon: MessageSquare,
      tag: 'Meta API Engine',
      previewContent: (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white flex flex-col items-center justify-center space-y-3">
          <div className="bg-[#005C4B] p-3 rounded-2xl text-white text-xs max-w-xs border border-emerald-400/30">
            <p>Hey Alex! We miss you at Equinox. Use code <strong>RENEW20</strong> for 20% off your monthly pass! 🏋️</p>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" /> Auto-dispatched 10:00 AM
          </span>
        </div>
      )
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={springConfig}
          className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl overflow-hidden bg-white text-slate-900"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600">
              <Play className="w-4 h-4 fill-brand-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">PulseServe 90-Second Walkthrough</h3>
              <p className="text-xs text-slate-500">Interactive Feature Tour & Telemetry Guide</p>
            </div>
          </div>

          {/* Step Selector Pills */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4 overflow-x-auto custom-scrollbar">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
                    activeStep === idx
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <StepIcon className="w-3.5 h-3.5" />
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-brand-600 uppercase tracking-wider">
                  {steps[activeStep].subtitle}
                </span>
                <h4 className="font-display font-extrabold text-xl text-slate-900 mt-1">
                  {steps[activeStep].title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {steps[activeStep].description}
              </p>
              
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  {steps[activeStep].tag}
                </span>
              </div>
            </div>

            <div className="md:col-span-6">
              {steps[activeStep].previewContent}
            </div>

          </div>

          {/* Modal Footer CTAs */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full WCAG 2.1 AA Compliant Tablet Operating System</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
              onClick={() => {
                onClose();
                onOpenTrial();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <span>Launch 14-Day Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
