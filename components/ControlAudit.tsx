
import React, { useState } from 'react';
import { checkControlIndicators } from '../services/geminiService';

const ControlAudit: React.FC = () => {
  const [details, setDetails] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    const auditText = await checkControlIndicators(details || "Generic Android Device");
    setResult(auditText);
    setLoading(false);
  };

  const tests = [
    { name: "Root Status", icon: "fa-hashtag", status: "Untrusted", color: "text-red-500" },
    { name: "Bootloader", icon: "fa-unlock", status: "Locked", color: "text-green-500" },
    { name: "Device Admin", icon: "fa-user-gear", status: "3 Active", color: "text-yellow-500" },
    { name: "USB Debugging", icon: "fa-bug", status: "Enabled", color: "text-blue-500" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Control Audit</h2>
        <p className="text-slate-400">Verify who owns the management tokens of your device.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tests.map(test => (
          <div key={test.name} className="glass-card rounded-2xl p-4 flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-2 ${test.color}`}>
              <i className={`fas ${test.icon}`}></i>
            </div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">{test.name}</span>
            <span className={`text-sm font-bold ${test.color}`}>{test.status}</span>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-bold mb-4">Deep Control Analysis</h3>
        <p className="text-sm text-slate-400 mb-4">Provide any specific "About Phone" details, Build Number, or unusual settings you've noticed (e.g., 'Managed by organization').</p>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter device metadata here..."
          className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:outline-none h-32 resize-none"
        />
        <button 
          onClick={handleAudit}
          disabled={loading}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 rounded-2xl font-bold transition flex items-center justify-center gap-2"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Run Management Audit'}
        </button>
      </div>

      {result && (
        <div className="glass-card rounded-3xl p-6 border-l-4 border-purple-500 animate-in slide-in-from-right-4">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-magnifying-glass text-purple-400"></i>
            Management Intelligence
          </h4>
          <div className="text-slate-300 text-sm whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlAudit;
