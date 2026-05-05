import React, { useState } from "react";
import PayoutLayout from "./PayoutLayout";

const PayoutRequest = () => {
  const [date, setDate] = useState("");
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState([
    { date: "2026-04-29", clientCode: "C12345", clientName: "John Doe", bankAccount: "XXXX1234", amount: "5000", status: "Pending" },
    { date: "2026-04-28", clientCode: "C67890", clientName: "Jane Smith", bankAccount: "XXXX5678", amount: "12000", status: "Processed" },
  ]);

  const handleSearch = () => {
    if (!date) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    alert(`Searching for date: ${date}`);
  };

  const handleClear = () => {
    setDate("");
  };

  return (
    <PayoutLayout>
      {/* 🚨 CUSTOM ERROR POPUP */}
      {showError && (
        <div className="fixed top-5 right-5 z-[1000] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-[#e11d48] text-white p-6 rounded-2xl shadow-2xl flex items-center gap-10 min-w-[320px] relative overflow-hidden">
            <div className="space-y-1">
              <h4 className="text-[18px] font-bold tracking-tight">Error</h4>
              <p className="text-[14px] font-medium opacity-95">Please Select a Date First</p>
            </div>
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center relative">
              <div className="w-6 h-[2px] bg-white rotate-45 absolute"></div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
          <div className="flex justify-between items-center">
              <div className="text-[14px] text-gray-500 font-normal">Search results({data.length})</div>
              <button className="text-[#34b350] hover:scale-110 transition-transform">
                  <i className="fas fa-download text-xl"></i>
              </button>
          </div>

          <div className="space-y-4">
              <div className="text-gray-500 font-bold text-[13px]">Request Date</div>
              <div className="flex items-center gap-6">
                  <div className="relative w-[280px]">
                      <input 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full h-[52px] border border-gray-200 rounded-lg px-6 text-[14px] text-gray-700 bg-white outline-none"
                      />
                  </div>
                  <button 
                    onClick={handleClear}
                    className="bg-red-500 text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all hover:bg-red-600"
                  >
                      CLEAR
                  </button>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#34b350] text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all hover:bg-[#2da047]"
                  >
                      SEARCH
                  </button>
              </div>
          </div>

          <div className="flex gap-6">
              {[
                { label: "Total Request", value: data.length },
                { label: "Total Process", value: data.filter(d => d.status === "Processed").length },
                { label: "Total Cancel", value: 0 }
              ].map(card => (
                  <div key={card.label} className="flex-1 bg-white border border-gray-200 rounded-lg p-6 min-w-[200px]">
                      <div className="text-[14px] text-gray-500 font-normal mb-1">{card.label}</div>
                      <div className="text-[20px] font-bold text-gray-800">{card.value}</div>
                  </div>
              ))}
          </div>

          <div className="bg-white border-y border-gray-100 overflow-hidden">
              <table className="w-full text-left text-[13px] border-collapse">
                  <thead className="bg-[#34b350] text-white">
                      <tr>
                          {["Date", "Client Code", "Client Name", "BankAccount", "Request Amount", "Status"].map((header) => (
                              <th key={header} className="px-4 py-4 border-r border-white/10 last:border-0 font-bold whitespace-nowrap">
                                  <div className="flex items-center gap-1.5">
                                      {header} <div className="flex flex-col text-[7px] leading-[3px] opacity-40"><span>▲</span><span>▼</span></div>
                                  </div>
                              </th>
                          ))}
                      </tr>
                  </thead>
                  <tbody>
                      {data.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-50">
                            <td className="px-4 py-4">{row.date}</td>
                            <td className="px-4 py-4">{row.clientCode}</td>
                            <td className="px-4 py-4">{row.clientName}</td>
                            <td className="px-4 py-4">{row.bankAccount}</td>
                            <td className="px-4 py-4 font-bold">₹{row.amount}</td>
                            <td className="px-4 py-4">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === "Processed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
              <div className="px-4 py-4 text-gray-400 font-normal text-[13px]">{data.length} total</div>
          </div>
      </div>
    </PayoutLayout>
  );
};

export default PayoutRequest;