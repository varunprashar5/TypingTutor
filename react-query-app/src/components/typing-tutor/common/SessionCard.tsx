import React, { useState } from 'react';
import { formatTime } from '../../../utils/timeUtils';
import type { TypingSession } from '../../../types/api';

interface SessionCardProps {
  session: TypingSession;
  isDesktop?: boolean;
}

/**
 * Component for displaying individual typing session information
 * Expandable to show full text practiced
 */
export const SessionCard: React.FC<SessionCardProps> = ({ session, isDesktop = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format date
  const sessionDate = new Date(session.createdAt);
  const formattedDate = sessionDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = sessionDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Performance color coding
  const getWpmColor = (wpm: number) => {
    if (wpm >= 60) return 'text-green-600';
    if (wpm >= 40) return 'text-blue-600';
    if (wpm >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-600';
    if (accuracy >= 85) return 'text-blue-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Difficulty badge colors
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-blue-100 text-blue-800',
    advanced: 'bg-purple-100 text-purple-800',
    expert: 'bg-red-100 text-red-800',
  };

  // Session type icons
  const sessionTypeIcon = session.sessionType === 'practice' ? '📝' : '🎮';

  if (isDesktop) {
    // Desktop table row view
    return (
      <>
        <tr className="hover:bg-gray-50 transition-colors duration-150">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex items-center">
              <span className="mr-2">{sessionTypeIcon}</span>
              <div>
                <div className="font-medium">{formattedDate}</div>
                <div className="text-gray-500 text-xs">{formattedTime}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[session.difficulty]}`}>
              {session.difficulty}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className={`font-semibold ${getWpmColor(session.wpm)}`}>{session.wpm} WPM</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className={`font-semibold ${getAccuracyColor(session.accuracy)}`}>{session.accuracy}%</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {formatTime(session.duration)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-900 font-medium"
            >
              {isExpanded ? 'Hide' : 'Details'}
            </button>
          </td>
        </tr>
        {isExpanded && (
          <tr>
            <td colSpan={6} className="px-6 py-4 bg-gray-50">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Text Practiced:</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">
                  {session.text}
                </p>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 mt-2">
                  <div>Total Characters: {session.totalCharacters}</div>
                  <div>Correct: {session.correctCharacters}</div>
                  <div>Incorrect: {session.incorrectCharacters}</div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  }

  // Mobile card view
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{sessionTypeIcon}</span>
          <div>
            <div className="font-medium text-gray-900">{formattedDate}</div>
            <div className="text-sm text-gray-500">{formattedTime}</div>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[session.difficulty]}`}>
          {session.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className={`text-lg font-semibold ${getWpmColor(session.wpm)}`}>{session.wpm}</div>
          <div className="text-xs text-gray-500">WPM</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${getAccuracyColor(session.accuracy)}`}>{session.accuracy}%</div>
          <div className="text-xs text-gray-500">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{formatTime(session.duration)}</div>
          <div className="text-xs text-gray-500">Duration</div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center text-sm text-indigo-600 hover:text-indigo-900 font-medium"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Text Practiced:</p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded">
            {session.text}
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-3">
            <div>Total: {session.totalCharacters}</div>
            <div>Correct: {session.correctCharacters}</div>
            <div>Errors: {session.incorrectCharacters}</div>
          </div>
        </div>
      )}
    </div>
  );
};