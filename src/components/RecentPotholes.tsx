import { useEffect, useState } from 'react';

interface Pothole {
  timestamp: string;
  latitude: number;
  longitude: number;
}

interface RecentPotholesProps {
  potholes: Pothole[];
}

export function RecentPotholes({ potholes }: RecentPotholesProps) {
  const [notifications, setNotifications] = useState<Pothole[]>([]);

  // Add new potholes to notifications when they appear
  useEffect(() => {
    if (potholes.length === 0) return;
    
    const latestPothole = potholes[0];
    const timestamp = new Date(latestPothole.timestamp).getTime();
    const now = Date.now();
    
    // Only show notifications for potholes detected in the last minute
    if (now - timestamp < 60000) {
      setNotifications(prev => [latestPothole, ...prev].slice(0, 5));
    }
  }, [potholes]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((pothole, index) => (
        <div
          key={pothole.timestamp}
          className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-sm animate-slide-in"
          style={{
            animation: `slide-in 0.3s ease-out ${index * 0.1}s both`,
          }}
        >
          <h4 className="font-semibold text-sm">New Pothole Detected!</h4>
          <p className="text-sm text-gray-600">
            Location: {pothole.latitude.toFixed(4)}, {pothole.longitude.toFixed(4)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(pothole.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}
