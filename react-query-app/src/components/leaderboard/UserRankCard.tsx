import React from 'react';
import { Trophy, Zap, Target, Activity } from 'lucide-react';
import { UserRankSummary } from '../../types/leaderboard';

interface UserRankCardProps {
  summary: UserRankSummary;
}

const UserRankCard: React.FC<UserRankCardProps> = ({ summary }) => {
  const categories = [
    {
      key: 'overall' as const,
      label: 'Overall',
      icon: Trophy,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      key: 'speed' as const,
      label: 'Speed',
      icon: Zap,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      key: 'accuracy' as const,
      label: 'Accuracy',
      icon: Target,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      key: 'activity' as const,
      label: 'Activity',
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Your Rankings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const rankData = summary.ranks[category.key];
          const Icon = category.icon;

          return (
            <div
              key={category.key}
              className={`${category.bgColor} rounded-lg p-4 transition-all hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${category.color}`} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Top {rankData.percentile}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {category.label}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                #{rankData.rank || '-'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Score: {rankData.score || 0}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserRankCard;