import React, { useState, useEffect } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { getNomineeNotDone } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function NomineePending() {
  const [filterClient, setFilterClient] = useState("");
  const [filterClientName, setFilterClientName] = useState("");
  const [filterMobile, setFilterMobile] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleData, setVisibleData] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  useEffect(() => {
    handleApply();
  }, []);

  // SEARCH / BACKEND READY
  const handleApply = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (filterClient.trim()) {
        params.clientCode = filterClient.trim();
      }

      const response = await getNomineeNotDone(params);
      console.log("FULL API RESPONSE :", response.data);

      // ✅ CORRECT RESPONSE ARRAY
      const items = response?.data?.result || [];

      if (Array.isArray(items)) {
        let filtered = items;

        // Local filters
        if (filterClient.trim() !== "") {
          filtered = filtered.filter((item) => {
            const code = item.Code || "";
            return code.toLowerCase().includes(filterClient.toLowerCase());
          });
        }

        if (filterClientName.trim() !== "") {
          filtered = filtered.filter((item) => {
            const name = item.Name || "";
            return name.toLowerCase().includes(filterClientName.toLowerCase());
          });
        }

        if (filterMobile.trim() !== "") {
          filtered = filtered.filter((item) => {
            const mobile = item.Mobile || "";
            return mobile.includes(filterMobile);
          });
        }

        setResults(filtered);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Failed to fetch pending nominees:", error);
      toast.error("Failed to fetch pending nominees from UAT server");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // VISIBILITY TOGGLE
  const toggleVisibility = (field, index) => {
    setVisibleData(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
    <div className="bg-white">
      <p className="text-[18px] text-[#222] mb-2 pt-2">
        Search results({results.length})
      </p>

      {/* Filter Inputs */}
      <div className="flex gap-6 mb-8 mt-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="1. Filter by Client"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="2. Filter by Client Name"
            value={filterClientName}
            onChange={(e) => setFilterClientName(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="3. Filter by Mobile"
            value={filterMobile}
            onChange={(e) => setFilterMobile(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>

        <button
          onClick={handleApply}
          className="bg-[#34b44a] text-white font-bold text-[14px] px-8 h-[45px] rounded-lg flex items-center gap-2 shadow-md hover:bg-[#2e9d41] transition-all active:scale-95"
        >
          APPLY
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
          <div
            onClick={() => handleSort("Code")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Code</span>
            <span className="ml-2">
              {sortConfig.key === "Code" ? (
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
            onClick={() => handleSort("Name")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Name</span>
            <span className="ml-2">
              {sortConfig.key === "Name" ? (
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
            onClick={() => handleSort("Mobile")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Mobile</span>
            <span className="ml-2">
              {sortConfig.key === "Mobile" ? (
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
            onClick={() => handleSort("Email")}
            className="px-4 py-2 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Email</span>
            <span className="ml-2">
              {sortConfig.key === "Email" ? (
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
        {isLoading ? (
          <div className="bg-[#f2f2f2] h-[100px] flex items-center justify-center px-6 text-[16px] text-gray-500 border-x border-b border-gray-300 font-semibold">
            Loading pending nominee data from UAT...
          </div>
        ) : results.length === 0 ? (
          <>
            <div className="bg-[#f2f2f2] h-[90px] flex items-center px-6 text-[18px] text-gray-500 border-x border-b border-gray-300">
              No data to display
            </div>

            <div className="bg-[#f2f2f2] px-6 py-5 text-gray-500 border-x border-b border-gray-300">
              0 total
            </div>
          </>
        ) : (
          <>
            {results.map((row, index) => {
              // ✅ CORRECT API KEYS
              const clientCode = row.Code || "-";
              const clientName = row.Name || "-";
              const mobile = row.Mobile || "-";
              const email = row.Email || "-";

              const displayMobile = mobile !== "-" && mobile.length >= 8
                ? `${mobile.substring(0, 2)}xxxxxx${mobile.substring(8)}`
                : mobile;

              const displayEmail = email !== "-" && email.includes("@")
                ? `${email.substring(0, 2)}xxxxxx@${email.split('@')[1]}`
                : email;

              return (
                <div
                  key={index}
                  className="grid grid-cols-4 bg-[#f2f2f2] border-x border-b border-gray-300 text-[15px] hover:bg-gray-200 transition-colors"
                >
                  <div className="px-4 py-2 border-r border-gray-200">{clientCode}</div>
                  <div className="px-4 py-2 border-r border-gray-200">{clientName}</div>
                  <div className="px-4 py-2 border-r border-gray-200">
                    {visibleData[index] ? (
                      <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('mobile', index)}>
                        {mobile}
                        <EyeOff size={14} className="ml-2 opacity-50" />
                      </span>
                    ) : (
                      <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('mobile', index)}>
                        {displayMobile}
                        <Eye size={14} className="ml-2 opacity-50" />
                      </span>
                    )}
                  </div>
                  <div className="px-4 py-2">
                    {visibleData[index] ? (
                      <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('email', index)}>
                        {email}
                        <EyeOff size={14} className="ml-2 opacity-50" />
                      </span>
                    ) : (
                      <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('email', index)}>
                        {displayEmail}
                        <Eye size={14} className="ml-2 opacity-50" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="bg-[#f2f2f2] px-6 py-2 text-gray-500 border-x border-b border-gray-300">
              {results.length} total
            </div>
          </>
        )}
      </div>
    </div>
  );
}