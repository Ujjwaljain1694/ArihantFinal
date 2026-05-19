import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton, DateInput } from "../components/common/FilterSection";
import StatsCard from "../components/common/StatsCard";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import ResultsHeader from "../components/common/ResultsHeader";
import { getMobileLoginData } from "../api/korpApiService";

const MobileLogin = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    const [stats, setStats] = useState({ active: 0, loggedIn: 0, traded: 0, nonTraded: 0 });

    // Clear error toast after 3 seconds
    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const formatDate = (date) => {
        if (!date) return "";
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const fetchTableData = async (from = null, to = null) => {
        setLoading(true);
        try {
            const params = {
                pageNumber: 0,
                size: 50,
                datefrom: from ? formatDate(from) : "",
                dateto: to ? formatDate(to) : "",
                fromDate: from ? formatDate(from) : "",
                toDate: to ? formatDate(to) : "",
                fromdate: from ? formatDate(from) : "",
                todate: to ? formatDate(to) : "",
            };

            const response = await getMobileLoginData(params);
            console.log("MobileLogin API Response:", response.data);

            const items = response?.data?.data || response?.data?.Data || response?.data?.result?.userList || response?.data || [];
            
            if (Array.isArray(items)) {
                const formatted = items.map(item => [
                    item.clientName || item.ClientName || item.name || "-",
                    item.clientCode || item.ClientCode || item.code || "-",
                    item.status || item.Status || "Active",
                    item.tradeStatus || item.TradeStatus || item.traded || "NO",
                    item.lastTradedDate || item.LastTradedDate || item.tradedDate || "-",
                    item.lastLoginDate || item.LastLoginDate || item.loginDate || "-"
                ]);
                setTableRows(formatted);

                // Dynamically calculate stats
                const active = items.filter(i => (i.status || i.Status || "").toLowerCase() === "active").length || items.length;
                const traded = items.filter(i => (i.tradeStatus || i.TradeStatus || i.traded || "").toLowerCase() === "yes").length;
                const nonTraded = items.filter(i => (i.tradeStatus || i.TradeStatus || i.traded || "").toLowerCase() === "no").length;
                const loggedIn = items.filter(i => i.lastLoginDate || i.LastLoginDate || i.loginDate).length;

                setStats({
                    active,
                    loggedIn: loggedIn || items.length,
                    traded,
                    nonTraded
                });
            } else {
                setTableRows([]);
                setStats({ active: 0, loggedIn: 0, traded: 0, nonTraded: 0 });
            }
        } catch (error) {
            console.error("MobileLogin API Error:", error);
            setTableRows([]);
            setStats({ active: 0, loggedIn: 0, traded: 0, nonTraded: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleDownload = () => {
        const headers = ["Client Name", "Client Code", "Status", "Trade Status", "Last Traded Date", "Last Login Date"];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + tableRows.map(row => row.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Mobile_Login_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleApply = () => {
        if (!fromDate && !toDate) {
            setCustomErrorMsg("Please select Date range");
            setShowCustomError(true);
            return;
        }
        if (fromDate && !toDate) {
            setCustomErrorMsg("Please select To Date");
            setShowCustomError(true);
            return;
        }
        if (!fromDate && toDate) {
            setCustomErrorMsg("Please select From Date");
            setShowCustomError(true);
            return;
        }
        if (fromDate && toDate && fromDate.toDateString() === toDate.toDateString()) {
            setCustomErrorMsg("From and To dates cannot be same");
            setShowCustomError(true);
            return;
        }

        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }
        
        fetchTableData(fromDate, toDate);
    };

    const headers = ["Client Name", "Client Code", "Status", "Trade Status", "Last Traded Date", "Last Login Date"];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto relative">
            <FilterSection>
                <FilterItem label="From Date">
                    <DateInput 
                        selected={fromDate} 
                        onChange={(d) => setFromDate(d)} 
                        error={showCustomError && !fromDate}
                        width="160px"
                    />
                </FilterItem>
                <FilterItem label="To Date">
                    <DateInput 
                        selected={toDate} 
                        onChange={(d) => setToDate(d)} 
                        error={showCustomError && (!toDate || fromDate?.toDateString() === toDate?.toDateString())}
                        width="160px"
                    />
                </FilterItem>
                <div className="pb-0.5">
                    <ApplyButton onClick={handleApply} />
                </div>
            </FilterSection>

            <div className="flex flex-wrap gap-4 mb-8">
                <StatsCard title="Total Active Client" value={loading ? "..." : stats.active.toString()} />
                <StatsCard title="Total Login Clients" value={loading ? "..." : stats.loggedIn.toString()} />
                <StatsCard title="Total Traded Clients" value={loading ? "..." : stats.traded.toString()} />
                <StatsCard title="Total NonTraded Clients" value={loading ? "..." : stats.nonTraded.toString()} />
            </div>

            <ResultsHeader count={tableRows.length} onDownload={handleDownload} />
            {loading ? (
                <div className="p-10 text-center text-gray-500 font-medium">
                    Loading Mobile Login Report...
                </div>
            ) : (
                <DataTable
                    headers={headers}
                    rows={tableRows}
                />
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

export default MobileLogin;
