import { useState, useCallback } from 'react';

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

export const useGameLogic = () => {
  // Game state management
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameOver'>('idle');
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(5);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [selectedKeyboardRow, setSelectedKeyboardRow] = useState<'all' | 'upper' | 'middle' | 'lower'>('all');
  const [fallingLetters, setFallingLetters] = useState<FallingLetter[]>([]);
  const [burstingLetters, setBurstingLetters] = useState<BurstingLetter[]>([]);


  const [successfulHits, setSuccessfulHits] = useState<number>(0);
  const [totalLettersSpawned, setTotalLettersSpawned] = useState<number>(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);
  const [highScore, setHighScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState<boolean>(false);

  // Get speed multiplier for current level
  const getSpeedMultiplier = useCallback((level: number): number => {
    const speedMultipliers = {
      1: 0.25,   // Base speed
      2: 1.2,   // 20% faster
      3: 1.4,   // 40% faster
      4: 1.6,   // 60% faster
      5: 1.8,   // 80% faster
      6: 2.0,   // 100% faster
      7: 2.3,   // 130% faster
      8: 2.6,   // 160% faster
      9: 2.9,   // 190% faster
      10: 3.2   // 220% faster
    };
    return speedMultipliers[level as keyof typeof speedMultipliers] || 3.5; // Cap at 250% for levels > 10
  }, []);

  // Handle game start
  const handleStartGame = useCallback((): void => {
    setGameState('playing');
    setScore(0);
    setLives(5);
    setFallingLetters([]);
    setBurstingLetters([]);
    setSuccessfulHits(0);
    setTotalLettersSpawned(0);
    setGameStartTime(Date.now());
    setGameEndTime(null);
    setIsPaused(false);
    // Note: currentLevel is not reset here - it maintains the user's selection
  }, []);

  // Handle game pause/resume
  const handlePauseToggle = useCallback((): void => {
    if (gameState === 'playing') {
      setIsPaused(prev => !prev);
    }
  }, [gameState]);

  // Handle main menu
  const handleMainMenu = useCallback((): void => {
    setGameState('idle');
  }, []);

  // Update high score when game ends
  const updateHighScore = useCallback((currentScore: number): void => {
    setHighScore(prevHigh => Math.max(prevHigh, currentScore));
  }, []);

  // Calculate game duration in seconds
  const getGameDuration = useCallback((): number => {
    if (gameStartTime && gameEndTime) {
      return Math.round((gameEndTime - gameStartTime) / 1000);
    }
    return 0;
  }, [gameStartTime, gameEndTime]);

  return {
    // State
    gameState,
    score,
    lives,
    currentLevel,
    selectedKeyboardRow,
    fallingLetters,
    burstingLetters,
    successfulHits,
    totalLettersSpawned,
    gameStartTime,
    gameEndTime,
    highScore,
    isPaused,
    showSuccessFlash,
    
    // Actions
    setGameState,
    setScore,
    setLives,
    setCurrentLevel,
    setSelectedKeyboardRow,
    setFallingLetters,
    setBurstingLetters,
    setSuccessfulHits,
    setTotalLettersSpawned,
    setGameEndTime,
    setIsPaused,
    setShowSuccessFlash,
    
    // Handlers
    handleStartGame,
    handlePauseToggle,
    handleMainMenu,
    updateHighScore,
    getSpeedMultiplier,
    getGameDuration
  };
}; 