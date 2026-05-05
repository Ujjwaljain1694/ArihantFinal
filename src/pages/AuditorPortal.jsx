import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LSelectInput, LApplyBtn } from "../styles/legacyStyles";

const AuditorPortal = () => {
    const [year, setYear] = React.useState("2024-2025");

    return (
        <div style={L.wrapper}>
            <div style={{ ...L.card, maxWidth: "340px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <LField label="Financial year">
                        <LSelectInput
                            options={["2024-2025", "2023-2024", "2022-2023"]}
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            width="200px"
                        />
                    </LField>
                    <div>
                        <LApplyBtn label="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuditorPortal;
