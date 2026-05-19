import React, { useState, useEffect } from "react";
import { getAriTradeFileUpload } from "../api/korpApiService";

const downloadData = {
  Daily_Update_File: [
    "ODIN_Daily_Scrip_Master",
    "NSE_FO_MARGIN_FILE",
    "SPAN_FILE_FOR_ADMIN_TERMINAL",
  ],
  Trading_Setup: [
    "ODIN_DIET_SETUP_FOR_COMBINED",
    "Omni-Nest Investor",
    "ODIN_CLIENT_SETUP_MULTIUSER",
    "ARI_TRADE_MANAGER",
    "ODIN_ADMIN_SETUP",
    "Omni-Nest Client",
  ],
  Form_download: ["ODIN_HELP_FILE", "ODIN_DEMO_HELP"],
  Other_software: ["LINK1", "LINK2", "LINK3", "LINK4", "Falcon", "Now"],
};

// same reusable circle
const circleClass = (active) =>
  `w-4 h-4 min-w-[16px] min-h-[16px] rounded-full border flex items-center justify-center cursor-pointer transition-all
   ${active ? "bg-[#34b350] border-[#34b350]" : "border-gray-400"}`;

export default function Download() {
  const [open, setOpen] = useState({});
  const [selected, setSelected] = useState({});
  const [dynamicDownloads, setDynamicDownloads] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDownloadFiles = async () => {
    setIsLoading(true);
    try {
      const response = await getAriTradeFileUpload();
      console.log("GetAriTradeFileUpload API Response:", response.data);
      
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];
      
      if (Array.isArray(items) && items.length > 0) {
        const grouped = {};
        items.forEach((item) => {
          // Normalize dynamic fields
          const category = item.category || item.Category || item.type || item.Type || "General_Downloads";
          const fileName = item.fileName || item.Filename || item.file || item.File || item.name || item.Name || "document.pdf";
          const fileUrl = item.fileUrl || item.url || item.Url || `https://korpapuatapi.arihantcapital.com/api/V1/reports/downloadAriTradeFile?fileName=${fileName}`;
          
          if (!grouped[category]) {
            grouped[category] = [];
          }
          grouped[category].push({
            name: fileName,
            url: fileUrl
          });
        });
        setDynamicDownloads(grouped);
      } else if (items && typeof items === "object" && !Array.isArray(items)) {
        // If it's a single object returned from API
        const fileName = items.fileName || items.Filename || items.file || items.File || items.name || items.Name || "ARI_TRADE_MANAGER";
        const fileUrl = items.fileUrl || items.url || items.Url || "https://korpapuatapi.arihantcapital.com/api/V1/reports/GetAriTradeFileUpload";
        const grouped = {
          Trading_Setup: [
            { name: fileName, url: fileUrl }
          ]
        };
        setDynamicDownloads(grouped);
      } else {
        setDynamicDownloads(null);
      }
    } catch (error) {
      console.error("Failed to fetch download files:", error);
      setDynamicDownloads(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloadFiles();
  }, []);

  const toggle = (item) => {
    setOpen((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const toggleFile = (file) => {
    setSelected((prev) => ({
      ...prev,
      [file]: !prev[file],
    }));
  };

  const handleDownload = (fileUrl, fileName) => {
    if (fileUrl && fileUrl.startsWith("http")) {
      window.open(fileUrl, "_blank");
    } else {
      window.open(`https://korpapuatapi.arihantcapital.com/api/V1/reports/GetAriTradeFileUpload`, "_blank");
    }
  };

  // Determine display dataset: dynamic from API or our hardcoded list
  const displayData = dynamicDownloads && Object.keys(dynamicDownloads).length > 0 ? dynamicDownloads : null;

  return (
    <div className="pt-8 mt-4 relative z-10">
      {isLoading ? (
        <div className="p-16 text-center text-gray-500 font-semibold text-[15px]">
          Loading downloads list from UAT...
        </div>
      ) : displayData ? (
        /* DYNAMIC API GRID */
        <div className="flex flex-wrap gap-20">
          {Object.keys(displayData).map((category) => (
            <div key={category} className="w-[220px]">
              {/* CATEGORY HEADER */}
              <div 
                onClick={() => toggle(category)}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <div className={circleClass(open[category])}>
                  {open[category] && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-green-600 font-bold">
                  {category.replaceAll("_", " ")}
                </span>
              </div>

              {/* FILE LIST */}
              <div
                className={`ml-6 mt-3 transition-all duration-300 overflow-hidden
                ${open[category] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="space-y-3">
                  {displayData[category].map((fileObj, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-[1px] h-5 bg-gray-300"></div>
                      <div
                        onClick={() => toggleFile(fileObj.name)}
                        className={circleClass(selected[fileObj.name])}
                      >
                        {selected[fileObj.name] && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span 
                        onClick={() => handleDownload(fileObj.url, fileObj.name)}
                        className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline hover:text-blue-800 transition-colors break-all"
                      >
                        {fileObj.name} ↓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* FALLBACK LEGACY HARDCODED GRID */
        <div className="flex flex-wrap gap-20">
          {Object.keys(downloadData).map((category) => (
            <div key={category} className="w-[220px]">
              {/* CATEGORY HEADER */}
              <div 
                onClick={() => toggle(category)}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <div className={circleClass(open[category])}>
                  {open[category] && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-green-600 font-bold">
                  {category.replaceAll("_", " ")}
                </span>
              </div>

              {/* FILE LIST */}
              <div
                className={`ml-6 mt-3 transition-all duration-300 overflow-hidden
                ${open[category] ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="space-y-3">
                  {downloadData[category].map((file, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-[1px] h-5 bg-gray-300"></div>
                      <div
                        onClick={() => toggleFile(file)}
                        className={circleClass(selected[file])}
                      >
                        {selected[file] && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      {file === "ARI_TRADE_MANAGER" ? (
                        <span 
                          onClick={() => handleDownload("https://korpapuatapi.arihantcapital.com/api/V1/reports/GetAriTradeFileUpload", file)}
                          className="text-blue-600 text-sm font-semibold cursor-pointer hover:underline hover:text-blue-800 transition-colors"
                        >
                          {file} ↓
                        </span>
                      ) : (
                        <span className="text-gray-700 text-sm cursor-pointer hover:text-black">
                          {file}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}