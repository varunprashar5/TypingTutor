import React from 'react';
import { GameStatsHeader } from './GameStatsHeader';
import { GameStartScreen } from './GameStartScreen';
import { GamePlayArea } from './GamePlayArea';
import { GameOverScreen } from './GameOverScreen';

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

interface GameModeProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver';
  score: number;
  lives: number;
  currentLevel: number;
  selectedKeyboardRow: 'all' | 'upper' | 'middle' | 'lower';
  highScore: number;
  fallingLetters: FallingLetter[];
  burstingLetters: BurstingLetter[];
  isPaused: boolean;
  showSuccessFlash: boolean;
  onStartGame: () => void;
  onPauseToggle: () => void;
  onMainMenu: () => void;
  onLevelChange: (level: number) => void;
  onKeyboardRowChange: (row: 'all' | 'upper' | 'middle' | 'lower') => void;
  successfulHits?: number;
  totalLettersSpawned?: number;
  gameDuration?: number;
}

export const GameMode: React.FC<GameModeProps> = ({
  gameState,
  score,
  lives,
  currentLevel,
  selectedKeyboardRow,
  highScore,
  fallingLetters,
  burstingLetters,
  isPaused,
  showSuccessFlash,
  onStartGame,
  onPauseToggle,
  onMainMenu,
  onLevelChange,
  onKeyboardRowChange,
  successfulHits = 0,
  totalLettersSpawned = 0,
  gameDuration = 0
}) => {
  const renderGameContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <GameStartScreen 
            currentLevel={currentLevel}
            selectedKeyboardRow={selectedKeyboardRow}
            onStartGame={onStartGame} 
            onLevelChange={onLevelChange}
            onKeyboardRowChange={onKeyboardRowChange}
          />
        );
      
      case 'playing':
        return (
          <GamePlayArea
            fallingLetters={fallingLetters}
            burstingLetters={burstingLetters}
            isPaused={isPaused}
            showSuccessFlash={showSuccessFlash}
            onPauseToggle={onPauseToggle}
          />
        );
      
      case 'gameOver':
        return (
          <GameOverScreen
            score={score}
            currentLevel={currentLevel}
            highScore={highScore}
            onStartGame={onStartGame}
            onMainMenu={() => onMainMenu()}
            successfulHits={successfulHits}
            totalLetters={totalLettersSpawned}
            gameDuration={gameDuration}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 h-[calc(100vh-160px)] flex flex-col">
      {/* Game Stats Header */}
      <GameStatsHeader
        score={score}
        lives={lives}
        currentLevel={currentLevel}
      />

      {/* Game Container */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="bg-gradient-to-b from-indigo-900/20 via-blue-800/10 to-purple-900/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 w-full max-w-4xl relative overflow-hidden flex-1 max-h-[calc(100vh-280px)] min-h-[450px]">
          {/* Space background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                               radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                               radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
                               radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                               radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '100px 100px, 150px 150px, 200px 200px, 80px 80px, 120px 120px'
            }}></div>
          </div>
          
          {renderGameContent()}
        </div>
      </div>

      {/* Game Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <span className="bg-white/50 backdrop-blur-sm rounded px-2 py-1">
          Instructions: Type falling letters to score points • Miss letters to lose lives • 
          <kbd className="bg-gray-200 px-1 rounded ml-1">Space</kbd> to pause • Survive as long as possible!
        </span>
      </div>
    </main>
  );
}; 