import React, { useState } from "react";
import "./PayoutRequest.css";
import Header from "./Header.jsx";
import BulkPayout from "./BulkPayout.jsx";
import CancelRequest from "./CancelRequest.jsx";

export default function Payout() {
  const [activeTab, setActiveTab] = useState("payout");

  return (
    <div className="download-container">
      <Header />
      
      {/* CONTENT WRAPPER */}
      <div className="p-6 bg-[#f4f6f9] min-h-screen mt-16">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Tabs */}
        <div className="tabs">
          <span
            onClick={() => setActiveTab("payout")}
            className={`cursor-pointer ${activeTab === "payout" ? "active" : ""}`}
          >
            Payout
          </span>
          <span
            onClick={() => setActiveTab("payout-request")}
            className={`cursor-pointer ${activeTab === "payout-request" ? "active" : ""}`}
          >
            Payout Request
          </span>
          <span
            onClick={() => setActiveTab("cancel-request")}
            className={`cursor-pointer ${activeTab === "cancel-request" ? "active" : ""}`}
          >
            Cancel Request
          </span>
          <span
            onClick={() => setActiveTab("bulk-payout")}
            className={`cursor-pointer ${activeTab === "bulk-payout" ? "active" : ""}`}
          >
            Bulk Payout
          </span>
        </div>

        {/* Tab Content */}
        {activeTab === "payout" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payout</h2>
            <p className="text-gray-600">Payout content will be displayed here</p>
          </div>
        )}

        {activeTab === "payout-request" && (
          <div>
            {/* Search Section */}
            <div className="search-container">
              <p className="search-text">Search results(0)</p>
              <button className="btn clear-btn">CLEAR</button>
              <button className="btn search-btn">SEARCH</button>
            </div>

            {/* Summary Cards */}
            <div className="summary-row">
              <div className="summary-card">
                <p>Total Request</p>
                <h2>0</h2>
              </div>

              <div className="summary-card">
                <p>Total Process</p>
                <h2>0</h2>
              </div>

              <div className="summary-card">
                <p>Total Cancel</p>
                <h2>0</h2>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrapper">
              <div className="table-head">
                <div>Date</div>
                <div>Client Code</div>
                <div>Client Name</div>
                <div>BankAccount</div>
                <div>Request Amount</div>
                <div>Status</div>
              </div>

              <div className="table-body">
                <p>No data to display</p>
              </div>

              <div className="table-footer">0 total</div>
            </div>
          </div>
        )}

        {activeTab === "cancel-request" && (
          <div>
            <CancelRequest />
          </div>
        )}

        {activeTab === "bulk-payout" && (
          <div>
            <BulkPayout />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
