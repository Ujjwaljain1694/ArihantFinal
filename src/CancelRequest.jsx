import React from "react";
import { ChevronsUpDown } from "lucide-react";

const CancelRequest = () => (
  <div className="dashboard-wrapper">
    <div className="main-container">
    <div className="flex flex-col gap-10">
        {/* Row 1: Search Results Header */}
        <div className="flex justify-between items-center">
            <div className="text-[14px] text-gray-500 font-normal">Search results(0)</div>
            <button className="text-[#34b350] hover:scale-110 transition-transform">
                <i className="fas fa-download text-xl"></i>
            </button>
        </div>

        {/* Row 2: Data Table */}
        <div className="bg-white border-y border-gray-100 overflow-hidden">
            <table className="w-full text-left text-[13px] border-collapse">
                <thead className="bg-[#34b350] text-white">
                    <tr>
                        {["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"].map((header) => (
                            <th key={header} className="px-4 py-4 border-r border-white/10 last:border-0 font-bold whitespace-nowrap">
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <span>{header}</span>
                                    <ChevronsUpDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6" className="px-4 py-12 text-gray-400 text-left font-normal text-[15px]">No data to display</td>
                    </tr>
                </tbody>
            </table>
            <div className="px-4 py-4 text-gray-400 font-normal text-[13px]">0 total</div>
        </div>
    </div>
    </div>
  </div>
);

export default CancelRequest;
