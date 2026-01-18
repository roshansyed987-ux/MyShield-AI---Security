
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 glass-card px-6 py-4 flex items-center justify-between border-b border-white/5 md:hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <i className="fas fa-shield-halved text-white text-xl"></i>
        </div>
        <h1 className="font-bold text-xl tracking-tight">MyShield <span className="text-blue-500 text-[10px] font-black tracking-widest opacity-80">v1.2</span></h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black tracking-widest border border-green-500/20">
          SECURE
        </div>
      </div>
    </header>
  );
};

export default Header;
