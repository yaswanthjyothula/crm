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
    maxCapacity: 120,
    velocitySpeed: '0.38s',
    todayCheckIns: 340,
    status: 'Optimal'
  },
  {
    id: 'loc-3',
    name: 'Northside Flagship',
    city: 'Chicago, IL',
    occupancy: 195,
    maxCapacity: 200,
    velocitySpeed: '0.41s',
    todayCheckIns: 680,
    status: 'Peak Flow'
  }
];

export const BentoGrid: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<MultiLocation>(LOCATIONS[0]);
  const [aiPrompt, setAiPrompt] = useState('Can I renew my gym membership via WhatsApp?');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTypingAi, setIsTypingAi] = useState(false);
  const [lookupMode, setLookupMode] = useState<'qr' | 'phone'>('qr');

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleSimulateAi = (promptText: string) => {
    setAiPrompt(promptText);
    setIsTypingAi(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsTypingAi(false);
      if (promptText.toLowerCase().includes('renew') || promptText.toLowerCase().includes('membership')) {
        setAiResponse('Membership renewal link dispatched via WhatsApp! 20% discount offer applied successfully.');
      } else if (promptText.toLowerCase().includes('table') || promptText.toLowerCase().includes('book')) {
        setAiResponse('Table 04 is currently available for 6 guests. I can hold it for you for 15 minutes!');
      } else {
        setAiResponse('PulseServe Concierge has verified your profile. You have 14 check-ins left this month.');
      }
    }, 1000);
  };

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={springConfig}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-xs font-bold text-slate-800 uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5 text-slate-900" />
          The Core Engine Architecture
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Engineered for high velocity.{' '}
          <span className="text-gradient-indigo">Built for effortless growth.</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 mt-3">
          Core capabilities that eliminate front-desk bottlenecks and maximize operational velocity.
        </p>
      </motion.div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Quadrant 1 (Tall Card - 6 cols): Sub-Second Front-Desk Velocity */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between relative overflow-hidden bg-white/90"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
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
                    lookupMode === 'qr' ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Camera QR
                </button>
                <button
                  onClick={() => setLookupMode('phone')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    lookupMode === 'phone' ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Phone Lookup
                </button>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Live Hardware Sync</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              {lookupMode === 'qr' ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                      QR
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Apple Wallet NFC / Camera QR</div>
                      <div className="text-[11px] text-slate-500 font-mono">Status: Verified Member</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-600 font-bold">
                    0.38s Latency
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                      +1
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">+1 (555) 019-2831</div>
                      <div className="text-[11px] text-slate-500 font-mono">Matched: Marcus Vance</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-600 font-bold">
                    0.42s Index
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quadrant 2 (6 cols): Multi-Branch & Franchise Telemetry */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springConfig, delay: 0.2 }}
          className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between bg-white/90"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Multi-Location Franchise Telemetry</h3>
                  <p className="text-xs text-slate-500">Live floor capacity & cross-outlet telemetry</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                3 Outlets Synced
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Monitor peak capacity, check-in velocity, and turnstile gate status across all your gym locations or restaurant outlets in real time.
            </p>
          </div>

          {/* Interactive Multi-Location Switcher */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    selectedLoc.id === loc.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold truncate">{loc.name.split(' ')[0]}</div>
                  <div className={`text-[10px] font-mono mt-0.5 ${selectedLoc.id === loc.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {loc.occupancy}/{loc.maxCapacity} Capacity
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-slate-900">{selectedLoc.name} ({selectedLoc.city})</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Today's Check-ins: <strong className="text-slate-900">{selectedLoc.todayCheckIns}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {selectedLoc.status}
                </span>
                <div className="text-[10px] text-slate-500 font-mono mt-1">
                  Speed: {selectedLoc.velocitySpeed}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quadrant 3 (Full Width - 12 cols): Autonomous AI Agent & Retention CRM */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...springConfig, delay: 0.3 }}
          className="lg:col-span-12 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl bg-white/90"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xs">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>Autonomous Meta WhatsApp Concierge</span>
              </div>
              
              <h3 className="font-display font-bold text-2xl text-slate-900">
                24/7 Automated Member Re-Engagement & Churn Prevention
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                When a gym member hasn’t scanned in for 14 days, PulseServe triggers a personalized WhatsApp offer automatically. Re-engage dropouts without staff lifting a finger.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button 
                  onClick={() => handleSimulateAi('Can I renew my gym membership via WhatsApp?')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                >
                  "Renew Membership Pass"
                </button>
                <button 
                  onClick={() => handleSimulateAi('Can I book Table 04 for tonight?')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                >
                  "Check Table Booking"
                </button>
              </div>
            </div>

            {/* AI Interactive Chat Simulator */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PulseServe AI Concierge</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">WhatsApp Webhook Active</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 max-w-[85%]">
                  <div className="text-[10px] text-slate-400 font-mono mb-1">User Query</div>
                  <div>{aiPrompt}</div>
                </div>

                {isTypingAi ? (
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 max-w-[85%] ml-auto text-emerald-300 flex items-center gap-2 font-mono">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Concierge processing...</span>
                  </div>
                ) : aiResponse ? (
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30 max-w-[85%] ml-auto text-emerald-300 space-y-1">
                    <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Auto-Dispatched via Meta WhatsApp API
                    </div>
                    <div>{aiResponse}</div>
                  </div>
                ) : null}
              </div>
            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
};
