import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import Table from "../components/common/Table";
import { L, LField, LDateInput, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const HoldingReport = () => {
    const secondLevelTabs = ["Holding Report", "Open Position", "Global Position", "FO Global Position"];

    const headers = [
        "Client Name", "Client Code", "Script Code", "Script Name", "ISIN",
        "Pledge POA", "Free POA", "MTF QTY", "Net QTY", "Stock Value", "Close Rate"
    ];

    const data = [
        ["SURAJ SUNIL RAJOLE", "AP2100001", "539217", "SRESTHA", "INE606K01049", "0", "252", "", "252", "73.08", "0.29"],
        ["SURAJ SUNIL RAJOLE", "AP2100001", "540614", "GGENG", "INE694X01030", "0", "18", "", "18", "9.9", "0.55"],
        ["SURAJ SUNIL RAJOLE", "AP2100001", "IN8817H01021", "BURNPUR CEMENT LTD EQ LI", "IN8817H01021", "0", "1", "", "1", "0", "0"],
        ["RINAZ MUSHTAQUE SHAIKH", "295900016", "SIL0006", "SILVERBEES", "INF204KC1402", "0", "47", "", "47", "11,158.27", "237.41"]
    ];

    return (
        <Layout>
            <SubNavigation
                activeTab="Transaction"
                secondLevelTabs={secondLevelTabs}
                activeSecondLevelTab="Holding Report"
            />

            <div style={L.wrapper}>
                <div style={L.card}>
                    <div style={L.row}>
                        <LField label="Search client code">
                            <LSearchInput placeholder="Search client code" />
                        </LField>
                        <LField label="As On (Date)">
                            <LDateInput value="22/04/2026" />
                        </LField>
                        <LApplyBtn label="SEARCH >" />
                    </div>
                </div>

                <div className="mt-4">
                    <Table
                        headers={headers}
                        rows={data}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default HoldingReport;

