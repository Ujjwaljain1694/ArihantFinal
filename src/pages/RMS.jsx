import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton } from "../components/common/FilterSection";

const RMS = () => {
    const headers = ["Client Code", "Client Name", "Segment", "Available Margin", "Utilized Margin", "Net Margin"];
    const data = [];

    return (
        <div className="px-10 py-10 max-w-[1600px] mx-auto">
            <FilterSection title="Search By Client">
                <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
                    <input
                        type="text"
                        placeholder="Search client code"
                        className="w-[320px] h-[52px] border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white outline-none italic"
                    />
                </div>
                <ApplyButton />
            </FilterSection>

            <DataTable
                headers={headers}
                rows={data}
            />
        </div>
    );
};

export default RMS;
