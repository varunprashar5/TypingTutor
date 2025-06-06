import React from 'react';
import { useStatsData } from '../../../hooks/common/useStatsData';
import { StatsOverview } from './StatsOverview';
import { StatsChart } from './StatsChart';
import LoadingSpinner from '../../LoadingSpinner';
import type { TimeRange } from '../../../types/stats';

export const StatsDashboard: React.FC = () => {
  const { stats, chartData, loading, error, timeRange, setTimeRange } = useStatsData();

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'all', label: 'All time' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold">Failed to load statistics</p>
        </div>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats || !chartData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-gray-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg font-semibold">No statistics available</p>
        </div>
        <p className="text-gray-500">Start practicing to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with time range selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
            Statistics Dashboard
          </h2>
          <p className="text-gray-600 mt-1">Track your typing progress over time</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${timeRange === option.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300'
                }
              `}
              aria-label={`View ${option.label}`}
              aria-pressed={timeRange === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview cards */}
      <StatsOverview stats={stats.overview} />

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WPM Trend Chart */}
        {chartData.wpmChart.labels.length > 0 && (
          <StatsChart
            type="line"
            data={chartData.wpmChart}
            title="WPM Progress"
            height={250}
            className="animate-fade-in-up delay-500"
          />
        )}

        {/* Accuracy Trend Chart */}
        {chartData.accuracyChart.labels.length > 0 && (
          <StatsChart
            type="line"
            data={chartData.accuracyChart}
            title="Accuracy Progress"
            height={250}
            className="animate-fade-in-up delay-600"
          />
        )}
      </div>

      {/* Breakdown section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Type Breakdown */}
        {chartData.sessionTypeChart.labels.length > 0 && (
          <StatsChart
            type="doughnut"
            data={chartData.sessionTypeChart}
            title="Sessions by Type"
            height={250}
            className="animate-fade-in-up delay-700"
          />
        )}

        {/* Difficulty Breakdown */}
        {chartData.difficultyChart.labels.length > 0 && (
          <StatsChart
            type="bar"
            data={chartData.difficultyChart}
            title="Performance by Difficulty"
            height={250}
            className="animate-fade-in-up delay-800"
          />
        )}
      </div>

      {/* Additional insights */}
      <div className="mt-8 p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start">
            <span className="text-2xl mr-3">📈</span>
            <div>
              <p className="text-gray-700">
                Your average typing speed is <span className="text-gray-900 font-semibold">{stats.overview.averageWPM} WPM</span>
              </p>
              <p className="text-gray-600 mt-1">
                {stats.overview.averageWPM >= 60 ? 'Great job! You\'re above average!' : 'Keep practicing to improve your speed!'}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-2xl mr-3">🎯</span>
            <div>
              <p className="text-gray-700">
                Your accuracy rate is <span className="text-gray-900 font-semibold">{stats.overview.averageAccuracy}%</span>
              </p>
              <p className="text-gray-600 mt-1">
                {stats.overview.averageAccuracy >= 95 ? 'Excellent accuracy!' : 'Focus on accuracy before speed for better results'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};