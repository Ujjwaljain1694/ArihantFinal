import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton, DateInput } from "../components/common/FilterSection";
import StatsCard from "../components/common/StatsCard";

const MobileLogin = () => {
    const headers = ["Client Name", "Client Code", "Status", "Trade Status", "Last Traded Date", "Last Login Date"];
    const data = [
        ["SURAJ SUNIL RAJOLE", "AP2100001", "Active", "NO", "19-12-2025", "16-04-2026"],
        ["ANAND SUNIL RAJOLE", "28640A085", "Active", "NO", "13-04-2026", "16-04-2026"]
    ];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterSection>
                <FilterItem label="From Date">
                    <DateInput value="DD/MM/YYYY" width="160px" />
                </FilterItem>
                <FilterItem label="To Date">
                    <DateInput value="DD/MM/YYYY" width="160px" />
                </FilterItem>
                <ApplyButton label="SEARCH >" />
            </FilterSection>

            <div className="flex flex-wrap gap-4 mb-8">
                <StatsCard title="Total Active Client" value="10" />
                <StatsCard title="Total Login Clients" value="7" />
                <StatsCard title="Total Traded Clients" value="4" />
                <StatsCard title="Total NonTraded Clients" value="3" />
            </div>

            <DataTable
                headers={headers}
                rows={data}
                resultsCount={7}
            />
        </div>
    );
};

export default MobileLogin;
