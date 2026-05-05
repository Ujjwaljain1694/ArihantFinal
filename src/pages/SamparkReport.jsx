import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LDateInput, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const SamparkReport = () => {
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const [search, setSearch] = React.useState("");

    return (
        <Layout>
            <SubNavigation activeTab="Sampark Report" />
            <div style={L.wrapper}>
                <div style={L.card}>
                    <div style={L.row}>
                        <LField label="From Date">
                            <LDateInput value={fromDate} onChange={e => setFromDate(e.target.value)} />
                        </LField>
                        <LField label="To Date">
                            <LDateInput value={toDate} onChange={e => setToDate(e.target.value)} />
                        </LField>
                        <LField label="Search by client">
                            <LSearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Client Code" width="220px" />
                        </LField>
                        <LApplyBtn label="SEARCH >" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default SamparkReport;
