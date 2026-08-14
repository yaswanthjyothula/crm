import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GymMember, AtRiskMember, WhatsAppNode } from '../types/crm';
import { Logo } from './Logo';
import { 
  Building2, 
  UserCheck, 
  LogOut, 
  Sparkles, 
  QrCode, 
  TrendingUp, 
  Dumbbell,
  X,
  MessageSquare,
  Menu,
  Plus,
  Search,
  Check,
  Zap,
  Flame,
  ShieldCheck,
  Send,
  Users
} from 'lucide-react';

interface GymTenantPanelProps {
  tenantName?: string;
  onSignOut: () => void;
}

const INITIAL_MEMBERS: GymMember[] = [
  {
    id: 'mem-101',
    name: 'Marcus Vance',
    avatar: 'MV',
    tier: 'CrossFit Elite',
    status: 'Active',
    checkInTime: 'Just now (0.38s QR)',
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
    status: 'Expired',
    checkInTime: '15 mins ago',
    scanMethod: 'QR Camera',
    visitsThisMonth: 11,
    streak: 2
  }
];

const AT_RISK_MEMBERS: AtRiskMember[] = [
  { id: 'risk-1', name: 'Rachel Green', daysInactive: 14, phone: '+1 (555) 019-2831', lastVisit: '14 days ago', planExpiry: '2026-08-30', reengagementStatus: 'Pending' },
  { id: 'risk-2', name: 'Joey Tribbiani', daysInactive: 21, phone: '+1 (555) 847-1029', lastVisit: '21 days ago', planExpiry: '2026-08-22', reengagementStatus: 'Sent WhatsApp' },
  { id: 'risk-3', name: 'Chandler Bing', daysInactive: 18, phone: '+1 (555) 392-0192', lastVisit: '18 days ago', planExpiry: '2026-09-05', reengagementStatus: 'Recovered' },
];

const AUTOMATION_NODES: WhatsAppNode[] = [
  { id: 'n-1', type: 'trigger', title: '14-Day Inactivity Dropout Trigger', description: 'Triggers when a member hasn\'t scanned QR gate in 14 days.', iconName: 'AlertTriangle', active: true },
  { id: 'n-2', type: 'delay', title: 'Smart Delay (Wait 2 Hours)', description: 'Waits for peak evening hours before dispatching message.', iconName: 'Clock', active: true },
  { id: 'n-3', type: 'action', title: 'Dispatch WhatsApp Offer', description: 'Sends "We miss you! 20% off renewal pass" message.', iconName: 'MessageSquare', active: true },
];

export const GymTenantPanel: React.FC<GymTenantPanelProps> = ({ 
  tenantName = "Equinox Downtown Gym Outlet", 
  onSignOut 
}) => {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'members' | 'crm' | 'settings'>('telemetry');
  const [members, setMembers] = useState<GymMember[]>(INITIAL_MEMBERS);
  const [atRiskList, setAtRiskList] = useState<AtRiskMember[]>(AT_RISK_MEMBERS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberTier, setNewMemberTier] = useState<GymMember['tier']>('Standard Access');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleSimulateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;

    const newMem: GymMember = {
      id: `mem-${Math.floor(Math.random() * 900) + 100}`,
      name: newMemberName,
      avatar: newMemberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'GY',
      tier: newMemberTier,
      status: 'Active',
      checkInTime: 'Just now (0.38s QR)',
      scanMethod: 'QR Camera',
      visitsThisMonth: 1,
      streak: 1
    };

    setMembers(prev => [newMem, ...prev]);
    setIsAddMemberOpen(false);
    setNewMemberName('');
    setToastMsg(`0.38s Sub-second check-in recorded for ${newMem.name}! Turnstile Gate #01 unlocked.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleSendWhatsApp = (riskId: string, memberName: string) => {
    setAtRiskList(prev => prev.map(m => m.id === riskId ? { ...m, reengagementStatus: 'Sent WhatsApp' } : m));
    setToastMsg(`Sent automated WhatsApp retention offer to ${memberName}!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NAV_ITEMS = [
    { id: 'telemetry', label: 'Front-Desk Telemetry', icon: QrCode, badge: 'Live Stream' },
    { id: 'members', label: 'Member Directory', icon: UserCheck, badge: `${members.length} Members` },
    { id: 'crm', label: 'WhatsApp Retention CRM', icon: MessageSquare, badge: 'Automation' },
    { id: 'settings', label: 'Outlet Operating Rules', icon: Building2, badge: 'Settings' },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex selection:bg-slate-900 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Glow Spotlight */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-slate-900/10 via-slate-800/5 to-slate-900/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION MENU */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/90 backdrop-blur-md text-slate-900 p-5 flex flex-col justify-between border-r border-slate-200 shadow-lg transition-transform duration-300 shrink-0 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="space-y-6">
          
          {/* Logo & Tenant Badge */}
          <div className="space-y-3 pb-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <Logo size="sm" />
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-1 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Dumbbell className="w-3 h-3 text-emerald-600" />
                GYM OUTLET TENANT
              </span>
              <span className="text-[10px] font-mono text-slate-500 truncate">
                {tenantName}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 pb-1">
              Front Desk Operating Modules
            </div>

            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all group ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Sidebar Footer System Status & Sign Out */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Supabase Database
              </span>
              <span className="text-emerald-600 font-bold font-mono">100% CONNECTED</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-0.5">
              <span>Project: xtfusqlrosinylhbdljd</span>
              <span className="text-emerald-600 font-bold">344ms</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springConfig}
            onClick={onSignOut}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 shadow-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Tenant</span>
          </motion.button>
        </div>

      </aside>

      {/* RIGHT MAIN WORKSPACE CONTENT */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-6">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-100 text-slate-800 flex items-center gap-2 text-xs font-bold"
          >
            <Menu className="w-5 h-5" />
            <span>Navigation Menu</span>
          </button>
          <Logo size="sm" />
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Main Workspace Tabs */}
        <div className="space-y-6">

          {/* TAB 1: Live Front-Desk Telemetry & Sub-Second Check-in */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-slate-900" />
                    Live Front-Desk Telemetry & Turnstile Gate Stream
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time sub-second QR camera check-ins, live gym floor capacity, and gate security.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springConfig}
                  onClick={() => setIsAddMemberOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-slate-900/20 border border-slate-700/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Record Instant Check-in</span>
                </motion.button>
              </div>

              {/* Live Metric KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Live Floor Occupancy</span>
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-slate-900">
                    142 / 200 Seated
                  </div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> 71% Floor Capacity (Optimal Flow)
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Sub-Second Scan Speed</span>
                    <Zap className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-slate-900 font-mono">
                    0.38s Avg
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Camera QR & Apple Wallet Native Sync
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Hardware Gate Hardware</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600 animate-pulse" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-slate-900 flex items-baseline gap-2">
                    <span>3 / 3</span>
                    <span className="text-base text-emerald-600 font-bold">Gates Online</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Downtown Main • Sauna • VIP Lounge
                  </div>
                </div>

              </div>

              {/* Member Check-in Telemetry Feed */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
                <h3 className="font-display font-bold text-base text-slate-900">
                  Real-time Gate Access Log ({members.length} Today)
                </h3>

                <div className="divide-y divide-slate-200">
                  {members.map((mem) => (
                    <div key={mem.id} className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-3 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {mem.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <span>{mem.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-mono text-slate-700 border border-slate-200">
                              {mem.tier}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {mem.scanMethod} • {mem.checkInTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="hidden sm:block text-right">
                          <div className="font-mono font-bold text-slate-900">{mem.visitsThisMonth} Visits this month</div>
                          <div className="text-[10px] text-amber-700 font-bold flex items-center justify-end gap-1">
                            <Flame className="w-3 h-3 text-amber-500" /> {mem.streak} Day Workout Streak
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          mem.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : mem.status === '3 Days Left'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}>
                          {mem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Member Directory */}
          {activeTab === 'members' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Member Directory & Subscriptions</h3>
                  <p className="text-xs text-slate-500">Manage member profiles, membership tiers, and dues status</p>
                </div>

                <div className="relative min-w-[260px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search member name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Member Name</th>
                      <th className="py-3 px-4">Membership Tier</th>
                      <th className="py-3 px-4">Scan Method</th>
                      <th className="py-3 px-4">Check-ins</th>
                      <th className="py-3 px-4">Streak</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                            {m.avatar}
                          </div>
                          <span>{m.name}</span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{m.tier}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">{m.scanMethod}</td>
                        <td className="py-3.5 px-4 font-bold font-mono">{m.visitsThisMonth} Visits</td>
                        <td className="py-3.5 px-4 font-bold text-amber-700">{m.streak} Days</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            m.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WhatsApp Retention CRM */}
          {activeTab === 'crm' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">WhatsApp Inactivity Retention CRM</h3>
                  <p className="text-xs text-slate-500">Automated dropout prevention & 1-click re-engagement offers</p>
                </div>
              </div>

              {/* Automation Sequence Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AUTOMATION_NODES.map((node, idx) => (
                  <div key={node.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>Node #{idx + 1}: {node.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">ACTIVE</span>
                    </div>
                    <p className="text-xs text-slate-500">{node.description}</p>
                  </div>
                ))}
              </div>

              {/* At-Risk Member Recovery Table */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="font-bold text-sm text-slate-900">Inactive At-Risk Members ({atRiskList.length})</h4>

                <div className="divide-y divide-slate-200">
                  {atRiskList.map((risk) => (
                    <div key={risk.id} className="py-3 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{risk.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Last Visit: <strong className="text-red-600">{risk.lastVisit}</strong> • Expiry: {risk.planExpiry}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          risk.reengagementStatus === 'Recovered'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : risk.reengagementStatus === 'Sent WhatsApp'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}>
                          {risk.reengagementStatus}
                        </span>

                        <button
                          onClick={() => handleSendWhatsApp(risk.id, risk.name)}
                          disabled={risk.reengagementStatus !== 'Pending'}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Offer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Outlet Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Outlet Operating Rules & Hardware Gates</h3>
                  <p className="text-xs text-slate-500">Configure local gym operating hours, camera QR sensitivity, and gate locks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Gym Operating Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                      <span>Weekdays (Mon-Fri)</span>
                      <span className="font-mono font-bold text-slate-900">05:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                      <span>Weekends (Sat-Sun)</span>
                      <span className="font-mono font-bold text-slate-900">06:00 AM - 09:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Turnstile Gate Override</h4>
                  <p className="text-slate-500">Manual emergency gate unlocking controls for front desk staff.</p>
                  <button
                    onClick={() => {
                      setToastMsg('Triggered 10-second emergency manual unlock on Gate #01!');
                      setTimeout(() => setToastMsg(null), 3000);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Unlock All Gates (Manual 10s Override)
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Record Instant Check-in Modal */}
      <AnimatePresence>
        {isAddMemberOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddMemberOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-base text-slate-900">Record Instant Member Check-In</h3>
                <button onClick={() => setIsAddMemberOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSimulateCheckIn} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Member Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Membership Tier</label>
                  <select
                    value={newMemberTier}
                    onChange={(e) => setNewMemberTier(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="Standard Access">Standard Access</option>
                    <option value="VIP Platinum">VIP Platinum</option>
                    <option value="CrossFit Elite">CrossFit Elite</option>
                    <option value="Morning Pass">Morning Pass</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Scan QR & Unlock Turnstile</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
