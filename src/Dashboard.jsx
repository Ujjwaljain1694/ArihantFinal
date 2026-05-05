import "./Dashboard.css";
import logo from "./logo-arihant-capital.png";
import Header from "./Header.jsx";
import ImageSlider from "./ImageSlider";
import VideoCard from "./VideoCard";
import "./SliderVideoSection.css";
import "./ServicesGrid.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Calendar, Wifi, BarChart3, User, Folder } from "lucide-react";

const StatItem = ({ icon, label, value }) => {
  const [hidden, setHidden] = useState(true);

  const renderIcon = () => {
    if (typeof icon === 'string') {
      // Font Awesome icon - parse classes from string
      const iconClasses = icon.split(' ').join(' ');
      return <i className={iconClasses}></i>;
    } else {
      // Lucide React icon
      const Icon = icon;
      return <Icon size={18} />;
    }
  };

  return (
    <div className="stat-item">
      
      <div className="icon-box">
        {renderIcon()}
      </div>

      <div>
        <p className="label">{label}</p>

        <div className="value-row">
          <span>{hidden ? "XXXXXX" : value}</span>

          <button onClick={() => setHidden(!hidden)}>
            {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [showAmount, setShowAmount] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Sub Header */}
      <div className="sub-header">
        <span className="dot"></span>
        <span>MP21 &gt; ARIHANT PLUS</span>
      </div>

      {/* Cards */}
      <div className="cards">
        <div className="card"><h2>10</h2><p>Total Branch</p></div>
        <div className="card"><h2>15,596</h2><p>Total Clients</p></div>
        <div className="card"><h2>11,594</h2><p>Active Clients</p></div>
        <div className="card"><h2>1,587</h2><p>Traded Clients</p></div>
        <div className="card"><h2>4,002</h2><p>Inactive Clients</p></div>
      </div>

      {/* New Revenue Dashboard Component */}
      <div className="revenue-card">
        <h2 className="title">My revenue details</h2>
        
        {/* Horizontal Divider Line */}
        <div style={{
          margin: '1rem 0',
          border: 0,
          borderTop: '1px solid rgba(0, 0, 0, .1)'
        }}></div>

        <div className="grid">
          <StatItem icon={Calendar} label="YTD Revenue" value="5,20,000" />
          <StatItem icon={Wifi} label="YTD Traded Clients" value="120" />
          <StatItem icon="fa fa-suitcase text-green ariaihidden true" label="MTD Revenue" value="80,000" />
          <StatItem icon={User} label="MTD Traded Clients" value="25" />
          <StatItem icon={Folder} label="MTD Clients Acquired" value="18" />
        </div>
      </div>

      {/* Slider + Video */}
      {/* <div className="slider-video">
        <div className="slider-box">
          <ImageSlider />
        </div>

        <div className="video-box">
          <VideoCard />
        </div>
      </div>
       */}

       <div className="container-fluid">
              <div className="row">
      <div className="col-12 col-md-8 col-xl-8 my-auto">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://download.arihantcapital.com/account/480920250448563074856.jpg" className="d-block w-100"
                alt="First Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/42092025054204790424.jpg" className="d-block w-100"
                alt="Second Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/360920250536464153646.jpg" className="d-block w-100"
                alt="Third Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/370920250537151493715.jpg" className="d-block w-100"
                alt="Fourth Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/550920250455229795522.jpg" className="d-block w-100"
                alt="Five Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/380920250538105403810.jpg" className="d-block w-100"
                alt="Six Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/380920250538366803836.jpg" className="d-block w-100"
                alt="Seven Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/380920250538598053859.jpg" className="d-block w-100"
                alt="Eight Slide"/>
            </div>
            <div className="carousel-item">
              <img src="https://download.arihantcapital.com/account/370920250537324933732.jpg" className="d-block w-100"
                alt="Nine Slide"/>
            </div>
          </div>
          <a className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>        
      </a>
          <a className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span> 
          </a>
        </div>

      </div>
      <div className="col-12 col-md-4 col-xl-4">
        <div className="card shadow-sm rounded-8">
         {/* <iframe width="100%" height="320" src="https://www.youtube.com/embed/0dyGsc1qkGw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
          <iframe width="100%" class="rounded-8" height="277" src="https://www.youtube.com/embed/0vv6tlVa6ZM"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe> */}
        </div>
      </div>
    </div>
       </div>

   
      <div className="services-grid">

        <div className="service-box">KORP SSO <span>{'>'}</span></div>
        <div className="service-box">RM/Subbroker EKYC <span>{'>'}</span></div>
        <div className="service-box">Sampark <span>{'>'}</span></div>
        <div className="service-box">IPO Details <span>{'>'}</span></div>

        <div className="service-box">Apply Mutual Funds <span>{'>'}</span></div>
        <div className="service-box">Cheque Receipt <span>{'>'}</span></div>
        <div className="service-box">Mutual Fund Details <span>{'>'}</span></div>
        <div className="service-box">Margin Calculator <span>{'>'}</span></div>

        <div className="service-box">Forms and Applications <span>{'>'}</span></div>
        <div className="service-box">Apply NPS New Account <span>{'>'}</span></div>
        <div className="service-box">Apply NPS Invest More <span>{'>'}</span></div>
        <div className="service-box">Social Media <span>{'>'}</span></div>

      </div>

    </div>
  );
}

export default Dashboard;