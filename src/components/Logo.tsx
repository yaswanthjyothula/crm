import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl sm:text-2xl tracking-[0.05em]',
    md: 'text-2xl sm:text-3xl tracking-[0.06em]',
    lg: 'text-4xl sm:text-5xl tracking-[0.08em]',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className={`font-arsenica font-black text-slate-900 uppercase leading-none ${sizeClasses[size]}`}>
        PULSE <span className="font-black tracking-[0.04em]">SERVE</span>
      </span>
    </div>
  );
};
