import React, { useEffect, useState } from "react";
import PayoutLayout from "./PayoutLayout.jsx";
import { Search, Download, Trash2, ChevronUp, ChevronDown, ChevronsUpDown, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import korpInstance from "../api/korpApiService";
import { toast } from "react-toastify";

const CancelRequest = () => {
  const navigate = useNavigate();

  const [allCount, setAllCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const [clientCode, setClientCode] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [page, setPage] = useState({
    pageNumber: 0,
    size: 50,
  });

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const todayDate = formatDate(new Date());

  // =========================
  // API CALL
  // =========================
  const getDetail = async (pageNumber = page.pageNumber, size = page.size) => {
    try {
      setIsLoading(true);
      let formattedSearchDate = todayDate;

      if (requestDate) {
        const dObj = new Date(requestDate);
        if (!isNaN(dObj.getTime())) {
          formattedSearchDate = formatDate(dObj);
        }
      }

      let params = {
        size,
        pageNumber,
        requestdate: formattedSearchDate,
      };

      if (clientCode) {
        params.clientcode = clientCode;
      }

      console.log("REQUEST PARAMS =>", params);

      const response = await korpInstance.get("/payout/GetCancelRequest", {
        params,
      });

      console.log("FULL RESPONSE =>", response.data);

      const res = response.data;

      if (res.success) {
        setAllCount(res?.result?.all_Count || 0);
        setPage({
          pageNumber,
          size,
        });
        setNumberOfPages(res?.result?.numberOfPages || 0);
        setRowsPerPage(res?.result?.rowsPerPage || 0);
        setRows(res?.result?.Payoutlist || []);
      } else {
        toast.error(res.message || "Error fetching cancellation requests");
      }
    } catch (error) {
      console.log("API ERROR =>", error);
      toast.error("Something went wrong while fetching cancel requests");
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // PAGE LOAD
  // =========================
  useEffect(() => {
    getDetail();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const applySearch = () => {
    if (!requestDate) {
      toast.error("Please select a date first");
      return;
    }
    getDetail(0);
  };

  // =========================
  // CLEAR
  // =========================
  const clearBtn = () => {
    setRequestDate("");
    setClientCode("");
    
    // Fetch default today's records immediately with cleared inputs
    setIsLoading(true);
    const todayStr = formatDate(new Date());
    const params = {
      size: page.size,
      pageNumber: 0,
      requestdate: todayStr,
    };
    korpInstance.get("/payout/GetCancelRequest", { params })
      .then(response => {
        const res = response.data;
        if (res.success) {
          setAllCount(res?.result?.all_Count || 0);
          setPage({ pageNumber: 0, size: page.size });
          setNumberOfPages(res?.result?.numberOfPages || 0);
          setRowsPerPage(res?.result?.rowsPerPage || 0);
          setRows(res?.result?.Payoutlist || []);
        } else {
          toast.error(res.message || "Error fetching cancel requests");
        }
      })
      .catch(error => {
        console.log("API ERROR =>", error);
        toast.error("Failed to fetch cancel requests");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // =========================
  // CANCEL REQUEST
  // =========================
  const onSubmit = async (ClientCode, Id) => {
    try {
      setIsSubmitting(true);
      const params = {
        RequestId: Id,
        ClientCode: ClientCode,
        RequestDate: todayDate,
      };

      console.log("CANCEL PARAMS =>", params);

      const response = await korpInstance.get("/payout/GetPayOutCancelRequest", {
        params,
      });

      console.log("CANCEL RESPONSE =>", response.data);

      const res = response.data;

      if (res.success) {
        toast.success(res.message || "Payout cancellation successful!");
        setTimeout(() => {
          navigate("/payout-report");
        }, 2000);
      } else {
        toast.error(res.message || "Error processing cancellation request");
      }
    } catch (error) {
      console.log("CANCEL API ERROR =>", error);
      toast.error("Cancel Request Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // DOWNLOAD CSV
  // =========================
  const handleDownload = () => {
    if (rows.length === 0) return;
    const headers = ["Date", "Client Code", "Client Name", "Request Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...rows.map(item => {
        const itemDate = item.RequestDate || item.date || todayDate;
        const itemClientName = item.ClientName || "";
        const itemClientCode = item.ClientCode || "";
        const itemAmount = String(item.RequestAmount || "").replace(/,/g, '');
        const itemStatus = item.Status || item.status || "Pending";
        return [
          itemDate,
          itemClientCode,
          `"${itemClientName}"`,
          itemAmount,
          itemStatus
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Cancel_Request_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PayoutLayout>
      <div className="space-y-6">
        {/* Header & Actions */}
        <div className="flex justify-between items-center px-1">
          <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
            Search results ({rows.length})
          </div>
          <button
            onClick={handleDownload}
            disabled={rows.length === 0}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border active:scale-95 ${
              rows.length === 0
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-[#27ae60] bg-green-50 hover:bg-[#27ae60] hover:text-white border-green-100 shadow-sm"
            }`}
          >
            <Download size={18} />
          </button>
        </div>

        {/* 📑 PREMIUM FILTER CARD SECTION */}
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">
            Filter Cancel Requests
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            {/* Client Code Input */}
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search Client Code"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                className="pl-11 pr-4 w-full h-[48px] border border-gray-200 rounded-xl text-[14px] text-gray-700 bg-white focus:ring-4 focus:ring-[#27ae60]/10 focus:border-[#27ae60] outline-none transition-all shadow-sm font-medium"
              />
            </div>

            {/* Date Input */}
            <div className="relative w-full sm:w-[200px]">
              <input
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                className="w-full h-[48px] border border-gray-200 rounded-xl px-4 text-[14px] text-gray-700 bg-white focus:ring-4 focus:ring-[#27ae60]/10 focus:border-[#27ae60] outline-none transition-all shadow-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto h-[48px]">
              <button
                onClick={clearBtn}
                className="flex-1 sm:w-[120px] h-full bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
              >
                <XCircle size={15} />
                CLEAR
              </button>
              <button
                onClick={applySearch}
                className="flex-1 sm:w-[120px] h-full bg-[#27ae60] text-white rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#219150] shadow-lg shadow-[#27ae60]/20 transition-all active:scale-95"
              >
                <Search size={15} />
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#27ae60] text-white">
                <tr>
                  {["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-r border-white/10 last:border-0"
                    >
                      <div className="flex items-center justify-between group cursor-pointer">
                        {header}
                        <ChevronsUpDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-bold tracking-wider">
                      Loading data...
                    </td>
                  </tr>
                ) : rows.length > 0 ? (
                  rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-3 text-[13px] text-gray-600 font-medium whitespace-nowrap border-r border-gray-50">
                        {row.RequestDate || row.date || todayDate}
                      </td>
                      <td className="px-6 py-3 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">
                        {row.ClientCode}
                      </td>
                      <td className="px-6 py-3 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50 uppercase">
                        {row.ClientName}
                      </td>
                      <td className="px-6 py-3 text-[14px] text-[#27ae60] font-black whitespace-nowrap border-r border-gray-50">
                        ₹{Number(row.RequestAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-3 border-r border-gray-50 whitespace-nowrap">
                        <span className="bg-orange-50 text-orange-600 border border-orange-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {row.Status || row.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => onSubmit(row.ClientCode, row.Id)}
                          disabled={isSubmitting}
                          className="bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white px-6 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest shadow-sm active:scale-95 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={12} />
                          CANCEL
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-300 font-black tracking-[0.3em] uppercase">
                      No cancel request records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-4 bg-gray-50/50 text-gray-400 font-bold border-t border-gray-100 text-[11px] uppercase tracking-widest">
            {rows.length} total records found
          </div>
        </div>
      </div>
    </PayoutLayout>
  );
};

export default CancelRequest;
