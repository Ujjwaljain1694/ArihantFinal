import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput } from "../components/common/FilterBar";
import ResultsHeader from "../components/common/ResultsHeader";
import ClientTable from "../components/common/ClientTable";
import { getClientMIS } from "../api/korpApiService";
import { extractDataFromApiResponse } from "../utils/apiResponseHandler";

const ClientMIS = () => {
    const [clientCode, setClientCode] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    React.useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

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

            const response = await getClientMIS(params);
            console.log("Client MIS API Response:", response.data);

            // Extract raw rows from the API response using the shared utility
            const rows = extractDataFromApiResponse(response);
            console.log("Extracted rows count:", rows.length);

            // Normalize the field names to match the table component's expected keys
            const normalizedRows = rows.map(item => ({
                name: item.clientname ?? item.name ?? "",
                code: item.clientcode ?? item.code ?? "",
                pan: item.PAN ?? item.pan ?? "",
                mobile: item.MOBILE ?? item.mobile ?? "",
                email: item.EMAIL ?? item.email ?? "",
                bank: item.DEFAULT_BANK ?? item.bank ?? "",
                city: item.CITY ?? item.city ?? "",
                date: item.OPENINGDATE ?? item.date ?? "",
                dp: item.DPID ?? item.dp ?? "",
            }));
            console.log("Normalized rows (first 3):", normalizedRows.slice(0, 3));

            if (normalizedRows.length > 0) {
                setTableData(normalizedRows);
            } else {
                setTableData([]);
                if (code) {
                    toast.error("Data not found", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored"
                    });
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            setTableData([]);
            if (code) toast.error("Failed to fetch data from the server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleApply = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        fetchTableData(clientCode.trim());
    };

    const handleDownload = () => {
        toast.info("Downloading report...");
    };
    // Dummy data removed; using state instead.

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput
                        placeholder="Search By Client"
                        width="300px"
                        value={clientCode}
                        onChange={(e) => setClientCode(e.target.value)}
                        error={showCustomError && !clientCode.trim()}
                    />
                </FilterItem>
                <ApplyButton label={loading ? "Searching..." : "Apply"} onClick={handleApply} />
            </FilterBar>

            <ResultsHeader count={tableData.length} onDownload={handleDownload} />

            <ClientTable data={tableData} />

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

export default ClientMIS;
