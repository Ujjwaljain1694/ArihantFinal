import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const TrialBalanceTable = ({ data = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={13} className="text-white" />
      ) : (
        <ChevronDown size={13} className="text-white" />
      );
    }

    return (
      <ChevronsUpDown size={13} className="text-white/90" />
    );
  };

  const headers = [
    { label: "Name", key: "name", align: "left" },
    { label: "Client Code", key: "code", align: "left" },
    { label: "Branch", key: "branch", align: "left" },
    { label: "Region", key: "region", align: "left" },
    { label: "Zone", key: "zone", align: "left" },
    { label: "Open Debit", key: "openDebit", align: "right" },
    { label: "Open Credit", key: "openCredit", align: "right" },
    { label: "Net Debit", key: "netDebit", align: "right" },
    { label: "Net Credit", key: "netCredit", align: "right" },
  ];

  const getSortedData = () => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedData = getSortedData();

  return (
    <div className="w-full overflow-x-auto no-scrollbar border border-gray-200 rounded-lg">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="grid gap-0 bg-[#1EB04C] text-white text-[13px] font-bold" 
           style={{
             gridTemplateColumns: "repeat(9, minmax(120px, 1fr))"
           }}>
        {headers.map((header, index) => (
          <div
            key={index}
            onClick={() => handleSort(header.key)}
            className={`px-3 py-3.5 border-r border-white/20 flex items-center gap-1.5 cursor-pointer select-none hover:bg-[#18a045] transition-colors ${
              header.align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <span>{header.label}</span>
            <SortIcon column={header.key} />
          </div>
        ))}
      </div>

      {sortedData.length === 0 ? (
        <div className="bg-white px-6 py-8 text-center text-gray-500">
          No data to display
        </div>
      ) : (
        <>
          {sortedData.map((row, index) => (
            <div
              key={index}
              className="grid gap-0 bg-white border-b border-gray-200 text-[13px] hover:bg-gray-50 transition-colors"
              style={{
                gridTemplateColumns: "repeat(9, minmax(120px, 1fr))"
              }}
            >
              <div className="px-4 py-3 border-r border-gray-200">{row.name}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.code}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.branch}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.region}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.zone}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.openDebit}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.openCredit}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right font-medium text-blue-600">{row.netDebit}</div>
              <div className="px-4 py-3 text-right font-medium text-green-600">{row.netCredit}</div>
            </div>
          ))}
          <div className="bg-gray-50 px-4 py-3 text-[13px] text-gray-600 font-medium">
            {sortedData.length} total
          </div>
        </>
      )}
    </div>
  );
};

export default TrialBalanceTable;
