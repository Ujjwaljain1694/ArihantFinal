import React, { useState } from "react";
import "./PayoutRequest.css";
import Header from "./Header.jsx";
import BulkPayout from "./BulkPayout.jsx";
import CancelRequest from "./CancelRequest.jsx";

export default function Payout() {
  const [activeTab, setActiveTab] = useState("payout");
  const [clientCode, setClientCode] = useState("");
  const [results, setResults] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (!clientCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setResults(null);
      return;
    }
    
    setResults([
      { date: "2026-04-29", code: clientCode, name: "Sample Client", bank: "HDFC Bank", amount: "₹50,000", status: "Active" }
    ]);
  };

  return (
    <div className="download-container">
      <Header />
      
      {/* CONTENT WRAPPER */}
      <div className="p-6 bg-[#f4f6f9] min-h-screen pb-16 mt-16">
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
            {/* 🚨 CUSTOM ERROR POPUP */}
            {showError && (
              <div className="fixed top-5 right-5 z-[1000] animate-in slide-in-from-top-10 fade-in duration-300">
                <div className="bg-[#e11d48] text-white p-6 rounded-2xl shadow-2xl flex items-center gap-10 min-w-[320px] relative overflow-hidden">
                  <div className="space-y-1">
                    <h4 className="text-[18px] font-bold tracking-tight">Error</h4>
                    <p className="text-[14px] font-medium opacity-95">Please Enter Client Code or Script Name</p>
                  </div>
                  <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center relative">
                    <div className="w-6 h-[2px] bg-white rotate-45 absolute"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-10">
                <div className="bg-[#e9ecef] py-3 px-6 rounded-xl">
                    <div className="text-gray-500 font-bold text-[14px] mb-3">Search By Client</div>
                    <div className="flex items-center gap-6">
                        <div className="relative w-[240px]">
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]"></i>
                            <input 
                                type="text" 
                                placeholder="Search client code" 
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                className="w-full h-[38px] border border-gray-200 rounded-full pl-10 pr-4 text-[13px] bg-white outline-none focus:border-[#34b350] transition-all" 
                            />
                        </div>
                        <button 
                          onClick={handleSearch}
                          className="bg-[#34b350] text-white px-7 h-[38px] rounded-full font-bold text-[13px] transition-all hover:bg-[#2da047]"
                        >
                            SEARCH &gt;
                        </button>
                    </div>
                </div>

                {results && (
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <table className="w-full text-left text-[13px] border-collapse">
                        <thead className="bg-[#34b350] text-white">
                            <tr>
                                {["Date", "Client Code", "Client Name", "Bank", "Amount", "Status"].map((h) => (
                                    <th key={h} className="px-4 py-4 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, i) => (
                              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-4">{row.date}</td>
                                  <td className="px-4 py-4">{row.code}</td>
                                  <td className="px-4 py-4">{row.name}</td>
                                  <td className="px-4 py-4">{row.bank}</td>
                                  <td className="px-4 py-4 font-bold">{row.amount}</td>
                                  <td className="px-4 py-4">
                                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase">{row.status}</span>
                                  </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
                )}
            </div>
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
