import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarHeader from "./CalendarHeader";
import { Calendar } from "lucide-react";

const CustomDatePicker = ({ selected, onChange, placeholder, className }) => {
    return (
        <div className="relative group">
            <DatePicker
                selected={selected}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText={placeholder || "DD/MM/YYYY"}
                maxDate={new Date()}
                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                className={className}
                onFocus={(e) => e.target.blur()}
            />
            <Calendar
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer pointer-events-none"
                size={16}
            />
        </div>
    );
};

export default CustomDatePicker;
