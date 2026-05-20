import React, { useState, useEffect } from "react";
import {
  Search,
  EyeOff,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { getRekycModification } from "../api/korpApiService";

export default function ReKYCModification({ search = "" }) {
  const [visiblePans, setVisiblePans] = useState({});
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRekycModifications = async () => {
    setIsLoading(true);
    try {
      const params = {
        size: 50,
        pageNumber: 0,
      };
      if (search.trim()) {
        params.clientCode = search.trim();
        params.Clientcode = search.trim();
        params.clientcode = search.trim();
      }
      const response = await getRekycModification(params);
      console.log("Rekyc Modification API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];
      if (Array.isArray(items)) {
        setResults(items);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Failed to fetch Rekyc modifications:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRekycModifications();
  }, [search]);

  // PAN VISIBILITY TOGGLE
  const togglePanVisibility = (clientCode) => {
    setVisiblePans(prev => ({
      ...prev,
      [clientCode]: !prev[clientCode]
    }));
  };

  // Perform a backup local filter to ensure search is solid
  const filteredData = results.filter((item) => {
    const code = item.clientCode || item.clientcode || item.ClientCode || "";
    return code.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="bg-white px-2">
      {/* Table */}
      <div className="w-full overflow-x-auto no-scrollbar border-t border-gray-200 mt-6">
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
                className="px-2 py-2 border-r border-white/30 flex items-center justify-between cursor-pointer select-none whitespace-nowrap"
              >
                <span>{item}</span>
                <div className="flex flex-col leading-none opacity-60 ml-2">
                  <ChevronUp size={10} />
                  <ChevronDown size={10} className="-mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {isLoading ? (
            <div className="bg-white h-[100px] flex items-center justify-center px-6 text-[15px] text-gray-500 border-b border-gray-200 font-semibold">
              Loading Rekyc modifications from UAT...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-b border-gray-200">
              No data to display
            </div>
          ) : (
            filteredData.map((row, index) => {
              const clientCode = row.clientCode || row.clientcode || row.ClientCode || "-";
              const pan = row.pan || row.Pan || "-";
              const maskedPan = row.maskedPan || row.maskedpan || row.MaskedPan || (pan !== "-" ? pan.replace(/.(?=.{4})/g, "*") : "-");
              const clientName = row.clientName || row.clientname || row.ClientName || "-";
              const requestType = row.requestType || row.requesttype || row.RequestType || "-";
              const requestDate = row.requestDate || row.requestdate || row.RequestDate || "-";
              const requestStatus = row.requestStatus || row.requeststatus || row.RequestStatus || row.status || row.Status || "-";
              const adminUpdatedDate = row.adminUpdatedDate || row.adminupdateddate || row.AdminUpdatedDate || "-";

              return (
                <div
                  key={index}
                  className="grid grid-cols-7 text-[13px] bg-[#f2f2f2] border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={clientCode}>{clientCode}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex items-center justify-start gap-2 font-semibold">
                    <span className="truncate" title={visiblePans[clientCode] ? pan : maskedPan}>{visiblePans[clientCode] ? pan : maskedPan}</span>
                    <EyeOff 
                      size={12} 
                      className="cursor-pointer text-gray-400 hover:text-[#34b44a] flex-shrink-0" 
                      onClick={() => togglePanVisibility(clientCode)}
                    />
                  </div>

                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={clientName}>{clientName}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex flex-col justify-center truncate">
                    <div className="font-semibold truncate" title={requestType}>{requestType}</div>
                    <span className="inline-flex items-center gap-1 bg-[#35b34a] text-white text-[10px] px-1.5 py-[1px] rounded-md mt-1 w-max">
                      <Check size={10} />
                      Accepted
                    </span>
                  </div>

                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={requestDate}>{requestDate}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex items-center">
                    <span className="bg-[#35b34a] text-white px-3 py-[2px] rounded-md text-[11px] font-bold truncate" title={requestStatus}>
                      {requestStatus}
                    </span>
                  </div>

                  <div className="px-2 py-3 truncate" title={adminUpdatedDate}>{adminUpdatedDate}</div>
                </div>
              );
            })
          )}

          <div className="bg-white px-6 py-2 text-black font-bold border-b border-gray-200 text-[14px]">
            {filteredData.length} total
          </div>
        </div>
      </div>
    </div>
  );
}