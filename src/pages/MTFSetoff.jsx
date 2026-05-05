import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import { L, LField, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const MTFSetoff = () => {
    const [search, setSearch] = React.useState("");
    const [searched, setSearched] = React.useState(false);

    const headers = ["Date", "Client Code", "Script", "Quantity", "Price", "Amount"];

    return (
        <div style={L.wrapper}>
            {/* Flat form bar — no card, no shadow */}
            <div style={L.card}>
                <div style={L.row}>
                    <LField label="Search by client">
                        <LSearchInput
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search client code"
                        />
                    </LField>
                    {/* Button label: SEARCH > */}
                    <LApplyBtn label="SEARCH >" onClick={() => setSearched(true)} />
                </div>
            </div>

            {/* Table hidden by default — shows only after search */}
            <DataTable
                headers={headers}
                rows={[]}
                visible={searched}
            />
        </div>
    );
};

export default MTFSetoff;
