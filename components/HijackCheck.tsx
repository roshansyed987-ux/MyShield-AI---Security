
import React, { useState } from 'react';
import { runHijackDiagnostic } from '../services/geminiService';

const HijackCheck: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const symptomList = [
    "Phone heating up while idle",
    "Unexplained battery drain",
    "Weird SMS from shortcodes",
    "Social media accounts logged out",
    "Unknown apps appearing",
    "Cellular signal dropping frequently",
    "Ads appearing in system menus",
    "Contacts receiving spam from you"
  ];

  const toggleSymptom = (s: string) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleDiagnose = async () => {
    setLoading(true);
    const diagnosis = await runHijackDiagnostic(symptoms);
    setResult(diagnosis);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-3xl font-bold">Hijack Detector</h2>
        <p className="text-slate-400">Identify signs of SIM swapping or remote access.</p>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-bold mb-4 text-slate-200">Select all that apply:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {symptomList.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    symptoms.includes(s) 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-slate-800 border-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      symptoms.includes(s) ? 'border-white bg-white/20' : 'border-slate-600'
                    }`}>
                      {symptoms.includes(s) && <i className="fas fa-check text-[10px]"></i>}
                    </div>
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleDiagnose}
              disabled={loading || symptoms.length === 0}
              className="mt-8 w-full py-4 bg-slate-100 text-slate-900 hover:bg-white disabled:bg-slate-700 disabled:text-slate-500 rounded-2xl font-bold transition flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></div> : 'Analyze Hijack Risk'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="glass-card rounded-3xl p-8 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-shield-virus text-blue-500"></i>
                Expert Forensic Analysis
              </h3>
              <button 
                onClick={() => { setResult(null); setSymptoms([]); }}
                className="text-slate-500 hover:text-white"
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-red-600/20 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-600/30 transition">
              LOCK DEVICE
            </button>
            <button className="p-4 bg-blue-600/20 text-blue-500 border border-blue-500/20 rounded-2xl font-bold hover:bg-blue-600/30 transition">
              CONTACT CARRIER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HijackCheck;
