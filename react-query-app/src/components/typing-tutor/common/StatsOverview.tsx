import React from 'react';
import { StatsMetricCard } from './StatsMetricCard';
import { formatDuration } from '../../../utils/timeUtils';
import type { StatsOverview as StatsOverviewType } from '../../../types/stats';

interface StatsOverviewProps {
  stats: StatsOverviewType;
  className?: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, className = '' }) => {

  // Calculate improvement trends (mock data for now, could be calculated from historical data)
  const wpmTrend = stats.averageWPM > 40 ? { value: 12, isPositive: true } : undefined;
  const accuracyTrend = stats.averageAccuracy > 90 ? { value: 5, isPositive: true } : undefined;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <StatsMetricCard
        title="Total Practice Time"
        value={formatDuration(stats.totalTimeSpent)}
        subtitle={`${stats.totalSessions} sessions`}
        icon="⏱️"
        className="animate-fade-in-up delay-100"
      />
      
      <StatsMetricCard
        title="Average WPM"
        value={stats.averageWPM}
        subtitle="Words per minute"
        icon="⚡"
        {...(wpmTrend && { trend: wpmTrend })}
        className="animate-fade-in-up delay-200"
      />
      
      <StatsMetricCard
        title="Best WPM"
        value={stats.bestWPM}
        subtitle="Personal record"
        icon="🏆"
        className="animate-fade-in-up delay-300"
      />
      
      <StatsMetricCard
        title="Accuracy"
        value={`${stats.averageAccuracy}%`}
        subtitle="Average accuracy"
        icon="🎯"
        {...(accuracyTrend && { trend: accuracyTrend })}
        className="animate-fade-in-up delay-400"
      />
    </div>
  );
};