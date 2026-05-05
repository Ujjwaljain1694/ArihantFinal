import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import Table from "../components/common/Table";
import { L, LField, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const OpenPosition = () => {
    const secondLevelTabs = ["Holding Report", "Open Position", "Global Position", "FO Global Position"];

    const headers = [
        "Client Name", "Client Code", "Script Name", "Option Type", "MTM",
        "Strikeprice", "Exp. Date", "Open Buy", "Open Sell"
    ];

    const data = [
        ["DHRUVIK BHAVESH KUMAR", "206400023", "SENSEX", "CE", "-14025.00", "82000.0", "23-04-2026", "3500.0", "500.0"],
        ["VIVEK SHAH", "206400028", "WIPRO", "PE", "-1212720.00", "0.0", "28-05-2026", "0.0", "0.0"],
        ["VIVEK SHAH", "206400028", "SENSEX", "PE", "-3250.00", "74700.0", "23-04-2026", "1000.0", "0.0"],
        ["VIVEK SHAH", "206400028", "SENSEX", "PE", "3900.00", "75000.0", "23-04-2026", "2740.0", "3000.0"],
        ["VIVEK SHAH", "206400028", "SENSEX", "CE", "7500.00", "81700.0", "23-04-2026", "0.0", "1000.0"]
    ];

    return (
        <Layout>
            <SubNavigation
                activeTab="Transaction"
                secondLevelTabs={secondLevelTabs}
                activeSecondLevelTab="Open Position"
            />

            <div style={L.wrapper}>
                <div style={L.card}>
                    <div style={L.row}>
                        <LField label="Search client code">
                            <LSearchInput placeholder="Search client code" />
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

export default OpenPosition;
