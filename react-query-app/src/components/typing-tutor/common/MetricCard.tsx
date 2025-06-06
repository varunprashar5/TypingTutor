import React from 'react';
import type { MetricCardProps } from '../../../types';

/**
 * MetricCard component for displaying individual metrics
 * @param {Object} props - Component props
 * @param {string} props.label - The metric label
 * @param {string|number} props.value - The metric value
 * @param {string} props.gradientFrom - Starting color for gradient
 * @param {string} props.gradientTo - Ending color for gradient
 * @returns {JSX.Element} MetricCard component
 */
const MetricCard: React.FC<MetricCardProps> = ({ label, value, gradientFrom, gradientTo }) => {
  // Define gradient classes explicitly to ensure Tailwind includes them
  const getGradientClass = (from: string, to: string): string => {
    const gradientMap: { [key: string]: string } = {
      'blue-600-blue-800': 'bg-gradient-to-r from-blue-600 to-blue-800',
      'purple-600-purple-800': 'bg-gradient-to-r from-purple-600 to-purple-800',
      'green-600-green-800': 'bg-gradient-to-r from-green-600 to-green-800',
      'red-600-red-800': 'bg-gradient-to-r from-red-600 to-red-800',
      'orange-600-orange-800': 'bg-gradient-to-r from-orange-600 to-orange-800',
      'indigo-600-indigo-800': 'bg-gradient-to-r from-indigo-600 to-indigo-800',
    };
    
    const key = `${from}-${to}`;
    return gradientMap[key] || 'bg-gradient-to-r from-blue-600 to-blue-800';
  };

  // Get background gradient based on metric type
  const getBgGradient = (from: string): string => {
    const bgMap: { [key: string]: string } = {
      'blue-600': 'from-blue-50 to-blue-100',
      'purple-600': 'from-purple-50 to-purple-100',
      'green-600': 'from-green-50 to-green-100',
      'red-600': 'from-red-50 to-red-100',
      'orange-600': 'from-orange-50 to-orange-100',
      'indigo-600': 'from-indigo-50 to-indigo-100',
    };
    
    return bgMap[from] || 'from-blue-50 to-blue-100';
  };

  return (
    <div className={`bg-gradient-to-br ${getBgGradient(gradientFrom)} backdrop-blur-sm rounded-xl shadow-lg border border-white/40 p-4 min-w-[100px] 
                   transition-all duration-300 hover:shadow-xl hover:scale-105 ring-1 ring-black/5 group`}>
      <div className="text-center">
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          {label}
        </div>
        <div className={`text-2xl font-bold ${getGradientClass(gradientFrom, gradientTo)} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 