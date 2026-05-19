import React, { useEffect, useState } from "react";
import { Download, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import { getInactiveClickToCall } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function ClickToCall() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("inactive");
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Data not found !!!");
  const [selectedDealer, setSelectedDealer] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // API Call on mount
  useEffect(() => {
    fetchInactiveClients();
  }, []);

  const fetchInactiveClients = async () => {
    setLoading(true);
    try {
      const params = {
        size: 50,
        pageNumber: 0
      };
      const response = await getInactiveClickToCall(params, {});
      console.log("GetInActiveClicktoCall UAT Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

      if (Array.isArray(items)) {
        setApiData(items);
      } else {
        setApiData([]);
      }
    } catch (err) {
      console.error("Failed to fetch inactive click to call data:", err);
      toast.error("Failed to fetch inactive client calling list from UAT");
      setApiData([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 🔹 Filter and Sort
  const filtered = apiData
    .filter((item) => {
      const code = item.clientCode || item.clientcode || item.client || item.ClientCode || "";
      return code.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const valA = a[sortConfig.key] || "";
      const valB = b[sortConfig.key] || "";
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  // 🔹 Download CSV
  const handleDownload = () => {
    const csv = [
      ["Client Name", "Client Code", "Mobile", "Email", "Pan Number", "Mobile App", "SIP", "Reason Mobile App Download"],
      ...filtered.map((item) => {
        const name = item.clientName || item.clientname || item.name || item.Name || "-";
        const clientCode = item.clientCode || item.clientcode || item.client || item.ClientCode || "-";
        const mobile = item.mobile || item.mobileNo || item.mobileNumber || item.phone || "-";
        const email = item.email || item.emailId || item.emailaddress || "-";
        const pan = item.pan || item.panNo || item.panNumber || "-";
        const mobileApp = item.mobileApp || item.appDownloaded || "No";
        const sip = item.sip || item.sipActive ? "Yes" : "No";
        const reason = item.downloadReason || item.reason || "-";

        return [name, clientCode, mobile, email, pan, mobileApp, sip, reason];
      }),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `inactive_click_to_call_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`;
    a.click();
  };

  // Mobile icon click functionality
  const handleMobileClick = () => {
    setShowModal(true);
    setErrorMessage("Data not found !!!");
    setShowError(true);

    // error 3 sec me hide ho jaye
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  // WhatsApp click handler
  const handleWhatsappClick = () => {
    setErrorMessage("Data not found !!!");
    setShowError(true);

    // auto hide after 3 sec
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  // SortIcon component
  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={15} className="text-white ml-2" />
      ) : (
        <ChevronDown size={15} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown
        size={15}
        className="text-white/90 ml-2"
      />
    );
  };

  // 🔹 Apply validation
  const handleApply = () => {
    if (!search.trim()) {
      setErrorMessage("please enter a valid client code");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Submit functionality
  const handleSubmit = () => {
    console.log("Appointment submitted for dealer:", selectedDealer);
    setShowModal(false);
    alert("Appointment submitted successfully!");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="download-container">
        <Header />
      </div>

      {/* BODY */}
      <div className="bg-[#f3f3f3] h-50 px-5 pt-[82px] pb-6">
        {/* TABS */}
        <div className="bg-white rounded-[18px] shadow-sm px-7 pt-6 pb-0">
          <div className="flex gap-8 text-sm border-b border-gray-300 pb-3">

            <button
              onClick={() => setActiveTab("inactive")}
              className={`pb-2 ${activeTab === "inactive"
                  ? "border-b-2 border-green-600 font-semibold text-black"
                  : "text-gray-500"
                }`}
            >
              Click to Call Inactive
            </button>

            <button
              onClick={() => navigate("/followupreport")}
              className={`pb-2 ${activeTab === "follow"
                  ? "border-b-2 border-green-600 font-semibold text-black"
                  : "text-gray-500"
                }`}
            >
              Follow Up Report
            </button>

          </div>

          {/* Search + Apply section */}
          <div className="bg-[#efefef] px-7 pt-3 pb-4 mt-4 rounded-lg">
            <p className="text-sm text-black mb-0 pb-2 font-bold">Search client code</p>
            <div className="flex items-center gap-5">
              <div className="relative">
                <input
                  placeholder="Search client code"
                  className="pl-10 pr-4 h-[44px] rounded-full border border-gray-300 w-[250px] bg-white outline-none font-bold"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              <button
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 transition-colors text-white px-8 h-[44px] rounded-full font-bold active:scale-95 shadow-md uppercase text-xs tracking-wider"
              >
                APPLY
              </button>
            </div>
          </div>

          {/* Result + Download */}
          <div className="flex justify-between items-center mb-2 pt-3">
            <p className="text-sm font-semibold">Search results ({filtered.length})</p>

            <Download
              size={18}
              className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleDownload}
            />
          </div>

          {/* TABLE */}
          <div className="bg-white border rounded-md overflow-hidden">

            {/* TABLE SCROLL */}
            <div className="overflow-x-auto">

              <table className="min-w-[1100px] border border-gray-300 border-collapse text-sm">

                {/* HEADER */}
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-3 text-left px-4 py-3 border border-gray-300 whitespace-nowrap">
                      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("clientName")}>
                        <span>CLIENT NAME</span>
                        <SortIcon column="clientName" />
                      </div>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("clientCode")}>
                        <span>CLIENT CODE</span>
                        <SortIcon column="clientCode" />
                      </div>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("mobile")}>
                        <span>Mobile</span>
                        <SortIcon column="mobile" />
                      </div>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("email")}>
                        <span>Email</span>
                        <SortIcon column="email" />
                      </div>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("pan")}>
                        <span>Pan Number</span>
                        <SortIcon column="pan" />
                      </div>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Call</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Message</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Whatsapp</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Remark</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Mobile App</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Sip</span>
                    </th>
                    <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                      <span>Reason Mobile App Download</span>
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-500 font-medium">
                        Loading Inactive Calling List from UAT...
                      </td>
                    </tr>
                  ) : filtered.length > 0 ? (
                    filtered.map((item, i) => {
                      const name = item.clientName || item.clientname || item.name || item.Name || "-";
                      const clientCode = item.clientCode || item.clientcode || item.client || item.ClientCode || "-";
                      const mobile = item.mobile || item.mobileNo || item.mobileNumber || item.phone || "-";
                      const email = item.email || item.emailId || item.emailaddress || "-";
                      const pan = item.pan || item.panNo || item.panNumber || "-";
                      const mobileApp = item.mobileApp || item.appDownloaded || "No";
                      const sip = item.sip || item.sipActive ? "Yes" : "No";
                      const reason = item.downloadReason || item.reason || "-";

                      return (
                        <tr key={i} className="border-t hover:bg-gray-50 transition-colors">

                          <td className="p-3 font-semibold text-gray-800">{name}</td>
                          <td className="p-3 border border-gray-300 text-center font-bold">{clientCode}</td>
                          <td className="p-3 border border-gray-300 text-center">{mobile}</td>
                          <td className="p-3 border border-gray-300 text-center">{email}</td>
                          <td className="p-3 border border-gray-300 text-center">{pan}</td>

                          {/* CALL */}
                          <td className="p-3 border border-gray-300 text-center">
                            <i
                              className="fas fa-mobile-alt text-lg cursor-pointer hover:text-green-600 transition-colors"
                              onClick={handleMobileClick}
                            ></i>
                          </td>

                          {/* MESSAGE */}
                          <td className="p-3 border border-gray-300 text-center">
                            <div className="relative w-32 mx-auto">
                              <select className="w-full border rounded px-2 py-1 appearance-none bg-white">
                                <option value="">Select</option>
                                <option value="dealer1">Appointment</option>
                                <option value="Trading Resume">Trading Resume</option>
                                <option value="Offer">Offer</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Reactivation">Reactivation</option>
                                <option value="Reactivation Brokerage">Reactivation Brokerage</option>
                              </select>
                              <ChevronDown
                                className="absolute right-2 top-2 text-gray-500 pointer-events-none"
                                size={16}
                              />
                            </div>
                          </td>

                          {/* WHATSAPP */}
                          <td className="p-3 text-center border border-gray-300">
                            <div
                              onClick={handleWhatsappClick}
                              className="bg-green-600 hover:bg-green-700 transition-colors w-8 h-8 flex items-center justify-center rounded cursor-pointer mx-auto"
                            >
                              <i className="fab fa-whatsapp text-white"></i>
                            </div>
                          </td>

                          {/* REMARK */}
                          <td className="p-3 border border-gray-300">
                            <input className="border w-full px-2 py-1 rounded" />
                          </td>

                          {/* MOBILE APP */}
                          <td className="p-3 text-center border border-gray-300">{mobileApp}</td>

                          {/* SIP */}
                          <td className="p-3 text-center border border-gray-300">
                            <input type="checkbox" checked={sip === "Yes"} readOnly />
                          </td>

                          {/* REASON */}
                          <td className="p-3 border border-gray-300">
                            <input className="border w-full px-2 py-1 rounded" placeholder="Enter reason" defaultValue={reason} />
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-400 font-medium">
                        No inactive clients found to display
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>
          </div>

          {/* COUNT */}
          <p className="text-sm mt-2 text-gray-500 pb-3 pt-2">
            {filtered.length} total
          </p>

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

          {/* MODAL (Dealer Code List) */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40">

              <div className="bg-white w-[500px] rounded-xl p-6 relative shadow-xl">

                {/* CLOSE */}
                <button
                  className="absolute top-3 right-4 text-xl hover:text-red-500 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>

                {/* TITLE */}
                <h2 className="text-xl font-bold mb-6 text-gray-800">
                  Dealer Code List
                </h2>
                {/* SELECT + BUTTON */}
                <div className="bg-gray-100 flex items-center gap-4 pt-4 pb-4 px-4 mb-4 rounded-lg">

                  {/* APPOINTMENT DROPDOWN */}
                  <div className="relative w-60">
                    <select
                      value={selectedDealer}
                      onChange={(e) => setSelectedDealer(e.target.value)}
                      className="border rounded px-4 py-2 w-60 appearance-none bg-white font-semibold text-gray-700 focus:border-green-600 outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Appointment">Appointment</option>
                      <option value="Trading Resume">Trading Resume</option>
                      <option value="Offer">Offer</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Reactivation">Reactivation</option>
                      <option value="Reactivation Brokerage">Reactivation Brokerage</option>
                    </select>

                    {/* ARROW */}
                    <ChevronDown
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors font-bold active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
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
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8 mx-5 mb-5 border">
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
  );
}
