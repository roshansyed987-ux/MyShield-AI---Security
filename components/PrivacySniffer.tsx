
import React, { useState, useEffect } from 'react';
import { analyzePrivacyLeaks } from '../services/geminiService';

const PrivacySniffer: React.FC = () => {
  const [isSniffing, setIsSniffing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isSniffing) {
      interval = setInterval(() => {
        const dummyLogs = [
          "OUTBOUND: 142.250.xxx.xxx [Telemetry]",
          "SERVICE: com.hidden.tracker.v1 [Active]",
          "HOOK: microphone_state [Query]",
          "LEAK: device_id_plain [Unencrypted]",
          "WAKE: background_sync [Unauthorized]"
        ];
        const log = dummyLogs[Math.floor(Math.random() * dummyLogs.length)];
        setLogs(prev => [log, ...prev].slice(0, 15));
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isSniffing]);

  const handleDeepAnalysis = async () => {
    setLoading(true);
    const result = await analyzePrivacyLeaks(logs.join('\n'));
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Privacy Sniffer</h2>
          <p className="text-slate-500">Detect unwanted disturbances in real-time.</p>
        </div>
        <button 
          onClick={() => setIsSniffing(!isSniffing)}
          className={`px-6 py-3 rounded-2xl font-black text-xs tracking-widest transition-all ${
            isSniffing 
            ? 'bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse' 
            : 'bg-blue-600 text-white'
          }`}
        >
          {isSniffing ? 'STOP SNIFFING' : 'START SNIFFER'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col h-[400px]">
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSniffing ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`}></div>
            Live Traffic Stream
          </h3>
          <div className="flex-1 font-mono text-[10px] text-blue-400 overflow-y-auto space-y-1 custom-scrollbar">
            {logs.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-700 italic">
                Awaiting connection tokens...
              </div>
            )}
            {logs.map((log, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-left-2">
                <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))}
          </div>
          {logs.length > 0 && !loading && !analysis && (
            <button 
              onClick={handleDeepAnalysis}
              className="mt-4 w-full py-3 bg-slate-800 hover:bg-slate-700 text-xs font-black tracking-widest rounded-xl transition-all"
            >
              DECODE UNWANTED NOISE
            </button>
          )}
          {loading && (
            <div className="mt-4 w-full py-3 bg-slate-900 rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {analysis ? (
            <div className="glass-card rounded-3xl p-6 border border-blue-500/20 animate-in zoom-in-95 duration-300">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <i className="fas fa-brain text-blue-500"></i> AI Intelligence Report
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed italic">
                "{analysis.summary}"
              </p>
              <div className="space-y-3">
                {analysis.leaks.map((leak: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-blue-400">{leak.app}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                        leak.impact === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {leak.impact}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-tighter">{leak.type}</p>
                    <p className="text-xs text-slate-300">{leak.details}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-8 border border-white/5 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
                <i className="fas fa-satellite-dish text-slate-700 text-2xl"></i>
              </div>
              <h4 className="font-bold text-slate-400 mb-2">No Leak Profile</h4>
              <p className="text-sm text-slate-600 px-8">Start the sniffer to capture background noise and analyze unwanted disturbances to your privacy.</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
          <i className="fas fa-eye-slash text-blue-500"></i>
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-400 mb-1 uppercase tracking-widest">Isolated Operation</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            The Privacy Sniffer works separately from system processes to ensure its analysis remains untainted. It maps unwanted data exits and hidden listeners without requiring invasive OS permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacySniffer;
