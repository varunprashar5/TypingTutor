import React, { useEffect } from 'react';
import { useSessionSaver } from '../../../hooks/common/useSessionSaver';
import type { SessionDTO } from '../../../types/api';

interface GameOverScreenProps {
  score: number;
  currentLevel: number;
  highScore: number;
  onStartGame: () => void;
  onMainMenu: () => void;
  successfulHits?: number;
  totalLetters?: number;
  gameDuration?: number;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  currentLevel,
  highScore,
  onStartGame,
  onMainMenu,
  successfulHits = 0,
  totalLetters = 0,
  gameDuration = 0
}) => {
  const { saveSession } = useSessionSaver();
  const isNewRecord = score === highScore && score > 0;

  useEffect(() => {
    // Save the game session when component mounts
    if (score > 0 && totalLetters > 0) {
      const accuracy = totalLetters > 0 ? Math.round((successfulHits / totalLetters) * 100) : 0;
      const wpm = gameDuration > 0 ? Math.round((successfulHits / gameDuration) * 60) : 0;
      
      const sessionData: SessionDTO = {
        text: `Game Mode - Level ${currentLevel}`, // Descriptive text for game mode
        userInput: `Score: ${score}, Letters hit: ${successfulHits}/${totalLetters}`,
        wpm: wpm,
        accuracy: accuracy,
        duration: gameDuration,
        totalCharacters: totalLetters,
        correctCharacters: successfulHits,
        incorrectCharacters: totalLetters - successfulHits,
        sessionType: 'game',
        difficulty: currentLevel <= 3 ? 'beginner' : currentLevel <= 6 ? 'intermediate' : currentLevel <= 9 ? 'advanced' : 'expert',
      };
      
      saveSession(sessionData);
    }
  }, [score, currentLevel, successfulHits, totalLetters, gameDuration, saveSession]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Game Over</h2>
      
      {/* Score Display */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Final Score</p>
            <p className="text-2xl font-bold text-gray-900">{score.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Level Reached</p>
            <p className="text-2xl font-bold text-gray-900">{currentLevel}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">High Score</p>
            <p className="text-2xl font-bold text-yellow-600">{highScore.toLocaleString()}</p>
            {isNewRecord && (
              <p className="text-xs text-yellow-600 font-medium mt-1">New Record! 🎉</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onStartGame}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
        <button
          onClick={onMainMenu}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}; 