
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white/60 backdrop-blur-md border border-white/30 shadow-glass rounded-2xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
