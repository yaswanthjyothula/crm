import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MultiLocation } from '../types/crm';
import { 
  Zap, 
  Bot, 
  Building2, 
  Gauge, 
  Camera, 
  Phone, 
  Sparkles, 
  Layers
} from 'lucide-react';

const LOCATIONS: MultiLocation[] = [
  {
    id: 'loc-1',
    name: 'Downtown Club & Spa',
    city: 'New York, NY',
    occupancy: 142,
    maxCapacity: 200,
    velocitySpeed: '0.34s',
    todayCheckIns: 512,
    status: 'Optimal'
  },
  {
    id: 'loc-2',
    name: 'Westside Studio',
    city: 'Los Angeles, CA',
    occupancy: 88,
    maxCapacity: 100,
    velocitySpeed: '0.38s',
    todayCheckIns: 340,
    status: 'High Occupancy'
  },
  {
    id: 'loc-3',
    name: 'Midtown Bistro & Lounge',
    city: 'Chicago, IL',
    occupancy: 64,
    maxCapacity: 90,
    velocitySpeed: '0.41s',
    todayCheckIns: 285,
    status: 'Optimal'
  }
];

export const BentoGrid: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<MultiLocation>(LOCATIONS[0]);
  const [aiPrompt, setAiPrompt] = useState('Can I renew my gym membership via WhatsApp?');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTypingAi, setIsTypingAi] = useState(false);
  const [lookupMode, setLookupMode] = useState<'qr' | 'phone'>('qr');

  const handleSimulateAi = (promptText: string) => {
    setAiPrompt(promptText);
    setIsTypingAi(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsTypingAi(false);
      if (promptText.includes('renew')) {
        setAiResponse('Certainly! I sent a 1-click renewal link to your WhatsApp. Tap to renew with 20% off!');
      } else if (promptText.includes('Table')) {
        setAiResponse('Table 04 is currently available for 6 guests. I can hold it for you for 15 minutes!');
      } else {
        setAiResponse('PulseServe Concierge has verified your profile. You have 14 check-ins left this month.');
      }
    }, 1000);
  };

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-700 uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          The Core Engine Architecture
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Engineered for high velocity.{' '}
          <span className="text-gradient-indigo">Built for effortless growth.</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-3">
          Core capabilities that eliminate front-desk bottlenecks and maximize operational velocity.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Quadrant 2 (Tall Card - 6 cols): Sub-Second Front-Desk Velocity */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between relative overflow-hidden bg-white/90">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600">
                  <Gauge className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Sub-Second Velocity Engine</h3>
                  <p className="text-xs text-slate-500">0.38s average profile verification</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                ⚡ 3.4x Faster Than Legacy CRM
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Eliminate peak-hour check-in lines. PulseServe’s camera QR engine and instant phone index verify memberships and table bookings in under 400 milliseconds.
            </p>
          </div>

          {/* Interactive Velocity Telemetry Visualizer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLookupMode('qr')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    lookupMode === 'qr' ? 'bg-brand-500 text-white shadow' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Camera QR
                </button>
                <button
                  onClick={() => setLookupMode('phone')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    lookupMode === 'phone' ? 'bg-brand-500 text-white shadow' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Phone Index
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 380 ms
              </span>
            </div>

            {/* Speed Graph Bar Simulation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>PulseServe QR Engine</span>
                <span className="text-emerald-600 font-bold">0.38s</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden p-0.5 border border-slate-300">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-500 shadow-md"
                />
              </div>

              <div className="flex justify-between text-xs text-slate-400 pt-1">
                <span>Legacy Manual CRM Lookup</span>
                <span>4.20s</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="w-1/4 h-full rounded-full bg-slate-400" />
              </div>
            </div>
          </div>

        </div>

        {/* Quadrant 3 (Square Card - 3 cols): Multi-Location Operations */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between bg-white/90">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">Multi-Location Sync</h3>
                <p className="text-xs text-slate-500">Unified Chain Control</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Real-time occupancy dials across all branches with unified guest profile synchronization.
            </p>
          </div>

          {/* Branch Switcher Selector */}
          <div className="space-y-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedLoc.id === loc.id
                    ? 'bg-brand-50 border-brand-500 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{loc.name}</div>
                  <div className="text-[10px] text-slate-500">{loc.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-brand-700">
                    {loc.occupancy}/{loc.maxCapacity}
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold">{loc.status}</div>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Quadrant 4 (Square Card - 3 cols): Autonomous AI Concierge */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between bg-white/90">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600">
                <Bot className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">Autonomous AI Agent</h3>
                <p className="text-xs text-slate-500">24/7 Guest Assistant</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Handles class bookings, membership renewals, and table reservations without human intervention.
            </p>
          </div>

          {/* AI Chat Interactive Box */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-[10px] uppercase font-bold text-purple-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Try AI Concierge Prompts:
            </div>

            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => handleSimulateAi('Renew my gym pass')}
                className="px-2 py-1 rounded bg-white hover:bg-slate-100 text-[10px] text-slate-700 transition-colors border border-slate-200 shadow-xs"
              >
                "Renew pass"
              </button>
              <button
                onClick={() => handleSimulateAi('Reserve Table 4')}
                className="px-2 py-1 rounded bg-white hover:bg-slate-100 text-[10px] text-slate-700 transition-colors border border-slate-200 shadow-xs"
              >
                "Reserve Table 4"
              </button>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200 min-h-[70px] text-xs shadow-xs">
              {isTypingAi ? (
                <span className="text-slate-400 animate-pulse text-[11px]">AI Concierge thinking...</span>
              ) : aiResponse ? (
                <p className="text-emerald-700 text-[11px] font-medium leading-tight">{aiResponse}</p>
              ) : (
                <p className="text-slate-500 text-[11px]">Prompt: "{aiPrompt}"</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
