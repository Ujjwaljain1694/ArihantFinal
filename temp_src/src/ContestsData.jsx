import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

export default function ContestsData() {
  const [activeTab, setActiveTab] = useState("data");
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [visibleRows, setVisibleRows] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setData([
      { branch: "BRAP05", client: "188003119", name: "ANAND PATEL", email: "*****@yahoo.com", mobile: "******5" },
      { branch: "BRAP05", client: "AP0110283", name: "RADHESHYAM PANCHAL", email: "*****@gmail.com", mobile: "******1" },
      { branch: "BRAP05", client: "188018114", name: "DHARAM JAIN", email: "*****@yahoo.com", mobile: "******5" },
      { branch: "BRAP05", client: "138000287", name: "SHOBHA LALWANI", email: "*****@gmail.com", mobile: "******2" },
    ]);
  }, []);

  // SORT
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "";
    }

    let sorted = [...data];

    if (direction !== "") {
      sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setSortConfig({ key, direction });
    setData(sorted);
  };

  // EYE TOGGLE
  const toggleVisibility = (i) => {
    setVisibleRows((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // SORT ICON (EXACT LOOK)
  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    const isAsc = isActive && sortConfig.direction === "asc";
    const isDesc = isActive && sortConfig.direction === "desc";

    return (
      <span className="ml-1 flex flex-col">
        <svg width="8" height="5" viewBox="0 0 10 6" className={isAsc ? "fill-black" : "fill-green-200"}>
          <path d="M5 0 L10 6 H0 Z" />
        </svg>
        <svg width="8" height="5" viewBox="0 0 10 6" className={isDesc ? "fill-black" : "fill-green-200 mt-[1px]"}>
          <path d="M0 0 L10 0 L5 6 Z" />
        </svg>
      </span>
    );
  };

  return (
    <div className="download-container">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="p-6 bg-[#f4f6f9] min-h-screen mt-16">

      {/* Tabs */}
      <div className="flex gap-8 bg-white px-6 py-4 rounded-t-md text-[14px] border">
        <Link to="/contests" className="text-gray-600">Contest</Link>

        <span
          onClick={() => setActiveTab("data")}
          className={`cursor-pointer pb-2 ${
            activeTab === "data"
              ? "border-b-2 border-green-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Contest Data
        </span>

        <Link to="/minor-drive-creatives" className="text-gray-600 cursor-pointer hover:underline">Minor Drive Creatives</Link>
        <Link to="/contests-video" className="text-gray-600 cursor-pointer hover:underline">Contest Video</Link>
      </div>

      {/* TABLE */}
      {activeTab === "data" && (
        <div className="bg-white border border-gray-200 rounded-b-md py-3">

          {/* Header */}
          <div className="px-6 py-2 text-sm text-gray-700 pb-8px">
            Search results ({data.length})
          </div>

          {/* Table */}
          <table className="w-[95%] mx-auto text-[12px] border border-gray-300 table-fixed">

            <thead>
              <tr className="bg-[#2fb344] text-white">

                <th className="px-3 py-2 border-r border-gray-200">
                  <div onClick={() => handleSort("branch")} className="flex items-center cursor-pointer">
                    Branch Code
                    <SortIcon column="branch" />
                  </div>
                </th>

                <th className="px-3 py-2 border-r border-gray-200">
                  <div onClick={() => handleSort("client")} className="flex items-center cursor-pointer">
                    Client Code
                    <SortIcon column="client" />
                  </div>
                </th>

                <th className="px-3 py-2 border-r border-gray-200">
                  <div onClick={() => handleSort("name")} className="flex items-center cursor-pointer">
                    Name
                    <SortIcon column="name" />
                  </div>
                </th>

                <th className="px-3 py-2 border-r border-gray-200">
                  <div onClick={() => handleSort("email")} className="flex items-center cursor-pointer">
                    Email
                    <SortIcon column="email" />
                  </div>
                </th>

                <th className="px-3 py-2">
                  <div onClick={() => handleSort("mobile")} className="flex items-center cursor-pointer">
                    Mobile Number
                    <SortIcon column="mobile" />
                  </div>
                </th>

              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-b border-gray-200 h-[28px]">

                  <td className="px-3 py-[4px] border-r border-gray-200">
                    {item.branch}
                  </td>

                  <td className="px-3 py-[4px] border-r border-gray-200 font-semibold">
                    {item.client}
                  </td>

                  <td className="px-3 py-[4px] border-r border-gray-200">
                    {item.name}
                  </td>

                  <td className="px-3 py-[4px] border-r border-gray-200">
                    <div className="flex items-center gap-1">
                      {visibleRows[i] ? "user@yahoo.com" : item.email}
                      <i
                        onClick={() => toggleVisibility(i)}
                        className={`fa ${visibleRows[i] ? "fa-eye" : "fa-eye-slash"} cursor-pointer text-gray-500`}
                      ></i>
                    </div>
                  </td>

                  <td className="px-3 py-[4px]">
                    <div className="flex items-center gap-1">
                      {visibleRows[i] ? "9876543210" : item.mobile}
                      <i
                        onClick={() => toggleVisibility(i)}
                        className={`fa ${visibleRows[i] ? "fa-eye" : "fa-eye-slash"} cursor-pointer text-gray-500`}
                      ></i>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* Footer */}
          <div className="px-6 py-2 text-xs text-gray-500">
            {data.length} total
          </div>

        </div>
      )}
      </div>
    </div>
  );

}
