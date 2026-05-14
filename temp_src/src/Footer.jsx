import React from 'react';

import './Footer.css';



const Footer = () => {

  return (

    <footer className="footer">

      {/* Bottom Black Line Divider */}
      <div className="bottom-black-divider"></div>

      <div className="footer-container">

        {/* Four Column Layout */}

        <div className="footer-columns">

          {/* Column 1: Product */}

          <div className="footer-column">

            <h3 className="footer-title">Product</h3>

            <ul className="footer-links">

              <li><a href="#" className="footer-link">Equity</a></li>

              <li><a href="#" className="footer-link">Mutual Funds & SIP</a></li>

              <li><a href="#" className="footer-link">NPS</a></li>

              <li><a href="#" className="footer-link">Fixed Income</a></li>

            </ul>

          </div>



          {/* Column 2: MEDIA CENTER */}

          <div className="footer-column">

            <h3 className="footer-title">MEDIA CENTER</h3>

            <ul className="footer-links">

              <li><a href="#" className="footer-link">About Us</a></li>

              <li><a href="#" className="footer-link">Investor Relations</a></li>

              <li><a href="#" className="footer-link">Media Center</a></li>

              <li><a href="#" className="footer-link">Press Releases</a></li>

            </ul>

          </div>



          {/* Column 3: OTHER LINKS */}

          <div className="footer-column">

            <h3 className="footer-title">OTHER LINKS</h3>

            <ul className="footer-links">

              <li><a href="#" className="footer-link">Careers</a></li>

            </ul>

          </div>



          {/* Column 4: Connect With Us On */}

          <div className="footer-column">

            <h3 className="footer-title">Connect With Us On</h3>

            <ul className="footer-links">

              <li><a href="#" className="footer-link">Contact Us</a></li>

              <li><a href="#" className="footer-link">Support</a></li>

              <li><a href="#" className="footer-link">Fund Transfer</a></li>

              <li><a href="#" className="footer-link">Partner with us</a></li>

            </ul>

            

            {/* Social Media Icons */}

            <div className="social-media">

              <a href="#" className="social-icon" aria-label="Facebook">

                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>

                </svg>

              </a>

              <a href="#" className="social-icon" aria-label="LinkedIn">

                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>

                </svg>

              </a>

              <a href="#" className="social-icon" aria-label="X (Twitter)">

                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>

                </svg>

              </a>

              <a href="#" className="social-icon" aria-label="YouTube">

                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>

                </svg>

              </a>

              <a href="#" className="social-icon" aria-label="Instagram">

                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>

                </svg>

              </a>

            </div>

          </div>

        </div>



        {/* Important Links with Dividers */}

        <div className="important-links-wrapper">

          <div className="important-links-divider-top"></div>

          <div className="important-links">

            <span className="important-links-text">

              Important Links | <a href="#" className="important-link">BSE</a> | <a href="#" className="important-link">NSE</a> | <a href="#" className="important-link">SEBI</a>

            </span>

          </div>

          <div className="important-links-divider-bottom"></div>

        </div>



        {/* Investor Alert */}

        <div className="investor-alert-container">

          <div className="investor-alert">

            <div className="alert-content">

                <marquee behavior="" direction="" 

                 onmouseover="this.stop()" 

                 onmouseout="this.start()"

                 scrollDelay="150">

             

              <span className="alert-text"  style={{ color: '#656465', fontSize: '14px' }}>

              

                <strong>Investor Alert:-</strong> 

                 conducting appropriate analysis of respective companies and not to blindly follow unfounded rumors, tips etc. Further, you are also requested to share your

              

              </span>

              </marquee> 

            </div>

          </div>



          {/* Attention Investors */}

          <div className="attention-investors">

            <span>ATTENTION INVESTORS  </span>

            <ul className="alert-list">

              <li> KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (Broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.</li>
              <li>For Stock Broking Transaction 'Prevent unauthorised transactions in your account - Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day...Issued in the interest of Investors'</li>

              <li>For Depository Transactio 'Prevent Unauthorized Transactions in your demat account - Update your Mobile Number with your Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from CDSL/NSDL on the same day...Issued in the interest of investors</li>

              <li>No need to issue cheques y investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investor's account.</li>

              <li>Investors should be cautious on unsolicited emails and SMS advising to buy, sell or hold securities and trade only on the basis of informed decision. Investors are advised to invest after conducting appropriate analysis of respective companies and not to blindly follow unfounded rumours, tips etc. Further, you are also requested to share your knowledge or evidence of systemic wrongdoing, potential frauds or unethical behaviour through the anonymous portal facility provided on BSE & NSE website.</li>

              <br />

              <p className="footer-info-text">Arihant group companies are registered broker and dealer. SEBI Registration number for NSE & BSE :- INZ000180939; NSDL - IN-DP-127-2015 DP ID-IN301983; CDSL DP ID-43000;NCDEX - 01274; MCX - 56565; AMFI - ARN 15114; SEBI Merchant Banking Regn. No. - MB INM 000011070; SEBI Research Analyst Regn. No. - INH000002764. Please carefully read the risk disclosure document as prescribed by SEBI and Do’s & Don’ts by NSE, BSE,NCDEX & MCX. Existing customers can send in their grievances to compliance@arihantcapital.com. and for DP related queries & Complaints please write us to depository@arihantcapital.com If you want to register your complaints through SEBI Score Portal please Click here.</p>

              <p className="footer-info-text">ARIHANT CAPITAL IFSC LIMITED | SEBI Regid. No. : INZ000157539 

Address: Unit No. 424, 4th Floor, The Signature Building, Block 13B, Road 1C, Zone 1, GIFT SEZ, GIFT City, Gandhinagar, Gujarat - 382355.</p>

              <br />



              <p className="footer-info-text">Disclaimer: Arihant Capital Markets Limited is engaged in client based and proprietary trading on various exchanges. Arihant Capital IFSC Limited is engaged in proprietary trading in NSE IFSC Stock Exchange and India INX Stock Exchange.</p> 

              <br />

              <p className="footer-address-text">#1011 Solitaire Corporate Park, Andheri Ghatkopar Link Road, Chakala, Andheri (E), Mumbai - 4000093. Email: <span className="contact-info">customersupport@arihantcapital.com</span>, Tel: <span className="contact-info">0731-4217003</span></p>

            </ul>

          </div>

        </div>

      </div>

    </footer>

  );

};



export default Footer;

