import React from 'react';
import { Trophy, Medal, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { LeaderboardResponse, LeaderboardCategory, LeaderboardFilters } from '../../types/leaderboard';

interface LeaderboardTableProps {
  leaderboard: LeaderboardResponse;
  filters: LeaderboardFilters;
  onPageChange: (page: number) => void;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaderboard, filters, onPageChange }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="text-gray-600 dark:text-gray-400 font-medium">{rank}</span>;
    }
  };

  const getScoreLabel = () => {
    switch (filters.category) {
      case LeaderboardCategory.SPEED:
        return 'WPM';
      case LeaderboardCategory.ACCURACY:
        return 'Accuracy';
      case LeaderboardCategory.ACTIVITY:
        return 'Sessions';
      default:
        return 'Score';
    }
  };

  const formatScore = (score: number) => {
    if (filters.category === LeaderboardCategory.ACCURACY) {
      return `${score}%`;
    }
    return score.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {getScoreLabel()}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Best WPM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Best Accuracy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sessions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboard.entries.map((entry) => (
              <tr
                key={entry.userId}
                className={`${
                  entry.isCurrentUser
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRankIcon(entry.rank)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {entry.username}
                    {entry.isCurrentUser && (
                      <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(You)</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatScore(entry.score)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.bestWpm} WPM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.bestAccuracy}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.sessionCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leaderboard.currentUserEntry && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {getRankIcon(leaderboard.currentUserEntry.rank)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Your Position: {leaderboard.currentUserEntry.username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getScoreLabel()}: {formatScore(leaderboard.currentUserEntry.score)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {leaderboard.entries.length} of {leaderboard.totalUsers} users
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {filters.page} of {leaderboard.totalPages}
          </span>
          <button
            onClick={() => onPageChange(filters.page + 1)}
            disabled={filters.page === leaderboard.totalPages}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable;