import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuditLog, Tenant } from '../types/crm';
import { Logo } from './Logo';
import { 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  FileText, 
  UserCheck, 
  Lock, 
  LogOut, 
  Sparkles, 
  QrCode, 
  Award, 
  TrendingUp, 
  X,
  Layers,
  MessageSquare,
  Menu,
  Plus,
  Search,
  Check,
  Server,
  Globe
} from 'lucide-react';

interface GymSuperAdminPanelProps {
  onSignOut: () => void;
}

const INITIAL_TENANTS: Tenant[] = [];

const AUDIT_LOGS: AuditLog[] = [];

export const GymSuperAdminPanel: React.FC<GymSuperAdminPanelProps> = ({ onSignOut }) => {
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rbac' | 'billing' | 'hardware' | 'crm' | 'analytics'>('dashboard');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [tenantSearchQuery, setTenantSearchQuery] = useState('');
  
  // Add Tenant Modal state
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newCategory, setNewCategory] = useState<'Gym & Fitness'>('Gym & Fitness');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [newBranchCount, setNewBranchCount] = useState<number>(3);
  const [newPlanTier, setNewPlanTier] = useState<'Enterprise SaaS' | 'Growth Plan' | 'Starter'>('Enterprise SaaS');
  const [newMonthlyFee, setNewMonthlyFee] = useState<number>(1490);

  // RBAC active role preview
  const [activeRole, setActiveRole] = useState<'Super Admin' | 'Branch Manager' | 'Front Desk' | 'Personal Trainer'>('Super Admin');

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Tenant = {
      id: `t-${Math.floor(Math.random() * 900) + 100}`,
      name: newTenantName,
      category: newCategory,
      ownerName: newOwnerName,
      ownerEmail: newOwnerEmail,
      branchCount: Number(newBranchCount),
      planTier: newPlanTier,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      monthlyFee: Number(newMonthlyFee)
    };

    setTenants(prev => [created, ...prev]);
    setIsAddTenantOpen(false);
    setToastMsg(`Successfully provisioned new tenant: ${newTenantName}!`);
    
    // Reset form
    setNewTenantName('');
    setNewOwnerName('');
    setNewOwnerEmail('');
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleToggleTenantStatus = (id: string) => {
    setTenants(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Active' ? 'Suspended' : 'Active';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    setToastMsg('Updated tenant subscription status.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(tenantSearchQuery.toLowerCase()) ||
    t.ownerName.toLowerCase().includes(tenantSearchQuery.toLowerCase()) ||
    t.ownerEmail.toLowerCase().includes(tenantSearchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(tenantSearchQuery.toLowerCase())
  );

  const totalSaaSARR = tenants.reduce((acc, t) => acc + (t.status === 'Active' ? t.monthlyFee : 0), 0);
  const totalBranchesProvisioned = tenants.reduce((acc, t) => acc + t.branchCount, 0);

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Tenants & Overview', icon: Layers, badge: `${tenants.length} Tenants` },
    { id: 'rbac', label: 'RBAC & Staffing', icon: UserCheck, badge: 'Roles' },
    { id: 'billing', label: 'Memberships & Billing', icon: FileText, badge: 'GST' },
    { id: 'hardware', label: 'Hardware & Biometrics', icon: QrCode, badge: '3 Gates' },
    { id: 'crm', label: 'Retention & Churn CRM', icon: MessageSquare, badge: 'Retention' },
    { id: 'analytics', label: 'Financial Analytics', icon: TrendingUp, badge: 'ARR' },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex selection:bg-slate-900 selection:text-white relative overflow-x-hidden">
      
      {/* Landing Page Ambient Radial Glow Spotlight */}
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
          
          {/* Logo & Super Admin Badge */}
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
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-900 text-white shadow-sm flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-300" />
                GYM SUPER ADMIN
              </span>
              <span className="text-[10px] font-mono text-slate-500 truncate">
                admin@gmail.com
              </span>
            </div>
          </div>

          {/* Navigation Links Menu List */}
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 pb-1">
              Super Admin Modules
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
            <span>Sign Out Admin</span>
          </motion.button>
        </div>

      </aside>

      {/* RIGHT MAIN WORKSPACE CONTENT */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-6">
        
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-100 text-slate-800 flex items-center gap-2 text-xs font-bold"
          >
            <Menu className="w-5 h-5" />
            <span>Menu Navigation</span>
          </button>
          <Logo size="sm" />
        </div>

        {/* Dynamic Toast Alert Bar */}
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-2xl bg-brand-50 border border-brand-300 text-brand-900 text-xs font-bold flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Main Workspace Section Content */}
        <div className="space-y-6">

          {/* TAB 1: OVERVIEW DASHBOARD & TENANT MANAGEMENT SYSTEM */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Banner & Add Tenant Trigger Button */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-bold text-2xl text-slate-900 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-brand-600" />
                    Multi-Tenant SaaS Directory & Franchise Control
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage all gym chains and restaurant tenants, provision new accounts, and monitor SaaS subscription metrics.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springConfig}
                  onClick={() => setIsAddTenantOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-slate-900/20 border border-slate-700/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Tenant Account</span>
                </motion.button>
              </div>

              {/* Top Executive Tenant KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Registered SaaS Tenants</span>
                    <Building2 className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-slate-900">
                    {tenants.length} Active Chains
                  </div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {totalBranchesProvisioned} Branches Provisioned
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Total Monthly SaaS MRR</span>
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-emerald-700 font-mono">
                    ${totalSaaSARR.toLocaleString()} / mo
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Annual ARR: <strong className="text-slate-900">${(totalSaaSARR * 12).toLocaleString()}</strong>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-500">
                    <span>Multi-Tenant Infrastructure</span>
                    <Server className="w-5 h-5 text-brand-600 animate-pulse" />
                  </div>
                  <div className="font-display font-extrabold text-3xl text-slate-900 flex items-baseline gap-2">
                    <span>100%</span>
                    <span className="text-base text-emerald-600 font-bold">Cloud Synced</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-brand-500" /> US-East • AP-South • EU-Central
                  </div>
                </div>

              </div>

              {/* Tenant Search Bar & Filter Table */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Live SaaS Tenant Directory ({filteredTenants.length})
                  </h3>

                  <div className="relative min-w-[260px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search tenant name, owner, email..."
                      value={tenantSearchQuery}
                      onChange={(e) => setTenantSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Tenant / Franchise Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Owner & Email</th>
                        <th className="py-3 px-4">Branches</th>
                        <th className="py-3 px-4">Plan Tier</th>
                        <th className="py-3 px-4">Monthly Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredTenants.length > 0 ? (
                        filteredTenants.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-brand-600" />
                                <span>{t.name}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                {t.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{t.ownerName}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{t.ownerEmail}</div>
                            </td>
                            <td className="py-3.5 px-4 font-bold font-mono">
                              {t.branchCount} Outlets
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-indigo-50 text-brand-700 border border-indigo-200">
                                {t.planTier}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              ${t.monthlyFee.toLocaleString()}/mo
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                t.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : t.status === 'Trialing'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-red-100 text-red-800 border-red-300'
                              }`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleToggleTenantStatus(t.id)}
                                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-[11px] border border-slate-200 transition-colors shadow-xs"
                              >
                                {t.status === 'Active' ? 'Suspend' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-12 text-center">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400">
                                <Building2 className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-slate-900">No SaaS Tenants Found</h4>
                                <p className="text-xs text-slate-500 max-w-sm mt-0.5">
                                  There are no active gym tenant accounts. Click below to provision your first tenant.
                                </p>
                              </div>
                              <button
                                onClick={() => setIsAddTenantOpen(true)}
                                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                              >
                                <Plus className="w-4 h-4" />
                                <span>+ Add First Tenant Account</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Role-Based Access Control (RBAC) & Staff Management */}
          {activeTab === 'rbac' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">2. Role-Based Access Control (RBAC) & Staff Shifts</h3>
                  <p className="text-xs text-slate-500">Super Admin, Branch Manager, Front Desk, Personal Trainer (PT) permission matrix</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-bold">
                  {(['Super Admin', 'Branch Manager', 'Front Desk', 'Personal Trainer'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`px-3 py-1.5 rounded-full transition-all ${
                        activeRole === role ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-600" /> Active Role Capabilities: {activeRole}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full financial telemetry & revenue audit access</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Biometric hardware override & revocation permissions</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> WhatsApp drip trigger & discount overrides</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Staff commission & payroll split calculations</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" /> Staff Shift & Biometric Attendance Log
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                      <span>Dave (Branch Manager)</span>
                      <span className="font-mono text-emerald-700 font-bold">In Shift (06:00 AM)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                      <span>Alex (PT Lead)</span>
                      <span className="font-mono text-emerald-700 font-bold">In Shift (07:00 AM)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                      <span>Sarah (Front Desk)</span>
                      <span className="font-mono text-emerald-700 font-bold">In Shift (08:30 AM)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Membership Engine & Dynamic Billing */}
          {activeTab === 'billing' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">3. Membership Engine & Dynamic GST Billing</h3>
                  <p className="text-xs text-slate-500">Plan Builder, Add-on Services, Pauses/Freezes, Prorated Upgrades & GST Invoicing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Plan Duration & Auto-Debit</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                      <span>12-Month Annual Pass</span>
                      <strong className="text-brand-700">$79/mo</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                      <span>10 PT Session Pack</span>
                      <strong className="text-brand-700">$350</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between">
                      <span>UPI Autopay / e-Mandate</span>
                      <strong className="text-emerald-700 font-mono">Active</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Add-Ons & Ancillary Services</h4>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                      <input type="checkbox" defaultChecked className="accent-brand-600" />
                      <span>Locker Rental ($15/mo)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                      <input type="checkbox" defaultChecked className="accent-brand-600" />
                      <span>Sauna & Steam Access ($25/mo)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200">
                      <input type="checkbox" defaultChecked className="accent-brand-600" />
                      <span>Towel Service ($10/mo)</span>
                    </label>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">GST Invoice Generator</h4>
                  <button
                    onClick={() => {
                      setToastMsg('Generated & dispatched GST Tax Invoice #INV-2026-88 via WhatsApp!');
                      setTimeout(() => setToastMsg(null), 3000);
                    }}
                    className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <FileText className="w-4 h-4" />
                    Generate & Send GST Invoice
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Hardware Access Control & Biometrics Integration */}
          {activeTab === 'hardware' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">4. Hardware Access Control & Biometrics Integration</h3>
                  <p className="text-xs text-slate-500">Face Recognition, Biometric Fingerprint, Dynamic QR Readers & Revocation Rules</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Turnstiles: 3 Gates Online
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Gate #01 (Main Entry)</div>
                  <div className="font-bold text-slate-900 text-sm">Face Recognition & Dynamic QR</div>
                  <div className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Sync Active
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Gate #02 (VIP Turnstile)</div>
                  <div className="font-bold text-slate-900 text-sm">Biometric Fingerprint & RFID</div>
                  <div className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Sync Active
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Automated Revocation Rule</div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div>• Expired Membership Block</div>
                    <div>• Overdue Payment Block</div>
                    <div>• Frozen Plan Block</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Member Retention & Churn Prevention (CRM Core) */}
          {activeTab === 'crm' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">5. Member Retention & Churn Pipeline (CRM)</h3>
                  <p className="text-xs text-slate-500">Inactivity Dropout Detector & Kanban Lead Pipeline</p>
                </div>
              </div>

              {/* Lead Management Kanban Board */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                    <span>New Inquiry</span>
                    <span className="px-2 py-0.5 rounded bg-white font-mono text-slate-800">12</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs space-y-1">
                    <div className="font-bold text-slate-900">David Miller</div>
                    <div className="text-slate-500">Inquired via Instagram</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
                  <div className="text-xs font-bold text-brand-700 uppercase flex items-center justify-between">
                    <span>Free Trial Booked</span>
                    <span className="px-2 py-0.5 rounded bg-white font-mono text-brand-700">8</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs space-y-1">
                    <div className="font-bold text-slate-900">Emma Watson</div>
                    <div className="text-slate-500">Trial: Today 06:00 PM</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="text-xs font-bold text-amber-800 uppercase flex items-center justify-between">
                    <span>Follow-Up</span>
                    <span className="px-2 py-0.5 rounded bg-white font-mono text-amber-800">5</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs space-y-1">
                    <div className="font-bold text-slate-900">Robert Downey</div>
                    <div className="text-slate-500">Wants 6-month corporate pass</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="text-xs font-bold text-emerald-800 uppercase flex items-center justify-between">
                    <span>Converted</span>
                    <span className="px-2 py-0.5 rounded bg-white font-mono text-emerald-800">24</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-xs space-y-1">
                    <div className="font-bold text-slate-900">Lisa Kudrow</div>
                    <div className="text-emerald-700 font-bold">$79/mo Annual Plan</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: Executive Financial Analytics */}
          {activeTab === 'analytics' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">8. Executive Financial Telemetry & Audit Logs</h3>
                  <p className="text-xs text-slate-500">Realized Cash Flow vs Deferred Revenue & Security Audit Log</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Revenue Breakdown by Category</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded bg-white">
                      <span>Memberships (Prepaid & Recurring)</span>
                      <strong className="font-mono">$38,200</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white">
                      <span>Personal Training Sessions</span>
                      <strong className="font-mono">$7,400</strong>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white">
                      <span>Cafe & Supplement POS</span>
                      <strong className="font-mono">$2,900</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Immutable Audit & Security Log</h4>
                  <div className="space-y-2 text-xs">
                    {AUDIT_LOGS.map(log => (
                      <div key={log.id} className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-0.5">
                        <div className="font-bold text-slate-900">{log.action}</div>
                        <div className="text-[11px] text-slate-500 flex justify-between">
                          <span>{log.performedBy}</span>
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ADD NEW TENANT MODAL DIALOG */}
      <AnimatePresence>
        {isAddTenantOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddTenantOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={springConfig}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 text-slate-900"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-600" />
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Provision New SaaS Tenant Account
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddTenantOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTenant} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Tenant / Franchise Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anytime Fitness Global"
                    value={newTenantName}
                    onChange={(e) => setNewTenantName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Industry Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                    >
                      <option value="Gym & Fitness">Gym & Fitness Club</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">SaaS Plan Tier</label>
                    <select
                      value={newPlanTier}
                      onChange={(e) => setNewPlanTier(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                    >
                      <option value="Enterprise SaaS">Enterprise SaaS</option>
                      <option value="Growth Plan">Growth Plan</option>
                      <option value="Starter">Starter</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Primary Owner Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Miller"
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="owner@franchise.com"
                      value={newOwnerEmail}
                      onChange={(e) => setNewOwnerEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Initial Outlets / Branches</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newBranchCount}
                      onChange={(e) => setNewBranchCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1 block">Monthly Fee ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={newMonthlyFee}
                      onChange={(e) => setNewMonthlyFee(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/25 border border-slate-700/50"
                  >
                    <Check className="w-4 h-4" />
                    <span>Provision Tenant Account & Deploy Cluster</span>
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
