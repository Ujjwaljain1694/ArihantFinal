import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LDateInput, LApplyBtn } from "../styles/legacyStyles";

const PerformanceReport = () => {
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

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
                </div>
            </div>
        </div>
    );
};
export default PerformanceReport;
