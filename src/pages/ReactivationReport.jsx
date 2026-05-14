import React, { useState, useEffect, useRef } from "react";
import { L } from "../styles/legacyStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar, Search, Download } from "lucide-react";
import CalendarHeader from "../components/common/CalendarHeader";
import Table from "../components/common/Table";

// ============================================================
// Reactivation Report - Logic & Data
// ============================================================

const dummyData = [
    ["295900016", "Ujjwal Jain", "30/03/2026", "Completed", "NSE/BSE"],
    ["295900017", "Rahul Sharma", "31/03/2026", "Pending", "MCX"],
    ["295900018", "Amit Verma", "01/04/2026", "In Progress", "BSE"],
    ["295900019", "Priya Singh", "02/04/2026", "Completed", "NSE"],
    ["295900020", "Deepak Kumar", "03/04/2026", "Rejected", "NSE/BSE"],
];

const downloadAsExcel = (data) => {
    if (!data || data.length === 0) return;
    const headers = ["Client Code", "Client Name", "Date", "Status", "Segment"];
    
    let tableHtml = '<table><thead><tr>';
    headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
    tableHtml += '</tr></thead><tbody>';
    data.forEach(row => {
        tableHtml += '<tr>';
        row.forEach(cell => { tableHtml += `<td>${cell}</td>`; });
        tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Reactivation_Report_${new Date().toISOString().split("T")[0]}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const ReactivationReport = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [search, setSearch] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    
    const fromRef = useRef();
    const toRef = useRef();

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        if (!search.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }

        const dateError = validateDates(fromDate, toDate);
        if (dateError) {
            setCustomErrorMsg(dateError);
            setShowCustomError(true);
            return;
        }

        // Mocking API call - Filter by client code
        const searchTerm = search.toLowerCase();
        let results = dummyData.filter(row =>
            row[0].toLowerCase().includes(searchTerm) || 
            row[1].toLowerCase().includes(searchTerm)
        );

        // Fallback: if no exact match, show all data (for demo)
        if (results.length === 0) {
            results = [...dummyData];
        }

        setFilteredData(results);
        setHasSearched(true);
        toast.success(`Reactivation data loaded for ${search}`);
    };

    const handleDownload = () => {
        if (!filteredData || filteredData.length === 0) {
            setCustomErrorMsg("No data available to download.");
            setShowCustomError(true);
            return;
        }
        downloadAsExcel(filteredData);
        toast.success("Report downloaded as Excel");
    };

    const headers = [
        "Client Code", "Client Name", "Date", "Status", "Segment"
    ];

    return (
        <div style={{...L.wrapper, paddingTop: '8px'}}>
            <div style={L.card}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">From Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                maxDate={new Date()}
                                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !fromDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                ref={fromRef}
                                onFocus={(e) => e.target.blur()}
                            />
                            <Calendar
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                                size={16}
                                onClick={() => fromRef.current.setOpen(true)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">To Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={toDate}
                                onChange={(d) => setToDate(d)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                maxDate={new Date()}
                                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !toDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                ref={toRef}
                                onFocus={(e) => e.target.blur()}
                            />
                            <Calendar
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                                size={16}
                                onClick={() => toRef.current.setOpen(true)}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto uppercase"
                    >
                        <span>APPLY</span>
                        <span className="text-lg">›</span>
                    </button>

                    <div className="w-[1px] bg-gray-300 h-10 self-center mx-2" />

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Search by client</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                                placeholder="Search by Client Code" 
                                className={`pl-11 pr-4 py-3 border rounded-full focus:outline-none focus:border-[#34b350] text-sm w-64 bg-white shadow-sm transition-all h-[44px] ${showCustomError && !search.trim() ? "border-red-500" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto uppercase"
                    >
                        <span>APPLY</span>
                        <span className="text-lg">›</span>
                    </button>
                </div>
            </div>

            {/* Search Results */}
            {hasSearched && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Results Count & Download Header */}
                    <div className="flex items-center justify-between mb-2 px-1">
                        <p className="text-[13px] text-gray-600 font-bold uppercase tracking-tight">
                            SEARCH RESULT ({filteredData.length})
                        </p>
                        <button
                            onClick={handleDownload}
                            title="Download Excel"
                            className="text-[#1EB04C] hover:text-[#18a045] transition-all group p-2 rounded-full hover:bg-green-50"
                        >
                            <Download size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Standard Table Component */}
                    <Table
                        headers={headers}
                        rows={filteredData}
                    />
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 w-[320px]
                        flex items-center justify-between z-[10000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1">Error</h2>
                    <p className="text-sm font-semibold leading-tight">{customErrorMsg}</p>
                </div>
                <div className="ml-4 flex items-center flex-shrink-0">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReactivationReport;
