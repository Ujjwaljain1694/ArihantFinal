import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const limitRow = 50;

const PayoutReport = () => {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [allCount, setAllCount] = useState(0);
  const [count, setCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const [requestDate, setRequestDate] = useState("");
  const [clientCode, setClientCode] = useState("");

  const [resultData, setResultData] = useState({});
  const [rows, setRows] = useState([]);

  const [page, setPage] = useState({
    pageNumber: 0,
    size: limitRow,
  });

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(
      2,
      "0"
    );

    const day = String(date.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const as_on_date = formatDate(new Date());

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
      alert("Please Enter date");
      return;
    }

    getDetail();
  };

  // =========================
  // CLEAR
  // =========================

  const clearBtn = () => {
    setRequestDate("");
    getDetail();
  };

  // =========================
  // GET DETAILS
  // =========================

  const getDetail = async (
    pageNumber = page.pageNumber,
    size = page.size
  ) => {
    try {
      let params = {
        size,
        pageNumber,
      };

      if (clientCode) {
        params.clientcode = clientCode;
      }

      if (requestDate) {
        params.requestdate = requestDate.replace(
          /\//g,
          "-"
        );
      }

      console.log("REQUEST PARAMS =>", params);

      const response = await axios.get(
        "https://korpapuatapi.arihantcapital.com/api/V1/payout/GetPayoutDetailReport",
        {
          params,
        }
      );

      console.log("FULL RESPONSE =>", response.data);

      const res = response.data;

      if (res.success) {
        setResultData(res?.result || {});

        setAllCount(res?.result?.all_Count || 0);

        setCount(res?.result?.all_Count || 0);

        setPage({
          pageNumber,
          size,
        });

        setNumberOfPages(
          res?.result?.numberOfPages || 0
        );

        setRowsPerPage(res?.result?.rowsPerPage || 0);

        setRows(res?.result?.Payoutlist || []);
      } else {
        alert(res.message || "Error fetching data");

        navigate("/payout-report");
      }
    } catch (error) {
      console.log("API ERROR =>", error);

      alert("Something went wrong");
    }
  };

  // =========================
  // EXPORT EXCEL
  // =========================

  const exportAsXLSX = async () => {
    try {
      const params = {
        pageNumber: 0,
        size: count,
      };

      const response = await axios.get(
        "https://korpapuatapi.arihantcapital.com/api/V1/payout/GetPayoutDetailReport",
        {
          params,
        }
      );

      const res = response.data;

      const data = res?.result?.Payoutlist || [];

      const exportData = data.map((item) => {
        const updatedItem = { ...item };

        delete updatedItem.RoCode;
        delete updatedItem.RoName;

        return updatedItem;
      });

      // CREATE EXCEL

      const worksheet =
        XLSX.utils.json_to_sheet(exportData);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Payout Report"
      );

      XLSX.writeFile(
        workbook,
        "payout_report.xlsx"
      );
    } catch (error) {
      console.log("EXPORT ERROR =>", error);

      alert("Excel Export Failed");
    }
  };

  return (
    <div>
      <h2>Payout Report</h2>

      {/* SEARCH SECTION */}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Client Code"
          value={clientCode}
          onChange={(e) =>
            setClientCode(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="DD-MM-YYYY"
          value={requestDate}
          onChange={(e) =>
            setRequestDate(e.target.value)
          }
        />

        <button onClick={applySearch}>
          Search
        </button>

        <button onClick={clearBtn}>
          Clear
        </button>

        <button onClick={exportAsXLSX}>
          Export Excel
        </button>
      </div>

      {/* TABLE */}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Client Code</th>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Request Date</th>
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((item, index) => (
              <tr key={index}>
                <td>{item.ClientCode}</td>

                <td>{item.ClientName}</td>

                <td>{item.RequestAmount}</td>

                <td>{item.Status}</td>

                <td>{item.RequestDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION INFO */}

      <div style={{ marginTop: "20px" }}>
        <p>Total Count: {allCount}</p>

        <p>Total Pages: {numberOfPages}</p>

        <p>Rows Per Page: {rowsPerPage}</p>
      </div>
    </div>
  );
};

export default PayoutReport;