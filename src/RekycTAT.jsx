import React, { useState, useEffect } from "react";

export default function RekycTAT() {
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // Initialize with sample data
  useEffect(() => {
    const data = [
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "E-signature Not required",
        processingTime: "Same day",
        requestType: "BANK (If client Name is matched on bank as per Arihant record)",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "up to 15 minutes",
        processingTime: "Same day",
        requestType: "BANK (If client Name is Mismatched on bank as per Arihant record)",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "E-signature Not required",
        processingTime: "Same day",
        requestType: "Default Bank",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "E-signature Not required",
        processingTime: "Same day",
        requestType: "Mobile",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "E-signature Not required",
        processingTime: "Same day",
        requestType: "Email",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 2 PM",
        esignature: "instant e-signature facility is available",
        processingTime: "Same day",
        requestType: "DDPI",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received after 2 PM",
        esignature: "instant e-signature facility is available",
        processingTime: "Next day",
        requestType: "DDPI",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "instant e-signature facility is available",
        processingTime: "Same day",
        requestType: "Nominee Opt-Out",
      },
      {
        mondayToFriday: "Monday to Friday",
        requestReceivedUpTo: "If request received up to 6 PM",
        esignature: "up to 15 minutes",
        processingTime: "Same day",
        requestType: "Nominee Opt-Out",
      },
    ];

    setResults(data);
  }, []);

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

      {/* Table */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-5 bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
          <div
            onClick={() => handleSort("mondayToFriday")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-center cursor-pointer select-none"
          >
            <span>Monday to Friday</span>
            <span className="ml-2">
              {sortConfig.key === "mondayToFriday" ? (
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
            onClick={() => handleSort("requestReceivedUpTo")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-center cursor-pointer select-none"
          >
            <span>If request received up to</span>
            <span className="ml-2">
              {sortConfig.key === "requestReceivedUpTo" ? (
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
            onClick={() => handleSort("esignature")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-center cursor-pointer select-none"
          >
            <span>E-signature</span>
            <span className="ml-2">
              {sortConfig.key === "esignature" ? (
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
            onClick={() => handleSort("processingTime")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-center cursor-pointer select-none"
          >
            <span>Processing Time</span>
            <span className="ml-2">
              {sortConfig.key === "processingTime" ? (
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
            className="px-4 py-2 flex items-center justify-center cursor-pointer select-none"
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
                className="grid grid-cols-5 bg-white border-b border-gray-200 text-[15px]"
              >
                <div className="px-4 py-2 border-r-2 border-gray-300 text-center">{row.mondayToFriday}</div>
                <div className="px-4 py-2 border-r-2 border-gray-300 text-center">{row.requestReceivedUpTo}</div>
                <div className="px-4 py-2 border-r-2 border-gray-300 text-center">{row.esignature}</div>
                <div className="px-4 py-2 border-r-2 border-gray-300 text-center">
                  <span className={`px-2 py-1 rounded-md text-sm font-semibold ${
                    row.processingTime === "Same day" 
                      ? "bg-green-100 text-green-800" 
                      : row.processingTime === "Next day"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {row.processingTime}
                  </span>
                </div>
                <div className="px-4 py-2 text-center">
                  <span className="px-2 py-1 rounded-md text-sm font-semibold bg-blue-100 text-blue-800">
                    {row.requestType}
                  </span>
                </div>
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
