import React from 'react';
import MetricCard from './MetricCard';
import ProgressBar from './ProgressBar';
import { formatTime } from '../../../utils/timeUtils';
import type { HeaderProps } from '../../../types';

/**
 * Stats header component that shows typing metrics
 * Labels are only shown when there's an active practice session
 */
const Header: React.FC<HeaderProps & { showLabels?: boolean }> = ({
  currentWPM,
  accuracyPercentage,
  elapsedTime,
  completedWords,
  totalWords,
  progressPercentage,
  showLabels = false
}) => {
  // Only render the header when there's an active practice session
  if (!showLabels) {
    return null;
  }

  return (
    <header className="relative bg-white/90 backdrop-blur-md shadow-lg border-b border-white/30 ring-1 ring-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Metrics Section - Only visible during active session */}
        <div className="flex flex-wrap gap-3 justify-center">
          <MetricCard 
            label="WPM" 
            value={currentWPM} 
            gradientFrom="blue-600" 
            gradientTo="blue-800" 
          />
          <MetricCard 
            label="Accuracy" 
            value={`${accuracyPercentage}%`} 
            gradientFrom="purple-600" 
            gradientTo="purple-800" 
          />
          <MetricCard 
            label="Time" 
            value={formatTime(elapsedTime)} 
            gradientFrom="green-600" 
            gradientTo="green-800" 
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <ProgressBar 
            completedWords={completedWords}
            totalWords={totalWords}
            progressPercentage={progressPercentage}
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 