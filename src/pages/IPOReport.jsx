import React, { useState, useEffect, useRef } from "react";
import { L } from "../styles/legacyStyles";
import CustomDatePicker from "../components/common/CustomDatePicker";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar, Search, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import ProductBox from "../components/common/ProductBox";
import ResultsHeader from "../components/common/ResultsHeader";
import { getBranchZoneRoSymbolBranch } from "../api/korpApiService";

// ============================================================
// IPO Report - Pure Logic (No UI/Components)
// ============================================================

export const ipoList = [
    "AEQUS", "AMAGI", "AMANTA", "AMIRCHAND", "ARSSBL", "ATLANTAELE", "AYE",
    "BHARATCOAL", "BMWVENTLTD", "CANHLIFE", "CAPILLARY", "CMPDI", "CORONA",
    "CRAMC", "DEVX", "EMMVEE", "EPACKPEB", "EUROPRATIK", "EXCELSOFT", "FRACTAL",
    "GANESHCP", "GAUDIUMIVF", "GKENERGY", "GKSL", "GROWW", "GSPCROP", "ICICIAMC",
    "INNOVISION", "IVALUE", "JAINREC", "JARO", "KISSHT", "KSHINTL", "LENSKART",
    "LGEINDIA", "PINELABS", "POWERICA", "RSL", "RUBICON", "SAATVIK", "SAIPARENT",
    "SEDEMAC", "SHADOWFAX", "SHRINGARMS", "SOLARWORLD", "STUDDS", "STYL",
    "SUDEEPPHRM", "TATACAP", "TENNIND", "URBANCO", "VIDYAWIRES", "VMSTMT", "WAKEFIT"
];

export const tableData = [];

export const validateDateRange = (fromDate, toDate) => {
    if (!fromDate || !toDate) return { isValid: false, error: "Please select both dates." };
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (start > end) return { isValid: false, error: "From Date cannot be greater than To Date." };
    return { isValid: true, error: null };
};

export const validateIPOSelection = (selectedIPO) => {
    if (!selectedIPO || selectedIPO.trim() === "") return { isValid: false, error: "Please select an IPO." };
    return { isValid: true, error: null };
};

export const calculateSummaryStats = (data = tableData) => {
    const accepted = data.filter((item) => item.status.includes("Accepted")).length;
    const rejected = data.filter((item) => item.status.includes("Rejected")).length;
    const upi = data.filter((item) => item.upi && item.upi.trim() !== "").length;
    return {
        upi, accepted, rejected, hni: 0, retail: data.length, mobile: upi, web: 0, total: data.length
    };
};

export const downloadAsCSV = (data, ipoCode = "") => {
    if (!data || data.length === 0) return;
    const headers = ["Client Name", "Client Code", "DpId", "BenId", "Quantity", "Price", "Bid Amount", "Created Date", "UPI", "Last Status", "App Source", "App Number", "Mismatch", "Blocked Amount"];
    const rows = data.map((r) => [r.clientName, r.clientCode, r.dpId, r.benId, r.qty, r.price, r.amount, r.date, r.upi, r.status, r.appSource, r.appNumber, r.mismatch, r.blockedAmount]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IPO_Report_${ipoCode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const IPOReport = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedIPO, setSelectedIPO] = useState("");
    const [clientSearch, setClientSearch] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isDateSubmitted, setIsDateSubmitted] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [branchHeaders, setBranchHeaders] = useState([]);
    const [branchRows, setBranchRows] = useState([]);

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const formatDashDate = (date) => {
        if (!date) return "";
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const handleNext = async () => {
        const dateVal = validateDateRange(fromDate, toDate);
        if (!dateVal.isValid) {
            setCustomErrorMsg(dateVal.error);
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setHasSearched(true);
        setBranchHeaders([]);
        setBranchRows([]);

        try {
            const params = {
                datefrom: formatDashDate(fromDate),
                dateto: formatDashDate(toDate),
            };
            console.log("IPOReport: branch zone request params", params);
            const response = await getBranchZoneRoSymbolBranch(params);
            console.log("IPOReport: branch zone response", response);
            const payload = response?.data?.data ?? response?.data;
            const list = Array.isArray(payload) ? payload : payload ? [payload] : [];

            if (list.length === 0) {
                setBranchHeaders([]);
                setBranchRows([]);
                toast.info("No records found for the selected dates.");
            } else {
                const keys = Object.keys(list[0]);
                setBranchHeaders(keys);
                setBranchRows(list.map((item) => keys.map((key) => item[key] ?? "")));
                toast.success("Branch Zone RO data loaded.");
            }

            setIsDateSubmitted(true);
        } catch (error) {
            console.error("Branch Zone RO API error:", error);
            setCustomErrorMsg("Failed to load branch zone RO data. Please try again.");
            setShowCustomError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        const ipoVal = validateIPOSelection(selectedIPO);
        if (!ipoVal.isValid) {
            setCustomErrorMsg(ipoVal.error);
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setHasSearched(true);

        setTimeout(() => {
            let results = [...tableData];
            setData(results);
            setFilteredData(results);
            setLoading(false);
            toast.success("IPO data loaded successfully");
        }, 600);
    };

    const handleClientSearch = () => {
        if (!clientSearch.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        const term = clientSearch.trim().toLowerCase();
        const filtered = data.filter(item => 
            item.clientCode.toLowerCase().includes(term) || 
            item.clientName.toLowerCase().includes(term)
        );
        setFilteredData(filtered);
        toast.info(`Found ${filtered.length} results`);
    };

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (column) => {
        if (sortConfig.key === column) {
            return sortConfig.direction === "asc" ? (
                <ChevronUp size={14} className="text-white ml-2" />
            ) : (
                <ChevronDown size={14} className="text-white ml-2" />
            );
        }
        return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
    };

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const summary = calculateSummaryStats(data);

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={L.card}>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-6 items-end flex-wrap">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">From Date</label>
                            <div className="relative group">
                                <CustomDatePicker
                                    selected={fromDate}
                                    onChange={(d) => { setFromDate(d); setIsDateSubmitted(false); setHasSearched(false); }}
                                    placeholder="DD/MM/YYYY"
                                    className={`px-6 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !fromDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">To Date</label>
                            <div className="relative group">
                                <CustomDatePicker
                                    selected={toDate}
                                    onChange={(d) => { setToDate(d); setIsDateSubmitted(false); setHasSearched(false); }}
                                    placeholder="DD/MM/YYYY"
                                    className={`px-6 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !toDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                />
                            </div>
                        </div>

                        {!isDateSubmitted && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto"
                            >
                                <span>APPLY</span>
                                <span className="text-lg">›</span>
                            </button>
                        )}
                    </div>

                    {branchRows.length > 0 && (
                        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead className="bg-[#1EB04C] text-white uppercase text-[11px] font-bold">
                                        <tr className="h-12">
                                            {branchHeaders.map((head) => (
                                                <th key={head} className="px-4 py-2 border border-white/10 text-left">
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-[12px]">
                                        {branchRows.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="px-4 py-2 border border-gray-100 text-gray-700">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {hasSearched && !loading && branchRows.length === 0 && (
                        <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 text-sm">
                            No branch zone RO rows were returned for the selected dates.
                        </div>
                    )}

                    {isDateSubmitted && (
                        <div className="flex gap-6 items-end animate-in fade-in slide-in-from-top-4 duration-500 pt-4 border-t border-gray-100">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Select IPO</label>
                                <div className="relative group">
                                    <select
                                        value={selectedIPO}
                                        onChange={(e) => setSelectedIPO(e.target.value)}
                                        className="pl-6 pr-12 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-[#34b350] text-sm w-80 bg-white shadow-sm h-[44px] font-bold text-gray-700 cursor-pointer appearance-none transition-all hover:border-[#34b350]"
                                    >
                                        <option value="">Select IPO</option>
                                        {ipoList.map(ipo => <option key={ipo} value={ipo}>{ipo}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all">
                                        <ChevronDown size={18} strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleApply}
                                className="bg-[#1EB04C] hover:bg-[#19923f] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto"
                            >
                                <span>SEARCH</span>
                                <span className="text-lg">›</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {hasSearched && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Summary Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
                        {[
                            { label: "Total No UPI", value: summary.upi },
                            { label: "Total No Accepted", value: summary.accepted },
                            { label: "Total No Rejected", value: summary.rejected },
                            { label: "Total No HNI", value: summary.hni },
                            { label: "Total No Retail", value: summary.retail },
                            { label: "Total No Mobile", value: summary.mobile },
                            { label: "Total No Web", value: summary.web }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col justify-center min-h-[80px]">
                                <div className="text-gray-400 text-[10px] font-bold uppercase mb-1 tracking-tight leading-tight">{stat.label}</div>
                                <div className="text-xl font-extrabold text-black">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Search By Client Code Section */}
                    <div className="mb-8">
                        <label className="text-gray-700 font-bold text-[13px] mb-2 block ml-1">Search By Client Code</label>
                        <div className="flex gap-4 items-center">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#34b350] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search client code"
                                    value={clientSearch}
                                    onChange={(e) => setClientSearch(e.target.value)}
                                    className={`pl-14 pr-6 py-3 border rounded-full focus:outline-none focus:border-[#34b350] text-sm w-[380px] bg-white shadow-sm h-[48px] font-medium transition-all ${showCustomError && !clientSearch.trim() ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleClientSearch}
                                className="bg-[#1EB04C] hover:bg-[#19923f] text-white px-10 h-[48px] rounded-full font-bold text-sm transition-all shadow-md active:scale-95"
                            >
                                APPLY
                            </button>
                            <div className="ml-auto">
                                <button type="button" onClick={() => downloadAsCSV(sortedData, selectedIPO)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-[#34b350] transition-all border border-gray-100 shadow-sm" title="Download CSV">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1800px]">
                                <thead className="bg-[#1EB04C] text-white uppercase text-[11px] font-bold">
                                    <tr className="h-12">
                                        {[
                                            { label: "Client Name", key: "clientName", width: "200px" },
                                            { label: "Client Code", key: "clientCode", width: "120px" },
                                            { label: "DpId", key: "dpId", width: "100px" },
                                            { label: "BenId", key: "benId", width: "100px" },
                                            { label: "Quantity", key: "qty", width: "100px" },
                                            { label: "Price", key: "price", width: "100px" },
                                            { label: "Bid Amount", key: "amount", width: "120px" },
                                            { label: "Date", key: "date", width: "180px" },
                                            { label: "UPI", key: "upi", width: "180px" },
                                            { label: "Status", key: "status", width: "140px" },
                                            { label: "App Source", key: "appSource", width: "130px" },
                                            { label: "App Number", key: "appNumber", width: "130px" },
                                            { label: "Mismatch", key: "mismatch", width: "110px" },
                                            { label: "Blocked Amount", key: "blockedAmount", width: "140px" }
                                        ].map((head) => (
                                            <th 
                                                key={head.key} 
                                                className="px-4 py-2 border border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors"
                                                style={{ width: head.width }}
                                                onClick={() => handleSort(head.key)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="whitespace-nowrap">{head.label}</span>
                                                    {renderSortIcon(head.key)}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-[12px]">
                                    {sortedData.map((row, i) => (
                                        <tr key={i} className="h-11 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-2 border-r border-gray-200 font-bold text-gray-900">{row.clientName}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-700">{row.clientCode}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-600">{row.dpId}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-500">{row.benId}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-800">{row.qty}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-600">{row.price}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-right text-gray-900 font-bold">{row.amount}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-400">{row.date}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-600 italic">{row.upi}</td>
                                            <td className="px-4 py-2 border-r border-gray-200">
                                                <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold uppercase ${row.status.includes('Accepted') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-700">{row.appSource}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-700">{row.appNumber}</td>
                                            <td className="px-4 py-2 border-r border-gray-200 text-gray-700">{row.mismatch}</td>
                                            <td className="px-4 py-2 text-gray-700 font-bold">{row.blockedAmount}</td>
                                        </tr>
                                    ))}
                                    {sortedData.length === 0 && (
                                        <tr>
                                            <td colSpan={14} className="px-5 py-10 text-center text-gray-400 italic font-medium">No data found for selected criteria.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-3 text-[10px] text-gray-400 px-2 font-bold uppercase tracking-widest">
                        Total Records: {sortedData.length}
                    </div>
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[10000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1">Error</h2>
                    <p className="text-base font-semibold">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPOReport;
