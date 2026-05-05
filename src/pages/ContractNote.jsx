import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterBar";
import Table from "../components/common/Table";

const ContractNote = () => {
    const headers = ["Date", "Client", "Settle", "Contract", "Exchange Code", "File Name"];
    const data = []; // Empty state as requested

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput placeholder="Search By Client" width="220px" />
                </FilterItem>

                <FilterItem label="From Date">
                    <DateInput value="" width="140px" />
                </FilterItem>

                <FilterItem label="To Date">
                    <DateInput value="" width="140px" />
                </FilterItem>

                <ApplyButton label="Apply" />
            </FilterBar>

            <Table
                headers={headers}
                rows={data}
            />
        </div>
    );
};

export default ContractNote;
