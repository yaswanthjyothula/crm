import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  CheckCheck, 
  Send, 
  Sparkles, 
  User, 
  Ticket,
  Zap,
  PhoneCall
} from 'lucide-react';

export const WhatsAppNodePreview: React.FC = () => {
  const [memberName, setMemberName] = useState('Alex Rivera');
  const [discountCode, setDiscountCode] = useState('RENEW20');
  const customMsg = 'Hey {{member_name}}! We miss seeing you at Equinox. Use code {{discount_code}} for 20% off your pass renewal this week! 🏋️';
  const [testSent, setTestSent] = useState(false);

  const springConfig = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const compiledMsg = customMsg
    .replace('{{member_name}}', memberName)
    .replace('{{discount_code}}', discountCode);

  const handleSendTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200">
      
      {/* Left Flow Node Builder */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Meta WhatsApp Retention Pipeline</h3>
          </div>
          <p className="text-xs text-slate-600">
            Automatically trigger high-converting WhatsApp micro-messages when guest inactivity or membership expiry is detected.
          </p>
        </div>

        {/* Node Flowchart Diagram */}
        <div className="space-y-3 relative">
          
          {/* Connecting Vertical Line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-500 via-indigo-500 to-emerald-500 -z-0 opacity-30" />

          {/* Node 1: Trigger */}
          <div className="relative z-10 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-600 font-bold shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Trigger Node</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">Auto-Detect</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">Member inactive &gt; 10 consecutive days</p>
            </div>
          </div>

          {/* Node 2: Delay */}
          <div className="relative z-10 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Delay Node</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Smart Queue</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">Wait 24h (Send at optimal local 10:00 AM window)</p>
            </div>
          </div>

          {/* Node 3: Action */}
          <div className="relative z-10 p-3.5 rounded-2xl bg-white border border-emerald-500/40 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Action Node</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Meta API</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">Dispatch WhatsApp personalized discount pass</p>
            </div>
          </div>

        </div>

        {/* Dynamic Variable Inputs */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium text-slate-600 flex items-center gap-1 mb-1">
              <User className="w-3 h-3 text-brand-600" /> Variable: {'{{member_name}}'}
            </label>
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-brand-500 shadow-sm"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-600 flex items-center gap-1 mb-1">
              <Ticket className="w-3 h-3 text-amber-600" /> Variable: {'{{discount_code}}'}
            </label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-sm"
            />
          </div>
        </div>

      </div>

      {/* Right Column: Simulated Live iPhone WhatsApp Preview */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center pt-2 lg:pt-0">
        
        {/* Simulated Smartphone Container */}
        <div className="w-full max-w-[280px] rounded-[36px] bg-slate-950 p-3.5 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* iPhone Dynamic Island Speaker Bar */}
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
          </div>

          {/* WhatsApp Header Bar */}
          <div className="bg-[#075E54] -mx-3.5 -mt-1 p-2.5 text-white flex items-center justify-between mb-3 shadow">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                PS
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">PulseServe Bot</div>
                <div className="text-[9px] text-emerald-200">Verified Business Account</div>
              </div>
            </div>
            <PhoneCall className="w-3.5 h-3.5 opacity-80" />
          </div>

          {/* Chat Background & Message Bubble */}
          <div className="bg-[#0B141A] rounded-2xl p-3 min-h-[220px] flex flex-col justify-end space-y-2 border border-white/5">
            
            {/* Timestamp Pill */}
            <div className="text-center">
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                Today 10:00 AM
              </span>
            </div>

            {/* WhatsApp Green Speech Bubble */}
            <motion.div
              layout
              transition={springConfig}
              className="self-end bg-[#005C4B] text-white p-3 rounded-2xl rounded-tr-none text-xs shadow-md max-w-[220px] space-y-2 border border-emerald-400/20"
            >
              <p className="leading-relaxed text-[11.5px]">
                {compiledMsg}
              </p>
              
              {/* WhatsApp Double Checkmark */}
              <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-300">
                <span>10:00 AM</span>
                <CheckCheck className="w-3 h-3 text-cyan-400" />
              </div>
            </motion.div>

            {/* Interactive WhatsApp Quick Action CTA Card */}
            <div className="bg-[#1F2C34] rounded-xl p-2 border border-white/10 text-center">
              <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                1-Tap WhatsApp Renewal Pass
              </span>
            </div>

          </div>

          {/* Test Dispatch Button */}
          <div className="mt-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
              onClick={handleSendTest}
              className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md ${
                testSent 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {testSent ? (
                <>
                  <CheckCheck className="w-4 h-4" />
                  Test WhatsApp Dispatched!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Test Live Meta API Trigger
                </>
              )}
            </motion.button>
          </div>

        </div>

      </div>

    </div>
  );
};
