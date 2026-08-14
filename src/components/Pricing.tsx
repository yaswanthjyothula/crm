import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenTrial: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenTrial }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const tiers = [
    {
      id: 'tier-studio',
      name: 'Boutique Gym',
      description: 'Perfect for single-location boutique fitness clubs or studios.',
      monthlyPrice: 49,
      annualPrice: 39,
      highlighted: false,
      features: [
        'Single gym location',
        'Up to 500 active member profiles',
        '1-Second QR tablet check-ins',
        'Basic SMS check-in logs',
        'Standard email support',
        '99.9% SLA Uptime'
      ]
    },
    {
      id: 'tier-pro',
      name: 'Pro Gym Operator',
      description: 'Designed for fast-growing fitness clubs & multi-room facilities.',
      monthlyPrice: 99,
      annualPrice: 79,
      highlighted: true,
      badge: 'Most Popular',
      features: [
        'Unlimited member profiles',
        'Full Meta WhatsApp Retention Engine',
        'Turnstile biometric gate rules',
        'Automated inactivity dropout detector',
        'Multi-staff permissions & PINs',
        'Real-time floor capacity telemetry',
        '24/7 Priority support'
      ]
    },
    {
      id: 'tier-enterprise',
      name: 'Enterprise Franchise',
      description: 'Built for multi-branch gym chains, franchises, and enterprise networks.',
      monthlyPrice: 199,
      annualPrice: 159,
      highlighted: false,
      features: [
        'Unlimited locations & branches',
        'Custom POS & Mindbody API sync',
        'Autonomous AI Concierge Agent',
        'Multi-branch global telemetry dial',
        'Dedicated SLA & Success Manager',
        'Custom SSO & Security Audit'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={springConfig}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
          <Zap className="w-3.5 h-3.5 text-slate-900" />
          Transparent & Predictable Pricing
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Simple pricing for <span className="text-gradient-indigo">maximum velocity.</span>
        </h2>
        <p className="text-base text-slate-600 mt-2">
          Start with a 14-day free trial. Cancel or upgrade anytime with zero hidden fees.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner relative">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              !isAnnual ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {!isAnnual && (
              <motion.span
                layoutId="pricingTogglePill"
                transition={springConfig}
                className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
              />
            )}
            Monthly Billing
          </button>

          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              isAnnual ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAnnual && (
              <motion.span
                layoutId="pricingTogglePill"
                transition={springConfig}
                className="absolute inset-0 bg-slate-900 rounded-full shadow-md -z-10"
              />
            )}
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier, idx) => {
          const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ ...springConfig, delay: idx * 0.1 }}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlighted
                  ? 'glass-panel bg-white border-2 border-slate-900 shadow-2xl shadow-slate-900/15 scale-[1.03]'
                  : 'glass-panel bg-white/90 border border-slate-200 hover:border-slate-300 shadow-lg'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-xl text-slate-900">{tier.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{tier.description}</p>

                {/* Price Display */}
                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {isAnnual ? `Billed annually ($${price * 12}/yr)` : 'Billed monthly'}
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Included Features</span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.highlighted ? 'bg-slate-900 text-white' : 'bg-slate-100 text-emerald-600'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springConfig}
                  onClick={onOpenTrial}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    tier.highlighted
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/25 border border-slate-700/50'
                      : 'glass-button text-slate-800 hover:text-slate-900 border-slate-300'
                  }`}
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
