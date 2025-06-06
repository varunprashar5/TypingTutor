import React from 'react';

interface GameStatsHeaderProps {
  score: number;
  lives: number;
  currentLevel: number;
}

export const GameStatsHeader: React.FC<GameStatsHeaderProps> = ({
  score,
  lives,
  currentLevel
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Score</p>
            <p className="text-2xl font-bold text-gray-900 transition-all duration-300" style={{ animation: score > 0 ? 'scoreCountUp 0.3s ease-out' : 'none' }}>
              {score.toLocaleString()}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lives Card */}
      <div className={`bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border transition-all duration-300 hover:shadow-xl ${
        lives <= 1 
          ? 'border-red-300/50 animate-pulse' 
          : lives <= 2 
          ? 'border-orange-300/50' 
          : 'border-white/30'
      }`} 
      style={{ 
        animation: lives <= 1 ? 'dangerShake 0.5s ease-in-out infinite, dangerFlash 1s ease-in-out infinite' : 'none' 
      }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Lives</p>
            <div className="flex items-center space-x-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 transition-all duration-300 ${
                    i < lives 
                      ? lives <= 1 
                        ? 'text-red-600 drop-shadow-sm' 
                        : lives <= 2 
                        ? 'text-orange-500 drop-shadow-sm' 
                        : 'text-red-500 drop-shadow-sm'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ))}
            </div>
          </div>
          <div className={`w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ${
            lives <= 1 
              ? 'from-red-600 to-red-700' 
              : lives <= 2 
              ? 'from-orange-500 to-red-600' 
              : 'from-red-500 to-pink-600'
          }`}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Level</p>
            <p className="text-2xl font-bold text-gray-900 transition-all duration-300">
              {currentLevel}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Selected Level
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}; 