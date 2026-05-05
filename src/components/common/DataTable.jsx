import React from 'react';

const DataTable = ({ headers, rows, showMaskIcon = false, resultsCount }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100/50 shadow-[0_20px_40px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="flex justify-between items-center py-6 px-1">
        {resultsCount !== undefined && (
          <div className="text-gray-900 font-black text-[17px] tracking-tighter">Search results({resultsCount})</div>
        )}
        <div className="ml-auto w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-arihant-primary hover:bg-arihant-primary hover:text-white transition-all cursor-pointer shadow-sm">
          <DownloadIcon />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-black uppercase tracking-tight">
          <thead className="bg-arihant-primary text-white">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-5 py-5 border-r border-white/10 last:border-0 group cursor-pointer">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {h}
                    <i className="fas fa-sort text-[10px] opacity-40 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-5 border-r border-gray-50 last:border-0 text-gray-600 group-hover:text-gray-900 font-bold text-[12px] lowercase first-letter:uppercase">
                    <div className="flex items-center gap-2">
                      {cell}
                      {showMaskIcon && cell?.toString().includes('xxx') && (
                        <i className="fas fa-eye-slash text-[10px] text-gray-300 cursor-pointer hover:text-arihant-primary"></i>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="bg-white">
                <td colSpan={headers.length} className="px-5 py-12 text-center text-gray-400 font-bold text-[14px]">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50/10 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-widest">
        {rows.length} total
      </div>
    </div>
  );
};

const DownloadIcon = () => <i className="fas fa-download text-[14px]"></i>;


export default DataTable;
