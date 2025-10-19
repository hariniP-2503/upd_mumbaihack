import React from 'react';
import { AlertOctagon, Bell, BellOff, X } from 'lucide-react';

interface Alert {
  id: number;
  message: string;
  level: 'warning' | 'critical' | 'info';
  timestamp: Date;
}

interface AlertNotificationProps {
  alerts: Alert[];
  dismissAlert: (id: number) => void;
  clearAllAlerts: () => void;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({ 
  alerts, 
  dismissAlert,
  clearAllAlerts 
}) => {
  const hasAlerts = alerts.length > 0;
  
  const getAlertColor = (level: string) => {
    switch(level) {
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'critical': return 'border-red-500 bg-red-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getAlertTextColor = (level: string) => {
    switch(level) {
      case 'warning': return 'text-yellow-700';
      case 'critical': return 'text-red-700';
      case 'info': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };

  const getAlertIcon = (level: string) => {
    switch(level) {
      case 'warning':
      case 'critical':
        return <AlertOctagon size={18} className={getAlertTextColor(level)} />;
      default:
        return <Bell size={18} className={getAlertTextColor(level)} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-slate-800">Active Alerts</h2>
          {hasAlerts && (
            <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {alerts.length}
            </span>
          )}
        </div>
        
        {hasAlerts && (
          <button 
            onClick={clearAllAlerts}
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {hasAlerts ? (
          alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-3 border-l-4 rounded-r-md ${getAlertColor(alert.level)} flex justify-between items-start`}
            >
              <div className="flex items-start gap-2">
                {getAlertIcon(alert.level)}
                <div>
                  <p className={`text-sm ${getAlertTextColor(alert.level)}`}>{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => dismissAlert(alert.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 bg-gray-50 rounded-md">
            <BellOff size={24} className="mb-2" />
            <p className="text-sm">No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertNotification;