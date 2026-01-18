
import React, { useState, useEffect } from 'react';
import { SecurityView, SecurityIssue } from './types';
import Dashboard from './components/Dashboard';
import AppScanner from './components/AppScanner';
import HijackCheck from './components/HijackCheck';
import ControlAudit from './components/ControlAudit';
import SystemDebloater from './components/SystemDebloater';
import PrivacySniffer from './components/PrivacySniffer';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<SecurityView>(SecurityView.DASHBOARD);
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Initial mock data
  useEffect(() => {
    setSecurityIssues([
      {
        id: '1',
        title: 'Background Data Leak',
        severity: 'high',
        description: 'Encrypted traffic detected to an unlisted server during standby.',
        recommendation: 'Use the Privacy Sniffer to identify the source package.',
        category: 'Privacy'
      },
      {
        id: '2',
        title: 'Hidden Accessibility Hook',
        severity: 'medium',
        description: 'An app is silently monitoring UI changes without notification.',
        recommendation: 'Perform a Control Audit to check for unauthorized agents.',
        category: 'Control'
      }
    ]);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case SecurityView.DASHBOARD:
        return <Dashboard issues={securityIssues} onStartScan={() => setIsScanning(true)} />;
      case SecurityView.APP_SCANNER:
        return <AppScanner />;
      case SecurityView.HIJACK_CHECK:
        return <HijackCheck />;
      case SecurityView.CONTROL_AUDIT:
        return <ControlAudit />;
      case SecurityView.SYSTEM_DEBLOATER:
        return <SystemDebloater />;
      case SecurityView.PRIVACY_SNIFFER:
        return <PrivacySniffer />;
      default:
        return <Dashboard issues={securityIssues} onStartScan={() => setIsScanning(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-slate-100 pb-20 md:pb-0 md:pl-64">
      <Header />
      
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {renderView()}
      </main>

      <Navigation currentView={currentView} setView={setCurrentView} />

      {/* Global Scanning Overlay */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl">
          <div className="text-center p-8 glass-card rounded-[2.5rem] relative overflow-hidden max-w-sm w-full border border-blue-500/20 shadow-2xl shadow-blue-900/10">
            <div className="scan-animation"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 border-[3px] border-blue-500/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">Isolated Audit</h2>
              <p className="text-slate-400 text-sm px-4">MyShield is sniffing background packets and analyzing hidden processes...</p>
              <div className="mt-8 font-mono text-[10px] text-blue-500/40 h-12 overflow-hidden text-left bg-black/40 p-3 rounded-xl border border-white/5">
                {">"} Hooking kernel sockets...<br/>
                {">"} Analyzing heap for trackers...<br/>
                {">"} Mapping silent listeners...
              </div>
              <button 
                onClick={() => setIsScanning(false)}
                className="mt-10 px-8 py-3 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 transition text-[10px] font-black uppercase tracking-widest text-slate-400 active-scale"
              >
                Interrupt Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
