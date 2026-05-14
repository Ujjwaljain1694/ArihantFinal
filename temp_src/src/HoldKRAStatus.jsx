import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

export default function HoldKRAStatus() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const handleSearch = async () => {
    if (filter.trim() === "") return;

    try {
      // API call example - replace with your actual API endpoint
      const response = await fetch(`/api/hold-kra-status?clientCode=${filter}`);
      const data = await response.json();
      
      // If API is not ready, fallback to mock data
      if (!response.ok || data.length === 0) {
        const mockData = [
          {
            clientCode: filter,
            pan: "ABCDE1234F",
            clientName: "Astha Gour",
            branchCode: "BR001",
            kraName: "CVL KRA",
            kraStatus: "Approved",
            reason: "-",
          },
        ];
        setResults(mockData);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("API Error:", error);
      // Fallback to mock data on error
      const mockData = [
        {
          clientCode: filter,
          pan: "ABCDE1234F",
          clientName: "Astha Gour",
          branchCode: "BR001",
          kraName: "CVL KRA",
          kraStatus: "Approved",
          reason: "-",
        },
      ];
      setResults(mockData);
    }
  };

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

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={15} className="text-white ml-2" />
      ) : (
        <ChevronDown size={15} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown
        size={15}
        className="text-white/90 ml-2"
      />
    );
  };

  const headers = [
    { label: "Client Code", key: "clientCode" },
    { label: "PAN", key: "pan" },
    { label: "Client Name", key: "clientName" },
    { label: "Branch Code", key: "branchCode" },
    { label: "KRA NAME", key: "kraName" },
    { label: "KRA STATUS", key: "kraStatus" },
    { label: "KRAHOLD REJECTEDREASON", key: "reason" },
  ];

  return (
    <div className="space-y-8">
      <p className="text-[18px] text-[#222] mb-2 pt-4">
        Search results({results.length})
      </p>

      <div className="flex gap-8 items-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by Client Code"
            className="w-[560px] h-[56px] pl-12 pr-5 rounded-xl border border-gray-300 bg-white text-[18px] outline-none focus:border-[#34b44a] focus:ring-2 focus:ring-[#34b44a]/20 transition-all duration-200"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          {/* Clear Button */}
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg 
                className="w-4 h-4 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-[180px_150px_230px_180px_190px_240px_1fr] bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
          {headers.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSort(item.key)}
              className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
            >
              <span>{item.label}</span>
              <SortIcon column={item.key} />
            </div>
          ))}
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
                className="grid grid-cols-[180px_150px_230px_180px_190px_240px_1fr] bg-white border-b border-gray-200 text-[15px]"
              >
                <div className="px-4 py-4">{row.clientCode}</div>
                <div className="px-4 py-4">{row.pan}</div>
                <div className="px-4 py-4">{row.clientName}</div>
                <div className="px-4 py-4">{row.branchCode}</div>
                <div className="px-4 py-4">{row.kraName}</div>
                <div className="px-4 py-4 text-green-600">
                  {row.kraStatus}
                </div>
                <div className="px-4 py-4">{row.reason}</div>
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