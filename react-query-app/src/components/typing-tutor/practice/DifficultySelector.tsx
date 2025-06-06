import React from 'react';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type KeyboardRow = 'home' | 'upper' | 'lower' | 'all';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  keyboardRow: KeyboardRow;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onKeyboardRowChange: (row: KeyboardRow) => void;
  onStart: () => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  keyboardRow,
  onDifficultyChange,
  onKeyboardRowChange,
  onStart,
}) => {
  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'beginner', label: 'Beginner', color: 'from-green-500 to-green-700' },
    { value: 'intermediate', label: 'Intermediate', color: 'from-yellow-500 to-yellow-700' },
    { value: 'advanced', label: 'Advanced', color: 'from-red-500 to-red-700' },
  ];

  const keyboardRows: { value: KeyboardRow; label: string; description: string }[] = [
    { value: 'home', label: 'Home Row', description: 'ASDF JKL;' },
    { value: 'upper', label: 'Upper Row', description: 'QWERT YUIOP' },
    { value: 'lower', label: 'Lower Row', description: 'ZXCVB NM' },
    { value: 'all', label: 'All Rows', description: 'Full Keyboard' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Select Your Practice Level
      </h2>

      {/* Difficulty Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Difficulty Level</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => onDifficultyChange(diff.value)}
              className={`relative p-4 rounded-xl font-semibold transition-all duration-300 ${
                difficulty === diff.value
                  ? `bg-gradient-to-r ${diff.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Row Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Keyboard Row Focus</h3>
        <div className="grid grid-cols-2 gap-4">
          {keyboardRows.map((row) => (
            <button
              key={row.value}
              onClick={() => onKeyboardRowChange(row.value)}
              className={`relative p-4 rounded-xl transition-all duration-300 ${
                keyboardRow === row.value
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="font-semibold">{row.label}</div>
              <div className="text-xs mt-1 opacity-80">{row.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Selected:</span>{' '}
          {difficulties.find(d => d.value === difficulty)?.label} level with{' '}
          {keyboardRows.find(r => r.value === keyboardRow)?.label}
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
      >
        Start Practice Session
      </button>
    </div>
  );
};

export default DifficultySelector;