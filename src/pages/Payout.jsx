import React, { useState, useEffect } from "react";
import Header from "./Header";
import ArihantProducts from "./ArihantProducts";
import { L } from "../styles/legacyStyles.jsx";
import { Search, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../components/common/Table";
import ResultsHeader from "../components/common/ResultsHeader";
import CalendarHeader from "../components/common/CalendarHeader";
import { getClientPayoutBalance } from "../api/korpApiService";
import { toast } from "react-toastify";

const Payout = () => {
    const [activeTab, setActiveTab] = useState("Payout");

    const tabs = ["Payout", "Bulk Payout", "Payout Report", "Cancel Request"];

    const renderContent = () => {
        switch (activeTab) {
            case "Payout":
                return <PayoutTab />;
            case "Bulk Payout":
                return <BulkPayoutTab />;
            case "Payout Report":
                return <PayoutReportTab />;
            case "Cancel Request":
                return <CancelRequestTab />;
            default:
                return null;
        }
    };

    return (
        <div className="reports-wrapper w-full">
            <div className="bg-[#f3f3f3] min-h-screen">
                <Header />

                <div className="bg-gray-100 p-1 md:p-2 mt-[60px]">
                    <div className="tabs-wrapper w-full bg-white px-4 md:px-8 pt-1 pb-0 shadow-md border border-gray-200 rounded-lg max-w-[1700px] mx-auto">
                        
                        {/* 🧭 NAVIGATION TABS */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pt-4 text-[14px]">
                            {tabs.map((tab) => (
                                <span
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`cursor-pointer pb-[10px] transition-all ${activeTab === tab
                                        ? "border-b-[3px] border-[#34b350] font-bold text-black"
                                        : "text-gray-500 font-medium hover:text-black"
                                        }`}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>

                        {/* 📦 CONTENT AREA */}
                        <div className="pb-6">
                            {renderContent()}
                        </div>

                        {/* 🔗 ARIHANT PRODUCTS SECTION */}
                        <ArihantProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TAB COMPONENTS ---

const PayoutTab = () => {
    const [clientCode, setClientCode] = useState("AP210001");
    const [loading, setLoading] = useState(false);
    const [balanceData, setBalanceData] = useState(null);
    const [balanceItems, setBalanceItems] = useState([]);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = async () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please Enter Client Code");
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setBalanceData(null);
        setBalanceItems([]);
        try {
            const params = {
                size: 50,
                pageNumber: 0,
                clientcode: clientCode.trim()
            };

            const response = await getClientPayoutBalance(params);
            console.log("GetClientPayoutBalance UAT Response:", response.data);
            const resData = response?.data;

            if (resData) {
                setBalanceData(resData);
                const list = resData.data || resData.Data || resData.result || [];
                if (Array.isArray(list)) {
                  setBalanceItems(list);
                } else if (Array.isArray(resData)) {
                  setBalanceItems(resData);
                }
            } else {
                toast.info("No balance data returned from UAT");
            }
        } catch (err) {
            console.error("Failed to fetch client balance payout:", err);
            toast.error("Failed to fetch client balance from UAT");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Search By Client</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                placeholder="Enter client code"
                                className={`pl-11 pr-4 py-3 border rounded-full focus:outline-none focus:border-[#34b350] text-sm w-[320px] bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto active:scale-95 uppercase tracking-wider text-xs"
                    >
                        {loading ? "Loading..." : "APPLY"}
                        <span className="text-lg">›</span>
                    </button>
                </div>
            </div>

            {/* Live UAT Client Balance Cards & Table */}
            {balanceData && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6 animate-in fade-in slide-in-from-bottom duration-300">
                    <h3 className="text-lg font-bold mb-6 text-[#34b350] uppercase tracking-wider border-b pb-2">
                        Client Payout Balance: {clientCode.trim()}
                    </h3>

                    {/* Metadata Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[14px] mb-6">
                        <div className="bg-[#f8fafc] p-4 rounded-xl border">
                            <div className="text-gray-500 font-semibold mb-1">CLIENT NAME</div>
                            <div className="font-bold text-gray-800 text-[16px]">
                                {balanceData.clientName || balanceData.clientname || balanceData.clientName || "-"}
                            </div>
                        </div>
                        <div className="bg-[#f8fafc] p-4 rounded-xl border">
                            <div className="text-gray-500 font-semibold mb-1">CLIENT CODE</div>
                            <div className="font-bold text-gray-800 text-[16px]">
                                {balanceData.clientCode || balanceData.clientcode || clientCode.trim()}
                            </div>
                        </div>
                        <div className="bg-[#f8fafc] p-4 rounded-xl border">
                            <div className="text-gray-500 font-semibold mb-1">AVAILABLE BALANCE</div>
                            <div className="font-bold text-gray-800 text-[16px] text-green-600">
                                ₹ {balanceData.availableBalance || balanceData.clearBalance || balanceData.balance || "0.00"}
                            </div>
                        </div>
                        <div className="bg-[#f8fafc] p-4 rounded-xl border">
                            <div className="text-gray-500 font-semibold mb-1">LEDGER BALANCE</div>
                            <div className="font-bold text-gray-800 text-[16px]">
                                ₹ {balanceData.ledgerBalance || balanceData.ledger || "0.00"}
                            </div>
                        </div>
                    </div>

                    {/* Bank / Account Details Table */}
                    <div className="overflow-x-auto w-full border rounded-xl shadow-sm">
                        <table className="w-full text-[12px] border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#34b350] text-white text-left font-bold">
                                    <th className="px-4 py-3 border-r border-white/10">BANK NAME</th>
                                    <th className="px-4 py-3 border-r border-white/10">ACCOUNT NUMBER</th>
                                    <th className="px-4 py-3 border-r border-white/10 text-right">AVAILABLE BALANCE</th>
                                    <th className="px-4 py-3 text-right">LEDGER BALANCE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {balanceItems.length > 0 ? (
                                    balanceItems.map((item, index) => {
                                        const bank = item.bankName || item.bank || "-";
                                        const account = item.accountNo || item.accountNumber || "-";
                                        const available = item.availableBalance || item.clearBalance || item.balance || "0.00";
                                        const ledger = item.ledgerBalance || item.ledger || "0.00";

                                        return (
                                            <tr key={index} className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                                                <td className="px-4 py-3 border-r font-semibold text-gray-800">{bank}</td>
                                                <td className="px-4 py-3 border-r text-gray-600 font-bold">{account}</td>
                                                <td className="px-4 py-3 border-r text-right font-bold text-green-600">₹ {available}</td>
                                                <td className="px-4 py-3 text-right text-gray-700 font-medium">₹ {ledger}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-400 font-medium text-[13px]">
                                            No balance records returned for this client
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BulkPayoutTab = () => {
    const [file, setFile] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleSubmit = () => {
        if (!file) {
            setCustomErrorMsg("Please Select File First");
            setShowCustomError(true);
            return;
        }
        console.log("File submitted:", file);
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1 mb-2 block">Upload File</label>
                <div className="flex items-center gap-6 flex-wrap">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border border-gray-200 rounded-lg p-2 text-sm bg-white shadow-sm font-semibold"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md active:scale-95 uppercase tracking-wider text-xs"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PayoutReportTab = () => {
    const [requestDate, setRequestDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const fetchReport = async () => {
        if (!requestDate) {
            setCustomErrorMsg("Please Select Request Date");
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setReportData([]);
        try {
            const day = String(requestDate.getDate()).padStart(2, '0');
            const month = String(requestDate.getMonth() + 1).padStart(2, '0');
            const year = requestDate.getFullYear();
            const formattedDate = `${day}-${month}-${year}`; // DD-MM-YYYY

            const params = {
                size: 50,
                pageNumber: 0,
                requestdate: formattedDate
            };

            const response = await getPayoutRequestReport(params);
            console.log("GetPayoutRequestReport UAT Response:", response.data);
            const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

            if (Array.isArray(items)) {
                setReportData(items);
            } else {
                setReportData([]);
            }
        } catch (err) {
            console.error("Failed to fetch payout request report:", err);
            toast.error("Failed to fetch Payout Request report from UAT");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (reportData.length === 0) {
            toast.info("No records to download");
            return;
        }

        const csvHeaders = ["REQUEST DATE", "CLIENT CODE", "CLIENT NAME", "AMOUNT", "BANK NAME", "ACCOUNT NO", "STATUS"];
        const csvContent = [
            csvHeaders.join(","),
            ...reportData.map((item) => {
                const dateVal = item.requestDate || item.date || item.requestdate || "-";
                const client = item.clientCode || item.clientcode || item.client || "-";
                const name = item.clientName || item.clientname || item.name || "-";
                const amount = item.amount || item.payoutAmount || "0.00";
                const bank = (item.bankName || item.bank || "-").replace(/,/g, " ");
                const account = item.accountNo || item.accountNumber || "-";
                const status = item.status || item.payoutStatus || item.remarks || "-";

                return [dateVal, client, name, amount, bank, account, status].join(",");
            })
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const day = String(requestDate.getDate()).padStart(2, '0');
        const month = String(requestDate.getMonth() + 1).padStart(2, '0');
        const year = requestDate.getFullYear();
        a.download = `Payout_Request_Report_${day}_${month}_${year}.csv`;
        a.click();
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Request Date</label>
                        <DatePicker
                            selected={requestDate}
                            onChange={(date) => setRequestDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white shadow-sm font-bold w-[250px] focus:outline-none focus:border-[#34b350] h-[44px]"
                        />
                    </div>
                    
                    <button
                        onClick={fetchReport}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md active:scale-95 uppercase tracking-wider text-xs"
                    >
                        {loading ? "Loading..." : "APPLY"}
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={reportData.length === 0}
                        className="bg-gray-800 hover:bg-gray-900 disabled:opacity-40 disabled:hover:bg-gray-800 text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ml-auto"
                    >
                        <Download size={16} />
                        <span>DOWNLOAD CSV</span>
                    </button>
                </div>
            </div>

            {/* Dynamic UAT Payout Request Report Details */}
            {reportData.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6 animate-in fade-in slide-in-from-bottom duration-300">
                    <h3 className="text-lg font-bold mb-4 text-[#34b350] uppercase tracking-wider border-b pb-2">
                        Payout Request List ({reportData.length} records)
                    </h3>

                    <div className="overflow-x-auto w-full border rounded-xl shadow-sm">
                        <table className="w-full text-[12px] border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#34b350] text-white text-left font-bold">
                                    <th className="px-4 py-3 border-r border-white/10">REQUEST DATE</th>
                                    <th className="px-4 py-3 border-r border-white/10">CLIENT CODE</th>
                                    <th className="px-4 py-3 border-r border-white/10">CLIENT NAME</th>
                                    <th className="px-4 py-3 border-r border-white/10 text-right">AMOUNT</th>
                                    <th className="px-4 py-3 border-r border-white/10">BANK NAME</th>
                                    <th className="px-4 py-3 border-r border-white/10">ACCOUNT NO</th>
                                    <th className="px-4 py-3">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((item, index) => {
                                    const dateVal = item.requestDate || item.date || item.requestdate || "-";
                                    const client = item.clientCode || item.clientcode || item.client || "-";
                                    const name = item.clientName || item.clientname || item.name || "-";
                                    const amount = item.amount || item.payoutAmount || "0.00";
                                    const bank = item.bankName || item.bank || "-";
                                    const account = item.accountNo || item.accountNumber || "-";
                                    const status = item.status || item.payoutStatus || item.remarks || "-";

                                    return (
                                        <tr key={index} className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                                            <td className="px-4 py-3 border-r text-gray-600 font-medium">{dateVal}</td>
                                            <td className="px-4 py-3 border-r font-bold text-gray-800">{client}</td>
                                            <td className="px-4 py-3 border-r font-semibold text-gray-700">{name}</td>
                                            <td className="px-4 py-3 border-r text-right font-bold text-gray-900">₹ {amount}</td>
                                            <td className="px-4 py-3 border-r text-gray-600">{bank}</td>
                                            <td className="px-4 py-3 border-r text-gray-600 font-bold">{account}</td>
                                            <td className={`px-4 py-3 font-bold ${status.toLowerCase().includes("approve") || status.toLowerCase().includes("done") || status.toLowerCase().includes("success") ? "text-green-600" : status.toLowerCase().includes("reject") || status.toLowerCase().includes("cancel") ? "text-red-500" : "text-amber-500"}`}>
                                                {status}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : requestDate && !loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-400 font-medium mt-6 text-[14px]">
                    No payout request records found. Click APPLY to fetch data for the selected date.
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CancelRequestTab = () => {
    const [requestDate, setRequestDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [cancelData, setCancelData] = useState([]);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const fetchCancelData = async () => {
        if (!requestDate) {
            setCustomErrorMsg("Please Select Request Date");
            setShowCustomError(true);
            return;
        }

        setLoading(true);
        setCancelData([]);
        try {
            const day = String(requestDate.getDate()).padStart(2, '0');
            const month = String(requestDate.getMonth() + 1).padStart(2, '0');
            const year = requestDate.getFullYear();
            const formattedDate = `${day}-${month}-${year}`; // DD-MM-YYYY

            const params = {
                size: 50,
                pageNumber: 0,
                requestdate: formattedDate
            };

            const response = await cancelPayoutRequest(params, {});
            console.log("CancelPayoutRequest UAT Response:", response.data);
            const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

            if (Array.isArray(items)) {
                setCancelData(items);
            } else {
                setCancelData([]);
            }
        } catch (err) {
            console.error("Failed to fetch cancel payout request data:", err);
            toast.error("Failed to fetch Cancel Payout Request report from UAT");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (cancelData.length === 0) {
            toast.info("No records to download");
            return;
        }

        const csvHeaders = ["REQUEST DATE", "CLIENT CODE", "CLIENT NAME", "AMOUNT", "BANK NAME", "ACCOUNT NO", "STATUS"];
        const csvContent = [
            csvHeaders.join(","),
            ...cancelData.map((item) => {
                const dateVal = item.requestDate || item.date || item.requestdate || "-";
                const client = item.clientCode || item.clientcode || item.client || "-";
                const name = item.clientName || item.clientname || item.name || "-";
                const amount = item.amount || item.payoutAmount || "0.00";
                const bank = (item.bankName || item.bank || "-").replace(/,/g, " ");
                const account = item.accountNo || item.accountNumber || "-";
                const status = item.status || item.payoutStatus || item.remarks || "-";

                return [dateVal, client, name, amount, bank, account, status].join(",");
            })
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const day = String(requestDate.getDate()).padStart(2, '0');
        const month = String(requestDate.getMonth() + 1).padStart(2, '0');
        const year = requestDate.getFullYear();
        a.download = `Payout_Cancel_Request_Report_${day}_${month}_${year}.csv`;
        a.click();
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Request Date</label>
                        <DatePicker
                            selected={requestDate}
                            onChange={(date) => setRequestDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="px-4 py-3 border border-gray-200 rounded-lg text-sm bg-white shadow-sm font-bold w-[250px] focus:outline-none focus:border-[#34b350] h-[44px]"
                        />
                    </div>
                    
                    <button
                        onClick={fetchCancelData}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md active:scale-95 uppercase tracking-wider text-xs"
                    >
                        {loading ? "Loading..." : "APPLY"}
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={cancelData.length === 0}
                        className="bg-gray-800 hover:bg-gray-900 disabled:opacity-40 disabled:hover:bg-gray-800 text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 ml-auto"
                    >
                        <Download size={16} />
                        <span>DOWNLOAD CSV</span>
                    </button>
                </div>
            </div>

            {/* Dynamic UAT Cancel Payout Request Report Details */}
            {cancelData.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6 animate-in fade-in slide-in-from-bottom duration-300">
                    <h3 className="text-lg font-bold mb-4 text-[#34b350] uppercase tracking-wider border-b pb-2">
                        Cancel Payout Request List ({cancelData.length} records)
                    </h3>

                    <div className="overflow-x-auto w-full border rounded-xl shadow-sm">
                        <table className="w-full text-[12px] border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#34b350] text-white text-left font-bold">
                                    <th className="px-4 py-3 border-r border-white/10">REQUEST DATE</th>
                                    <th className="px-4 py-3 border-r border-white/10">CLIENT CODE</th>
                                    <th className="px-4 py-3 border-r border-white/10">CLIENT NAME</th>
                                    <th className="px-4 py-3 border-r border-white/10 text-right">AMOUNT</th>
                                    <th className="px-4 py-3 border-r border-white/10">BANK NAME</th>
                                    <th className="px-4 py-3 border-r border-white/10">ACCOUNT NO</th>
                                    <th className="px-4 py-3">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cancelData.map((item, index) => {
                                    const dateVal = item.requestDate || item.date || item.requestdate || "-";
                                    const client = item.clientCode || item.clientcode || item.client || "-";
                                    const name = item.clientName || item.clientname || item.name || "-";
                                    const amount = item.amount || item.payoutAmount || "0.00";
                                    const bank = item.bankName || item.bank || "-";
                                    const account = item.accountNo || item.accountNumber || "-";
                                    const status = item.status || item.payoutStatus || item.remarks || "-";

                                    return (
                                        <tr key={index} className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                                            <td className="px-4 py-3 border-r text-gray-600 font-medium">{dateVal}</td>
                                            <td className="px-4 py-3 border-r font-bold text-gray-800">{client}</td>
                                            <td className="px-4 py-3 border-r font-semibold text-gray-700">{name}</td>
                                            <td className="px-4 py-3 border-r text-right font-bold text-gray-900">₹ {amount}</td>
                                            <td className="px-4 py-3 border-r text-gray-600">{bank}</td>
                                            <td className="px-4 py-3 border-r text-gray-600 font-bold">{account}</td>
                                            <td className={`px-4 py-3 font-bold ${status.toLowerCase().includes("approve") || status.toLowerCase().includes("done") || status.toLowerCase().includes("success") ? "text-green-600" : status.toLowerCase().includes("reject") || status.toLowerCase().includes("cancel") ? "text-red-500" : "text-amber-500"}`}>
                                                {status}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : requestDate && !loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-400 font-medium mt-6 text-[14px]">
                    No cancel request records found. Click APPLY to fetch data for the selected date.
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payout;
