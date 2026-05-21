import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import HoldKRAStatus from "./HoldKRAStatus.jsx";
import PhysicalModification from "./PhysicalModification.jsx";
import PhysicalAccountOpening from "./PhysicalAccountOpening.jsx";
import NomineePending from "./NomineePanding.jsx";
import RekycTAT from "./RekycTAT.jsx";
import ReactivationTAT from "./Reactivation TAT.jsx";
import ContactDetailsPage from "./ContactDetailsPage.jsx";
import EKYCTAT from "./EKYCTAT.jsx";
import ArihantProducts from "./ArihantProducts";
import { Eye, ChevronDown, ChevronUp, ChevronsUpDown, Search, ChevronRight } from "lucide-react";
import { getKRADataNew } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function KRAStatusPage() {
  const [activeTab, setActiveTab] = useState("KRA & UCC Status");
  const location = useLocation();

  useEffect(() => {
    // When navigating to /account-opening or /kra-status from the header, reset to default tab
    if (location.pathname === "/account-opening" || location.pathname === "/kra-status") {
      setActiveTab("KRA & UCC Status");
    }
  }, [location.key, location.pathname]);

  const [clientCode, setClientCode] = useState("");
  const [uccStatus, setUccStatus] = useState("");
  const [kraStatus, setKraStatus] = useState("");
  const [uccDetails, setUccDetails] = useState({});
  const [kraDetails, setKraDetails] = useState({});
  const [results, setResults] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const tabs = [
    "KRA & UCC Status",
    "Hold KRA Status",
    "Modification Status",
    "Physical Account Opening",
    "Nominee Pending",
    "Contact Details",
    "Rekyc TAT",
    "Reactivation TAT",
    "EKYC TAT",
  ];

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const trimmedCode = clientCode.trim();
      const params = trimmedCode
        ? {
            Clientcode: trimmedCode,
            clientcode: trimmedCode,
            clientCode: trimmedCode,
            ClientCode: trimmedCode,
          }
        : {};
      
      const response = await getKRADataNew(params);
      console.log("KRA & UCC API Response:", response.data);

      const items = response?.data?.data || response?.data?.Data || response?.data || [];
      const rawItems = Array.isArray(items) ? items : [items];
      
      const formatted = rawItems
        .filter(item => item && (item.clientcode || item.Clientcode || item.clientCode || item.ClientCode))
        .map(item => {
          const uccRaw = item.ucc || item.UCC || item.uccList || [];
          const formattedUcc = Array.isArray(uccRaw) ? uccRaw.map(u => ({
            exchange: u.exchange || u.Exchange || "-",
            segment: u.segment || u.Segment || "-",
            status: u.status || u.Status || "-",
            trade: u.trade || u.Trade || u.tradeStatus || u.TradeStatus || "-"
          })) : [];

          return {
            id: item.id || Date.now() + Math.random(),
            clientcode: item.clientcode || item.Clientcode || item.clientCode || item.ClientCode || "-",
            name: item.clientName || item.ClientName || item.name || item.Name || "-",
            pan: item.pan || item.Pan || "N/A",
            kra: item.kraStatus || item.KraStatus || item.kra || item.Kra || "-",
            ucc: formattedUcc
          };
        });

      setResults(formatted);
      if (formatted.length > 0) {
        toast.success(`Data found for client: ${clientCode.trim()}`);
      } else {
        toast.info("No records found for the entered Client Code");
      }
    } catch (error) {
      console.error("KRA & UCC API Error:", error);
      toast.error("Failed to load KRA & UCC status from server");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // SORT FUNCTION (Same as ComplianceCircular)
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...results].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setResults(sortedData);
  };

  return (
    <div className="bg-[#f3f3f3]">
      <Header />

      {/* CONTENT WRAPPER - Like Contests Page */}
      <div className="px-6 py-2 bg-[#f3f3f3] min-h-screen mt-[60px]">

        {/* Main Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full px-5 pt-4 pb-10">

          {/* Tabs */}
          <div className="flex flex-wrap gap-8 text-[15px] text-black font-semibold border-b border-gray-300 pb-1 mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 transition-all ${activeTab === tab
                    ? "border-b-[3px] border-green-500 font-black text-black"
                    : "hover:text-green-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Content Based on Active Tab */}
          {activeTab === "Hold KRA Status" ? (
            (() => {
              console.log("Rendering HoldKRAStatus");
              return <HoldKRAStatus />;
            })()
          ) : activeTab === "Modification Status" ? (
            <PhysicalModification />
          ) : activeTab === "Physical Account Opening" ? (
            <PhysicalAccountOpening />
          ) : activeTab === "Nominee Pending" ? (
            <NomineePending />
          ) : activeTab === "Contact Details" ? (
            <ContactDetailsPage />
          ) : activeTab === "Rekyc TAT" ? (
            <RekycTAT />
          ) : activeTab === "Reactivation TAT" ? (
            <ReactivationTAT />
          ) : activeTab === "EKYC TAT" ? (
            <EKYCTAT />
          ) : (
            /* KRA & UCC Status Content */
            <div className="space-y-8">
              <p className="text-[18px] text-[#222] mb-2 pt-4">
                Search results({results.length})
              </p>

              <div className="flex gap-8 items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter Client Code or leave blank"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-[400px] h-[54px] rounded-xl border border-gray-300 px-5 text-[18px] outline-none bg-transparent"
                />
 
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-[200px] h-[54px] rounded-full 
                  bg-gradient-to-r from-[#34c759] to-[#28a745]
                  hover:from-[#2eb84f] hover:to-[#23963d]
                  text-white text-[22px] font-semibold
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  tracking-wide disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
 
              {/* Table */}
              {loading ? (
                <div className="p-16 text-center text-gray-500 font-semibold text-[16px]">
                  Loading live KRA & UCC status details from UAT...
                </div>
              ) : results.length > 0 && (
                <div className="w-full overflow-x-auto no-scrollbar border border-gray-300 rounded-lg">
                  <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                    .no-scrollbar {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                    }
                  `}</style>
                  <div className="min-w-[1100px]">
                    {/* Header */}
                    <div className="grid grid-cols-[130px_220px_120px_150px_1fr] bg-[#35b34a] text-white text-[13px] font-bold">

                      {/* Clientcode */}
                      <div
                        onClick={() => handleSort("clientcode")}
                        className="px-2 py-3 border-r flex items-center justify-start gap-1.5 cursor-pointer select-none"
                      >
                        <span>Clientcode</span>
                        <span className="ml-1">
                          {sortConfig.key === "clientcode" ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ChevronDown size={13} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={13} className="text-white/90" />
                          )}
                        </span>
                      </div>

                      {/* ClientName */}
                      <div
                        onClick={() => handleSort("name")}
                        className="px-2 py-3 border-r flex items-center justify-start gap-1.5 cursor-pointer select-none"
                      >
                        <span>ClientName</span>
                        <span className="ml-1">
                          {sortConfig.key === "name" ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ChevronDown size={13} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={13} className="text-white/90" />
                          )}
                        </span>
                      </div>

                      {/* PAN */}
                      <div
                        onClick={() => handleSort("pan")}
                        className="px-2 py-3 border-r flex items-center justify-start gap-1.5 cursor-pointer select-none"
                      >
                        <span>PAN</span>
                        <span className="ml-1">
                          {sortConfig.key === "pan" ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ChevronDown size={13} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={13} className="text-white/90" />
                          )}
                        </span>
                      </div>

                      {/* Kra Response */}
                      <div
                        onClick={() => handleSort("kra")}
                        className="px-2 py-3 border-r flex items-center justify-start gap-1.5 cursor-pointer select-none"
                      >
                        <span>Kra Response</span>
                        <span className="ml-1">
                          {sortConfig.key === "kra" ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ChevronDown size={13} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={13} className="text-white/90" />
                          )}
                        </span>
                      </div>

                      {/* Ucc Response */}
                      <div
                        onClick={() => handleSort("ucc")}
                        className="px-2 py-3 flex items-center justify-start gap-1.5 cursor-pointer select-none"
                      >
                        <span>Ucc Response</span>
                        <span className="ml-1">
                          {sortConfig.key === "ucc" ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ChevronDown size={13} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={13} className="text-white/90" />
                          )}
                        </span>
                      </div>

                    </div>

                    {/* Row */}
                    {results.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[130px_220px_120px_150px_1fr] border-l border-r border-b border-gray-200 bg-white text-[12px] min-h-[70px]"
                      >
                        <div className="px-2 py-2.5 border-r truncate" title={item.clientcode}>{item.clientcode}</div>

                        <div className="px-2 py-2.5 border-r truncate" title={item.name}>{item.name}</div>

                        {/* PAN with eye */}
                        <div className="px-2 py-2.5 border-r flex items-start gap-1">
                          <span className="truncate" title={item.pan}>{item.pan}</span>
                          <button className="mt-[2px] text-gray-500 hover:text-green-600 flex-shrink-0">
                            <Eye size={13} />
                          </button>
                        </div>

                        <div className="px-2 py-2.5 border-r truncate" title={item.kra}>{item.kra}</div>

                        {/* UCC Response */}
                        <div className="px-2 py-2.5">
                          <div className="grid grid-cols-4 text-[11px] font-bold border-b pb-1.5">
                            <span>Exchange</span>
                            <span>Segment</span>
                            <span>Status</span>
                            <span>Trade</span>
                          </div>
                          {item.ucc && item.ucc.length > 0 && item.ucc.map((row, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-4 text-[11px] py-1.5 border-b last:border-0"
                            >
                              <span>{row.exchange}</span>
                              <span>{row.segment}</span>
                              <span>{row.status}</span>
                              <span>{row.trade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Footer */}
                    <p className="text-[14px] text-gray-500 mt-4 ml-4">
                      {results.length} total
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <ArihantProducts />
        </div>
      </div>
    </div>
  );
}
