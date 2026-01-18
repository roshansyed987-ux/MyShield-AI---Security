
import React from 'react';
import { SecurityView } from '../types';

interface NavProps {
  currentView: SecurityView;
  setView: (view: SecurityView) => void;
}

const Navigation: React.FC<NavProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: SecurityView.DASHBOARD, icon: 'fa-house', label: 'Home' },
    { view: SecurityView.PRIVACY_SNIFFER, icon: 'fa-wind', label: 'Sniffer' },
    { view: SecurityView.APP_SCANNER, icon: 'fa-fingerprint', label: 'Forensics' },
    { view: SecurityView.SYSTEM_DEBLOATER, icon: 'fa-broom', label: 'Debloat' },
    { view: SecurityView.HIJACK_CHECK, icon: 'fa-user-secret', label: 'Hijack' },
    { view: SecurityView.CONTROL_AUDIT, icon: 'fa-sliders', label: 'Audit' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#080a0f] border-r border-white/5 flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <i className="fas fa-shield-halved text-white text-xl"></i>
          </div>
          <h1 className="font-bold text-xl tracking-tight">MyShield</h1>
        </div>
        
        <div className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all active-scale ${
                currentView === item.view 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-5 rounded-[2rem] bg-slate-900/50 border border-white/5">
          <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Isolated Mode</p>
          <p className="text-[10px] text-slate-500 leading-tight">No data leaves the device without localized analysis.</p>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-18 bg-[#080a0f]/90 backdrop-blur-2xl border-t border-white/5 flex md:hidden z-40 px-3 pb-safe">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-colors active-scale ${
              currentView === item.view ? 'text-blue-500' : 'text-slate-600'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${currentView === item.view ? 'bg-blue-500/10' : ''}`}>
               <i className={`fas ${item.icon} text-lg`}></i>
            </div>
            <span className="text-[9px] font-black uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
