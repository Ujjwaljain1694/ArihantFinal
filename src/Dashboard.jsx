import React, { useState, useEffect } from "react";
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

const StatItem = ({ icon, label, value, onEyeClick, isRevealed }) => {
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
          <span className="text-sm font-semibold text-gray-800">{!isRevealed ? "XXXXXX" : value}</span>
          <button
            onClick={onEyeClick}
            className="bg-transparent border-none cursor-pointer text-gray-500 p-0.5 rounded transition-colors hover:bg-gray-200"
          >
            {!isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();

  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isRevealed, setIsRevealed] = useState(() => {
    return sessionStorage.getItem("revenue_verified") === "true";
  });
  const [resendTimer, setResendTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

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

  // Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (showOtpModal && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, resendTimer]);

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

  // Eye Icon Click Handler
  const handleEyeClick = () => {
    if (isRevealed) {
      return; // Do nothing if already revealed, keep it visible as requested
    }

    setShowOtpModal(true);
    setResendTimer(120); // Reset timer to 2 min
    setCanResend(false);

    // Initial message
    setToast({
      show: true,
      type: "error",
      message: "Next SMS will be send after 2 min!",
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // OTP Submit Handler
  const handleSubmitOtp = () => {
    if (otp === "123456") {
      setShowOtpModal(false);
      setIsRevealed(true);
      sessionStorage.setItem("revenue_verified", "true");
      setOtp(""); // Clear OTP input

      // Success Popup
      setToast({
        show: true,
        type: "success",
        message: "OTP Verified Successfully!",
      });

      setTimeout(() => {
        setToast({
          show: false,
          type: "",
          message: "",
        });
      }, 3000);
    } else {
      // Wrong OTP
      setToast({
        show: true,
        type: "error",
        message: "Invalid OTP",
      });

      setTimeout(() => {
        setToast({
          show: false,
          type: "",
          message: "",
        });
      }, 3000);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = () => {
    if (!canResend) return;

    setResendTimer(120);
    setCanResend(false);
    setOtp("");

    setToast({
      show: true,
      type: "success",
      message: "New OTP Sent Successfully!",
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    <div className="bg-[#f1f1f1] min-h-screen font-sans relative">
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
          <StatItem icon={Calendar} label="YTD Revenue" value="5,20,000" onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={Wifi} label="YTD Traded Clients" value="120" onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon="fa fa-suitcase" label="MTD Revenue" value="80,000" onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={User} label="MTD Traded Clients" value="25" onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={Folder} label="MTD Clients Acquired" value="18" onEyeClick={handleEyeClick} isRevealed={isRevealed} />
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
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 bg-transparent border-none p-0 outline-none cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-4xl drop-shadow-lg"></i>
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
            <span className="text-[14px] font-bold text-[#4ade80] group-hover:text-[#22c55e] transition-colors">{service.name}</span>
            <span className="text-[#34b350] font-black text-lg group-hover:translate-x-1 transition-transform">{'>'}</span>
          </a>
        ))}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
          <div className="bg-white w-[95%] max-w-[500px] rounded-[24px] p-8 relative shadow-2xl animate-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-6 top-4 text-4xl text-gray-400 hover:text-black border-none bg-transparent cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-[28px] font-semibold text-gray-800 mb-6">Please enter OTP</h2>
            <label className="text-lg text-gray-600 block mb-2">OTP</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmitOtp()}
              placeholder="Enter your 6-digit OTP"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-xl outline-none focus:border-green-500 transition-all"
            />

            <div className="text-center mt-6 text-gray-600">
              Resend OTP in <span className="font-bold text-[#34b350]">{formatTime(resendTimer)}</span>
            </div>
            <div
              className={`text-center mt-2 transition-colors font-medium ${canResend ? "text-[#34b350] cursor-pointer hover:underline" : "text-gray-300 cursor-not-allowed"}`}
              onClick={handleResendOtp}
            >
              Resend OTP
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmitOtp}
                className="bg-[#34b350] hover:bg-[#2da145] text-white px-12 py-3 rounded-full text-xl font-semibold transition-all duration-300 shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Popup */}
      {toast.show && (
        <div
          className={`fixed top-10 right-10 z-[3000] min-w-[300px] rounded-2xl px-6 py-4 shadow-2xl text-white animate-in slide-in-from-right duration-500
          ${toast.type === "error" ? "bg-pink-600" : "bg-green-500"}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{toast.type === "error" ? "Error" : "Success"}</h3>
              <p className="text-sm font-medium opacity-90">{toast.message}</p>
            </div>
            <div className="text-3xl font-black">
              {toast.type === "error" ? "⊘" : "✓"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;