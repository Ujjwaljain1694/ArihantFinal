import React from 'react';

const ProductBox = () => {
  const products = [
    "Official Website", "Demat your MF Units", "Insta Options", "Trade Bridge", "Value Stocks", "Stock Stack"
  ];

  return (
    <div className="mt-8 bg-white border border-gray-200 p-8 shadow-none">
      <div className="text-[18px] font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Arihant Product</div>
      <div className="flex flex-wrap justify-between gap-6">
        {products.map(p => (
          <a key={p} href="#" className="text-[#1EB04C] font-medium text-[13px] hover:underline transition-all">{p}</a>
        ))}
      </div>
    </div>
  );
};

export default ProductBox;
