import React, { useState } from "react";
import "./DealSlip.css";
import '@fortawesome/fontawesome-free/css/all.css';
import logo from "./logo-arihant-capital.png";

function FundamentalCall() {
  const [activeTopTab, setActiveTopTab] = useState("research");
  const [activeSubTab, setActiveSubTab] = useState("short-term");

  const subTabs = [
    { id: "intra-day", label: "Intra Day Call" },
    { id: "fundamental", label: "Fundamental Call" },
    { id: "short-term", label: "Short Term Call" }
  ];

  const getTabContent = () => {
    switch(activeSubTab) {
      case "intra-day":
        return `Intra Day Call Content - ${activeTopTab === "research" ? "Research Call" : "Zoom Research Call"}`;
      case "fundamental":
        return `Fundamental Call Content - ${activeTopTab === "research" ? "Research Call" : "Zoom Research Call"}`;
      case "short-term":
        return `Short Term Call Content - ${activeTopTab === "research" ? "Research Call" : "Zoom Research Call"}`;
      default:
        return "";
    }
  };

  return (
    <div className="download-container">
      {/* Header Section */}
      <div className="topbar">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="menu">
            <span onClick={() => window.location.href = "/dashboard"}>Dashboard</span>
            <span>Reports</span>
            <span>Account Opening</span>
            <span>Download</span>
            <span onClick={() => window.location.href = "/researchcall"}>Research call</span>
            <span className="active">Fundamental call</span>
            <span onClick={() => window.location.href = "/dealslip"}>Deal Slip</span>
            <span>Third Party</span>
            <span onClick={() => window.location.href = "/contests"} className="cursor-pointer hover:underline">contests</span>
            <span>Profile<sup className="beta-badge">BETA</sup></span>
            <span onClick={() => window.location.href = "/clicktocall"} className="cursor-pointer hover:underline">Click To Call</span>
            <span onClick={() => window.location.href = "/payout"}>Payout</span>
          </div>
        </div>
        <div className="right">
          <span className="user-icon">
            <i className="fa-solid fa-user text-white"></i>
            <i className="fa fa-chevron-down fa-2xs text-white"></i>
          </span>
        </div>
      </div>
      
      {/* Top Tabs */}
          <div className="flex gap-6 border-b pb-3">
            <span
              onClick={() => setActiveTopTab("research")}
              className={
                activeTopTab === "research"
                  ? "font-semibold border-b-4 border-green-500 pb-2 cursor-pointer text-lg"
                  : "text-gray-600 cursor-pointer hover:text-gray-800 text-lg"
              }
            >
              Research Call
            </span>
            <span
              onClick={() => setActiveTopTab("zoom")}
              className={
                activeTopTab === "zoom"
                  ? "font-semibold border-b-4 border-green-500 pb-2 cursor-pointer text-lg"
                  : "text-gray-600 cursor-pointer hover:text-gray-800 text-lg"
              }
            >
              Zoom Research Call
            </span>
          </div>

          {/* Sub Tabs */}
          <div className="flex gap-8 mt-6 text-gray-600 text-sm">
            {subTabs.map((tab) => (
              <span
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={
                  activeSubTab === tab.id
                    ? "border-b-4 border-green-500 pb-1 text-black font-medium cursor-pointer"
                    : "cursor-pointer hover:text-gray-800"
                }
              >
                {tab.label}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-black">
              Research Disclaimer:
            </span>{" "}
            Registration granted by SEBI and certification from NISM in no way
            guarantee performance of the intermediary or provide any assurance of
            returns to investors. Investment in securities market are subject to
            market risks. Read all the related documents carefully before investing.{" "}
            <span className="text-black-600 cursor-pointer">LINK</span>
          </p>

          {/* Table Header - Without Segment Column */}
          <div className="mt-6 border border-black rounded-md overflow-hidden bg-yellow-50">
            <div className="grid grid-cols-2 bg-yellow-50 font-medium text-gray-700">
              <div className="p-3 border-r border-black flex items-center justify-betweeen">
                <span>Date&Time</span>
                
              </div>
              <div className="p-3">Message</div>
            </div>
          </div>
    </div>
  );
}

export default FundamentalCall;
