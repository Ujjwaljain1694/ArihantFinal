import React, { useState, useEffect } from "react";
import { getBrokerageClientWise } from "../api/korpApiService";

export default function Brokerage() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await getBrokerageClientWise({
        pageNumber: 0,
        size: 50,
      });
      console.log("Brokerage API Response:", response.data);

      const rows =
        response?.data?.data ||
        response?.data?.Data ||
        response?.data ||
        [];

      setTableData(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex-1 px-0 py-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mx-auto max-w-[1600px] mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="bg-[#34b350] text-white">
                  <th className="px-4 py-3 font-semibold border-r border-white/20 whitespace-nowrap">Client Code</th>
                  <th className="px-4 py-3 font-semibold border-r border-white/20 whitespace-nowrap">Client Name</th>
                  <th className="px-4 py-3 font-semibold border-r border-white/20 whitespace-nowrap">Brokerage</th>
                  <th className="px-4 py-3 font-semibold border-r border-white/20 whitespace-nowrap">Segment</th>
                  <th className="px-4 py-3 font-semibold border-r border-white/20 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                      Loading Brokerage Data...
                    </td>
                  </tr>
                ) : tableData.length > 0 ? (
                  tableData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-100">{item.clientCode || item.ClientCode || "-"}</td>
                      <td className="px-4 py-3 border-r border-gray-100">{item.clientName || item.ClientName || "-"}</td>
                      <td className="px-4 py-3 border-r border-gray-100 font-semibold">{item.brokerage || item.Brokerage || "0.00"}</td>
                      <td className="px-4 py-3 border-r border-gray-100">{item.segment || item.Segment || "-"}</td>
                      <td className="px-4 py-3 border-r border-gray-100">{item.date || item.Date || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500 font-medium">
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <span className="text-gray-500 font-medium text-[13px]">{tableData.length} total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
