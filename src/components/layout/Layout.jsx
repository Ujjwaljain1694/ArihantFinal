import React from "react";
import Header from "../../pages/Header";
import Footer from "../../pages/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
