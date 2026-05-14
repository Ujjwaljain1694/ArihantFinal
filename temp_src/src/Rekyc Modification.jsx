import React, { useState } from "react";
import {
  Search,
  EyeOff,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ReKYCModification() {
  const [search, setSearch] = useState("");
  const [visiblePans, setVisiblePans] = useState({});

  const tableData = [
    {
      clientCode: "286400026",
      pan: "ABCDE1234F",
      maskedPan: "XXXXXXXXX",
      clientName: "VIVEK SHAH",
      requestType: "Segment",
      requestDate: "17/Feb/2026",
      requestStatus: "Updated",
      adminUpdatedDate: "",
    },
    {
      clientCode: "286400023",
      pan: "PQRSX4567K",
      maskedPan: "XXXXXXXXX",
      clientName: "DHRUVIK BHAVESHKUMAR SHAH",
      requestType: "Segment",
      requestDate: "25/Nov/2025",
      requestStatus: "Updated",
      adminUpdatedDate: "",
    },
  ];

  const filteredData = tableData.filter((item) =>
    item.clientCode.toLowerCase().includes(search.toLowerCase())
  );

  // PAN VISIBILITY TOGGLE
  const togglePanVisibility = (clientCode) => {
    setVisiblePans(prev => ({
      ...prev,
      [clientCode]: !prev[clientCode]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      {/* Table */}
      <div className="border border-gray-300 bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-[#35b34a] text-white text-[13px] font-semibold">
          {[
            "Clientcode",
            "PAN",
            "Client Name",
            "Request Type",
            "Request Date",
            "Request Status",
            "Admin Updated Date",
          ].map((item, index) => (
            <div
              key={index}
              className="px-2 py-2 border-r border-white flex items-center gap-1"
            >
              {item}
              <div className="flex flex-col leading-none">
                <ChevronUp size={9} />
                <ChevronDown size={9} className="-mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {filteredData.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-7 text-[12px] border-b border-gray-300"
          >
            <div className="px-2 py-2">{row.clientCode}</div>

            <div className="px-2 py-2 flex items-center gap-1 font-semibold">
              {visiblePans[row.clientCode] ? row.pan : row.maskedPan}
              <EyeOff 
                size={10} 
                className="cursor-pointer hover:text-blue-600" 
                onClick={() => togglePanVisibility(row.clientCode)}
              />
            </div>

            <div className="px-2 py-2">{row.clientName}</div>

            <div className="px-2 py-2 text-center">
              <div className="font-semibold">{row.requestType}</div>

              <span className="inline-flex items-center gap-1 bg-[#35b34a] text-white text-[9px] px-1 py-[1px] rounded-md mt-1">
                <Check size={8} />
                Accepted
              </span>
            </div>

            <div className="px-2 py-2">{row.requestDate}</div>

            <div className="px-2 py-2 text-center">
              <span className="bg-[#35b34a] text-white px-2 py-[1px] rounded-md font-semibold">
                {row.requestStatus}
              </span>
            </div>

            <div className="px-2 py-2">{row.adminUpdatedDate}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-gray-600 text-[24px] mt-10 ml-6">
        {filteredData.length} total
      </p>
    </div>
  );
}