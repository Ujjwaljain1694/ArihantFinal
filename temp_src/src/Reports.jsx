import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Reports() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="download-container">
      {/* Header Section */}
      <div className="topbar">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="menu">
            <Link to="/dashboard" className="text-white">Dashboard</Link>
            <span className="active text-white">Reports</span>
            <Link to="/account-opening" className="text-white">Account Opening</Link>
            <Link to="/download" className="text-white">Download</Link>
            <Link to="/research-call" className="text-white">Research call</Link>
            <Link to="/dealslip" className="text-white">Deal Slip</Link>
            <Link to="/third-party" className="text-white">Third Party</Link>
            <Link to="/contests" className="text-white">contests</Link>
            <Link to="/profile" className="text-white">Profile<sup className="beta-badge">BETA</sup></Link>
            <Link to="/clicktocall" className="text-white">Click To Call</Link>
            <Link to="/payout" className="text-white">Payout</Link>
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

      {/* Main Content */}
      <div className="p-4 pt-11">
        <div className="p-4 bg-[#f5f5f5] min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>
          <p className="text-gray-600">Reports page content will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
