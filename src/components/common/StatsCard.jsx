import React from 'react';

const StatsCard = ({ title, value, unit = "", isMasked = false }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 min-w-[240px]">
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-gray-400 font-bold uppercase tracking-wider">{title}</span>
        {isMasked && (
           <span className="text-gray-300 cursor-pointer hover:text-arihant-primary">👁️</span>
        )}
      </div>
      <div className="text-[20px] font-black text-gray-800 flex items-baseline gap-1">
        {value}
        {unit && <span className="text-[12px] opacity-40">{unit}</span>}
      </div>
    </div>
  );
};

export default StatsCard;
