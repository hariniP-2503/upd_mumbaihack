import React from 'react';
import { AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface ContaminationPanelProps {
  contaminationLevel: number;
  safeThreshold: number;
  warningThreshold: number;
  dangerThreshold: number;
}

const ContaminationPanel: React.FC<ContaminationPanelProps> = ({ 
  contaminationLevel,
  safeThreshold,
  warningThreshold,
  dangerThreshold
}) => {
  const getStatusColor = () => {
    if (contaminationLevel < safeThreshold) return 'bg-green-500';
    if (contaminationLevel < warningThreshold) return 'bg-yellow-500';
    if (contaminationLevel < dangerThreshold) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (contaminationLevel < safeThreshold) return 'Safe';
    if (contaminationLevel < warningThreshold) return 'Elevated';
    if (contaminationLevel < dangerThreshold) return 'Warning';
    return 'Danger';
  };

  const getGaugeColor = () => {
    if (contaminationLevel < safeThreshold) {
      return 'from-green-500 to-emerald-600';
    } else if (contaminationLevel < warningThreshold) {
      return 'from-yellow-500 to-amber-600';
    } else if (contaminationLevel < dangerThreshold) {
      return 'from-orange-500 to-amber-600';
    } else {
      return 'from-red-500 to-rose-600';
    }
  };

  const getStatusIcon = () => {
    if (contaminationLevel < safeThreshold) return <TrendingDown className="text-green-600" />;
    if (contaminationLevel < warningThreshold) return <Activity className="text-yellow-600" />;
    if (contaminationLevel < dangerThreshold) return <TrendingUp className="text-orange-600" />;
    return <AlertTriangle className="text-red-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" />
            Contamination Level
          </h2>
          <p className="text-sm text-slate-500 mt-1">Real-time monitoring</p>
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
          contaminationLevel >= warningThreshold 
            ? 'bg-red-100 text-red-800 animate-pulse' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {getStatusIcon()}
          {getStatusText()}
        </div>
      </div>

      <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden mb-3">
        <div 
          className={`absolute top-0 left-0 h-full rounded-lg bg-gradient-to-r ${getGaugeColor()} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(contaminationLevel, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-slate-500 mb-8">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>

      <div className="text-center bg-slate-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-slate-600 mb-2">Current Level</div>
        <div className={`text-2xl font-bold ${getStatusColor().replace('bg-', 'text-')}`}>
          {contaminationLevel.toFixed(1)}%
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-green-500 mb-2"></div>
          <span className="text-green-800">Safe</span>
          <span className="text-green-600">&lt;{safeThreshold}%</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mb-2"></div>
          <span className="text-yellow-800">Warning</span>
          <span className="text-yellow-600">&lt;{warningThreshold}%</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-red-500 mb-2"></div>
          <span className="text-red-800">Critical</span>
          <span className="text-red-600">&gt;{dangerThreshold}%</span>
        </div>
      </div>
    </div>
  );
};

export default ContaminationPanel;