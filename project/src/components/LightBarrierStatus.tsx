import React from 'react';
import { Power, Shield } from 'lucide-react';

interface LightBarrierStatusProps {
  isActive: boolean;
  toggleStatus: () => void;
}

const LightBarrierStatus: React.FC<LightBarrierStatusProps> = ({ isActive, toggleStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Shield size={20} className="text-blue-500" />
            Light Barrier Status
          </h2>
          <p className="text-sm text-slate-500 mt-1">Control system activation</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="flex items-center justify-center my-8">
        <button 
          onClick={toggleStatus}
          className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer
            ${isActive 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
            } hover:scale-105 active:scale-95`}
        >
          <Power 
            size={72} 
            className={`text-white transition-all duration-500 ${isActive ? 'scale-110' : 'scale-90 opacity-80'}`} 
          />
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-slate-600 mb-4">
          {isActive 
            ? 'Light barrier is providing active contamination protection' 
            : 'System is currently inactive and not monitoring contamination'
          }
        </p>
        <button 
          onClick={toggleStatus} 
          className={`px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 
            ${isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
            } active:scale-95`}
        >
          {isActive ? 'Deactivate System' : 'Activate System'}
        </button>
      </div>
    </div>
  );
};

export default LightBarrierStatus;