import React from 'react';
import Dashboard from './Dashboard';
import Payout from './Payout';
import PayoutRequest from './PayoutRequest';
import BulkPayout from './BulkPayout.jsx';
import CancelRequest from './pages/CancelRequest.jsx';
import DealSlip from './DealSlip';
import Footer from './Footer';
import './App.css';
import './Dashboard.css';
import './Payout.css';
import './PayoutRequest.css';
import './Footer.css';
import ContestsData from './ContestsData';
import Contests from './Contests.jsx';
import ClickToCall from './ClickToCall.jsx';
//import ClickToCallInactive from "./ClickToCallInactive";
import ContestsVideo from './ContestsVideo';
import MinorDriveCreatives from './MinorDriveCreatives';
import ResearchCall from './ResearchCall'
import FundamentalCall from './FundamentalCall'
import ReportsPage from './ReportsPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import LoginPage from './LoginPage';
//import './LoginPage.css';
import './Index.css'
import ZoomResearch from "./ZoomResearch";
import FollowUpReport from "./FollowUpReport"
import ProfileBeta from "./ProfileBeta"
import ThirdParty from './ThirdParty.jsx';
import MutualFund from './MutualFund.jsx';
import Rejection from './Rejection.jsx';
import Mandate from './Mandate.jsx';
import ProductDeck from './ProductDeck.jsx';
import MFStructure from './MFStructure.jsx';
import WealthBasket from './WealthBasket.jsx';
import SIPCalculator from './SipRevenueCalculator.jsx';
import Bonds from './Bonds.jsx';
import AlgoBrokerage from './AlgoBrokerage.jsx';
import Download from './Download.jsx';
import MarketingMaterial from "./MarketingMaterial";
import KRAStatusPage from './KRAStatusPage.jsx';
import HoldingReport from './HoldingReport.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Default Route - Redirect to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
         {/* <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          */}
          {/* Route for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Route for Reports */}
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* Route for Account Opening */}
          <Route path="/account-opening" element={<KRAStatusPage />} />
           {/* Route for Download*/}
          <Route path="/download" element={<MarketingMaterial />} />
           
          {/* Route for Deal Slip */}
          <Route path="/dealslip" element={<DealSlip />} />
          {/* Route for  ResearchCall */}
          <Route path="/researchcall" element={<ResearchCall />} />
          {/* Route for FundamentalCall */}
          <Route path="/fundamentalcall" element={<FundamentalCall />} />
          
          {/* Route for ZoomResearchCall */}
          <Route path="/zoomresearch" element={<ZoomResearch />} />
          {/* Route for contests */}
          <Route path="/contests" element={<Contests />} />
          {/* Route for contests data */}
          <Route path="/contests-data" element={<ContestsData />} />
          {/* Route for minor drive creatives */}
          <Route path="/minor-drive-creatives" element={<MinorDriveCreatives />} />
          {/* Route for contests video */}
          <Route path="/contests-video" element={<ContestsVideo />} />

          {/* Route for Third Party */}
          <Route path="/third-party" element={<ThirdParty />} />
          
          {/* Route for Profile */}
          <Route path="/profile" element={<ProfileBeta />} />
          
          {/* Route for Payout */}
          <Route path="/payout" element={<Payout />} />
          
          {/* Route for Payout Request */}
          <Route path="/payout-request" element={<PayoutRequest />} />
          
          {/* Route for Bulk Payout */}
          <Route path="/bulk-payout" element={<BulkPayout />} />
          
          {/* Route for Cancel Request */}
          <Route path="/cancel-request" element={<CancelRequest />} />
          
          {/* Route for Click To Call */}
          <Route path="/clicktocall" element={<ClickToCall/>} />
          {/* Route for ProfileBeta */}
          <Route path="/ProfileBeta" element={<ProfileBeta/>} />
          {/* Route for Profile (alias for ProfileBeta) */}
          <Route path="/profile" element={<ProfileBeta/>} />
          {/* Route for followUpReport */}
          <Route path="/followupreport" element={<FollowUpReport/>} />
          
          {/* Route for Mutual Fund */}
          <Route path="/mutual-fund" element={<MutualFund />} />
          
          {/* Route for Rejection */}
          <Route path="/rejection" element={<Rejection />} />
          
          {/* Route for Mandate */}
          <Route path="/mandate" element={<Mandate />} />
          
          {/* Route for Product Deck */}
          <Route path="/product-deck" element={<ProductDeck />} />
          
          {/* Route for MF Structure & Brokerage */}
          <Route path="/mf-structure" element={<MFStructure />} />
          
          {/* Route for Wealth Basket */}
          <Route path="/wealth-basket" element={<WealthBasket />} />
          
          {/* Route for SIP Revenue Calculator */}
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          
          {/* Route for Bonds */}
          <Route path="/bonds" element={<Bonds />} />
          
          {/* Route for Marketing Material */}
          <Route path="/download" element={<Download />} />
          {/* Alias route for marketing-material */}
          <Route path="/marketing-material" element={<Download />} />
          
          {/* Route for Algo Brokerage */}
          <Route path="/algo-brokerage" element={<AlgoBrokerage />} />
          
          {/* Route for Payout */}
          <Route path="/payout" element={<Payout />} />
          
          {/* Route for KRA Status */}
          <Route path="/kra-status" element={<KRAStatusPage />} />

          {/* Route for Holding Report */}
          <Route path="/holding-report" element={<HoldingReport />} />

          {/* Third Party Layout */}
          <Route path="/third-party" element={<ThirdParty />}>
            <Route path="algo-brokerage" element={<div></div>} />
            <Route path="mutual-fund" element={<div></div>} />
            <Route path="rejection" element={<div></div>} />
            <Route path="mandate" element={<div></div>} />
            <Route path="product-deck" element={<div></div>} />
            <Route path="mf-structure" element={<div></div>} />
            <Route path="wealth-basket" element={<div></div>} />
            <Route path="sip-calculator" element={<div></div>} />
            <Route path="bonds" element={<div></div>} />
          </Route>
        </Routes>
        <Footer />
      </Router> 
    </div>
  );
}

export default App;
