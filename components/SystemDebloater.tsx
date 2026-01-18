
import React, { useState } from 'react';
import { analyzeSystemApp } from '../services/geminiService';

const SystemDebloater: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedStatus, setDeletedStatus] = useState(false);

  const handleAnalyze = async () => {
    if (!packageName) return;
    setLoading(true);
    setAnalysis(null);
    setDeletedStatus(false);
    const result = await analyzeSystemApp(packageName);
    setAnalysis(result);
    setLoading(false);
  };

  const handleSimulatedDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeletedStatus(true);
      setAnalysis(prev => ({...prev, isDeleted: true}));
    }, 2500);
  };

  const commonBloat = [
    "com.facebook.system",
    "com.samsung.android.bixby.agent",
    "com.google.android.apps.wellbeing",
    "com.android.chrome"
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Debloater</h2>
        <p className="text-slate-500">Identify and safely remove unwanted system-level bloatware.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <h3 className="font-bold text-slate-200">Package Inspector</h3>
            <div className="flex gap-2">
              <input 
                type="text"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="e.g., com.manufacturer.bloatware"
                className="flex-1 bg-[#0a0d14] border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition font-mono text-sm"
              />
              <button 
                onClick={handleAnalyze}
                disabled={loading || !packageName}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-2xl font-black text-xs tracking-widest transition flex items-center justify-center active-scale uppercase"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Analyze'}
              </button>
            </div>

            {analysis && (
              <div className="mt-6 p-6 bg-black/30 rounded-[1.5rem] border border-white/5 animate-in slide-in-from-top-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-blue-400 break-all">{packageName}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{analysis.appType}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest ${
                    analysis.isSafeToRemove ? 'bg-green-500/10 text-green-500 border border-green-500/10' : 'bg-red-500/10 text-red-500 border border-red-500/10'
                  }`}>
                    {analysis.isSafeToRemove ? 'SAFE TO REMOVE' : 'CRITICAL SYSTEM APP'}
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-6 leading-relaxed">"{analysis.description}"</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">Stability Risk</span>
                    <span className={`font-bold text-sm ${analysis.riskOfRemoval === 'High' ? 'text-red-500' : 'text-green-500'}`}>{analysis.riskOfRemoval}</span>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-1">Privacy Impact</span>
                    <span className="font-bold text-sm text-slate-200">{analysis.concerns.length > 0 ? 'Privacy Risks' : 'Minimal'}</span>
                  </div>
                </div>

                {deletedStatus ? (
                  <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl text-center text-green-500 font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2">
                    <i className="fas fa-check-circle"></i> SYSTEM PACKAGE DISABLED
                  </div>
                ) : (
                  <button 
                    onClick={handleSimulatedDelete}
                    disabled={isDeleting}
                    className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest transition flex items-center justify-center gap-3 uppercase active-scale ${
                      analysis.isSafeToRemove 
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isDeleting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Interfacing with ADB...</>
                    ) : (
                      <><i className="fas fa-trash-can"></i> Force Removal (System Bypass)</>
                    )}
                  </button>
                )}
                
                {!analysis.isSafeToRemove && (
                  <p className="text-[9px] text-red-400/60 mt-4 text-center uppercase font-black tracking-tighter">
                    Warning: Removing critical apps can cause boot loops.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6 border border-white/5">
            <h3 className="font-black text-[10px] text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-list-check text-blue-500"></i>
              Common Bloat Profile
            </h3>
            <div className="space-y-2">
              {commonBloat.map(pkg => (
                <button 
                  key={pkg}
                  onClick={() => setPackageName(pkg)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[#0a0d14] border border-white/5 hover:border-blue-500/30 transition text-[11px] font-mono text-slate-400 truncate active-scale"
                >
                  {pkg}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-yellow-500/5 border border-yellow-500/10">
            <h4 className="text-yellow-500 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
              <i className="fas fa-triangle-exclamation"></i>
              Deep System Warning
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              MyShield utilizes a standalone deconstruction engine to interface with system-level packages. 
              Always ensure you have a recovery point before performing deep debloating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDebloater;
