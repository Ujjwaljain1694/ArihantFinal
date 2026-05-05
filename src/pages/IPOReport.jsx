import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ProductBox from "../components/common/ProductBox";

const IPOReport = () => {
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                <div className="bg-[#f8f9fa] border border-gray-100 px-8 py-8 rounded-2xl mb-12 shadow-sm">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={e => setFromDate(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={e => setToDate(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                        <button className="bg-[#27ae60] hover:bg-[#219150] text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all shadow-md flex items-center justify-center gap-2">
                            <span>SEARCH</span>
                            <span className="text-[18px]">›</span>
                        </button>
                    </div>
                </div>
                
                <div className="mb-4 text-[12px] text-gray-600">
                    What we mean when we say — <strong>(Z):</strong> Zone, <strong>(R):</strong> Region, <strong>(Br):</strong> Branch, <strong>(AP):</strong> Authorized Person/Sub Broker
                </div>
                
                <ProductBox />
            </div>
        </div>
    );
};
export default IPOReport;
