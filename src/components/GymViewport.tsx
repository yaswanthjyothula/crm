import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GymMember } from '../types/crm';
import { 
  QrCode, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Zap, 
  UserCheck, 
  Flame, 
  Search, 
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const INITIAL_MEMBERS: GymMember[] = [
  {
    id: 'mem-101',
    name: 'Marcus Vance',
    avatar: 'MV',
    tier: 'CrossFit Elite',
    status: 'Active',
    checkInTime: 'Just now (1-sec QR)',
    scanMethod: 'QR Camera',
    visitsThisMonth: 18,
    streak: 5
  },
  {
    id: 'mem-102',
    name: 'Elena Rostova',
    avatar: 'ER',
    tier: 'VIP Platinum',
    status: '3 Days Left',
    checkInTime: '2 mins ago',
    scanMethod: 'NFC Pass',
    visitsThisMonth: 22,
    streak: 12
  },
  {
    id: 'mem-103',
    name: 'David Chen',
    avatar: 'DC',
    tier: 'Standard Access',
    status: 'Frozen',
    checkInTime: '8 mins ago',
    scanMethod: 'Phone Lookup',
    visitsThisMonth: 4,
    streak: 0
  },
  {
    id: 'mem-104',
    name: 'Sarah Jenkins',
    avatar: 'SJ',
    tier: 'Morning Pass',
    status: 'Active',
    checkInTime: '14 mins ago',
    scanMethod: 'QR Camera',
    visitsThisMonth: 15,
    streak: 3
  }
];

export const GymViewport: React.FC = () => {
  const [members, setMembers] = useState<GymMember[]>(INITIAL_MEMBERS);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleRenew = (id: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: 'Active', checkInTime: 'Renewed & Checked In!' };
      }
      return m;
    }));
    setLastScanned(id);
    setTimeout(() => setLastScanned(null), 3000);
  };

  const handleSimulateScan = () => {
    const newId = `mem-${Math.floor(Math.random() * 900) + 100}`;
    const names = ['Jordan Lee', 'Aria Montgomery', 'Liam Gallagher', 'Sophia Patel'];
    const tiers: GymMember['tier'][] = ['CrossFit Elite', 'VIP Platinum', 'Standard Access'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
    
    const newMember: GymMember = {
      id: newId,
      name: randomName,
      avatar: randomName.split(' ').map(n => n[0]).join(''),
      tier: randomTier,
      status: 'Active',
      checkInTime: 'Just now (0.34s Scan)',
      scanMethod: 'QR Camera',
      visitsThisMonth: 14,
      streak: 4
    };

    setIsScanning(false);
    setTimeout(() => {
      setMembers(prev => [newMember, ...prev.slice(0, 3)]);
      setLastScanned(newId);
      setIsScanning(true);
    }, 300);
    setTimeout(() => setLastScanned(null), 3000);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={springConfig}
      className="w-full glass-panel rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl overflow-hidden bg-white/90 relative"
    >
      {/* Ambient Gym Background Watermark Image */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-right opacity-10 pointer-events-none -z-0"
        style={{ backgroundImage: `url('/gym-bg.png')`, maskImage: 'linear-gradient(to left, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)' }}
      />
      {/* Top Telemetry Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-slate-900">Equinox Elite Gym Telemetry</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 uppercase tracking-wider">
                Live Terminal
              </span>
            </div>
            <p className="text-xs text-slate-500">Tablet-First Front Desk • Sub-second QR Lookup Engine</p>
          </div>
        </div>

        {/* Real-Time Stats Dials */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-500">Avg Lookup Speed</div>
            <div className="font-display font-extrabold text-base text-emerald-600 flex items-center justify-end gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 0.38 sec
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <div className="text-xs text-slate-500">Gym Occupancy</div>
            <div className="font-display font-extrabold text-base text-slate-900 flex items-center justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-brand-500" /> 142 / 200
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Scanner & Right Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Live Scanner Simulator */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-5 overflow-hidden flex flex-col items-center justify-center min-h-[280px]">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            {/* QR Scan Viewport Frame */}
            <div className="relative w-44 h-44 rounded-2xl border-2 border-dashed border-brand-500/50 p-3 flex flex-col items-center justify-center bg-brand-500/10 backdrop-blur-md shadow-lg shadow-brand-500/10 overflow-hidden">
              
              {/* Animated Laser Beam */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_15px_#818CF8] animate-scan-beam" />
              )}

              <QrCode className="w-20 h-20 text-brand-400 opacity-90" />
              
              <span className="mt-2 text-[11px] font-mono text-brand-300 font-semibold flex items-center gap-1 bg-brand-500/20 px-2 py-0.5 rounded-full border border-brand-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                CAM_01 READY
              </span>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-200 font-medium">Position Member QR Code or Apple Wallet Pass</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Supports Camera scan, Bluetooth NFC & Manual Phone Lookup</p>
            </div>

            {/* Simulate Scan Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
              onClick={handleSimulateScan}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-brand-500/20 border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Simulate 1-Sec Check-in Scan
            </motion.button>
          </div>

          {/* Quick Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member by name, phone or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
            />
          </div>
        </div>

        {/* Right Column: Live Check-in Telemetry Feed */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Live Check-in Feed ({filteredMembers.length})
            </h4>
            <span className="text-[11px] text-slate-400">Auto-synced via PulseServe Telemetry</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member) => {
                const isJustScanned = lastScanned === member.id;
                
                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springConfig}
                    className={`p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isJustScanned 
                        ? 'bg-brand-50 border-brand-400 shadow-md shadow-brand-500/10' 
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80'
                    }`}
                  >
                    {/* Left Member Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-800 shadow-inner">
                          {member.avatar}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900">{member.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-mono">
                            {member.tier}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {member.checkInTime}
                          </span>
                          <span className="flex items-center gap-1 text-amber-600 font-medium">
                            <Flame className="w-3 h-3 text-amber-500" />
                            {member.streak}d streak
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Status Pill & Action */}
                    <div className="flex items-center gap-3">
                      {member.status === 'Active' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      )}

                      {member.status === '3 Days Left' && (
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            3 Days Left
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springConfig}
                            onClick={() => handleRenew(member.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center gap-1 transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            1-Click Renew
                          </motion.button>
                        </div>
                      )}

                      {member.status === 'Frozen' && (
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500/15 text-brand-700 border border-brand-500/30 flex items-center gap-1.5">
                            Frozen
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springConfig}
                            onClick={() => handleRenew(member.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-md flex items-center gap-1 transition-colors"
                          >
                            Unfreeze
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
