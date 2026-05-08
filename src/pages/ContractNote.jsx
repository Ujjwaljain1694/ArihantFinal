import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterBar";
import Table from "../components/common/Table";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";

const ContractNote = () => {
    const [clientCode, setClientCode] = React.useState("");
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [showCustomError, setShowCustomError] = React.useState(false);
    const [customErrorMsg, setCustomErrorMsg] = React.useState("");

    React.useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        if (!fromDate || !toDate) {
            setCustomErrorMsg("Please select Date range");
            setShowCustomError(true);
            return;
        }
        if (fromDate.toDateString() === toDate.toDateString()) {
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
        toast.error("Data not found", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
        });
    };

    const headers = ["Date", "Client", "Settle", "Contract", "Exchange Code", "File Name"];
    const data = []; // Empty state as requested

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput 
                        placeholder="Search By Client" 
                        width="280px" 
                        value={clientCode}
                        onChange={(e) => setClientCode(e.target.value)}
                        error={showCustomError && !clientCode.trim()}
                    />
                </FilterItem>

                <FilterItem label="From Date">
                    <DateInput selected={fromDate} onChange={(d) => setFromDate(d)} width="180px" error={showCustomError && !fromDate} />
                </FilterItem>

                <FilterItem label="To Date">
                    <DateInput selected={toDate} onChange={(d) => setToDate(d)} width="180px" error={showCustomError && !toDate} />
                </FilterItem>

                <ApplyButton onClick={handleApply} />
            </FilterBar>

            <Table
                headers={headers}
                rows={data}
            />

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

export default ContractNote;
