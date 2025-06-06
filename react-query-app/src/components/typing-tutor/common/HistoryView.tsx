import React, { useState, useEffect } from 'react';
import { useTypingHistory } from '../../../hooks/common/useTypingHistory';
import { SessionCard } from './SessionCard';
import MetricCard from './MetricCard';
import LoadingSpinner from '../../LoadingSpinner';
import { formatDuration } from '../../../utils/timeUtils';
import type { SessionFilters } from '../../../types/api';

interface HistoryViewProps {
  onBack?: () => void;
}

/**
 * Component for displaying typing session history with filtering and pagination
 */
export const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const {
    sessions,
    stats,
    loading,
    error,
    page,
    totalPages,
    setPage,
    setFilters,
    refetch
  } = useTypingHistory();

  // Responsive design detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter state
  const [localFilters, setLocalFilters] = useState<SessionFilters>({});

  // Apply filters
  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setLocalFilters({});
    setFilters({});
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading && (!sessions || sessions.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" text="Loading your typing history..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="text-red-600 text-lg mb-4">Failed to load typing history</div>
        <button
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Practice
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-900">Typing History</h1>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <MetricCard
            label="Total Sessions"
            value={stats.totalSessions}
            gradientFrom="blue"
            gradientTo="indigo"
          />
          <MetricCard
            label="Average WPM"
            value={Math.round(stats.averageWpm)}
            gradientFrom="green"
            gradientTo="teal"
          />
          <MetricCard
            label="Average Accuracy"
            value={`${Math.round(stats.averageAccuracy)}%`}
            gradientFrom="purple"
            gradientTo="pink"
          />
          <MetricCard
            label="Best WPM"
            value={stats.bestWpm}
            gradientFrom="yellow"
            gradientTo="orange"
          />
          <MetricCard
            label="Total Time"
            value={formatDuration(stats.totalPracticeTime)}
            gradientFrom="red"
            gradientTo="pink"
          />
          <MetricCard
            label="Streak Days"
            value={stats.streakDays}
            gradientFrom="cyan"
            gradientTo="blue"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
              <select
                value={localFilters.sessionType || ''}
                onChange={(e) => {
                  const newFilters = { ...localFilters };
                  if (e.target.value) {
                    newFilters.sessionType = e.target.value as 'practice' | 'game';
                  } else {
                    delete newFilters.sessionType;
                  }
                  setLocalFilters(newFilters);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="practice">Practice</option>
                <option value="game">Game</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={localFilters.difficulty || ''}
                onChange={(e) => {
                  const newFilters = { ...localFilters };
                  if (e.target.value) {
                    newFilters.difficulty = e.target.value;
                  } else {
                    delete newFilters.difficulty;
                  }
                  setLocalFilters(newFilters);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-2 flex gap-2 items-end">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Sessions List/Table */}
        {!sessions || sessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-500 text-lg mb-4">No typing sessions found</div>
            <p className="text-gray-400">Start practicing to see your progress here!</p>
          </div>
        ) : (
          <>
            {isDesktop ? (
              // Desktop table view
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        WPM
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sessions.map((session) => (
                      <SessionCard key={session.id} session={session} isDesktop={true} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Mobile card view
              <div>
                {sessions.map((session) => (
                  <SessionCard key={session.id} session={session} isDesktop={false} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    page === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    page === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};