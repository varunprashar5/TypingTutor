import React from 'react';
import type { ProgressBarProps } from '../../../types';

/**
 * ProgressBar component for displaying typing progress
 * @param {Object} props - Component props
 * @param {number} props.completedWords - Number of completed words
 * @param {number} props.totalWords - Total number of words
 * @param {number} props.progressPercentage - Progress percentage
 * @returns {JSX.Element} ProgressBar component
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ completedWords, totalWords, progressPercentage }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/30 ring-1 ring-black/5">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">{completedWords} / {totalWords} words</span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden shadow-inner ring-1 ring-gray-300/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
            style={{ 
              width: `${progressPercentage}%`,
              transition: 'width 0.7s ease-out'
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 