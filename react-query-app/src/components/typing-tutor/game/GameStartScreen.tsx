import React from 'react';

interface GameStartScreenProps {
  currentLevel: number;
  selectedKeyboardRow: 'all' | 'upper' | 'middle' | 'lower';
  onStartGame: () => void;
  onLevelChange: (level: number) => void;
  onKeyboardRowChange: (row: 'all' | 'upper' | 'middle' | 'lower') => void;
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({ 
  currentLevel,
  selectedKeyboardRow,
  onStartGame, 
  onLevelChange,
  onKeyboardRowChange
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center overflow-y-auto">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          <path d="M19 15L20.5 18.5L24 20L20.5 21.5L19 25L17.5 21.5L14 20L17.5 18.5L19 15Z" />
          <path d="M5 9L6 12L9 13L6 14L5 17L4 14L1 13L4 12L5 9Z" />
        </svg>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Typing Defense</h2>
      <p className="text-gray-600 mb-6 max-w-md text-sm sm:text-base">
        Type the falling letters before they reach the bottom! 
        Each correct letter increases your score, but missing them costs lives.
      </p>
      
      {/* Game Settings */}
      <div className="mb-6 space-y-4">
        {/* Level Selection */}
        <div className="relative z-10">
          <label htmlFor="level-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Starting Level (Current: {currentLevel})
          </label>
          <select
            id="level-select"
            key={`level-select-${currentLevel}`}
            value={currentLevel.toString()}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newLevel = Number(e.target.value);
              if (!isNaN(newLevel) && newLevel >= 1 && newLevel <= 10) {
                onLevelChange(newLevel);
              }
            }}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm cursor-pointer relative z-20 w-full max-w-xs text-sm sm:text-base"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(level => (
              <option key={level} value={level.toString()}>
                Level {level} {level === 1 ? '(Slowest)' : level === 10 ? '(Fastest)' : ''}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Higher levels have faster falling letters and shorter spawn intervals
          </p>
        </div>

        {/* Keyboard Row Selection */}
        <div className="relative z-10">
          <label htmlFor="keyboard-row-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Keyboard Row (Current: {selectedKeyboardRow === 'all' ? 'All Rows' : 
              selectedKeyboardRow === 'upper' ? 'Upper Row (QWERTY...)' :
              selectedKeyboardRow === 'middle' ? 'Middle Row (ASDF...)' : 'Lower Row (ZXCV...)'})
          </label>
          <select
            id="keyboard-row-select"
            key={`keyboard-row-select-${selectedKeyboardRow}`}
            value={selectedKeyboardRow}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newRow = e.target.value as 'all' | 'upper' | 'middle' | 'lower';
              onKeyboardRowChange(newRow);
            }}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm cursor-pointer relative z-20 w-full max-w-xs text-sm sm:text-base"
          >
            <option value="all">All Rows (A-Z)</option>
            <option value="upper">Upper Row (QWERTYUIOP)</option>
            <option value="middle">Middle Row (ASDFGHJKL)</option>
            <option value="lower">Lower Row (ZXCVBNM)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Practice specific keyboard rows to improve finger positioning
          </p>
        </div>
      </div>
      
      <button
        onClick={onStartGame}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
        aria-label="Start the typing defense game"
      >
        🎮 Start Game
      </button>
    </div>
  );
}; 