import React from 'react';

interface FallingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  speed: number;
}

interface BurstingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  timestamp: number;
}

interface GamePlayAreaProps {
  fallingLetters: FallingLetter[];
  burstingLetters: BurstingLetter[];
  isPaused: boolean;
  showSuccessFlash: boolean;
  onPauseToggle: () => void;
}

export const GamePlayArea: React.FC<GamePlayAreaProps> = ({
  fallingLetters,
  burstingLetters,
  isPaused,
  showSuccessFlash,
  onPauseToggle
}) => {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Detection Zone Indicator (subtle) */}
      <div 
        className={`absolute left-0 right-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none transition-all duration-300 ${
          showSuccessFlash ? 'animate-pulse' : ''
        }`}
        style={{
          top: '5%',
          height: '90%',
          borderTop: '1px dashed rgba(34, 197, 94, 0.2)',
          borderBottom: '1px dashed rgba(34, 197, 94, 0.2)',
          animation: showSuccessFlash ? 'successFlash 300ms ease-out' : 'none'
        }}
      />
      
      {/* Falling Letters */}
      {fallingLetters.map(letter => (
        <div
          key={letter.id}
          className="absolute bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-sm border border-blue-200/40 rounded-lg shadow-xl flex items-center justify-center text-xl font-bold text-gray-800 transition-transform duration-200 hover:scale-105"
          style={{
            left: `${letter.x}px`,
            top: `${letter.y}px`,
            width: '40px',
            height: '40px',
            transform: 'translateZ(0)', // Hardware acceleration
            willChange: 'top', // Optimize for animation
            animation: 'letterFloat 2s ease-in-out infinite',
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 10, // Ensure letters are visible
          }}
        >
          {letter.character}
        </div>
      ))}

      {/* Bursting Letters */}
      {burstingLetters.map(letter => (
        <div
          key={letter.id}
          className="absolute bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 border-2 border-green-300/60 rounded-lg shadow-2xl flex items-center justify-center text-xl font-bold text-white"
          style={{
            left: `${letter.x}px`,
            top: `${letter.y}px`,
            width: '40px',
            height: '40px',
            transform: 'translateZ(0)', // Hardware acceleration
            animation: 'burst 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 8px 25px rgba(34, 197, 94, 0.3)',
          }}
        >
          {letter.character}
        </div>
      ))}



      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Game Paused</h3>
            <p className="text-gray-600 mb-6">Press <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Space</kbd> to resume</p>
            <button
              onClick={onPauseToggle}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}
      
      {/* Game Instructions Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-white/90 to-blue-50/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/30">
          <p className="text-sm text-gray-700 text-center font-medium">
            Type the letters before they reach the bottom!
          </p>
        </div>
      </div>
    </div>
  );
}; 