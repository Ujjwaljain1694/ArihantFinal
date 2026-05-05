import React from "react";

const ResultsHeader = ({ count = 0 }) => {
  return (
    <div className="mb-4 text-[14px] text-gray-700 font-medium">
      Search results ({count})
    </div>
  );
};

export default ResultsHeader;
