import { Search, ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp, ChevronsUpDown, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import { getInactiveFollowupData } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function FollowUpReport() {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("08/05/2026");
  const [search, setSearch] = useState("AP210001");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026 as starting context
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const calendarRef = useRef(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate calendar days
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateString = (day, month, year) => {
    return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
  };

  const handleDateSelect = (day) => {
    const formattedDate = formatDateString(day, currentMonth.getMonth(), currentMonth.getFullYear());
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className="p-1 text-center cursor-pointer hover:bg-green-100 rounded text-xs"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const fetchFollowupReport = async () => {
    if (!search.trim()) {
      setErrorMessage("Please Enter Client Code");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (!selectedDate) {
      setErrorMessage("Please Select Date");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setLoading(true);
    try {
      const uatDateFormat = selectedDate.replace(/\//g, "-"); // Convert DD/MM/YYYY to DD-MM-YYYY
      const params = {
        pageNumber: 0,
        size: 50,
        CallDate: uatDateFormat,
        ClientCode: search.trim()
      };

      const response = await getInactiveFollowupData(params, {});
      console.log("GetInActiveFollowupData UAT Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

      if (Array.isArray(items)) {
        setData(items);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to fetch inactive follow up report:", err);
      toast.error("Failed to fetch Follow Up report from UAT");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    fetchFollowupReport();
  };

  // 🔹 Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 🔹 Filter & Sort table data
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key] || "";
    const valB = b[sortConfig.key] || "";
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleDownload = () => {
    const csvHeaders = ["CLIENT CODE", "CLIENT NAME", "CALL DATE", "REMARK", "NEXT FOLLOWUP DATE", "CALLING STATUS"];
    const csvContent = [
      csvHeaders.join(","),
      ...sortedData.map((item) => {
        const client = item.clientCode || item.clientcode || item.client || item.ClientCode || "-";
        const name = item.clientName || item.clientname || item.name || item.ClientName || "-";
        const dateVal = item.callDate || item.calldate || item.date || item.CallDate || "-";
        const remark = (item.remark || item.remarks || item.callingRemark || "-").replace(/,/g, " ");
        const nextDate = item.nextCallDate || item.nextDate || item.nextFollowupDate || "-";
        const status = item.callingStatus || item.callStatus || "-";

        return [client, name, dateVal, remark, nextDate, status].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `followup_report_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`;
    a.click();
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }
    return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
  };

  return (
    <div>
      {/* HEADER */}
      <div className="download-container">
        <Header />
      </div>

      {/* BODY */}
      <div className="bg-[#f3f3f3] h-50 px-5 pt-[82px] pb-6">
        {/* TABS CONTAINER */}
        <div className="bg-white rounded-[18px] shadow-sm px-7 pt-6 pb-6">
          <div className="flex gap-8 text-sm border-b border-gray-300 pb-3">
            <button
              onClick={() => navigate("/clicktocall")}
              className="pb-2 text-gray-500 hover:text-black transition-colors font-medium"
            >
              Click to Call Inactive
            </button>
            <button className="pb-2 text-black font-semibold border-b-2 border-green-600">
              Follow Up Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-[#efefef] px-7 pt-4 pb-4 -mx-7 rounded-b-lg">
            <div className="flex items-end gap-8 flex-wrap">
              {/* Search */}
              <div>
                <p className="text-xs text-gray-600 mb-0 pb-2 font-bold">Search client code</p>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search client code"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`pl-10 pr-4 h-[44px] rounded-full border bg-white outline-none focus:border-green-600 transition-all font-bold w-[260px] ${showError && !search.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Date Picker */}
              <div ref={calendarRef}>
                <p className="text-xs text-gray-600 mb-0 pb-2 font-bold">As On (Date)</p>
                <div className="relative group">
                  <div className={`flex items-center bg-white border rounded-lg px-4 h-[44px] w-[250px] focus-within:border-green-600 transition-all ${showError && search.trim() && !selectedDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate}
                      readOnly
                      className="outline-none text-sm w-full font-bold cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    />
                    <Calendar
                      className="text-gray-400 cursor-pointer hover:text-green-600 transition-colors"
                      size={18}
                      onClick={() => setShowCalendar(!showCalendar)}
                    />
                  </div>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50 w-64 animate-in fade-in zoom-in duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={16} /></button>
                        <h3 className="font-bold text-sm text-gray-800">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={16} /></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 text-white px-10 h-[44px] rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                APPLY
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>

          {/* Results Metadata */}
          <div className="flex justify-between items-center my-4">
            <p className="text-sm font-semibold text-gray-700">Search results ({sortedData.length})</p>

            <Download
              size={18}
              className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleDownload}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm mt-2">
            <table className="w-full text-[12px] border-collapse min-w-[800px] table-fixed">
              <thead>
                <tr className="bg-[#1EB04C] text-white">
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientCode")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Client Code</span>
                      <SortIcon column="clientCode" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientName")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Client Name</span>
                      <SortIcon column="clientName" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("callDate")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Call Date</span>
                      <SortIcon column="callDate" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("remark")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Remark / Feedback</span>
                      <SortIcon column="remark" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("nextCallDate")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Next Followup</span>
                      <SortIcon column="nextCallDate" />
                    </div>
                  </th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("callingStatus")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Calling Status</span>
                      <SortIcon column="callingStatus" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">
                      Loading Follow Up report from UAT...
                    </td>
                  </tr>
                ) : sortedData.length > 0 ? (
                  sortedData.map((item, index) => {
                    const client = item.clientCode || item.clientcode || item.client || item.ClientCode || "-";
                    const name = item.clientName || item.clientname || item.name || item.ClientName || "-";
                    const dateVal = item.callDate || item.calldate || item.date || item.CallDate || "-";
                    const remark = item.remark || item.remarks || item.callingRemark || "-";
                    const nextDate = item.nextCallDate || item.nextDate || item.nextFollowupDate || "-";
                    const status = item.callingStatus || item.callStatus || "-";

                    return (
                      <tr key={index} className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                        <td className="px-4 py-3 border-r font-bold text-gray-800">{client}</td>
                        <td className="px-4 py-3 border-r font-semibold text-gray-700">{name}</td>
                        <td className="px-4 py-3 border-r text-gray-600">{dateVal}</td>
                        <td className="px-4 py-3 border-r text-gray-600 truncate">{remark}</td>
                        <td className="px-4 py-3 border-r text-gray-600">{nextDate}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
                      No follow up records found for the given criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div className="mt-4 text-xs text-gray-500 font-medium pl-2">
            {sortedData.length} total records
          </div>
        </div>

        {/* 🚨 CUSTOM ERROR TOAST */}
        <div
          className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                  flex items-center justify-between z-[60000]
                  transition-all duration-500 transform ${showError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
        >
          <div>
            <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
            <p className="text-base font-semibold text-white">{errorMessage}</p>
          </div>
          <div className="ml-6 flex items-center">
            <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
              <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
              <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
            </div>
          </div>
        </div>

        {/* Meaning Text */}
        <div className="flex items-center justify-center gap-8 my-16">
          <div className="w-[190px] h-[1px] bg-gray-300"></div>
          <p className="text-[14px] text-gray-700 text-center">
            What we mean when we say -
            <span className="font-semibold"> (Z)</span>: Zone,
            <span className="font-semibold"> (R)</span>: Region,
            <span className="font-semibold"> (Br)</span>: Branch,
            <span className="font-semibold"> (AP)</span>: Authorized Person/Sub Broker
          </p>
          <div className="w-[190px] h-[1px] bg-gray-300"></div>
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 mx-2 border">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Arihant Product</h2>
          <div className="flex flex-wrap gap-12 font-bold text-green-600 text-[14px]">
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Official Website</a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Demat your MF Units</a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Insta Options</a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Trade Bridge</a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Value Stocks</a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">Stock Stack</a>
          </div>
        </div>
      </div>
    </div>
  );
}