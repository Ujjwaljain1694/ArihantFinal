import React from 'react';

const SearchInput = ({ placeholder = "Search client code", value, onChange, width = "320px" }) => {
  return (
    <div className="relative group">
      <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-arihant-primary transition-colors pointer-events-none"></i>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className={`h-[52px] border border-gray-200 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-arihant-primary transition-all w-full`} 
        style={{ width }}
      />
    </div>
  );
};

export default SearchInput;
