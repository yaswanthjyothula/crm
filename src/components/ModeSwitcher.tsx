import React from 'react';
import { motion } from 'framer-motion';
import { ModeType } from '../types/crm';
import { Dumbbell, UtensilsCrossed } from 'lucide-react';

interface ModeSwitcherProps {
  activeMode: ModeType;
  onModeChange: (mode: ModeType) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ activeMode, onModeChange }) => {
  const springConfig = { type: 'spring' as const, stiffness: 350, damping: 28 };

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner max-w-full">
        {/* Gym Switch Button */}
        <button
          onClick={() => onModeChange('gym')}
          className={`relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 focus:outline-none ${
            activeMode === 'gym' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-pressed={activeMode === 'gym'}
        >
          {activeMode === 'gym' && (
            <motion.div
              layoutId="activeModePill"
              transition={springConfig}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 shadow-md shadow-brand-500/25 border border-brand-400/30"
            />
          )}
          <span className="relative z-20 flex items-center gap-2">
            <Dumbbell className={`w-4 h-4 ${activeMode === 'gym' ? 'text-white animate-pulse' : 'text-slate-500'}`} />
            🏋️ Gyms & Fitness Clubs
          </span>
        </button>

        {/* Restaurant Switch Button */}
        <button
          onClick={() => onModeChange('restaurant')}
          className={`relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 focus:outline-none ${
            activeMode === 'restaurant' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-pressed={activeMode === 'restaurant'}
        >
          {activeMode === 'restaurant' && (
            <motion.div
              layoutId="activeModePill"
              transition={springConfig}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 shadow-md shadow-brand-500/25 border border-brand-400/30"
            />
          )}
          <span className="relative z-20 flex items-center gap-2">
            <UtensilsCrossed className={`w-4 h-4 ${activeMode === 'restaurant' ? 'text-white animate-pulse' : 'text-slate-500'}`} />
            🍽️ Dine-in Restaurants
          </span>
        </button>
      </div>
    </div>
  );
};
