import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ProductBox from "../components/common/ProductBox";
import { L, LField, LDateInput, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const GlobalPosition = () => {
    const [search, setSearch] = React.useState("");
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const secondLevelTabs = ["Holding Report", "Open Position", "Global Position", "FO Global Position"];

    return (
        <Layout>
            <SubNavigation activeTab="Transaction" secondLevelTabs={secondLevelTabs} activeSecondLevelTab="Global Position" />
            <div style={L.wrapper}>
                <div style={L.card}>
                    <div style={L.row}>
                        <LField label="Search client code">
                            <LSearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client code" />
                        </LField>
                        <LField label="From Date">
                            <LDateInput value={fromDate} onChange={e => setFromDate(e.target.value)} />
                        </LField>
                        <LField label="To Date">
                            <LDateInput value={toDate} onChange={e => setToDate(e.target.value)} />
                        </LField>
                        <LApplyBtn label="SEARCH >" />
                    </div>
                </div>
                <div style={{ padding: "8px 0 6px", fontSize: "12px", color: "#777" }}>
                    What we mean when we say — <strong>(Z):</strong> Zone, <strong>(R):</strong> Region, <strong>(Br):</strong> Branch, <strong>(AP):</strong> Authorized Person/Sub Broker
                </div>
                <ProductBox />
            </div>
        </Layout>
    );
};
export default GlobalPosition;
