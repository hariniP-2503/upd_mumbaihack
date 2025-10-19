import React from 'react';
import Header from './Header';
import LightBarrierStatus from './LightBarrierStatus';
import ContaminationPanel from './ContaminationPanel';
import AlertNotification from './AlertNotification';
import EventLog from './EventLog';
import useSimulatedData from '../hooks/useSimulatedData';

const Dashboard: React.FC = () => {
  const { 
    data, 
    toggleLightBarrier, 
    dismissAlert, 
    clearAllAlerts,
    thresholds 
  } = useSimulatedData();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LightBarrierStatus 
              isActive={data.isLightBarrierActive} 
              toggleStatus={toggleLightBarrier} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <ContaminationPanel 
              contaminationLevel={data.contaminationLevel}
              safeThreshold={thresholds.SAFE_THRESHOLD}
              warningThreshold={thresholds.WARNING_THRESHOLD}
              dangerThreshold={thresholds.DANGER_THRESHOLD}
            />
          </div>
          
          <div className="lg:col-span-1">
            <AlertNotification 
              alerts={data.alerts}
              dismissAlert={dismissAlert}
              clearAllAlerts={clearAllAlerts}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <EventLog events={data.events} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 text-center mt-8">
        <p className="font-medium">Hybrid Light Barrier Infection Control System</p>
        <p className="text-slate-400 text-sm mt-2">Version 1.0 &copy; {new Date().getFullYear()}</p>
        <p className="text-slate-500 text-xs mt-1">All data is simulated for demonstration purposes</p>
      </footer>
    </div>
  );
};

export default Dashboard;