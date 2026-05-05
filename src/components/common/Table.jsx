import React from 'react';

const Table = ({ headers, rows }) => {
  const formatCell = (content, header) => {
    if (content === null || content === undefined) return "";
    const h = header.toLowerCase();
    const s = content.toString();

    if (h.includes('name') || h === 'client') return s.toUpperCase();
    if (h.includes('status')) {
      if (h.includes('trade')) return s.toUpperCase();
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    return s;
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-none rounded-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-medium tracking-tight">
          <thead className="bg-[#1EB04C] text-white uppercase">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2 border-r border-white/10 last:border-0 group cursor-pointer font-bold">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {h}
                    <div className="flex flex-col text-[7px] leading-[4px] opacity-40 group-hover:opacity-100 transition-opacity">
                      <span>▲</span><span>▼</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 border-r border-gray-100 last:border-0 text-gray-700 text-[11px]">
                    {formatCell(cell, headers[cellIndex])}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="bg-white">
                <td colSpan={headers.length} className="px-3 py-12 text-center text-gray-400 text-[13px] font-medium">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 bg-[#f9f9f9] text-gray-500 font-medium border-t border-gray-200 text-[11px]">
        {rows.length} total
      </div>
    </div>
  );
};

export default Table;
