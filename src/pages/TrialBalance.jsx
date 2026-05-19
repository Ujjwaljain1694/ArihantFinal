import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ResultsHeader from "../components/common/ResultsHeader";
import TrialBalanceTable from "../components/common/TrialBalanceTable";
import { getTrialBalance } from "../api/korpApiService";

const TrialBalance = () => {
    const [clientCode, setClientCode] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTableData = async (code = "") => {
        setLoading(true);
        try {
            const params = {
                pageNumber: 0,
                size: 50,
            };
            if (code) {
                params.clientCode = code;
            }

            const response = await getTrialBalance(params);
            console.log("Trial Balance API Response:", response.data);

            const rows =
                response?.data?.data ||
                response?.data?.Data ||
                response?.data ||
                [];

            setTableData(Array.isArray(rows) ? rows : []);
        } catch (error) {
            console.error("API Error:", error);
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleApply = () => {
        fetchTableData(clientCode);
    };

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <h1 className="text-[18px] font-bold text-gray-800 mb-3">Trial Balance</h1>

            {/* Filter Section - More Compact */}
            <div className="bg-[#f2f2f2] p-4 mb-4 border border-gray-200 shadow-sm">
                <div className="flex flex-col gap-1 max-w-[280px]">
                    <label className="text-[11px] text-gray-500 font-normal ml-0.5">Search By Client</label>
                    <div className="flex items-center gap-1.5">
                        <div className="relative flex-1">
                            <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
                            <input
                                type="text"
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                                placeholder="Search client code"
                                className="h-[28px] w-full border border-gray-300 rounded-sm pl-7 pr-2 text-[12px] bg-white outline-none focus:border-[#1EB04C] transition-all"
                            />
                        </div>
                        <button 
                            onClick={handleApply}
                            disabled={loading}
                            className="bg-[#1EB04C] text-white w-[28px] h-[28px] flex items-center justify-center rounded-sm font-bold text-[14px] transition-all hover:bg-[#18a045] disabled:opacity-50"
                        >
                            {loading ? "..." : ">"}
                        </button>
                    </div>
                </div>
            </div>

            <ResultsHeader count={tableData.length} />

            <TrialBalanceTable data={tableData} />
        </div>
    );
};

export default TrialBalance;