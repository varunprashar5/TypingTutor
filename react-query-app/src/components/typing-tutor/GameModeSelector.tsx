import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface GameModeSelectorProps {
  gameMode: 'practice' | 'game' | 'history';
  onModeChange: (mode: 'practice' | 'game' | 'history') => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  gameMode,
  onModeChange,
  isMuted,
  onToggleMute
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-xl border-b border-white/30 ring-1 ring-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* App Title Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/tutor.png" 
                alt="Typing Tutor" 
                className="w-6 h-6 object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
                Typing Tutor
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">Improve your typing speed and accuracy</p>
            </div>
          </div>

          {/* Center - Mode Selector and Controls */}
          <div className="flex items-center gap-4">
            {/* Mode Toggle */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 shadow-xl border border-white/30 ring-1 ring-black/5">
              <div className="flex relative">
                <button
                  onClick={() => onModeChange('practice')}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                    gameMode === 'practice'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Practice Mode
                  </span>
                </button>
                <button
                  onClick={() => onModeChange('game')}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                    gameMode === 'game'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Game Mode
                  </span>
                </button>
                <button
                  onClick={() => onModeChange('history')}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
                    gameMode === 'history'
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25 transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    History
                  </span>
                </button>
              </div>
            </div>
            
            {/* Audio Control */}
            <button
              onClick={onToggleMute}
              className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 ring-1 ring-black/5 group"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>

          {/* Right - User Info and Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/30">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-white bg-white/60 hover:bg-red-500 border border-gray-300 hover:border-red-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 