import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo-arihant-capital.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="left">
        <img src={logo} alt="logo" className="logo" />
        <div className="menu">
          <span onClick={() => navigate("/dashboard")} className="cursor-pointer hover:underline">Dashboard</span>
          <span onClick={() => navigate("/reports")} className="cursor-pointer hover:underline">Reports</span>
          <span onClick={() => navigate("/account-opening")} className="cursor-pointer hover:underline">Account Opening</span>
          <span onClick={() => navigate("/download")} className="cursor-pointer hover:underline">Download</span>
          <span onClick={() => navigate("/researchcall")} className="cursor-pointer hover:underline active">Research call</span>
          <span onClick={() => navigate("/dealslip")} className="cursor-pointer hover:underline">Deal Slip</span>
          <span onClick={() => navigate("/third-party")} className="cursor-pointer hover:underline">Third Party</span>
          <span onClick={() => navigate("/contests")} className="cursor-pointer hover:underline">contests</span>
          <span onClick={() => navigate("/profile")} className="cursor-pointer hover:underline">Profile<sup className="beta-badge">BETA</sup></span>
          <Link to="/clicktocall" className="text-white cursor-pointer hover:underline">Click To Call</Link>
          <span onClick={() => navigate("/payout")} className="cursor-pointer hover:underline">Payout</span>
        </div>
      </div>

      <div className="right relative">
        <div 
          className="user-icon cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <i className="fa-solid fa-user text-white"></i>
          <i className="fa fa-chevron-down fa-2xs text-white"></i>
        </div>
        
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
                <i className="fa fa-user-circle mr-2 text-gray-500"></i>
                Customer Details
              </div>
              <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center">
                <i className="fa fa-headset mr-2 text-gray-500"></i>
                Customer Support
              </div>
              <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center border-t border-gray-200">
                <i className="fa fa-sign-out-alt mr-2 text-red-500"></i>
                <span className="text-red-500">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
