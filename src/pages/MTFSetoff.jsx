import React, { useState, useEffect, useRef } from "react";
import ResultsHeader from "../components/common/ResultsHeader";
import MTFSetoffTable from "../components/common/MTFSetoffTable";
import DataTable from "../components/common/DataTable";
import { Search, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import CustomDatePicker from "../components/common/CustomDatePicker";

// ============================================================
// MTF DATA & LOGIC (Report & Setoff)
// ============================================================

// 📊 MOCK DATA (Same for both)
export const reportData = [
    { date: "08/05/2026", clientCode: "ARH12345", client: "ARH12345", name: "Ujjwal Jain", segment: "NSE", stock: "RELIANCE", qty: 25, amount: "₹72,500", status: "Active" },
    { date: "08/05/2026", clientCode: "ARH12345", client: "ARH12345", name: "Ujjwal Jain", segment: "BSE", stock: "TCS", qty: 10, amount: "₹38,200", status: "Pending" },
    { date: "07/05/2026", clientCode: "ARH56789", client: "ARH56789", name: "Rahul Sharma", segment: "NSE", stock: "HDFC", qty: 15, amount: "₹41,500", status: "Active" },
    { date: "07/05/2026", clientCode: "ARH56789", client: "ARH56789", name: "Rahul Sharma", segment: "BSE", stock: "ITC", qty: 40, amount: "₹18,000", status: "Pending" },
    { date: "06/05/2026", clientCode: "ARH99999", client: "ARH99999", name: "Amit Verma", segment: "NSE", stock: "SBIN", qty: 30, amount: "₹24,000", status: "Completed" },
    { date: "06/05/2026", clientCode: "ARH99999", client: "ARH99999", name: "Amit Verma", segment: "BSE", stock: "WIPRO", qty: 20, amount: "₹11,400", status: "Active" },
];

// Utility alias for compatibility
export const tableData = reportData;

// 🕒 MARKET STATUS
export const checkMarketStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const isWeekend = day === 0 || day === 6;
    const isMarketHours = hour >= 9 && hour < 17;
    return { isWeekend, isMarketHours, canShowData: !isWeekend && isMarketHours };
};

// 📅 DATE UTILITIES
export const formatDateForMatch = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
};

// 🔍 SEARCH FUNCTIONS (MTF REPORT)
export const searchByDate = (requestDate, isMarketOpen = true) => {
    if (!isMarketOpen) return { success: false, data: [], error: "Search is allowed only Monday to Friday between 9:00 AM to 5:00 PM" };
    if (!requestDate || requestDate.trim() === "") return { success: false, data: [], error: "Please select a date to search" };
    const formattedDate = formatDateForMatch(requestDate);
    const results = reportData.filter((item) => item.date === formattedDate);
    return { success: true, data: results, error: null };
};

// 🔍 SEARCH FUNCTIONS (MTF SETOFF)
export const filterByClient = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") return [];
    return tableData.filter((item) => item.client.toLowerCase().includes(searchTerm.toLowerCase()));
};

export const searchByClientCode = (clientCode, isMarketOpen = true) => {
    if (clientCode.trim() === "") return { success: false, data: [], error: "Please enter full client code" };
    if (!isMarketOpen) return { success: false, data: [], error: "Search is allowed only Monday to Friday between 9:00 AM and 5:00 PM" };
    const results = filterByClient(clientCode);
    return { success: true, data: results, error: null };
};

// Generic client search (Report & Global)
export const searchByClient = (clientCode, isMarketOpen = true) => {
    if (!isMarketOpen) return { success: false, data: [], error: "Search is allowed only Monday to Friday between 9:00 AM to 5:00 PM" };
    if (!clientCode || clientCode.trim() === "") return { success: false, data: [], error: "Please enter a client code to search" };
    const searchTerm = clientCode.toLowerCase();
    const results = reportData.filter(item => item.clientCode.toLowerCase().includes(searchTerm) || item.name.toLowerCase().includes(searchTerm));
    return { success: true, data: results, error: null };
};

// Advanced Search
export const advancedSearch = (clientCode = "", name = "", isMarketOpen = true) => {
    if (!isMarketOpen) return { success: false, data: [], error: "Search is allowed only Monday to Friday between 9:00 AM and 5:00 PM" };
    if (!clientCode.trim() && !name.trim()) return { success: false, data: [], error: "Please enter at least one search criteria" };
    let results = [...tableData];
    if (clientCode.trim()) results = results.filter((item) => item.client.toLowerCase().includes(clientCode.toLowerCase()));
    if (name.trim()) results = results.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
    return { success: true, data: results, error: null };
};

// ✨ HELPERS & STATS
export const getStatusBadgeClass = (status) => {
    switch (status) {
        case "Active": return "bg-green-100 text-green-800";
        case "Pending": return "bg-yellow-100 text-yellow-800";
        case "Completed": return "bg-blue-100 text-blue-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

export const getSummaryStats = (data = tableData) => {
    return {
        totalRecords: data.length,
        uniqueClients: new Set(data.map((item) => item.client)).size,
        activeRecords: data.filter((item) => item.status === "Active").length,
        pendingRecords: data.filter((item) => item.status === "Pending").length,
        completedRecords: data.filter((item) => item.status === "Completed").length,
        segments: new Set(data.map((item) => item.segment)).size,
    };
};

export const sortData = (data, field, order = "asc") => {
    const sorted = [...data].sort((a, b) => {
        let valA = a[field]; let valB = b[field];
        if (!isNaN(valA) && !isNaN(valB)) { valA = Number(valA); valB = Number(valB); }
        return order === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    return sorted;
};

// 📥 EXPORT LOGIC
export const exportAsCSV = (data) => {
    const headers = ["Date", "Client Code", "Name", "Segment", "Stock", "Quantity", "Amount", "Status"];
    const rows = data.map((item) => [item.date, item.client || item.clientCode, item.name, item.segment, item.stock, item.qty, item.amount, item.status]);
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

export const downloadCSV = (data, filename = "mtf_data.csv") => {
    const csvContent = exportAsCSV(data);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const MTFSetoffLogic = {
    tableData, checkMarketStatus, filterByClient, searchByClientCode, advancedSearch,
    getStatusBadgeClass, sortData, getSummaryStats, exportAsCSV, downloadCSV
};

const MTFSetoff = () => {
    const [activeSubTab, setActiveSubTab] = useState("MTF Setoff");
    const [search, setSearch] = useState("");
    const [requestDate, setRequestDate] = useState(null);
    const [clientCode, setClientCode] = useState("");
    const [searched, setSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");


    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleSearch = () => {
        const { canShowData } = checkMarketStatus();

        let result;
        if (activeSubTab === "MTF Setoff") {
            result = searchByClientCode(search, canShowData);
        } else {
            // Convert Date object to yyyy-mm-dd string
            const dateStr = requestDate ? requestDate.toISOString().split('T')[0] : "";
            result = searchByDate(dateStr, canShowData);
        }

        if (!result.success) {
            setCustomErrorMsg(result.error);
            setShowCustomError(true);
            return;
        }

        setFilteredData(result.data);
        setSearched(true);
        toast.success(`Search completed`);
    };

    const handleApply = () => {
        const { canShowData } = checkMarketStatus();
        const result = searchByClient(clientCode, canShowData);

        if (!result.success) {
            setCustomErrorMsg(result.error);
            setShowCustomError(true);
            return;
        }

        setFilteredData(result.data);
        setSearched(true);
        toast.success(`Filter applied`);
    };

    const handleDownload = () => {
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(exportAsCSV(filteredData));
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `MTF_${activeSubTab.replace(" ", "_")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const displayData = filteredData.map(item => ({
        date: item.date,
        code: item.client || item.clientCode,
        script: item.stock,
        quantity: item.qty,
        price: typeof item.amount === 'string' ? item.amount.replace("₹", "").replace(",", "") : item.amount,
        amount: item.amount
    }));

    return (
        <div className="px-6 pt-2 pb-10 max-w-[1600px] mx-auto">
            {/* 🧭 SUB TABS (LEVEL 2) */}
            <div className="flex gap-10 border-b border-gray-200 mb-5 px-2">
                {["MTF Setoff", "MTF Report"].map((tab) => (
                    <span
                        key={tab}
                        onClick={() => {
                            setActiveSubTab(tab);
                            setSearched(false);
                            setSearch("");
                            setClientCode("");
                            setRequestDate(null);
                            setFilteredData([]);
                        }}
                        className={`cursor-pointer pb-3 text-sm transition-all ${activeSubTab === tab
                            ? "border-b-[3px] border-[#34b350] font-bold text-black"
                            : "text-gray-500 font-medium hover:text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Filter Section Card (Compact - Trial Balance Style) */}
            <div className="bg-gray-100 p-5 mb-6 rounded-xl border border-gray-200 relative">
                <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                    {activeSubTab === "MTF Setoff" ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Search by client</label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search client code"
                                        className={`h-[46px] w-[340px] border rounded-full pl-11 pr-4 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all shadow-sm ${showCustomError && !search.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-12 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                SEARCH &gt;
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Request Date</label>
                                <div className="relative group">
                                    <CustomDatePicker
                                        selected={requestDate}
                                        onChange={(d) => setRequestDate(d)}
                                        placeholder="DD/MM/YYYY"
                                        className={`h-[46px] w-[200px] border rounded-lg px-4 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all shadow-sm ${showCustomError && !requestDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-10 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                SEARCH
                            </button>

                            <div className="flex flex-col gap-2 ml-4">
                                <label className="text-[13px] font-bold text-gray-700">Search By Client Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={clientCode}
                                        onChange={(e) => setClientCode(e.target.value)}
                                        placeholder="Search by Client Code"
                                        className={`h-[46px] w-[280px] border rounded-lg px-4 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all shadow-sm ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleApply}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-10 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                APPLY &gt;
                            </button>
                        </>
                    )}
                </div>
            </div>

            {searched && (
                <>
                    <ResultsHeader count={displayData.length} onDownload={handleDownload} />
                    {activeSubTab === "MTF Setoff" ? (
                        <MTFSetoffTable data={displayData} />
                    ) : (
                        <DataTable
                            headers={["DATE", "CODE", "SCRIPT", "QUANTITY", "PRICE", "AMOUNT"]}
                            rows={displayData.map(d => [d.date, d.code, d.script, d.quantity, d.price, d.amount])}
                        />
                    )}
                </>
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

export default MTFSetoff;
