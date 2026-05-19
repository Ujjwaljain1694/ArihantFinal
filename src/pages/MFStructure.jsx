import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { getMfStructure } from "../api/korpApiService";

const tabs = [
  "Algo Brokerage",
  "Mutual Fund",
  "Rejection",
  "Mandate",
  "Product Deck",
  "MF Structure & Brokerage",
  "Wealth Basket",
  "SIP Revenue Calculator",
  "Bonds",
];

export default function MFStructure() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [error, setError] = useState("");

  const [clientCode, setClientCode] = useState("BRAP09");
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const fromRef = useRef();
  const toRef = useRef();
  const navigate = useNavigate();
  const today = new Date();

  // API CALL ON MOUNT
  useEffect(() => {
    fetchStructureData(true);
  }, []);

  const fetchStructureData = async (isInitial = false) => {
    if (!clientCode.trim()) {
      setCustomErrorMsg("Please Enter Client Code");
      setShowCustomError(true);
      return;
    }

    if (!isInitial && (fromDate || toDate)) {
      const errorMsg = validateDates(fromDate, toDate);
      if (errorMsg) {
        setCustomErrorMsg(errorMsg);
        setShowCustomError(true);
        return;
      }
    }

    setLoading(true);
    setError("");
    try {
      const queryParams = {
        size: 50,
        pageNumber: 0,
      };

      const body = {
        apcode: clientCode.trim(),
      };
      if (fromDate) body.fromDate = fromDate.toLocaleDateString('en-GB'); // dd/MM/yyyy
      if (toDate) body.toDate = toDate.toLocaleDateString('en-GB');

      const response = await getMfStructure(queryParams, body);
      console.log("GetMfStructure API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

      if (Array.isArray(items)) {
        setData(items);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to fetch MF structures:", err);
      toast.error("Failed to fetch MF Structure report from UAT");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    fetchStructureData(false);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "";
    }
    let sorted = [...data];
    if (direction !== "") {
      sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setSortConfig({ key, direction });
    setData(sorted);
  };

  const handleDownload = () => {
    const headers = ["STRUCTURE FILE / SCHEME", "AP CODE", "EFFECTIVE DATE", "COMMISSION / RATE"];
    const csvContent = [
      headers.join(","),
      ...data.map(item => {
        const scheme = item.structureName || item.schemeName || item.fileName || item.structure || "-";
        const code = item.account || item.apcode || item.clientCode || "-";
        const dateStr = item.effectiveDate || item.date || item.uploadDate || "-";
        const commission = item.commission || item.rate || item.amount || "-";
        return [scheme, code, dateStr, commission].join(",");
      })
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `mf_structure_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    const isAsc = isActive && sortConfig.direction === "asc";
    const isDesc = isActive && sortConfig.direction === "desc";
    return (
      <span className="ml-1 flex flex-col">
        <svg width="8" height="5" viewBox="0 0 10 6" className={isAsc ? "fill-black" : "fill-green-200"}>
          <path d="M5 0 L10 6 H0 Z" />
        </svg>
        <svg width="8" height="5" viewBox="0 0 10 6" className={isDesc ? "fill-black" : "fill-green-200 mt-[1px]"}>
          <path d="M0 0 L10 0 L5 6 Z" />
        </svg>
      </span>
    );
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
      <button
        onClick={(e) => { e.preventDefault(); decreaseMonth(); }}
        disabled={prevMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-left text-[10px] text-gray-500"></i>
      </button>
      
      <div className="flex gap-2">
        <div className="relative">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {months.filter((_, index) => {
              if (date.getFullYear() === currentYear) {
                return index <= currentMonth;
              }
              return true;
            }).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {Array.from({ length: currentYear - 1947 + 1 }, (_, i) => 1947 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>
      </div>

      <button
        onClick={(e) => { e.preventDefault(); increaseMonth(); }}
        disabled={nextMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-right text-[10px] text-gray-500"></i>
      </button>
    </div>
  );

  return (
    <>
      <Header />
      <div className="p-4 pt-11">
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
          
          {/* TABS */}
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => navigate(tab === "Algo Brokerage" ? "/algo-brokerage" : 
                         tab === "Mutual Fund" ? "/mutual-fund" : 
                         tab === "Rejection" ? "/rejection" : 
                         tab === "Mandate" ? "/mandate" : 
                         tab === "Product Deck" ? "/product-deck" : 
                         tab === "MF Structure & Brokerage" ? "/mf-structure" : 
                         tab === "Wealth Basket" ? "/wealth-basket" : 
                         tab === "SIP Revenue Calculator" ? "/sip-calculator" : 
                         tab === "Bonds" ? "/bonds" : "/")}
                className={`pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline cursor-pointer ${
                  tab === "MF Structure & Brokerage"
                    ? "border-b-2 border-green-600 text-black font-medium"
                    : "text-gray-600 font-medium hover:text-black"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* DATE FILTER & SEARCH BLOCK */}
          <div className="bg-[#eaeaea] p-4 rounded-lg mt-4 flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-xs text-gray-600">From Date</label>
              <div className="relative group">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"} focus:border-[#34b350] outline-none transition-all font-bold`}
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                  onClick={() => fromRef.current.setOpen(true)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600">To Date</label>
              <div className="relative group">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"} focus:border-[#34b350] outline-none transition-all font-bold`}
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                  onClick={() => toRef.current.setOpen(true)}
                />
              </div>
            </div>

            <div className="relative pt-4">
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                placeholder="Search by Commision Account"
                className="w-[320px] bg-white border rounded-full px-10 py-2 text-sm outline-none focus:border-green-500 shadow-sm"
              />
              <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 pt-4 text-gray-500" />
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleApply}
                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 uppercase text-xs tracking-wider"
              >
                APPLY
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700 pb-3 font-semibold">
              Search results({data.length})
            </div>
            <i className="fa fa-download text-green-600 text-lg cursor-pointer hover:scale-110 transition-transform" onClick={handleDownload}></i>
          </div>

          {/* TABLE OF STRUCTURES */}
          <div className="mt-2 bg-white rounded-lg overflow-hidden border">
            <table className="w-full text-[12px] border border-gray-300 table-fixed">
              <thead>
                <tr className="bg-[#2fb344] text-white">
                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("structureName")} className="flex items-center cursor-pointer">
                      STRUCTURE FILE / SCHEME
                      <SortIcon column="structureName" />
                    </div>
                  </th>
                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("apcode")} className="flex items-center cursor-pointer">
                      AP CODE
                      <SortIcon column="apcode" />
                    </div>
                  </th>
                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("effectiveDate")} className="flex items-center cursor-pointer">
                      EFFECTIVE DATE
                      <SortIcon column="effectiveDate" />
                    </div>
                  </th>
                  <th className="px-3 py-2">
                    <div onClick={() => handleSort("commission")} className="flex items-center cursor-pointer">
                      COMMISSION / RATE
                      <SortIcon column="commission" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500 font-medium">
                      Loading MF Structures from UAT...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => {
                    const scheme = item.structureName || item.schemeName || item.fileName || item.structure || "-";
                    const code = item.account || item.apcode || item.clientCode || "-";
                    const dateStr = item.effectiveDate || item.date || item.uploadDate || "-";
                    const commission = item.commission || item.rate || item.amount || "-";

                    return (
                      <tr key={index} className="border-b border-gray-200 h-[28px] hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-[4px] border-r border-gray-200 text-blue-600 underline cursor-pointer truncate">
                          {scheme}
                        </td>
                        <td className="px-3 py-[4px] border-r border-gray-200">{code}</td>
                        <td className="px-3 py-[4px] border-r border-gray-200">{dateStr}</td>
                        <td className="px-3 py-[4px] font-bold">{commission}%</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-left text-gray-500 text-base font-medium">
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 text-left text-gray-500 text-base font-bold">
            Total: {data.length}
          </div>

          {/* SUB LINKS (PRE-EXISTING STATICS) */}
          <div className="flex gap-10 mt-6 text-blue-600 text-sm font-medium border-t pt-4">
            <span className="cursor-pointer hover:underline pl-3">
              MF Brokerage Structure(April'25-June'25)
            </span>
            <span className="cursor-pointer hover:underline pl-3">
              MF Brokerage Structure(July'25-Sept'25)
            </span>
            <span className="cursor-pointer hover:underline pl-3">
              MF Brokerage Structure(Oct'25-Dec'25)
            </span>
            <span className="cursor-pointer hover:underline">
              MF-Structure_2025-26-4_CS_JAN_26_TO_MAR_26.pdf
            </span>
          </div>

          {/* INFO */}
          <div className="flex items-center gap-4 my-10 justify-center">
            <div className="w-32 border-t"></div>
            <p className="text-base text-gray-600 text-center flex-1">
              What we mean when we say -{" "}
              <b>(Z)</b>: Zone, <b>(R)</b>: Region, <b>(Br)</b>: Branch,{" "}
              <b>(AP)</b>: Authorized Person/Sub Broker
            </p>
            <div className="w-32 border-t"></div>
          </div>

          <ArihantProductsSection />
        </div>
      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[60000]
                transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold -mb-1">Error</h2>
          <p className="text-base font-semibold">{customErrorMsg}</p>
        </div>
        <div className="ml-6 flex items-center">
          <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
          </div>
        </div>
      </div>
    </>
  );
}