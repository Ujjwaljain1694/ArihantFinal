import React, { useState } from "react";
import PayoutLayout from "./PayoutLayout.jsx";
import { AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import korpInstance from "../api/korpApiService";

const BulkPayout = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState({
    pageNumber: 0,
    size: 50,
  });

  const [rows, setRows] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // FILE UPLOAD & PARSING
  // =========================
  const onFileChange = (event) => {
    const fileObj = event.target.files[0];
    if (!fileObj) return;

    setFile(fileObj);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, {
          type: "binary",
        });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });

        const formattedData = data
          .map((row) => ({
            ClientCode: row.ClientCode || row["Client Code"] || row.clientcode || "",
            RequestAmount: Number(row.RequestAmount || row["Request Amount"] || row.requestamount || 0),
          }))
          .filter((row) => row.ClientCode);

        setExcelData(formattedData);
        console.log("Excel Data Parsed:", formattedData);
      } catch (err) {
        console.error("Excel parse error:", err);
        setErrorMessage("Failed to parse Excel file. Please ensure it is a valid format.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    };

    reader.readAsBinaryString(fileObj);
  };

  // =========================
  // BULK UPLOAD VALIDATION (SUBMIT FILE)
  // =========================
  const handleSubmit = async () => {
    if (!file) {
      setErrorMessage("Please Select File First");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!excelData.length) {
      setErrorMessage("Excel data is empty or invalid");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      setIsSubmitting(true);
      const pageNumber = page.pageNumber;
      const size = page.size;

      const response = await korpInstance.post("/payout/payoutrequestbulk", excelData, {
        params: { pageNumber, size },
      });

      const res = response.data;
      console.log("Bulk Upload Response:", res);

      if (res?.success === true) {
        setAllCount(res?.result?.all_Count || 0);
        setRowsPerPage(res?.result?.rowsPerPage || 0);
        setNumberOfPages(res?.result?.numberOfPages || 0);

        const balanceList = res?.result?.balancelist || [];

        const mappedRows = balanceList.map((row) => {
          const matchedExcelData = excelData.filter(
            (excel) =>
              excel.ClientCode?.toString().trim().toLowerCase() ===
              row.ClientCode?.toString().trim().toLowerCase()
          );

          return {
            ...row,
            excelDataList: matchedExcelData,
            selectedBankAccount: row.bankdetailslist?.[0]?.BankAccount || null,
          };
        });

        setRows(mappedRows);

        if (mappedRows.length === 0) {
          toast.error("No valid client data found in the response.");
        } else {
          toast.success("Excel file processed and verified successfully!");
        }
      } else {
        toast.error(res?.message || "Failed to process bulk upload");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // SUBMIT REQUEST (BULK SUBMIT)
  // =========================
  const updateBtn = async () => {
    try {
      setIsSubmitting(true);

      // Balance Map
      const balanceMap = rows.reduce((acc, row) => {
        acc[row.ClientCode] = Number(row.ClientBalance || 0);
        return acc;
      }, {});

      // Request Map
      const requestMap = excelData.reduce((acc, item) => {
        const code = item.ClientCode;
        acc[code] = (acc[code] || 0) + Number(item.RequestAmount || 0);
        return acc;
      }, {});

      // Failed Clients
      const failedClients = Object.entries(requestMap)
        .filter(([code, amount]) => {
          const balance = balanceMap[code] || 0;
          return amount > balance;
        })
        .map(([code]) => code);

      console.log("Failed Clients:", failedClients);

      if (failedClients.length > 0) {
        toast.warning(
          `Omitted ${failedClients.length} clients due to insufficient balance: ${failedClients.join(", ")}`
        );
      }

      // Payload
      const payload = rows
        .filter((row) => !failedClients.includes(row.ClientCode))
        .map((row) => ({
          Balance: row.ClientBalance,
          requestbalance: requestMap[row.ClientCode] || 0,
          clientcode: row.ClientCode,
          BankAccount: row.selectedBankAccount || null,
        }));

      console.log("Final Payload:", payload);

      if (payload.length === 0) {
        toast.error("No valid payout requests to submit after balance checks.");
        return;
      }

      const response = await korpInstance.post("/payout/payoutrequest", payload);

      const res = response.data;
      console.log("Bulk Request Response:", res);

      if (res?.success === true) {
        toast.success(res?.message || "Payout request submitted successfully!");

        setTimeout(() => {
          navigate("/payout-report");
          window.location.reload();
        }, 3000);
      } else {
        toast.error(res?.message || "Failed to submit payout request");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to submit payout request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PayoutLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
            Bulk Payout Upload
          </div>
        </div>

        <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-3xl flex flex-col sm:flex-row items-end gap-6 shadow-sm">
          <div className="flex flex-col gap-2 flex-grow max-w-sm w-full">
            <label className="text-[12px] font-bold text-black uppercase tracking-[0.1em] px-1">
              Upload Bulk Payout File
            </label>
            <div
              className={`bg-white border rounded-lg px-4 py-2 flex items-center shadow-inner group transition-all ${
                showError && !file
                  ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]"
                  : "border-gray-200 hover:border-[#27ae60]"
              }`}
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={onFileChange}
                className="text-[13px] text-gray-500 cursor-pointer w-full outline-none file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-green-50 file:text-[#27ae60] hover:file:bg-green-100"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#27ae60] hover:bg-[#219150] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 h-[48px] rounded-lg font-bold text-[13px] transition-all shadow-lg shadow-[#27ae60]/20 flex items-center justify-center gap-2 w-full sm:w-auto active:scale-[0.98]"
          >
            <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT FILE"}</span>
            <i className="fas fa-upload text-xs opacity-70"></i>
          </button>
        </div>

        {/* 📊 PREMIUM REVIEW TABLE */}
        {rows.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-1">
              <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
                Parsed Client Accounts ({rows.length})
              </div>
              <button
                onClick={updateBtn}
                disabled={isSubmitting}
                className="bg-[#27ae60] hover:bg-[#219150] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 h-[48px] rounded-lg font-bold text-[13px] transition-all shadow-lg shadow-[#27ae60]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT PAYOUT REQUEST"}</span>
                <i className="fas fa-check-circle text-xs opacity-70"></i>
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#27ae60] text-white">
                    <tr>
                      {["Client Code", "Client Balance", "Bank Account", "Request Amount"].map((header) => (
                        <th
                          key={header}
                          className="px-5 py-3 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-r border-white/20 last:border-0"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rows.map((row, index) => {
                      const reqAmount =
                        row.excelDataList?.reduce(
                          (sum, item) => sum + Number(item.RequestAmount || 0),
                          0
                        ) || 0;
                      const balanceExceeded = reqAmount > Number(row.ClientBalance || 0);

                      return (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50/50 transition-colors ${
                            balanceExceeded ? "bg-rose-50/40 hover:bg-rose-50/70" : ""
                          }`}
                        >
                          <td className="px-5 py-3 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">
                            {row.ClientCode}
                            {balanceExceeded && (
                              <span className="ml-2 bg-red-100 text-red-600 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                                Insufficient Balance
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50">
                            ₹
                            {Number(row.ClientBalance || 0).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-5 py-3 border-r border-gray-50 whitespace-nowrap w-[240px]">
                            {row.bankdetailslist && row.bankdetailslist.length > 0 ? (
                              <div className="relative">
                                <select
                                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-bold text-gray-700 outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-[#27ae60]/10 transition-all cursor-pointer"
                                  value={row.selectedBankAccount || ""}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].selectedBankAccount = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                >
                                  {row.bankdetailslist.map((bank, i) => (
                                    <option key={i} value={bank.BankAccount}>
                                      {bank.BankAccount} ({bank.BankName || "Bank"})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : (
                              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                                No Bank Registered
                              </span>
                            )}
                          </td>
                          <td
                            className={`px-5 py-3 text-[14px] font-black whitespace-nowrap border-r border-gray-50 ${
                              balanceExceeded ? "text-rose-600" : "text-[#27ae60]"
                            }`}
                          >
                            ₹
                            {reqAmount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-gray-50/50 text-gray-400 font-bold border-t border-gray-100 text-[11px] uppercase tracking-widest">
                {rows.length} total records parsed
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[60000]
                transition-all duration-500 transform ${
                  showError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
                }`}
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
    </PayoutLayout>
  );
};

export default BulkPayout;