import React from 'react';
import { Clock, Filter } from 'lucide-react';

interface LogEvent {
  id: number;
  type: 'status_change' | 'contamination' | 'alert' | 'system';
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
}

interface EventLogProps {
  events: LogEvent[];
}

const EventLog: React.FC<EventLogProps> = ({ events }) => {
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch(type) {
      case 'status_change': return '🔄';
      case 'contamination': return '🦠';
      case 'alert': return '⚠️';
      case 'system': return '⚙️';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Event Log</h2>
        <div className="flex items-center text-sm text-slate-500">
          <Clock size={14} className="mr-1" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-500">
          Showing {events.length} events
        </div>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
          <Filter size={14} className="mr-1" />
          Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Time</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Event</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Severity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {formatTimestamp(event.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <span className="mr-2">{getEventTypeIcon(event.type)}</span>
                    {event.message}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">
                  No events to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventLog;