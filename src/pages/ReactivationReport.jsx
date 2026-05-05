import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LDateInput, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const ReactivationReport = () => {
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const [search, setSearch] = React.useState("");

    return (
        <div style={L.wrapper}>
            <div style={L.card}>
                <div style={L.row}>
                    <LField label="From Date">
                        <LDateInput value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </LField>
                    <LField label="To Date">
                        <LDateInput value={toDate} onChange={e => setToDate(e.target.value)} />
                    </LField>
                    <LApplyBtn label="SEARCH >" />
                    <div style={{ width: "1px", background: "#e0e0e0", alignSelf: "stretch" }} />
                    <LField label="Search by client">
                        <LSearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client code" />
                    </LField>
                    <LApplyBtn label="SEARCH >" />
                </div>
            </div>
        </div>
    );
};
export default ReactivationReport;
