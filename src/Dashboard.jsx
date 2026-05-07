import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Calendar, Wifi, User, Folder } from "lucide-react";
import Header from "./Header.jsx";
import "@fortawesome/fontawesome-free/css/all.css";

// Internal VideoCard component converted to Tailwind
const VideoCard = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_3px_12px_rgba(0,0,0,0.1)] relative">
      {!play ? (
        <div className="w-full h-full relative cursor-pointer group" onClick={() => setPlay(true)}>
          <img
            src="https://img.youtube.com/vi/67CeWgOOIPU/maxresdefault.jpg"
            alt="video thumbnail"
            className="w-full h-full object-cover"
          />
          {/* YouTube Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[68px] h-[48px] bg-black/80 group-hover:bg-[#FF0000] rounded-[12px] flex items-center justify-center transition-all duration-300 shadow-xl">
              <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full border-none block"
          src="https://www.youtube.com/embed/67CeWgOOIPU?autoplay=1"
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value }) => {
  const [hidden, setHidden] = useState(true);

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <i className={`${icon} text-[#34b350] text-[18px]`}></i>;
    } else {
      const Icon = icon;
      return <Icon size={18} />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-[15px] bg-[#f9f9f9] rounded-md border border-[#e0e0e0]">
      <div className="flex items-center justify-center text-[#34b350] text-[18px]">
        {renderIcon()}
      </div>

      <div className="flex-1">
        <p className="m-0 mb-1.5 text-[13px] text-gray-600 font-medium">{label}</p>
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-sm font-semibold text-gray-800">{hidden ? "XXXXXX" : value}</span>
          <button
            onClick={() => setHidden(!hidden)}
            className="bg-transparent border-none cursor-pointer text-gray-500 p-0.5 rounded transition-colors hover:bg-gray-200"
          >
            {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();

  const slides = [
    "480920250448563074856",
    "42092025054204790424",
    "360920250536464153646",
    "370920250537151493715",
    "550920250455229795522",
    "380920250538105403810",
    "380920250538366803836",
    "380920250538598053859",
    "370920250537324933732"
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Extend slides for infinite loop: [Last Slide, ...Slides, First Slide]
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, extendedSlides.length]);

  const handleNext = () => {
    if (currentIndex >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length);
    }
  };

  const services = [
    { name: "KORP SSO", href: "https://uatbo.arihantcapital.com/Home/DashBoard" },
    { name: "RM/Subbroker EKYC", href: "http://ekyc-admin-test.s3-website.ap-south-1.amazonaws.com/sso/?branchCode=AP05&sessionID=806483125" },
    { name: "Sampark", href: "#" },
    { name: "IPO Details", href: "https://www.arihantcapital.com/invest-in-ipo" },
    { name: "Apply Mutual Funds", href: "#" },
    { name: "Cheque Receipt", href: "https://inwardbeta.arihantcapital.com/BGEntries.aspx?id=0" },
    { name: "Mutual Fund Details", href: "https://www.arihantcapital.com/invest-in-mutual-funds" },
    { name: "Margin Calculator", href: "http://www.arihantcapital.com/margin-calculator" },
    { name: "Forms and Applications", href: "https://www.arihantcapital.com/application-forms" },
    { name: "Apply NPS New Account", href: "https://mynps.nsdl.com/myNPS/NationalPensionSystem.html?appType=main&authId=ak5pN0hOaTNKaVZwOTFnVjcxY0l2Zz09" },
    { name: "Apply NPS Invest More", href: "#" },
    { name: "Social Media", href: "#" }
  ];

  return (
    <div className="bg-[#f1f1f1] min-h-screen font-sans">
      <Header />

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[15px] p-[15px] mt-[60px]">
        {[
          { label: "Total Branch", value: "10" },
          { label: "Total Clients", value: "15,596" },
          { label: "Active Clients", value: "11,594" },
          { label: "Traded Clients", value: "1,587" },
          { label: "Inactive Clients", value: "4,002" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-2.5 rounded-xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] w-full max-w-[210px] mx-auto cursor-pointer flex flex-col justify-center transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="m-0 text-gray-900 text-base font-normal">{card.value}</h2>
            <p className="m-0 mt-1 text-[9px] text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
          </div>
        ))}
      </div>

      {/* New Revenue Dashboard Component */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] m-[15px] border border-gray-50">
        <h2 className="m-0 mb-0.5 text-[15px] text-gray-800 font-normal uppercase tracking-tight">My revenue details</h2>

        {/* Horizontal Divider Line */}
        <div className="my-2 border-t border-gray-100"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[15px]">
          <StatItem icon={Calendar} label="YTD Revenue" value="5,20,000" />
          <StatItem icon={Wifi} label="YTD Traded Clients" value="120" />
          <StatItem icon="fa fa-suitcase" label="MTD Revenue" value="80,000" />
          <StatItem icon={User} label="MTD Traded Clients" value="25" />
          <StatItem icon={Folder} label="MTD Clients Acquired" value="18" />
        </div>
      </div>

      {/* Slider + Video Section */}
      <div className="px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Carousel Section */}
          <div className="w-full lg:w-[65%] my-auto relative group">
            <div className="relative overflow-hidden shadow-2xl h-[330px] rounded-3xl border border-gray-100">
              <div
                className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedSlides.map((id, idx) => (
                  <div key={idx} className="min-w-full h-full relative">
                    <img
                      src={`https://download.arihantcapital.com/account/${id}.jpg`}
                      className="w-full h-full object-cover"
                      alt={`Slide ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Large Chevrons on Hover */}
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white flex items-center justify-center transition-all opacity-70 hover:opacity-100 bg-black/10 hover:bg-black/30 w-12 h-12 rounded-full border-none cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-2xl drop-shadow-lg"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white flex items-center justify-center transition-all opacity-70 hover:opacity-100 bg-black/10 hover:bg-black/30 w-12 h-12 rounded-full border-none cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-2xl drop-shadow-lg"></i>
              </button>

              {/* Minimal Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => {
                  let isActive = false;
                  if (currentIndex === 0) isActive = idx === slides.length - 1;
                  else if (currentIndex === extendedSlides.length - 1) isActive = idx === 0;
                  else isActive = idx === currentIndex - 1;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setIsTransitioning(true);
                        setCurrentIndex(idx + 1);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive ? "bg-[#34b350] w-6" : "bg-white/50 w-1.5"}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="w-full lg:w-[35%] h-[330px]">
            <VideoCard />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] p-[15px] pb-10">
        {services.map((service, idx) => (
          <a
            key={idx}
            href={service.href}
            target={service.href !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group bg-white p-[15px] rounded-lg flex items-center justify-center gap-3 cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-[#f3fff5] hover:shadow-xl border border-gray-50 hover:border-green-100 no-underline active:scale-95"
          >
            <span className="text-[14px] font-bold text-gray-900 group-hover:text-[#34b350] transition-colors">{service.name}</span>
            <span className="text-gray-400 font-black text-lg group-hover:text-[#34b350] group-hover:translate-x-1 transition-all">{'>'}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;