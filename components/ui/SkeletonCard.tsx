import React from 'react';
import GlassCard from './GlassCard';

const SkeletonCard = () => {
  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          <div className="flex justify-end pt-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default SkeletonCard;