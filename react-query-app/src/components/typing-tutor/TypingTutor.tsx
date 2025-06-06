import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackgroundPattern, Header, HistoryView } from './common';
import { PracticeMode, CompletionModal } from './practice';
import { GameMode, GameStyles } from './game';
import { 
  useAudio, 
  useTimer, 
  useKeyboardTracking, 
  useTypingLogic, 
  useTypingTutorShortcuts,
  useGameLogic,
  useGameAnimation,
  useGameSpawning,
  useGameKeyDetection,
  useBurstingLetters
} from '../../hooks';
import { calculateWPM, calculateAccuracy, calculateProgress } from '../../utils/timeUtils';
import { INPUT_FOCUS_DELAY } from '../../constants';

interface TypingTutorProps {
  gameMode?: 'practice' | 'game' | 'history';
}

/**
 * Main TypingTutor component that orchestrates the typing test functionality
 */
const TypingTutor: React.FC<TypingTutorProps> = ({ 
  gameMode: externalGameMode
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Game mode state - use external props if provided, otherwise internal state
  const [internalGameMode] = useState<'practice' | 'game' | 'history'>('practice');
  const gameMode = externalGameMode ?? internalGameMode;
  const [currentDifficulty, setCurrentDifficulty] = useState<string>('beginner');
  const [isPracticeSessionStarted, setIsPracticeSessionStarted] = useState<boolean>(false);

  // Custom hooks for different concerns
  const { playTypingSound, playErrorSound, playBurstSound, playGameOverSound } = useAudio();
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();
  const { pressedKeys, resetPressedKeys } = useKeyboardTracking();
  const {
    sampleText,
    sampleTextId,
    words,
    totalWords,
    currentWordIndex,
    userInput,
    setUserInput,
    setSampleText,
    completedWords,
    errorWords,
    totalKeyPresses,
    correctKeyPresses,
    isCompleted,
    finalStats,
    processKeyPress,
    validateCurrentInput,
    completeWord,
    resetTypingState
  } = useTypingLogic();

  // Game logic hook
  const {
    gameState,
    score,
    lives,
    currentLevel,
    selectedKeyboardRow,
    fallingLetters,
    burstingLetters,
    successfulHits,
    totalLettersSpawned,
    highScore,
    isPaused,
    showSuccessFlash,
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
    setShowSuccessFlash,
    handleStartGame,
    handlePauseToggle,
    handleMainMenu,
    updateHighScore,
    getSpeedMultiplier,
    getGameDuration
  } = useGameLogic();

  // Game animation hook
  useGameAnimation({
    gameState,
    isPaused,
    setFallingLetters,
    setLives,
    setGameState,
    playErrorSound,
    playGameOverSound
  });

  // Game spawning hook
  useGameSpawning({
    gameState,
    isPaused,
    currentLevel,
    selectedKeyboardRow,
    setFallingLetters,
    setTotalLettersSpawned,
    getSpeedMultiplier
  });

  // Game key detection hook
  useGameKeyDetection({
    gameState,
    isPaused,
    setFallingLetters,
    setBurstingLetters,
    setScore,
    setSuccessfulHits,
    setShowSuccessFlash,
    handlePauseToggle,
    playTypingSound,
    playErrorSound,
    playBurstSound
  });

  // Bursting letters cleanup hook
  useBurstingLetters({
    burstingLetters,
    setBurstingLetters
  });

  // Calculate derived stats
  const currentWPM = calculateWPM(completedWords.size, elapsedTime);
  const accuracyPercentage = calculateAccuracy(correctKeyPresses, totalKeyPresses);
  const progressPercentage = calculateProgress(completedWords.size, totalWords);

  // Determine if we should show labels (when there's an active practice session)
  const showStatsLabels = gameMode === 'practice' && isPracticeSessionStarted;

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const previousInput = userInput;
    setUserInput(value);

    // Start timer on first keystroke
    if (previousInput === "" && value.length > 0) {
      startTimer();
    }

    // Process the key press for accuracy tracking
    const isCorrectKey = processKeyPress(value, previousInput);
    
    // Play appropriate sound
    if (value.length > previousInput.length) {
      if (isCorrectKey) {
        playTypingSound();
      } else {
        playErrorSound();
      }
    }

    // Validate current input for error highlighting
    validateCurrentInput(value);

    // Check if word is completed
    if (value.endsWith(' ') && value.trim() === words[currentWordIndex]) {
      completeWord(currentWPM, accuracyPercentage, elapsedTime);
    }
  }, [
    userInput, 
    setUserInput, 
    startTimer, 
    processKeyPress, 
    validateCurrentInput, 
    completeWord, 
    playTypingSound, 
    playErrorSound, 
    words, 
    currentWordIndex,
    currentWPM,
    accuracyPercentage,
    elapsedTime
  ]);

  // Handle restart functionality
  const handleRestart = useCallback((): void => {
    resetTypingState();
    resetTimer();
    resetPressedKeys();
    setIsPracticeSessionStarted(false);
    
    // Refocus the input field using ref
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, INPUT_FOCUS_DELAY);
  }, [resetTypingState, resetTimer, resetPressedKeys]);

  // Handle focus functionality
  const handleFocus = useCallback((): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Setup keyboard shortcuts
  const shortcutActions = {
    onRestart: handleRestart,
    onFocus: handleFocus,
    ...(gameMode === 'game' && { onPause: handlePauseToggle })
  };
  useTypingTutorShortcuts(shortcutActions, isCompleted);

  // Stop timer when test is completed
  useEffect(() => {
    if (isCompleted) {
      stopTimer();
    }
  }, [isCompleted, stopTimer]);

  // Update high score and set end time when game ends
  useEffect(() => {
    if (gameState === 'gameOver') {
      updateHighScore(score);
      setGameEndTime(Date.now());
    }
  }, [gameState, score, updateHighScore, setGameEndTime]);

  // Handle level change
  const handleLevelChange = useCallback((newLevel: number) => {
    setCurrentLevel(newLevel);
  }, [setCurrentLevel]);

  // Handle keyboard row change
  const handleKeyboardRowChange = useCallback((newRow: 'all' | 'upper' | 'middle' | 'lower') => {
    setSelectedKeyboardRow(newRow);
  }, [setSelectedKeyboardRow]);

  // Handle practice session start
  const handlePracticeSessionStart = useCallback(() => {
    setIsPracticeSessionStarted(true);
  }, []);

  const renderModeContent = () => {
    if (gameMode === 'history') {
      return <HistoryView />;
    }
    
    if (gameMode === 'practice') {
      return (
        <PracticeMode
          words={words}
          currentWordIndex={currentWordIndex}
          errorWords={errorWords}
          completedWords={completedWords}
          inputRef={inputRef}
          userInput={userInput}
          onInputChange={handleInputChange}
          isCompleted={isCompleted}
          onRestart={handleRestart}
          pressedKeys={pressedKeys}
          onTextChange={setSampleText}
          onDifficultyChange={setCurrentDifficulty}
          onPracticeSessionStart={handlePracticeSessionStart}
        />
      );
    }

    return (
      <GameMode
        gameState={gameState}
        score={score}
        lives={lives}
        currentLevel={currentLevel}
        selectedKeyboardRow={selectedKeyboardRow}
        highScore={highScore}
        fallingLetters={fallingLetters}
        burstingLetters={burstingLetters}
        isPaused={isPaused}
        showSuccessFlash={showSuccessFlash}
        onStartGame={handleStartGame}
        onPauseToggle={handlePauseToggle}
        onMainMenu={handleMainMenu}
        onLevelChange={handleLevelChange}
        onKeyboardRowChange={handleKeyboardRowChange}
        successfulHits={successfulHits}
        totalLettersSpawned={totalLettersSpawned}
        gameDuration={getGameDuration()}
      />
    );
  };

  return (
    <div className={`${gameMode === 'history' ? 'min-h-full' : 'h-screen'} bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 ${gameMode === 'history' ? '' : 'overflow-hidden'}`}>
      <GameStyles />
      <BackgroundPattern />

      {/* Completion Modal - only show in practice mode */}
      {gameMode === 'practice' && (
        <CompletionModal
          isVisible={isCompleted}
          finalStats={finalStats}
          onRestart={handleRestart}
          sampleText={sampleText}
          sampleTextId={sampleTextId}
          userInput={words.slice(0, currentWordIndex).join(' ')}
          difficulty={currentDifficulty}
        />
      )}



      {/* Stats Header - Only visible for practice mode */}
      {gameMode === 'practice' && (
        <Header
          currentWPM={currentWPM}
          accuracyPercentage={accuracyPercentage}
          elapsedTime={elapsedTime}
          completedWords={completedWords.size}
          totalWords={totalWords}
          progressPercentage={progressPercentage}
          showLabels={showStatsLabels}
        />
      )}

      {/* Mode content with appropriate container */}
      {gameMode === 'history' ? (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {renderModeContent()}
        </div>
      ) : (
        renderModeContent()
      )}
    </div>
  );
};

export default TypingTutor; 