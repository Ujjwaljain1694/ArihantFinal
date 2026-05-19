import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ComplianceCertificate from "./ComplianceCertificate.jsx";
import ComplianceCircular from "./ComplianceCircular.jsx";
import Download from "./Download.jsx";
import Training from "./Training.jsx";
import { ToastContainer, toast } from "react-toastify";
import ArihantProductsSection from "./ArihantProducts";
import "react-toastify/dist/ReactToastify.css";
import { getCertificate, getMarkrtingMaterialFiles } from "../api/korpApiService";

export default function MarketingMaterial() {
  const [activeTab, setActiveTab] = useState("Marketing Material");
  const [activeSubTab, setActiveSubTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState({});
  const [selected, setSelected] = useState({});
  
  // Certificate API specific states
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);

  const fetchCertificates = async () => {
    setLoadingCertificates(true);
    try {
      const params = {
        pageNumber: 0,
        size: 50,
      };
      const response = await getCertificate(params);
      console.log("Certificate API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];
      if (Array.isArray(items)) {
        setCertificates(items);
      } else {
        setCertificates([]);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
      setCertificates([]);
    } finally {
      setLoadingCertificates(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Compliance Certificate" && activeSubTab === "certificate") {
      fetchCertificates();
    }
  }, [activeTab, activeSubTab]);

  // Marketing Material API specific states
  const [marketingFiles, setMarketingFiles] = useState(null);
  const [loadingMarketing, setLoadingMarketing] = useState(false);

  const fetchMarketingMaterial = async () => {
    setLoadingMarketing(true);
    try {
      const params = {
        pageNumber: 0,
        size: 100,
      };
      const response = await getMarkrtingMaterialFiles(params);
      console.log("Marketing Material API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];
      
      if (Array.isArray(items) && items.length > 0) {
        const grouped = {};
        items.forEach((item) => {
          const category = item.category || item.Category || item.type || item.Type || "General";
          const fileName = item.fileName || item.Filename || item.file || item.File || "document.pdf";
          if (!grouped[category]) {
            grouped[category] = [];
          }
          if (!grouped[category].includes(fileName)) {
            grouped[category].push(fileName);
          }
        });
        setMarketingFiles(grouped);
      } else {
        setMarketingFiles(null);
      }
    } catch (error) {
      console.error("Failed to fetch marketing material files:", error);
      setMarketingFiles(null);
    } finally {
      setLoadingMarketing(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Marketing Material") {
      fetchMarketingMaterial();
    }
  }, [activeTab]);

  const tabs = [
    "Marketing Material",
    "Compliance Certificate",
    "Compliance Circular",
    "Download",
    "Training",
  ];

  const data = {
    Posters: [
      "Wealth_Poster_(1).pdf",
      "MBD_Poster_(1).pdf",
      "Mobile_App_Poster_(1).pdf",
      "PMS_Poster_(1).pdf",
      "Research_Posters_(1).pdf",
      "Aplus_Mobile_App_A3_Poster.pdf",
      "ArihantPlus_One_Pager_Nov_2025.pdf",
      "ACML_One_Page_Nov_2025.pdf",
      "AIF_Poster_(1).pdf",
      "IMA_Magazine_Final_Ad_A4_2026.pdf"
    ],

    Logos: [
      "Arihant_Capital_Logo_green.pdf",
      "Arihant_Capital_Logo.pdf",
      "Arihant_Logo_2x1.5_ft.pdf",
      "Arihant_Plus_Logo_2_x_4.pdf",
      "Arihant_Plus_Logo.pdf",
      "AC_Back_Drop__8_X_8_ET_Now.pdf"
    ],

    Brochures: [
      "AC_Corporate_Brochure_summary_18032026.pdf",
      "AC_MF_TP_Wealth_Brochure_-_18032026.pdf",
      "AC_Corporate_Brochure_Detail_110426.pdf",
      "Sip_Arihant_-_Flyer.pdf",
      "B2B_Arihant_-_Flyer.pdf",
      "Corporate_Arihant_-_Flyer.pdf"
    ],

    Standee: [
      "Warren_Buffett_3x6_ft.pdf",
      "AC_Mobile_App_Trading_Made_Smarter.pdf",
      "AP_Mobile_APP_Get_Ready_3_X_6.pdf",
      "Mobile_App_Cutout_3.5x7_inch_02.pdf",
      "PMS_Electrum_3X6.pdf",
      "Podium_2.5x4_Ft..pdf",
      "Product_&_Services_Standee_3x6_Ft_(1).pdf",
      "Research_Posters_4_x_5.pdf",
      "Wealth_Poster_4_X_5.pdf",
      "AIF_Standee_3x6_Ft.pdf",
      "MBD_Standee_3x6_Ft.pdf",
      "Mobile_App_Poster_4_X_5.pdf",
      "AIFE_Standee_Design_3x6_ft.pdf"
    ],

    Others: [
      "AC_Photo_Booth_Block_10x10_ft.pdf",
      "AC_Photo_Booth_Mobile_cutout.pdf",
      "AP_Photo_Booth_Mobile_Cutout.pdf",
      "Arihant_Plus_QR_Mobile_App_Download.pdf",
      "Visiting_Card.pdf"
    ],

    PPT: [
      "Algo_Trading_PPT.pdf",
      "Fixed_Income_&_Other_Product_PPT.pdf",
      "Research_Product_PPT.pdf",
      "Wealth_Basket_&_Value_Stock_PPT.pdf",
      "Wealth_Drive_PPT.pdf"
    ],

    "Product Suit": [
      "Product_Suite_March_2026.pdf",
      "HNI_-_Product_Suite_Mar_2026.pdf",
      "HNI_-_Product_Suite_April_2026_(1).pdf",
      "Product_Suite_April_2026.pdf"
    ]
  };

  const toggleCategory = (cat) => {
    setOpen((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const toggleFile = (file) => {
    setSelected((prev) => ({
      ...prev,
      [file]: !prev[file],
    }));
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload file first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    toast.success("File uploaded successfully");
  };

  return (
    <>
      <div className="bg-white min-h-screen pt-[60px]">
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="bg-white p-6 rounded-md shadow-md border mx-6 mt-6">
          {/* TABS */}
          <div className="flex gap-8 border-b pb-2 text-lg font-semibold">
            {tabs.map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 cursor-pointer relative z-10 ${activeTab === tab
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Compliance Certificate Sub-tabs - Second Line */}
          {activeTab === "Compliance Certificate" && (
            <div className="flex gap-8 pt-4 text-lg font-semibold border-b pb-2">
              <span
                className={`cursor-pointer pb-2 relative z-10 ${activeSubTab === "certificate"
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
                onClick={() => setActiveSubTab("certificate")}
              >
                Certificate
              </span>

              <span
                className={`cursor-pointer pb-2 relative z-10 ${activeSubTab === "upload"
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
                onClick={() => setActiveSubTab("upload")}
              >
                Upload Certificate
              </span>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === "Marketing Material" && (
            <div className="mt-6">
              {loadingMarketing ? (
                <div className="p-16 text-center text-gray-500 font-semibold text-[15px]">
                  Loading marketing materials from UAT...
                </div>
              ) : (
                <div className="flex flex-wrap gap-10">
                  {(() => {
                    const displayData = marketingFiles && Object.keys(marketingFiles).length > 0 ? marketingFiles : data;
                    return Object.keys(displayData).map((category) => (
                      <div key={category} className="w-[200px]">

                        {/* CATEGORY */}
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center
                            ${open[category]
                                ? "bg-[#34b350] border-[#34b350]"
                                : "border-gray-400"
                              }`}
                          >
                            {open[category] && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>

                          <span className="font-medium text-gray-800">
                            {category}
                          </span>
                        </div>

                        {/* FILE LIST */}
                        <div
                          className={`ml-6 mt-3 transition-all duration-300 overflow-hidden
                          ${open[category]
                              ? "max-h-[400px] opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          {displayData[category].map((file, i) => (
                            <div key={i} className="flex items-center gap-3 mt-2">
                              <div
                                onClick={() => toggleFile(file)}
                                className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer
                                ${selected[file]
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-400"
                                  }`}
                              >
                                {selected[file] && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>

                              <a
                                href={file.startsWith("http") ? file : `https://intranet.arihantcapital.com/Files/ConnectFile/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline cursor-pointer no-underline break-all"
                              >
                                {file}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          )}


          {activeTab === "Compliance Certificate" && (
            <div className="mt-6">
              {/* UPLOAD SECTION */}
              {activeSubTab === "upload" && (
                <div>

                  {/* LABEL */}
                  <label className="block text-sm font-medium mb-2">
                    Upload File
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="border rounded-md px-4 py-3 bg-gray-50 flex items-center gap-3">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-500 to-green-700 
                      hover:from-green-600 hover:to-green-800 
                      text-white px-8 py-3 rounded-full font-semibold 
                      shadow-md hover:shadow-xl 
                      transition-all duration-300 
                      flex items-center gap-2 active:scale-95"
                    >
                      SUBMIT
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CERTIFICATE SECTION */}
              {activeSubTab === "certificate" && (
                <div className="w-full mt-4">
                  {loadingCertificates ? (
                    <div className="p-16 text-center text-gray-500 font-semibold text-[15px]">
                      Loading compliance certificates from UAT...
                    </div>
                  ) : certificates.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 font-medium border border-dashed rounded-xl">
                      No certificates available to display
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] bg-white">
                      <table className="w-full text-left text-sm text-gray-700">
                        <thead className="bg-[#34b350] text-white font-bold text-xs uppercase tracking-wider">
                          <tr>
                            <th className="px-6 py-4">Sr. No</th>
                            <th className="px-6 py-4">Certificate Name</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Uploaded Date</th>
                            <th className="px-6 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {certificates.map((cert, index) => {
                            const fileName = cert.fileName || cert.Filename || cert.name || cert.Name || "Certificate";
                            const uploadDate = cert.uploadDate || cert.CreatedDate || cert.date || "-";
                            const desc = cert.description || cert.Description || "Compliance Certificate";
                            const fileUrl = cert.fileUrl || cert.url || cert.Url || `https://korpapuatapi.arihantcapital.com/api/V1/reports/downloadCertificate?fileName=${fileName}`;

                            return (
                              <tr key={index} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 font-bold text-gray-800 break-all">{fileName}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{desc}</td>
                                <td className="px-6 py-4 text-gray-500 font-medium">{uploadDate}</td>
                                <td className="px-6 py-4 text-center">
                                  <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full font-bold text-[11px] uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer no-underline active:scale-95"
                                  >
                                    Download
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "Compliance Circular" && (
            <ComplianceCircular />
          )}

          {activeTab === "Download" && (
            <Download />
          )}

          {activeTab === "Training" && (
            <Training />
          )}
        </div>

        <ArihantProductsSection />
      </div>

      <ToastContainer />
    </>
  );
}