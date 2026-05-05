import React from 'react';

const FilterSection = ({ children, title }) => {
  return (
    <div className="bg-gray-50/50 p-10 mb-8 border border-gray-100 rounded-2xl shadow-sm">
      {title && (
          <div className="text-[12px] text-gray-400 font-black uppercase mb-4 tracking-wider">{title}</div>
      )}
      <div className="flex flex-wrap items-end gap-6">
        {children}
      </div>
    </div>
  );
};

export const FilterItem = ({ label, children }) => (
  <div className="space-y-2">
    <div className="text-[12px] text-gray-400 font-extrabold uppercase ml-1 tracking-wider">{label}</div>
    {children}
  </div>
);

export const ApplyButton = ({ onClick, label = "APPLY >" }) => (
  <button 
    onClick={onClick}
    className="bg-arihant-primary hover:bg-arihant-hover text-white px-10 h-[52px] rounded-full font-black text-[13px] uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-[0.98] mb-0.5"
  >
    {label}
  </button>
);

export const SearchInput = ({ placeholder = "Search", width = "320px" }) => (
    <div className="relative group">
        <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:text-arihant-primary transition-colors"></i>
        <input 
            type="text" 
            placeholder={placeholder} 
            className="h-[52px] border border-gray-200 rounded-full pl-14 pr-6 text-[14px] bg-white outline-none italic font-medium focus:border-arihant-primary transition-all shadow-inner" 
            style={{ width }}
        />
    </div>
);

export const DateInput = ({ value, width = "220px" }) => (
    <div className="relative group">
        <input 
            type="text" 
            defaultValue={value}
            placeholder="DD/MM/YYYY"
            className="h-[52px] border border-gray-200 rounded-lg px-6 text-[14px] text-gray-700 font-bold outline-none shadow-sm bg-white focus:border-arihant-primary transition-all" 
            style={{ width }}
        />
        <i className="fas fa-calendar-alt absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-arihant-primary transition-colors cursor-pointer"></i>
    </div>
);

export const SelectInput = ({ options, width = "220px" }) => (
    <div className="relative group">
        <select className="h-[52px] border border-gray-200 rounded-lg bg-[#434343] text-white px-6 text-[13px] outline-none font-bold appearance-none cursor-pointer" style={{ width }}>
            {options.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
        <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[10px]"></i>
    </div>
);


export default FilterSection;
