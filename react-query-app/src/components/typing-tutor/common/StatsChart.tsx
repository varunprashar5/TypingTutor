import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatsChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: any;
  options?: ChartOptions<any>;
  title: string;
  height?: number;
  className?: string;
}

export const StatsChart: React.FC<StatsChartProps> = ({
  type,
  data,
  options = {},
  title,
  height = 300,
  className = '',
}) => {
  const chartRef = useRef<any>(null);

  // Default options for each chart type
  const defaultOptions: Record<string, ChartOptions<any>> = {
    line: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 12,
            },
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
    },
    bar: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 12,
            },
          },
        },
      },
    },
    doughnut: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(0, 0, 0, 0.7)',
            padding: 16,
            font: {
              size: 12,
            },
          },
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions[type],
    ...options,
  };

  const ChartComponent = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
  }[type];

  useEffect(() => {
    // Force chart update on mount
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-white/90 to-white/80
        backdrop-blur-sm border border-white/40
        p-6 transition-all duration-300
        hover:shadow-lg hover:border-white/60 shadow-lg
        ${className}
      `}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <ChartComponent
          ref={chartRef}
          data={data}
          options={mergedOptions}
        />
      </div>
    </div>
  );
};