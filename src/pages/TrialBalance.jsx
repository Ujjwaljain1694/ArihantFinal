import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ResultsHeader from "../components/common/ResultsHeader";
import TrialBalanceTable from "../components/common/TrialBalanceTable";
import { FilterItem, SearchInput, ApplyButton } from "../components/common/FilterSection";
import { toast } from "react-toastify";

const TrialBalance = () => {
    const [clientCode, setClientCode] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    React.useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleDownload = () => {
        const headers = ["NAME", "CODE", "BRANCH", "REGION", "ZONE", "OPEN DEBIT", "OPEN CREDIT", "NET DEBIT", "NET CREDIT"];
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + dummyData.map(row => [
                row.name, row.code, row.branch, row.region, row.zone, 
                row.openDebit, row.openCredit, row.netDebit, row.netCredit
            ].join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "trial_balance.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Downloading Trial Balance report...");
    };

    const handleApply = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        toast.error("Data not found", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
        });
    };
    const dummyData = [
        { 
            name: "SURAJ SUNIL RAJOLE", 
            code: "AP2100001", 
            branch: "AHMEDABAD", 
            region: "GUJARAT", 
            zone: "WEST", 
            openDebit: "3,093.02", 
            openCredit: "0.00", 
            netDebit: "3,093.02", 
            netCredit: "0.00" 
        },
        { 
            name: "RINAZ MUSHTAQUE SHAIKH", 
            code: "295900016", 
            branch: "PUNE", 
            region: "MAHARASHTRA", 
            zone: "WEST", 
            openDebit: "0.00", 
            openCredit: "134,446.85", 
            netDebit: "0.00", 
            netCredit: "134,446.85" 
        }
    ];

    return (
        <div className="px-0 pt-4 pb-10 max-w-[1600px] mx-auto">
            <h1 className="text-[18px] font-bold text-gray-800 mb-2 pl-0">Trial Balance</h1>

            {/* Optimized Filter Bar */}
            <div className="bg-gray-100 p-6 mb-8 rounded-xl border border-gray-200">
                <div className="flex items-end gap-6">
                    <FilterItem label="Search By Client">
                        <SearchInput 
                            placeholder="Enter client code" 
                            width="320px" 
                            value={clientCode}
                            onChange={(e) => setClientCode(e.target.value)}
                            error={showCustomError && !clientCode.trim()}
                        />
                    </FilterItem>
                    
                    <ApplyButton 
                        label="APPLY" 
                        onClick={handleApply} 
                    />
                </div>
            </div>

            <ResultsHeader count={dummyData.length} onDownload={handleDownload} />

            <TrialBalanceTable data={dummyData} />

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[6000]
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

export default TrialBalance;
