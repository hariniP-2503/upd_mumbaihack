import React from 'react';
import { ShieldAlert, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <ShieldAlert size={28} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Hybrid Light Barrier Infection Control</h1>
          <p className="text-slate-400 text-sm hidden md:block">Real-time Monitoring Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <div className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long',
            day: 'numeric'
          })}</div>
          <div className="text-xs text-slate-400">{new Date().toLocaleTimeString()}</div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Settings size={20} className="text-slate-400 hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Header;