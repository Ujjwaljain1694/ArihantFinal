import React from "react";
import { Link, useLocation } from "react-router-dom";

const PayoutLayout = ({ children }) => {
  const location = useLocation();
  const tabs = [
    { name: "Payout", path: "/payout" },
    { name: "Bulk Payout", path: "/bulk-payout" },
    { name: "Payout Request", path: "/payout-request" },
    { name: "Cancel Request", path: "/cancel-request" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-[#34b350] selection:text-white">
      {/* 🟢 TOP NAVBAR */}
      <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white text-[13px] font-bold">
        <div className="flex items-center gap-12">
          <div className="font-black text-2xl tracking-tighter cursor-pointer">ArihantCapital</div>
          <nav className="flex items-center gap-6 opacity-95">
            <span>Dashboard</span>
            <span className="border-b-2 border-white pb-1">Reports</span>
            <span>Account Opening</span>
            <span>Download</span>
            <span>Research Call</span>
            <span>Deal Slip</span>
            <span>Third Party</span>
            <span>Contests</span>
            <div className="relative">
              <span>Portfolio</span>
              <span className="absolute -top-3 -right-6 bg-red-500 text-[8px] px-1 rounded-sm flex items-center h-3">BETA</span>
            </div>
            <span>Click To Call</span>
            <span>Payout</span>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30">
            <i className="fas fa-user text-[16px]"></i>
          </div>
        </div>
      </div>

      {/* 📑 SECONDARY TABS */}
      <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
        <div className="flex flex-wrap gap-x-[100px] gap-y-4 mb-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`pb-3 text-[16px] font-bold transition-all relative outline-none tracking-tighter ${location.pathname === tab.path
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 🖥 TAB CONTENT */}
      <div className="px-[40px] py-[30px] pb-16 min-h-[500px] bg-white">
        <div className="space-y-10">
          {children}

          {/* BOTTOM LEGEND */}
          <div className="pt-20 pb-10 text-center text-[14px] text-gray-600 font-normal border-t border-gray-50">
            What we mean when we say - <span className="font-bold">(Z)</span>: Zone, <span className="font-bold">(R)</span>: Region, <span className="font-bold">(Br)</span>: Branch, <span className="font-bold">(AP)</span>: Authorized Person/Sub Broker
          </div>
        </div>
      </div>

      {/* 📦 FOOTER PRODUCT SECTION */}
      <div className="px-[40px] py-16 bg-white border-t border-gray-100">
        <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm">
          <div className="text-2xl font-black text-gray-800 mb-10 pb-4 border-b border-gray-50 uppercase tracking-tighter">Arihant Product</div>
          <div className="flex flex-wrap justify-between gap-8 text-[#34b350] font-bold text-[14px]">
            {["Official Website", "Demat your MF Units", "Insta Options", "Trade Bridge", "Value Stocks", "Stock Stack"].map((p) => (
              <a key={p} href="#" className="hover:scale-105 transition-transform">{p}</a>
            ))}
          </div>
        </div>
      </div>

      {/* 🔗 MAIN FOOTER */}
      <div className="bg-white border-t border-gray-100 px-[40px] py-20 grid grid-cols-1 md:grid-cols-4 gap-16 text-[14px]">
        <div className="space-y-6">
          <h4 className="font-bold text-gray-800 uppercase tracking-tight">Product</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li className="hover:text-[#34b350] cursor-pointer">Equity</li>
            <li className="hover:text-[#34b350] cursor-pointer">Mutual Funds & SIP</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-800 uppercase tracking-tight">MEDIA CENTER</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li className="hover:text-[#34b350] cursor-pointer">About Us</li>
            <li className="hover:text-[#34b350] cursor-pointer">Investor Relations</li>
            <li className="hover:text-[#34b350] cursor-pointer">Media Center</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-800 uppercase tracking-tight">OTHER LINKS</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li className="hover:text-[#34b350] cursor-pointer">Careers</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-gray-800 uppercase tracking-tight">Connect With Us On</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li className="hover:text-[#34b350] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#34b350] cursor-pointer">Support</li>
            <li className="hover:text-[#34b350] cursor-pointer">Fund Transfer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PayoutLayout;