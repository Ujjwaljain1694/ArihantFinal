import React, { useState, useRef } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ProductBox from "../components/common/ProductBox";
import { L, LField, LSearchInput, LApplyBtn } from "../styles/legacyStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarHeader from "../components/common/CalendarHeader";

const FOGlobalPosition = () => {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const secondLevelTabs = ["Holding Report", "Open Position", "Global Position", "FO Global Position"];

    const fromRef = useRef();
    const toRef = useRef();

    return (
        <Layout>
            <SubNavigation activeTab="Transaction" secondLevelTabs={secondLevelTabs} activeSecondLevelTab="FO Global Position" />
            <div style={L.wrapper}>
                <div style={L.card}>
                    <div style={L.row}>
                        <LField label="Search client code">
                            <LSearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client code" />
                        </LField>
                        <LField label="From Date">
                            <div style={{ position: "relative" }}>
                                <DatePicker
                                    selected={fromDate}
                                    onChange={(date) => setFromDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                    className="custom-datepicker"
                                    style={{
                                        padding: "10px 14px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                        fontSize: "14px",
                                        outline: "none",
                                        width: "150px"
                                    }}
                                    ref={fromRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <i
                                    className="fas fa-calendar-alt"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#777",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                    onClick={() => fromRef.current.setOpen(true)}
                                ></i>
                            </div>
                        </LField>
                        <LField label="To Date">
                            <div style={{ position: "relative" }}>
                                <DatePicker
                                    selected={toDate}
                                    onChange={(date) => setToDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                    className="custom-datepicker"
                                    style={{
                                        padding: "10px 14px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                        fontSize: "14px",
                                        outline: "none",
                                        width: "150px"
                                    }}
                                    ref={toRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <i
                                    className="fas fa-calendar-alt"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#777",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                    onClick={() => toRef.current.setOpen(true)}
                                ></i>
                            </div>
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
export default FOGlobalPosition;
