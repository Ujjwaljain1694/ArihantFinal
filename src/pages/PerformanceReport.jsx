import React, { useState, useEffect, useRef } from "react";
import { L } from "../styles/legacyStyles";
import CustomDatePicker from "../components/common/CustomDatePicker";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar, Download } from "lucide-react";
import axios from "axios";
import Table from "../components/common/Table";
import ResultsHeader from "../components/common/ResultsHeader";

// ============================================================
// Performance Report - Logic & UI
// ============================================================

export const dummyData = [
  { date: "30/03/2026", particular: "Equities Trade", volume: "₹1,45,000", revenue: "₹725.00", efficiency: "98.5%" },
  { date: "31/03/2026", particular: "F&O Trade", volume: "₹4,12,000", revenue: "₹1,240.00", efficiency: "96.2%" },
  { date: "01/04/2026", particular: "Mutual Fund SIP", volume: "₹25,000", revenue: "₹125.00", efficiency: "99.8%" },
  { date: "02/04/2026", particular: "Currency Trade", volume: "₹85,000", revenue: "₹340.00", efficiency: "97.1%" },
  { date: "03/04/2026", particular: "Commodity Trade", volume: "₹2,30,000", revenue: "₹920.00", efficiency: "95.9%" },
];

export const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export const validateDateRange = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return { isValid: false, error: "Please select both From and To dates to search." };
  }
  const start = new Date(fromDate);
  const end = new Date(toDate);
  if (start > end) {
    return { isValid: false, error: "From Date cannot be greater than To Date." };
  }
  return { isValid: true, error: null };
};

export const filterByDateRange = (fromDate, toDate, data = dummyData) => {
  if (!fromDate || !toDate) return [];
  const start = new Date(fromDate);
  const end = new Date(toDate);
  return data.filter((item) => {
    const itemDate = parseDate(item.date);
    return itemDate >= start && itemDate <= end;
  });
};

export const downloadAsExcel = (data) => {
  if (!data || data.length === 0) return;
  const headers = ["Date", "Particular", "Volume", "Revenue", "Efficiency"];
  const rows = data.map((row) => [row.date, row.particular, row.volume, row.revenue, row.efficiency]);
  
  let tableHtml = '<table><thead><tr>';
  headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
  tableHtml += '</tr></thead><tbody>';
  rows.forEach(row => {
    tableHtml += '<tr>';
    row.forEach(cell => { tableHtml += `<td>${cell}</td>`; });
    tableHtml += '</tr>';
  });
  tableHtml += '</tbody></table>';
  
  const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Performance_Report_${new Date().toISOString().split("T")[0]}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const PerformanceReport = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        const fromStr = fromDate ? fromDate.toISOString().split('T')[0] : "";
        const toStr = toDate ? toDate.toISOString().split('T')[0] : "";
        
        const validation = validateDateRange(fromStr, toStr);

        if (!validation.isValid) {
            setCustomErrorMsg(validation.error);
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setHasSearched(true);
        
        setTimeout(() => {
            // Load all available data for the selected date range
            const filtered = filterByDateRange(fromStr, toStr);
            setReportData(filtered.length > 0 ? filtered : dummyData);
            setLoading(false);
            toast.success("Performance data loaded successfully");
        }, 600);
    };

    const handleDownload = () => {
        if (!reportData || reportData.length === 0) {
            setCustomErrorMsg("No data available to download.");
            setShowCustomError(true);
            return;
        }
        downloadAsExcel(reportData);
        toast.success("Report downloaded as Excel");
    };



    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={L.card}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-1">From Date</label>
                        <div className="relative group">
                            <CustomDatePicker
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                placeholder="DD/MM/YYYY"
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !fromDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-1">To Date</label>
                        <div className="relative group">
                            <CustomDatePicker
                                selected={toDate}
                                onChange={(d) => setToDate(d)}
                                placeholder="DD/MM/YYYY"
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !toDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={handleApply}
                            disabled={loading}
                            className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto disabled:bg-gray-400"
                        >
                            <span>{loading ? "APPLYING..." : "APPLY"}</span>
                            {!loading && <span className="text-lg">›</span>}
                        </button>

                        {hasSearched && !loading && (
                            <button
                                onClick={handleDownload}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto animate-in fade-in slide-in-from-left-4 duration-500"
                            >
                                <Download size={18} />
                                <span>DOWNLOAD PDF</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>



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

export default PerformanceReport;
