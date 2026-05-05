import React from "react";



const SubNavigation = ({ activeTab }) => {

  const tabs = [

    "Trial Balance",

    "Reports",

    "Statements",

    "Compliance",

    "Dashboard"

  ];



  return (

    <div className="bg-white border-b border-gray-200 shadow-sm">

      <div className="px-6 py-0 max-w-[1600px] mx-auto">

        <div className="flex gap-8">

          {tabs.map((tab) => (

            <button

              key={tab}

              className={`py-4 px-2 text-[14px] font-medium transition-all ${

                activeTab === tab

                  ? "text-[#1EB04C] border-b-2 border-[#1EB04C]"

                  : "text-gray-600 hover:text-gray-800"

              }`}

            >

              {tab}

            </button>

          ))}

        </div>

      </div>

    </div>

  );

};



export default SubNavigation;

