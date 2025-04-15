import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PotholeStatsProps {
  detections: Array<{ timestamp: string }>;
}

export function PotholeStats({ detections }: PotholeStatsProps) {
  const [timeRange, setTimeRange] = useState<'10min' | '1hour' | '10hours'>('1hour');

  // Filter detections based on selected time range
  const filteredDetections = detections.filter(detection => {
    const detectionTime = new Date(detection.timestamp).getTime();
    const now = Date.now();
    const ranges = {
      '10min': 10 * 60 * 1000,
      '1hour': 60 * 60 * 1000,
      '10hours': 10 * 60 * 60 * 1000
    };
    return detectionTime > now - ranges[timeRange];
  });

  // Group detections by intervals
  const intervals = filteredDetections.reduce((acc, detection) => {
    const date = new Date(detection.timestamp);
    const intervalSize = {
      '10min': 1,  // 1-minute intervals
      '1hour': 5,  // 5-minute intervals
      '10hours': 30 // 30-minute intervals
    }[timeRange];
    
    const interval = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      Math.floor(date.getMinutes() / intervalSize) * intervalSize
    ).toISOString();
    
    acc[interval] = (acc[interval] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Generate empty intervals for the full time range
  const now = new Date();
  const emptyIntervals: Record<string, number> = {};
  const intervalSize = {
    '10min': 1,
    '1hour': 5,
    '10hours': 30
  }[timeRange];
  
  const totalMinutes = {
    '10min': 10,
    '1hour': 60,
    '10hours': 600
  }[timeRange];

  for (let i = 0; i < totalMinutes; i += intervalSize) {
    const time = new Date(now.getTime() - (totalMinutes - i) * 60 * 1000);
    const interval = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      time.getHours(),
      Math.floor(time.getMinutes() / intervalSize) * intervalSize
    ).toISOString();
    emptyIntervals[interval] = intervals[interval] || 0;
  }

  const data = {
    labels: Object.keys(emptyIntervals).map(interval => {
      const date = new Date(interval);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [
      {
        label: 'Detections',
        data: Object.values(emptyIntervals),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Pothole Detections (Last ${
          timeRange === '10min' ? '10 Minutes' :
          timeRange === '1hour' ? 'Hour' :
          '10 Hours'
        })`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="mb-4 flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as '10min' | '1hour' | '10hours')}
          className="px-3 py-1 rounded border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="10min">Last 10 Minutes</option>
          <option value="1hour">Last Hour</option>
          <option value="10hours">Last 10 Hours</option>
        </select>
      </div>
      <Bar data={data} options={options} height={200} />
    </div>
  );
}
