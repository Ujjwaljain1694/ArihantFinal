import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-white text-[16px] font-bold tracking-wide text-center max-w-xs">
                    You're entering the fascinating world of investments.
                </p>
            </div>
        </div>
    );
};

export default Loader;
