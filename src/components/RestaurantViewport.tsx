import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RestaurantTable } from '../types/crm';
import { 
  Utensils, 
  Users, 
  Clock, 
  Receipt, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  Send, 
  Tag, 
  ChefHat,
  ChevronRight
} from 'lucide-react';

const INITIAL_TABLES: RestaurantTable[] = [
  { id: 1, label: 'Table 01', seats: 2, status: 'available' },
  { id: 2, label: 'Table 02', seats: 4, status: 'seated', guestName: 'Sophia Loren', partySize: 4, seatedDuration: '42m', currentBill: 184, tags: ['VIP Guest', 'Wine Lover'] },
  { id: 3, label: 'Table 03', seats: 2, status: 'bill_printed', guestName: 'Liam Hemsworth', partySize: 2, seatedDuration: '1h 12m', currentBill: 120, tags: ['Gluten-Free'] },
  { id: 4, label: 'Table 04', seats: 6, status: 'seated', guestName: 'Dr. Aris Thorne', partySize: 5, seatedDuration: '28m', currentBill: 245, tags: ['Anniversary', 'Nut Allergy'] },
  { id: 5, label: 'Table 05', seats: 4, status: 'available' },
  { id: 6, label: 'Table 06', seats: 2, status: 'reserved', guestName: 'Chloe Bennett', partySize: 2, notes: 'Arriving 8:30 PM' },
  { id: 7, label: 'Table 07', seats: 8, status: 'seated', guestName: 'TechCorp Executive Party', partySize: 7, seatedDuration: '54m', currentBill: 512, tags: ['Corporate Pass'] },
  { id: 8, label: 'Table 08', seats: 4, status: 'bill_printed', guestName: 'Noah Sterling', partySize: 3, seatedDuration: '1h 05m', currentBill: 168, tags: ['Dairy-Free'] },
  { id: 9, label: 'Table 09', seats: 2, status: 'available' },
  { id: 10, label: 'Table 10', seats: 4, status: 'available' },
  { id: 11, label: 'Table 11', seats: 6, status: 'seated', guestName: 'Amara Miller', partySize: 6, seatedDuration: '15m', currentBill: 190, tags: ['Birthday Cake'] },
  { id: 12, label: 'Table 12', seats: 2, status: 'available' },
];

interface WaitlistParty {
  id: string;
  name: string;
  partySize: number;
  phone: string;
  waitTime: string;
  tags: string[];
}

const INITIAL_WAITLIST: WaitlistParty[] = [
  { id: 'w-1', name: 'Jameson V.', partySize: 4, phone: '+1 (555) 948-201', waitTime: '12m', tags: ['High Priority'] },
  { id: 'w-2', name: 'Camila Rodriguez', partySize: 2, phone: '+1 (555) 302-881', waitTime: '6m', tags: ['Window Preferred'] },
];

export const RestaurantViewport: React.FC = () => {
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [waitlist, setWaitlist] = useState<WaitlistParty[]>(INITIAL_WAITLIST);
  const [selectedTableId, setSelectedTableId] = useState<number>(2);
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  const handleSeatWaitlistParty = (party: WaitlistParty) => {
    const availTable = tables.find(t => t.status === 'available' && t.seats >= party.partySize) || tables.find(t => t.status === 'available');
    
    if (availTable) {
      setTables(prev => prev.map(t => {
        if (t.id === availTable.id) {
          return {
            ...t,
            status: 'seated',
            guestName: party.name,
            partySize: party.partySize,
            seatedDuration: 'Just seated',
            currentBill: 0,
            tags: party.tags
          };
        }
        return t;
      }));
      setWaitlist(prev => prev.filter(w => w.id !== party.id));
      setSelectedTableId(availTable.id);
      setNotificationSent(`Seated ${party.name} at ${availTable.label}`);
      setTimeout(() => setNotificationSent(null), 3000);
    }
  };

  const handlePrintBill = (tableId: number) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return { ...t, status: 'bill_printed' };
      }
      return t;
    }));
  };

  const handleClearTable = (tableId: number) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          status: 'available',
          guestName: undefined,
          partySize: undefined,
          seatedDuration: undefined,
          currentBill: undefined,
          tags: undefined
        };
      }
      return t;
    }));
  };

  const seatedCount = tables.filter(t => t.status === 'seated').length;
  const billCount = tables.filter(t => t.status === 'bill_printed').length;
  const availCount = tables.filter(t => t.status === 'available').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={springConfig}
      className="w-full glass-panel rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl overflow-hidden bg-white/90 relative"
    >
      {/* Ambient Restaurant Background Watermark Image */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-right opacity-10 pointer-events-none -z-0"
        style={{ backgroundImage: `url('/restaurant-bg.png')`, maskImage: 'linear-gradient(to left, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)' }}
      />
      {/* Header Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
            <Utensils className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-slate-900">Le Bistro Floor & Turnover Map</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 border border-indigo-500/30 uppercase tracking-wider">
                Interactive SVG Floor Plan
              </span>
            </div>
            <p className="text-xs text-slate-500">Real-time table occupancy • Allergy alerts • Waitlist automation</p>
          </div>
        </div>

        {/* Status Pills Summary */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{availCount}</span> Available
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/15 text-brand-700 border border-brand-500/30 font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>{seatedCount}</span> Seated
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{billCount}</span> Bill Printed
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Floor Layout vs Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Interactive 12-Table SVG Map Grid */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 overflow-hidden min-h-[360px]">
            
            {/* Dining Room Ambient Floor Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-brand-500" />
                Main Dining Room Floor Blueprint
              </span>
              <span className="text-[11px] text-slate-400">Click any table to inspect live telemetry</span>
            </div>

            {/* 12 Tables SVG Render */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {tables.map((table) => {
                const isSelected = selectedTableId === table.id;
                
                let statusColor = 'border-emerald-500/40 bg-emerald-50 text-emerald-900';

                if (table.status === 'seated') {
                  statusColor = 'border-brand-500/40 bg-indigo-50 text-brand-900';
                } else if (table.status === 'bill_printed') {
                  statusColor = 'border-amber-500/40 bg-amber-50 text-amber-900';
                } else if (table.status === 'reserved') {
                  statusColor = 'border-purple-500/40 bg-purple-50 text-purple-900';
                }

                return (
                  <motion.button
                    key={table.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={springConfig}
                    onClick={() => setSelectedTableId(table.id)}
                    className={`relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[96px] transition-all duration-200 focus:outline-none ${statusColor} ${
                      isSelected ? 'ring-2 ring-brand-500 shadow-xl shadow-brand-500/10 scale-[1.02]' : 'hover:border-slate-400'
                    }`}
                  >
                    {/* Top Row: Label & Seats */}
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-slate-900">
                        {table.label}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-mono flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        {table.seats}p
                      </span>
                    </div>

                    {/* Table Status / Guest */}
                    <div className="mt-2">
                      {table.status === 'available' && (
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ready to seat
                        </span>
                      )}
                      {table.status === 'seated' && (
                        <div className="truncate">
                          <div className="text-xs font-semibold text-slate-900 truncate">{table.guestName}</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-brand-500" /> {table.seatedDuration}
                          </div>
                        </div>
                      )}
                      {table.status === 'bill_printed' && (
                        <div className="truncate">
                          <div className="text-xs font-semibold text-amber-800 truncate">{table.guestName}</div>
                          <div className="text-[10px] text-amber-700 font-mono font-bold flex items-center gap-1 mt-0.5">
                            <Receipt className="w-3 h-3" /> ${table.currentBill}
                          </div>
                        </div>
                      )}
                      {table.status === 'reserved' && (
                        <span className="text-[11px] font-semibold text-purple-700">
                          Reserved ({table.partySize}p)
                        </span>
                      )}
                    </div>

                    {/* Active Selected Glow Ring */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-500 animate-ping" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Waitlist Drawer Bar */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Live Walk-in Waitlist ({waitlist.length} Parties Waiting)
              </h4>
              <span className="text-[11px] text-slate-400">Auto SMS Notification Engine Enabled</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {waitlist.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-2">No parties currently on waitlist.</div>
              ) : (
                waitlist.map((party) => (
                  <div key={party.id} className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">{party.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-mono">
                          {party.partySize} guests
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>Wait: <strong className="text-amber-600">{party.waitTime}</strong></span>
                        <span>•</span>
                        <span>{party.phone}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springConfig}
                      onClick={() => handleSeatWaitlistParty(party)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
                    >
                      <Send className="w-3 h-3" />
                      Seat
                    </motion.button>
                  </div>
                ))
              )}
            </div>

            {notificationSent && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {notificationSent}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Selected Table Telemetry Card */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between h-full shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">{selectedTable.label} Details</h4>
                  <span className="text-xs text-slate-500">{selectedTable.seats} Person Capacity</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  selectedTable.status === 'available' ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30' :
                  selectedTable.status === 'seated' ? 'bg-brand-500/15 text-brand-700 border border-brand-500/30' :
                  selectedTable.status === 'bill_printed' ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30' :
                  'bg-purple-500/15 text-purple-700 border border-purple-500/30'
                }`}>
                  {selectedTable.status.replace('_', ' ')}
                </span>
              </div>

              {selectedTable.status === 'available' ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">Table Ready For Guests</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Assign a walk-in or seat a waiting party from the queue.</p>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {/* Guest Name & Party */}
                  <div>
                    <div className="text-xs text-slate-500">Primary Guest Profile</div>
                    <div className="text-base font-bold text-slate-900 flex items-center justify-between mt-0.5">
                      <span>{selectedTable.guestName}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                        {selectedTable.partySize} Guests
                      </span>
                    </div>
                  </div>

                  {/* Seated Duration & Bill */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-[11px] text-slate-500">Seated Duration</div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-brand-500" />
                        {selectedTable.seatedDuration || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500">Tab Amount</div>
                      <div className="text-sm font-bold text-amber-600 font-mono flex items-center gap-1 mt-0.5">
                        <Receipt className="w-3.5 h-3.5" />
                        ${selectedTable.currentBill || 0}
                      </div>
                    </div>
                  </div>

                  {/* Allergy / Guest Tags */}
                  {selectedTable.tags && selectedTable.tags.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-brand-500" /> Special Allergy & Guest Badges
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTable.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Telemetry Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              {selectedTable.status === 'seated' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springConfig}
                  onClick={() => handlePrintBill(selectedTable.id)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Receipt className="w-4 h-4" />
                  Print Bill & Request Check-Out
                </motion.button>
              )}

              {selectedTable.status === 'bill_printed' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springConfig}
                  onClick={() => handleClearTable(selectedTable.id)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  Close Tab & Mark Table Available
                </motion.button>
              )}

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <span>PulseServe POS Sync Active</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};
