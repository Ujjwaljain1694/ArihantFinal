import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "./assets/position-call-banner.jpg";
import "./DealSlip.css";
import '@fortawesome/fontawesome-free/css/all.css';
import logo from "./logo-arihant-capital.png";

function ResearchSection() {
  const [activeTab, setActiveTab] = useState("zoom");
  const navigate = useNavigate();

  return (
    <div className="download-container">

      {/* Header Section */}
      <div className="topbar">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="menu">
            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span>Reports</span>
            <span>Account Opening</span>
            <span>Download</span>
            <span className="active">Research call</span>
            <span onClick={() => navigate("/dealslip")}>Deal Slip</span>
            <span>Third Party</span>
            <span onClick={() => navigate("/contests")} className="cursor-pointer hover:underline">contests</span>
            <span>Profile<sup className="beta-badge">BETA</sup></span>
            <span onClick={() => navigate("/clicktocall")}>Click To Call</span>
            <span onClick={() => navigate("/payout")}>Payout</span>
          </div>
        </div>

        <div className="right">
          <span className="user-icon">
            <i className="fa-solid fa-user text-white"></i>
            <i className="fa fa-chevron-down fa-2xs text-white"></i>
          </span>
        </div>
      </div>

      <div className="mt-[70px] px-6">

        {/* WHITE CARD */}
        <div className="bg-white rounded-md shadow border p-5">

          {/* 🔥 TOP TABS */}
          <div className="flex gap-8 border-b pb-2 text-base">

          <span
            onClick={() => navigate("/researchcall")}
            className="cursor-pointer pb-2 text-gray-500 hover:text-gray-800 text-base"
          >
            Research Call
          </span>

          <span
            onClick={() => setActiveTab("zoom")}
            className={`cursor-pointer pb-2 ${
              activeTab === "zoom"
                ? "font-semibold border-b-4 border-green-500 text-base"
                : "text-gray-500 text-base"
            }`}
          >
            Zoom Research Call
          </span>

        </div>

        {/* IMAGE (ACTUAL UI INSIDE THIS) */}
        <div className="mt-4">
          <img
            src={banner}
            alt="zoom research"
            className="w-full h-150"
          />
        </div>

        </div>

      </div>

    </div>
  );
}

export default ResearchSection;