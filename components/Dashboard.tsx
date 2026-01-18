
import React from 'react';
import { SecurityIssue } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  issues: SecurityIssue[];
  onStartScan: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ issues, onStartScan }) => {
  const data = [
    { name: 'Private', value: 92 },
    { name: 'Leaking', value: 8 },
  ];
  const COLORS = ['#3b82f6', '#1e293b'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Privacy Integrity</h2>
          <p className="text-slate-500 text-sm">Standalone Audit Engines: <span className="text-green-500 font-mono">ONLINE</span></p>
        </div>
        <button 
          onClick={onStartScan}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-900/30 transition-all active:scale-95 text-sm"
        >
          <i className="fas fa-search-nodes mr-2"></i> DEEP AUDIT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-8 flex items-center gap-8 border border-white/5">
          <div className="w-32 h-32 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tracking-tighter">92%</span>
              <span className="text-[9px] text-slate-500 uppercase font-black">Secure</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Silence Level</h3>
            <p className="text-slate-400 text-sm leading-relaxed">No unauthorized active listeners detected in the last 24 hours. 3 apps identified with excessive telemetry.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-4 border-l-2 border-blue-500">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Background Noise</span>
            <p className="text-xl font-bold">Minimal</p>
          </div>
          <div className="glass-card rounded-2xl p-4 border-l-2 border-red-500">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Unwanted Leaks</span>
            <p className="text-xl font-bold">04</p>
          </div>
          <div className="glass-card rounded-2xl p-4 border-l-2 border-indigo-500">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Trackers Blocked</span>
            <p className="text-xl font-bold">242</p>
          </div>
          <div className="glass-card rounded-2xl p-4 border-l-2 border-green-500">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Privacy Score</span>
            <p className="text-xl font-bold">A+</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <i className="fas fa-list text-blue-500 text-sm"></i>
          Unwanted Disturbances
        </h3>
        {issues.map(issue => (
          <div key={issue.id} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-all group">
            <div className="flex gap-5 items-start">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                issue.severity === 'high' ? 'bg-red-500/5 text-red-500' : 'bg-yellow-500/5 text-yellow-500'
              }`}>
                <i className={`fas ${issue.severity === 'high' ? 'fa-radiation' : 'fa-circle-exclamation'} text-xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-200">{issue.title}</h4>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${
                    issue.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{issue.description}</p>
                <div className="flex items-center gap-4">
                  <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition">ISOLATE APP</button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 transition">SILENCE NOTICE</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
