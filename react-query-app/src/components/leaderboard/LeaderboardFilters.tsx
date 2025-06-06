import React from 'react';
import { Search } from 'lucide-react';
import { LeaderboardPeriod, LeaderboardCategory, LeaderboardFilters as Filters } from '../../types/leaderboard';

interface LeaderboardFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
}

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({ filters, onFilterChange }) => {
  const periods = [
    { value: LeaderboardPeriod.DAILY, label: 'Daily' },
    { value: LeaderboardPeriod.WEEKLY, label: 'Weekly' },
    { value: LeaderboardPeriod.MONTHLY, label: 'Monthly' },
    { value: LeaderboardPeriod.ALL_TIME, label: 'All Time' },
  ];

  const categories = [
    { value: LeaderboardCategory.OVERALL, label: 'Overall' },
    { value: LeaderboardCategory.SPEED, label: 'Speed' },
    { value: LeaderboardCategory.ACCURACY, label: 'Accuracy' },
    { value: LeaderboardCategory.ACTIVITY, label: 'Activity' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Period
          </label>
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => onFilterChange({ period: period.value })}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  filters.period === period.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onFilterChange({ category: category.value })}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  filters.category === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search User
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search username..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardFilters;