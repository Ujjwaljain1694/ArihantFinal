import React from 'react';

const Footer = () => {
  const sections = [
    {
      title: "Product",
      links: ["Equity", "Mutual Funds & SIP", "NPS", "Fixed Income", "Commodities", "Currencies", "Portfolio Management"]
    },
    {
      title: "MEDIA CENTER",
      links: ["About Us", "Investor Relations", "Media Center", "Press Releases"]
    },
    {
      title: "OTHER LINKS",
      links: ["Careers"]
    },
    {
      title: "Connect With Us On",
      links: ["Contact Us", "Support", "Fund Transfer", "Partner with us"]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {sections.map((sec) => (
            <div key={sec.title} className="space-y-4">
              <h4 className="text-[14px] font-black uppercase text-gray-900 tracking-wider">
                {sec.title}
              </h4>
              <ul className="space-y-3">
                {sec.links.map((link) => (
                  <li key={link} className="text-gray-500 text-[13px] font-medium hover:text-arihant-primary cursor-pointer transition-colors">
                    {link}
                  </li>
                ))}
              </ul>
              {sec.title === "Connect With Us On" && (
                <div className="flex gap-4 pt-4">
                   <SocialIcon type="fb" />
                   <SocialIcon type="link" />
                   <SocialIcon type="tw" />
                   <SocialIcon type="yt" />
                   <SocialIcon type="ig" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-50 pt-8 text-center">
            <span className="text-[12px] text-gray-400 font-medium">© 2026 Arihant Capital Markets Limited. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ type }) => (
  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-arihant-primary hover:border-arihant-primary transition-all cursor-pointer">
    <div className="text-[10px] font-black uppercase">{type[0]}</div>
  </div>
);

export default Footer;
