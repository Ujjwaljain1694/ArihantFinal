import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

export default function PhysicalAccountOpening() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // SEARCH / BACKEND READY
  const handleApply = async () => {
    const data = [
      {
        clientCode: "CL001",
        clientName: "Astha Gour",
        pan: "ABCDE1234F",
        date: "24-04-2026",
        searchCode: "SC001",
        requestType: "Account Opening",
        status: "Pending",
        remark: "-",
        remark2: "-",
        remark3: "-",
      },
      {
        clientCode: "CL002",
        clientName: "Riya Sharma",
        pan: "PQRSX4567K",
        date: "25-04-2026",
        searchCode: "SC002",
        requestType: "Account Opening",
        status: "Approved",
        remark: "Completed",
        remark2: "-",
        remark3: "-",
      },
    ];

    let filtered = data;

    if (search.trim() !== "") {
      filtered = data.filter((item) =>
        item.clientCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    setResults(filtered);
  };

  // SORT
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...results].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setResults(sorted);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <p className="text-[18px] text-[#222] mb-2 pt-2">
        Search results({results.length})
      </p>

      <div className="flex items-center gap-8 mb-8">
        <div className="relative w-[430px]">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search client code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[54px] rounded-full border border-gray-300 pl-14 pr-4 text-[18px] outline-none bg-white"
          />
        </div>
        <button className="bg-gradient-to-r from-[#35b34a] to-[#2f9f42] hover:from-[#2f9f42] hover:to-[#28a845] text-white font-bold text-[18px] px-8 h-[44px] rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          APPLY
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-10 bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
          <div
            onClick={() => handleSort("clientCode")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Code</span>
            <span className="ml-2">
              {sortConfig.key === "clientCode" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>
          
          <div
            onClick={() => handleSort("clientName")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Name</span>
            <span className="ml-2">
              {sortConfig.key === "clientName" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("pan")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>PAN</span>
            <span className="ml-2">
              {sortConfig.key === "pan" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("date")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Date</span>
            <span className="ml-2">
              {sortConfig.key === "date" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("searchCode")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>SearchCode</span>
            <span className="ml-2">
              {sortConfig.key === "searchCode" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("requestType")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Request Type</span>
            <span className="ml-2">
              {sortConfig.key === "requestType" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("status")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Status</span>
            <span className="ml-2">
              {sortConfig.key === "status" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark</span>
            <span className="ml-2">
              {sortConfig.key === "remark" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark2")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark2</span>
            <span className="ml-2">
              {sortConfig.key === "remark2" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark3")}
            className="px-4 py-2 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark3</span>
            <span className="ml-2">
              {sortConfig.key === "remark3" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* Body */}
        {results.length === 0 ? (
          <>
            <div className="bg-white h-[90px] flex items-center px-6 text-[18px] text-gray-500 border-b">
              No data to display
            </div>

            <div className="bg-white px-6 py-5 text-gray-500">
              0 total
            </div>
          </>
        ) : (
          <>
            {results.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-10 bg-white border-b border-gray-200 text-[15px]"
              >
                <div className="px-4 py-4">{row.clientCode}</div>
                <div className="px-4 py-4">{row.clientName}</div>
                <div className="px-4 py-4">{row.pan}</div>
                <div className="px-4 py-4">{row.date}</div>
                <div className="px-4 py-4">{row.searchCode}</div>
                <div className="px-4 py-4">{row.requestType}</div>
                <div className="px-4 py-4 text-green-600">{row.status}</div>
                <div className="px-4 py-4">{row.remark}</div>
                <div className="px-4 py-4">{row.remark2}</div>
                <div className="px-4 py-4">{row.remark3}</div>
              </div>
            ))}

            <div className="bg-white px-6 py-5 text-gray-500">
              {results.length} total
            </div>
          </>
        )}
      </div>
    </div>
  );
}
