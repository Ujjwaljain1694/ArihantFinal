import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton } from "../components/common/FilterSection";
import { getCombinePeakMargin } from "../api/korpApiService";

const RMS = () => {
    const headers = ["Client Code", "Client Name", "Segment", "Available Margin", "Utilized Margin", "Net Margin"];
    const [clientCode, setClientCode] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTableData = async (code = "") => {
        setLoading(true);
        try {
            const params = {
                pageNumber: 0,
                size: 50,
                clientCode: code || "",
                ClientCode: code || "",
                Search: code || "",
            };
            const response = await getCombinePeakMargin(params);
            console.log("CombinePeakMargin API Response:", response.data);

            const items =
                response?.data?.data ||
                response?.data?.Data ||
                response?.data ||
                [];

            if (Array.isArray(items)) {
                const formatted = items.map(item => [
                    item.clientCode || item.ClientCode || "-",
                    item.clientName || item.ClientName || "-",
                    item.segment || item.Segment || "-",
                    item.availableMargin || item.AvailableMargin || item.available_margin || item.margin || "0.00",
                    item.utilizedMargin || item.UtilizedMargin || item.utilized_margin || "0.00",
                    item.netMargin || item.NetMargin || item.net_margin || "0.00"
                ]);
                setRows(formatted);
            } else {
                setRows([]);
            }
        } catch (error) {
            console.error("RMS API Error:", error);
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleApply = () => {
        fetchTableData(clientCode.trim());
    };

    return (
        <div className="px-10 py-10 max-w-[1600px] mx-auto">
            <FilterSection title="Search By Client">
                <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
                    <input
                        type="text"
                        value={clientCode}
                        onChange={(e) => setClientCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                        placeholder="Search client code"
                        className="w-[320px] h-[52px] border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white outline-none italic"
                    />
                </div>
                <ApplyButton onClick={handleApply} label={loading ? "..." : "APPLY"} />
            </FilterSection>

            {loading ? (
                <div className="p-10 text-center text-gray-500 font-medium">
                    Loading RMS Margin Data...
                </div>
            ) : (
                <DataTable
                    headers={headers}
                    rows={rows}
                />
            )}
        </div>
    );
};

export default RMS;
