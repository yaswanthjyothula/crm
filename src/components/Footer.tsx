import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrial }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
    setTimeout(() => {
      onOpenTrial();
    }, 1500);
  };

  return (
    <footer className="relative pt-16 pb-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* High-Contrast Final Banner with Radial Background Lighting */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-slate-900 text-white border border-slate-800 shadow-2xl overflow-hidden mb-16">
        
        {/* Radial Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-500/25 via-indigo-500/20 to-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Instant 14-Day Free Trial • No Credit Card Required
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Upgrade your venue's front-line experience today.
          </h2>

          {/* Inline Email Signup Form */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2 pt-2">
            <div className="w-full relative">
              <input
                type="email"
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  error 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:border-brand-500 focus:ring-brand-500/30'
                }`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={springConfig}
              type="submit"
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-all shadow-lg ${
                subscribed 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : 'bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow-brand-500/30'
              }`}
            >
              {subscribed ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Trial Activated!
                </>
              ) : (
                <>
                  <span>Claim Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {error && (
            <p className="text-xs text-red-400">Please enter a valid email address.</p>
          )}
        </div>
      </div>

      {/* Footer Navigation & Credits */}
      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
          </div>
          <span className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5 text-emerald-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational (99.99% Uptime)</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-900 transition-colors">API Docs</a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-1">
          <span>© {new Date().getFullYear()} PulseServe Inc. Apple HIG Inspired Design.</span>
        </div>

      </div>

    </footer>
  );
};
