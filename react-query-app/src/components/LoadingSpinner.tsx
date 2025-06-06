import React from 'react';
import type { LoadingSpinnerProps } from '../types';

/**
 * Loading Spinner component for showing loading states
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue', 
  text = '',
  overlay = false 
}) => {
  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const getColorClasses = (): string => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'red': return 'border-red-500';
      case 'purple': return 'border-purple-500';
      default: return 'border-blue-500';
    }
  };

  const getTextSizeClasses = (): string => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div
        className={`${getSizeClasses()} border-4 border-gray-200 ${getColorClasses()} border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
      {text && (
        <p className={`mt-2 ${getTextSizeClasses()} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 