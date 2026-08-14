import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTenantLogin: () => void;
  onSuperAdminLogin: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ 
  isOpen, 
  onClose, 
  onTenantLogin, 
  onSuperAdminLogin 
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'password123') {
      onSuperAdminLogin();
      onClose();
      return;
    }
    onTenantLogin();
    onClose();
  };

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

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={springConfig}
          className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl overflow-hidden bg-white text-slate-900"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

            <div className="space-y-5">
              
              {/* Header Logo & Title */}
              <div className="text-center space-y-1">
                <Logo size="sm" />
                <p className="text-xs text-slate-500 pt-1">
                  {authMode === 'signin' ? 'Welcome back! Log in to your venue portal.' : 'Create your 14-day free trial account.'}
                </p>
              </div>

              {/* Segmented Auth Mode Switcher */}
              <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex items-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                    authMode === 'signin'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                    authMode === 'signup'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="owner@venue.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    {authMode === 'signin' && (
                      <a href="#" className="text-[11px] text-slate-900 font-semibold hover:underline">Forgot password?</a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springConfig}
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/25 border border-slate-700/50"
                  >
                    <span>{authMode === 'signin' ? 'Sign In to PulseServe' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>



                <div className="text-center pt-1">
                  <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    256-bit Encrypted SSL Connection
                  </span>
                </div>

              </form>
            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
