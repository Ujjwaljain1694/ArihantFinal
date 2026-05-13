import React from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const CalendarHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
        <button
            onClick={(e) => { e.preventDefault(); decreaseMonth(); }}
            disabled={prevMonthButtonDisabled}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
        >
            <i className="fa fa-chevron-left text-[10px] text-gray-500"></i>
        </button>
        
        <div className="flex gap-2">
            <div className="relative">
                <select
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                    className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
                >
                    {months.filter((_, index) => {
                        if (date.getFullYear() === currentYear) {
                            return index <= currentMonth;
                        }
                        return true;
                    }).map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
                <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
            </div>

            <div className="relative">
                <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(parseInt(value))}
                    className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
                >
                    {Array.from({ length: currentYear - 1947 + 1 }, (_, i) => 1947 + i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
            </div>
        </div>

        <button
            onClick={(e) => { e.preventDefault(); increaseMonth(); }}
            disabled={nextMonthButtonDisabled}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
        >
            <i className="fa fa-chevron-right text-[10px] text-gray-500"></i>
        </button>
    </div>
);

export default CalendarHeader;
