import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenTrial: () => void;
  onOpenWalkthrough: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrial }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 30 };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springConfig}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav 
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
          scrolled 
            ? 'glass-pill shadow-xl bg-white/95 border-slate-200 backdrop-blur-xl scale-[0.99]' 
            : 'glass-pill bg-white/85 border-slate-200/80 backdrop-blur-md'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Mark */}
        <a 
          href="#" 
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-slate-900/20 rounded-full px-2 py-1 transition-transform group-hover:scale-105"
          aria-label="PulseServe Home"
        >
          <Logo size="sm" />
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" title="System Operational" />
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors relative py-1 group">
            For Gyms & Fitness Clubs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300 rounded-full" />
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors relative py-1 group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300 rounded-full" />
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springConfig}
            onClick={onOpenTrial}
            className="hidden sm:inline-flex text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-1.5 rounded-full transition-colors focus:outline-none"
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, translateY: -1, boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)" }}
            whileTap={{ scale: 0.95, translateY: 0 }}
            transition={springConfig}
            onClick={onOpenTrial}
            className="relative group overflow-hidden rounded-full bg-slate-900 hover:bg-slate-800 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-slate-900/25 border border-slate-700/50 focus:outline-none"
          >
            <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Launch Free Trial
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};
