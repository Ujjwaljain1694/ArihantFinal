import React from 'react';

const FilterBar = ({ children }) => {
  return (
    <div className="bg-[#f3f3f3] p-3 mb-4 border-b border-gray-200">
      <div className="flex flex-wrap items-end gap-4">
        {children}
      </div>
    </div>
  );
};

export const FilterItem = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <div className="text-[12px] text-gray-600 font-normal ml-0.5">{label}</div>
    {children}
  </div>
);

export const SearchInput = ({ placeholder = "Search", width = "220px" }) => (
    <div className="relative group">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
        <input 
            type="text" 
            placeholder={placeholder} 
            className="h-[30px] border border-gray-300 rounded-md pl-8 pr-3 text-[12px] bg-white outline-none focus:border-arihant-primary transition-all" 
            style={{ width }}
        />
    </div>
);

export const DateInput = ({ value, width = "140px" }) => (
    <div className="relative group">
        <input 
            type="text" 
            defaultValue={value}
            placeholder="DD/MM/YYYY"
            className="h-[30px] border border-gray-300 rounded-md px-3 text-[12px] text-gray-700 outline-none bg-white focus:border-arihant-primary transition-all" 
            style={{ width }}
        />
        <i className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] cursor-pointer"></i>
    </div>
);

export const ApplyButton = ({ onClick, label = "Apply" }) => (
  <button 
    onClick={onClick}
    className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-6 h-[30px] rounded-md font-medium text-[12px] transition-all"
  >
    {label}
  </button>
);

export default FilterBar;
