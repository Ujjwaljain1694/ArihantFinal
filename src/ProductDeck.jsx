import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

export default function WealthBasket() {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <div className="topbar">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="menu">
            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span onClick={() => navigate("/reports")}>Reports</span>
            <span onClick={() => navigate("/account-opening")}>
              Account Opening
            </span>
            <span>Download</span>
            <span className="active">Research call</span>
            <span onClick={() => navigate("/dealslip")}>Deal Slip</span>
            <span onClick={() => navigate("/third-party")}>Third Party</span>
            <span onClick={() => navigate("/contests")}>Contests</span>
            <span onClick={() => navigate("/profile")}>
              Profile <sup className="beta-badge">BETA</sup>
            </span>
            <span onClick={() => navigate("/clicktocall")}>
              Click To Call
            </span>
            <span onClick={() => navigate("/payout")}>Payout</span>
          </div>
        </div>

        <div className="right">
          <span className="user-icon">
            <i className="fa-solid fa-user text-white"></i>
            <i className="fa fa-chevron-down fa-2xs text-white"></i>
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-4 pt-11">

        {/* -------- TABS -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
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
                  tab === "Wealth Basket"
                    ? "border-b-2 border-green-600 text-black font-medium"
                    : "text-gray-600 font-medium hover:text-black"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* SUB LINKS */}
          <div className="flex gap-10 mt-6 text-blue-600 text-sm font-medium">
            <span className="cursor-pointer hover:underline">
              
              product Deck
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

          {/* PRODUCT CARD */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Arihant Product
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
              <span className="text-green-600 hover:underline cursor-pointer">
                Official Website
              </span>
              <span className="text-green-600 hover:underline cursor-pointer">
                Demat your MF Units
              </span>
              <span className="text-green-600 hover:underline cursor-pointer">
                Insta Options
              </span>
              <span className="text-green-600 hover:underline cursor-pointer">
                Trade Bridge
              </span>
              <span className="text-green-600 hover:underline cursor-pointer">
                Value Stocks
              </span>
              <span className="text-green-600 hover:underline cursor-pointer">
                Stock Stack
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}