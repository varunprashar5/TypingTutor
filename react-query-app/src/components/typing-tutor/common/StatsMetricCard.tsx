import React from 'react';

interface StatsMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsMetricCard: React.FC<StatsMetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
}) => {
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
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          {icon && (
            <div className="text-3xl opacity-80">{icon}</div>
          )}
        </div>
        
        {(subtitle || trend) && (
          <div className="flex items-center justify-between">
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="mr-1">
                  {trend.isPositive ? '↑' : '↓'}
                </span>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gray-900 rounded-full blur-3xl" />
      </div>
    </div>
  );
};