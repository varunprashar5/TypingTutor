import React from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import LeaderboardTable from './LeaderboardTable';
import LeaderboardFilters from './LeaderboardFilters';
import UserRankCard from './UserRankCard';
import LoadingSpinner from '../LoadingSpinner';
import { RefreshCw, Trophy, Users, TrendingUp, Award } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { leaderboard, userSummary, filters, loading, error, updateFilters, refresh } = useLeaderboard();
  // Force reload - enhanced header should be visible

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        {/* Main Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 mb-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">🏆 Leaderboard</h1>
                <p className="text-blue-100 text-lg">
                  Compete with other typists and track your progress across different time periods
                </p>
              </div>
            </div>
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 text-white font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-200" />
                <div>
                  <p className="text-blue-100 text-sm">Total Players</p>
                  <p className="text-2xl font-bold">{leaderboard?.totalUsers || '---'}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-green-200" />
                <div>
                  <p className="text-blue-100 text-sm">Active Period</p>
                  <p className="text-2xl font-bold capitalize">{filters.period}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-yellow-200" />
                <div>
                  <p className="text-blue-100 text-sm">Category</p>
                  <p className="text-2xl font-bold capitalize">{filters.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userSummary && (
        <div className="mb-8">
          <UserRankCard summary={userSummary} />
        </div>
      )}

      <div className="mb-6">
        <LeaderboardFilters
          filters={filters}
          onFilterChange={updateFilters}
        />
      </div>

      {loading && !leaderboard ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : leaderboard ? (
        <LeaderboardTable
          leaderboard={leaderboard}
          filters={filters}
          onPageChange={(page) => updateFilters({ page })}
        />
      ) : null}
    </div>
  );
};

export default Leaderboard;