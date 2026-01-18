
import React, { useState } from 'react';
import { analyzeAppThreat } from '../services/geminiService';

const AppScanner: React.FC = () => {
  const [appName, setAppName] = useState('');
  const [behavior, setBehavior] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!appName) return;
    setLoading(true);
    const analysis = await analyzeAppThreat(appName, behavior);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Forensic Deconstruction</h2>
        <p className="text-slate-500">Isolated environment analysis for suspicious behavior.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-4 border border-white/5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Isolated Target (Package/Name)</label>
          <input 
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="e.g., com.unknown.service"
            className="w-full bg-[#0a0d14] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Behavioral Indicators</label>
          <textarea 
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            placeholder="e.g., App starts silently on boot, high CPU usage when screen is off, hidden from launcher..."
            rows={3}
            className="w-full bg-[#0a0d14] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition resize-none text-sm"
          />
        </div>
        <button 
          onClick={handleScan}
          disabled={loading}
          className="w-full py-4 bg-slate-900 border border-white/10 hover:border-blue-500/50 hover:bg-slate-800 disabled:bg-slate-950 rounded-2xl font-black text-xs tracking-widest transition-all flex items-center justify-center gap-3 uppercase"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          ) : (
            <><i className="fas fa-microchip"></i> Run Isolated Forensic Scan</>
          )}
        </button>
      </div>

      {result && (
        <div className={`glass-card rounded-3xl p-6 border-l-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
          result.riskLevel === 'high' || result.riskLevel === 'critical' ? 'border-red-500' : 'border-blue-500'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold tracking-tight">Forensic Findings</h3>
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
              result.riskLevel === 'high' || result.riskLevel === 'critical' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
            }`}>
              {result.riskLevel} IMPACT
            </span>
          </div>
          
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">"{result.explanation}"</p>
          
          <div className="space-y-3">
            <h4 className="font-black text-[10px] text-slate-600 uppercase tracking-widest">Disturbance Profile</h4>
            <div className="flex flex-wrap gap-2">
              {result.concerns.map((concern: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-slate-900 border border-white/5 rounded-lg text-[11px] text-slate-400 font-medium">
                  {concern}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
            <button className="flex-1 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-red-500/20 transition">
              PURGE APP
            </button>
            <button className="flex-1 py-3 bg-slate-900 text-slate-500 rounded-xl font-black text-[10px] tracking-widest uppercase hover:text-slate-300 transition">
              QUARANTINE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppScanner;
