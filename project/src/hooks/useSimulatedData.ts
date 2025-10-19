import { useState, useEffect } from 'react';

// Define the types for our simulated data
export interface SimulatedData {
  isLightBarrierActive: boolean;
  contaminationLevel: number;
  alerts: Alert[];
  events: LogEvent[];
}

export interface Alert {
  id: number;
  message: string;
  level: 'warning' | 'critical' | 'info';
  timestamp: Date;
}

export interface LogEvent {
  id: number;
  type: 'status_change' | 'contamination' | 'alert' | 'system';
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
}

// Configuration values
const SAFE_THRESHOLD = 25;
const WARNING_THRESHOLD = 50;
const DANGER_THRESHOLD = 75;
const UPDATE_INTERVAL = 5000; // 5 seconds

export function useSimulatedData() {
  // Initial state
  const [data, setData] = useState<SimulatedData>({
    isLightBarrierActive: true,
    contaminationLevel: 12.5,
    alerts: [],
    events: [
      {
        id: 1,
        type: 'system',
        message: 'System initialized',
        timestamp: new Date(),
        severity: 'info'
      }
    ]
  });

  // Toggle light barrier status
  const toggleLightBarrier = () => {
    setData(prevData => {
      const newStatus = !prevData.isLightBarrierActive;
      
      // Create a new event for the status change
      const newEvent: LogEvent = {
        id: Date.now(),
        type: 'status_change',
        message: `Light barrier ${newStatus ? 'activated' : 'deactivated'}`,
        timestamp: new Date(),
        severity: 'info'
      };
      
      return {
        ...prevData,
        isLightBarrierActive: newStatus,
        events: [newEvent, ...prevData.events].slice(0, 100) // Keep only the last 100 events
      };
    });
  };

  // Dismiss a specific alert
  const dismissAlert = (id: number) => {
    setData(prevData => ({
      ...prevData,
      alerts: prevData.alerts.filter(alert => alert.id !== id)
    }));
  };

  // Clear all alerts
  const clearAllAlerts = () => {
    setData(prevData => ({
      ...prevData,
      alerts: []
    }));
  };

  // Simulate data changes
  useEffect(() => {
    const simulateDataChanges = () => {
      setData(prevData => {
        // Only simulate contamination changes if the light barrier is active
        if (!prevData.isLightBarrierActive) {
          return prevData;
        }

        // Simulate contamination level changes
        // More likely to increase than decrease, with random fluctuations
        const randomChange = (Math.random() * 8) - 2; // Range from -2 to 6
        let newContaminationLevel = Math.max(0, Math.min(100, prevData.contaminationLevel + randomChange));
        
        // Round to 1 decimal place
        newContaminationLevel = Math.round(newContaminationLevel * 10) / 10;

        // Check if we need to create a new alert
        let newAlerts = [...prevData.alerts];
        let newEvents = [...prevData.events];
        
        // Create contamination event if there's a significant change
        if (Math.abs(randomChange) > 3) {
          const contaminationEvent: LogEvent = {
            id: Date.now(),
            type: 'contamination',
            message: `Contamination level ${randomChange > 0 ? 'increased' : 'decreased'} to ${newContaminationLevel.toFixed(1)}%`,
            timestamp: new Date(),
            severity: 
              newContaminationLevel >= DANGER_THRESHOLD ? 'critical' :
              newContaminationLevel >= WARNING_THRESHOLD ? 'warning' : 'info'
          };
          newEvents = [contaminationEvent, ...newEvents].slice(0, 100);
        }

        // Create alert if we cross a threshold
        const prevAboveDanger = prevData.contaminationLevel >= DANGER_THRESHOLD;
        const nowAboveDanger = newContaminationLevel >= DANGER_THRESHOLD;
        
        const prevAboveWarning = prevData.contaminationLevel >= WARNING_THRESHOLD;
        const nowAboveWarning = newContaminationLevel >= WARNING_THRESHOLD;
        
        if (!prevAboveDanger && nowAboveDanger) {
          // We've crossed into danger territory
          const alertId = Date.now();
          const alertMessage = `CRITICAL: Contamination level exceeded ${DANGER_THRESHOLD}%`;
          newAlerts.push({
            id: alertId,
            message: alertMessage,
            level: 'critical',
            timestamp: new Date()
          });
          
          const alertEvent: LogEvent = {
            id: alertId + 1,
            type: 'alert',
            message: alertMessage,
            timestamp: new Date(),
            severity: 'critical'
          };
          newEvents = [alertEvent, ...newEvents].slice(0, 100);
        }
        else if (!prevAboveWarning && nowAboveWarning) {
          // We've crossed into warning territory
          const alertId = Date.now();
          const alertMessage = `WARNING: Contamination level exceeded ${WARNING_THRESHOLD}%`;
          newAlerts.push({
            id: alertId,
            message: alertMessage,
            level: 'warning',
            timestamp: new Date()
          });
          
          const alertEvent: LogEvent = {
            id: alertId + 1,
            type: 'alert',
            message: alertMessage,
            timestamp: new Date(),
            severity: 'warning'
          };
          newEvents = [alertEvent, ...newEvents].slice(0, 100);
        }
        
        return {
          ...prevData,
          contaminationLevel: newContaminationLevel,
          alerts: newAlerts,
          events: newEvents
        };
      });
    };

    // Set up the interval for data simulation
    const intervalId = setInterval(simulateDataChanges, UPDATE_INTERVAL);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    data,
    toggleLightBarrier,
    dismissAlert,
    clearAllAlerts,
    thresholds: {
      SAFE_THRESHOLD,
      WARNING_THRESHOLD,
      DANGER_THRESHOLD
    }
  };
}

export default useSimulatedData;