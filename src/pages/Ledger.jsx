import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import Table from "../components/common/Table";

const Ledger = () => {
    const headers = ["Date", "Particulars", "Voucher No", "Debit", "Credit", "Balance"];
    const data = [];

    return (
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
            {/* Modern Filter Card */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 mb-8">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mr-2">
                        <input type="checkbox" id="margin" className="w-4 h-4 accent-[#1EB04C] cursor-pointer" />
                        <label htmlFor="margin" className="text-[13px] font-normal text-gray-600 cursor-pointer">Including Margin</label>
                    </div>

                    {/* Search Input */}
                    <div className="relative group">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] pointer-events-none"></i>
                        <input 
                            type="text" 
                            placeholder="Enter client code" 
                            className="h-[38px] w-[200px] border border-gray-200 rounded-md pl-8 pr-3 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all" 
                        />
                    </div>

                    {/* From Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-gray-400 font-medium ml-1">From Date</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="DD/MM/YYYY" 
                                className="h-[38px] w-[140px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-700 outline-none bg-white focus:border-[#1EB04C] transition-all" 
                            />
                            <i className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer"></i>
                        </div>
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-gray-400 font-medium ml-1">To Date</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="DD/MM/YYYY" 
                                className="h-[38px] w-[140px] border border-gray-200 rounded-md px-3 text-[13px] text-gray-700 outline-none bg-white focus:border-[#1EB04C] transition-all" 
                            />
                            <i className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer"></i>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="bg-[#1EB04C] text-white px-8 h-[38px] rounded-md font-bold text-[12px] transition-all hover:bg-[#18a045] mt-auto">
                        SEARCH
                    </button>
                </div>
            </div>

            <Table
                headers={headers}
                rows={data}
            />
        </div>
    );
};

export default Ledger;
