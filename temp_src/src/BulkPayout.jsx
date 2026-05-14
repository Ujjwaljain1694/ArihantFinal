import React from "react";
import "./PayoutRequest.css";

const BulkPayout = () => (
  <div className="space-y-10">
    <div className="bg-[#f8f9fa] border border-gray-300 p-5 rounded-xl flex items-center gap-4">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 flex items-center w-[300px]">
            <input 
                type="file" 
                className="text-[13px] text-gray-500 cursor-pointer w-full"
            />
        </div>
        <button className="bg-[#34b350] text-white px-6 h-[44px] rounded-full font-bold text-[14px] transition-all hover:bg-[#2da047]">
            SUBMIT &gt;
        </button>
    </div>

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

    {/* Product Section */}
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-lg font-semibold mb-6">Arihant Product</h2>

      <div className="flex flex-wrap gap-32 font-medium">
        <a href="#" className="text-green-600">Official Website</a>
        <a href="#" className="text-green-600">Demat your MF Units</a>
        <a href="#" className="text-green-600">Insta Options</a>
        <a href="#" className="text-green-600">Trade Bridge</a>
        <a href="#" className="text-green-600">Value Stocks</a>
        <a href="#" className="text-green-600">Stock Stack</a>
      </div>
    </div>
  </div>
);

export default BulkPayout;