import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import { getClientPortfolio } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function ProfileBeta() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("AP210001");
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const handleSearch = async () => {
    if (!search.trim()) {
      setCustomErrorMsg("Please Enter Client Code");
      setShowCustomError(true);
      return;
    }

    setLoading(true);
    setClientData(null);
    setPortfolioItems([]);
    try {
      const params = {
        ClientCode: search.trim()
      };
      const response = await getClientPortfolio(params, {});
      console.log("GetClientPortfolio UAT Response:", response.data);

      const resObj = response?.data;
      if (resObj) {
        // Store parent object or structure
        setClientData(resObj);

        // Find list of holdings/assets in portfolio if present
        const list = resObj.data || resObj.Data || resObj.result || resObj.holdings || resObj.Holdings || [];
        if (Array.isArray(list)) {
          setPortfolioItems(list);
        } else if (Array.isArray(resObj)) {
          setPortfolioItems(resObj);
        }
      } else {
        toast.info("No portfolio data returned from UAT");
      }
    } catch (error) {
      console.error("Failed to fetch client portfolio:", error);
      toast.error("Failed to fetch Client Portfolio from UAT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-container">
      <Header />

      <div className="bg-[#f3f3f3] min-h-screen pt-[78px] px-3 pb-4">

        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 pt-3 pb-4 ">

          {/* Beta Note */}
          <marquee className="text-[14px] text-gray-700 mb-2 leading-7">
            <span className="text-red-500 font-semibold">Note:</span> This report has been released in{" "}
            <span className="font-bold">Beta version</span> and is currently under active development.
            During this phase, data processing may be slower than usual.
          </marquee>

          {/* Search Area */}
          <div className="bg-[#efefef] rounded-md px-4 py-4">
            <p className="text-[15px] font-medium text-gray-700 mb-4 -mt-2 font-bold">
              Search By Client
            </p>

            <div className="flex items-center gap-3 -mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search client code"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[275px] h-[44px] rounded-full border border-gray-300 bg-white pl-14 pr-4 text-[16px] outline-none font-bold"
                />
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>

              <button
                onClick={handleSearch}
                className="h-[40px] px-6 rounded-full bg-[#31b44b] hover:bg-[#289a3f] text-white text-[14px] font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md uppercase"
              >
                {loading ? "Loading..." : "SEARCH"}
                <span className="text-base leading-none font-bold">{'>'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic UAT Portfolio Results */}
        {clientData && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-5 mt-6">
            <h3 className="text-xl font-bold mb-6 text-[#31b44b] border-b pb-2 uppercase tracking-tight">
              Client Portfolio: {search.trim()}
            </h3>

            {/* General client metadata if returned */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[14px] mb-6">
              <div className="bg-[#f8fafc] p-4 rounded-xl border">
                <div className="text-gray-500 font-semibold mb-1">CLIENT NAME</div>
                <div className="font-bold text-gray-800 text-[16px]">
                  {clientData.clientName || clientData.clientname || clientData.ClientName || clientData.name || "-"}
                </div>
              </div>
              <div className="bg-[#f8fafc] p-4 rounded-xl border">
                <div className="text-gray-500 font-semibold mb-1">CLIENT CODE</div>
                <div className="font-bold text-gray-800 text-[16px]">
                  {clientData.clientCode || clientData.clientcode || clientData.ClientCode || search.trim()}
                </div>
              </div>
              <div className="bg-[#f8fafc] p-4 rounded-xl border">
                <div className="text-gray-500 font-semibold mb-1">BRANCH CODE</div>
                <div className="font-bold text-gray-800 text-[16px]">
                  {clientData.branchCode || clientData.branchcode || clientData.branch || clientData.Branch || "-"}
                </div>
              </div>
              <div className="bg-[#f8fafc] p-4 rounded-xl border">
                <div className="text-gray-500 font-semibold mb-1">NET ASSET VALUE</div>
                <div className="font-bold text-gray-800 text-[16px]">
                  ₹ {clientData.netAssetValue || clientData.totalValue || clientData.netValue || "0.00"}
                </div>
              </div>
            </div>

            {/* Portfolio Holdings Table */}
            <div className="overflow-x-auto w-full border rounded-xl">
              <table className="w-full text-[12px] border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#2fb344] text-white text-left font-bold">
                    <th className="px-4 py-3 border-r border-white/10">SCRIPT / SECURITY NAME</th>
                    <th className="px-4 py-3 border-r border-white/10">ISIN</th>
                    <th className="px-4 py-3 border-r border-white/10 text-right">QUANTITY</th>
                    <th className="px-4 py-3 border-r border-white/10 text-right">AVERAGE COST</th>
                    <th className="px-4 py-3 border-r border-white/10 text-right">MARKET PRICE</th>
                    <th className="px-4 py-3 text-right">CURRENT VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioItems.length > 0 ? (
                    portfolioItems.map((item, index) => {
                      const name = item.securityName || item.scriptName || item.schemeName || item.name || "-";
                      const isin = item.isin || item.ISIN || "-";
                      const qty = item.qty || item.quantity || item.holdingQty || 0;
                      const avg = item.avgPrice || item.avgCost || item.buyRate || 0;
                      const cmp = item.cmp || item.marketPrice || item.closeRate || 0;
                      const value = item.marketValue || item.currentValue || (qty * cmp) || 0;

                      return (
                        <tr key={index} className={`border-b transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                          <td className="px-4 py-3 border-r font-semibold text-gray-800">{name}</td>
                          <td className="px-4 py-3 border-r text-gray-600">{isin}</td>
                          <td className="px-4 py-3 border-r text-right font-medium text-gray-700">{qty}</td>
                          <td className="px-4 py-3 border-r text-right text-gray-700">₹ {avg}</td>
                          <td className="px-4 py-3 border-r text-right text-gray-700">₹ {cmp}</td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900">₹ {value}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400 font-medium text-[14px]">
                        No holdings found in this portfolio
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Meaning Text */}
        <div className="flex items-center justify-center gap-8 my-16">
          <div className="w-[190px] h-[1px] bg-gray-300"></div>

          <p className="text-[14px] text-gray-700">
            What we mean when we say -
            <span className="font-semibold"> (Z)</span>: Zone,
            <span className="font-semibold"> (R)</span>: Region,
            <span className="font-semibold"> (Br)</span>: Branch,
            <span className="font-semibold"> (AP)</span>: Authorized Person/Sub Broker
          </p>

          <div className="w-[190px] h-[1px] bg-gray-300"></div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-3">
          <h2 className="text-[24px] font-medium text-gray-700 mb-10 pt-1">
            Arihant Product
          </h2>

          <div className="grid grid-cols-6 gap-6 text-center text-[14px]">
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-500">Official Website</a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-500">Demat your MF Units</a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-500">Insta Options</a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-500">Trade Bridge</a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-500">Value Stocks</a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-500">Stock Stack</a>
          </div>
        </div>

      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[60000]
                transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
          <p className="text-base font-semibold text-white">{customErrorMsg}</p>
        </div>
        <div className="ml-6 flex items-center">
          <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
}