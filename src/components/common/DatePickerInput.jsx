import React from 'react';

const DatePickerInput = ({ value, onChange, width = "220px" }) => {
  return (
    <div className="relative group">
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        className="h-[52px] border border-gray-200 rounded-lg px-6 text-[14px] text-gray-700 font-bold outline-none shadow-sm bg-white focus:border-arihant-primary transition-all w-full" 
        style={{ width }}
      />
      <i className="fas fa-calendar-alt absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-arihant-primary transition-colors cursor-pointer"></i>
    </div>
  );
};

export default DatePickerInput;
