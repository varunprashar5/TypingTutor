import React, { useState, useEffect } from 'react';
import { TextDisplay, TypingInput, VirtualKeyboard } from '../common';
import DifficultySelector, { Difficulty, KeyboardRow } from './DifficultySelector';
import { useSampleText } from '../../../hooks/practice/useSampleText';
import LoadingSpinner from '../../LoadingSpinner';

interface PracticeModeProps {
  words: string[];
  currentWordIndex: number;
  errorWords: Set<number>;
  completedWords: Set<number>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompleted: boolean;
  onRestart: () => void;
  pressedKeys: Set<string>;
  onTextChange: (text: string, id: string) => void;
  onDifficultyChange?: (difficulty: string) => void;
  onPracticeSessionStart?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  words,
  currentWordIndex,
  errorWords,
  completedWords,
  inputRef,
  userInput,
  onInputChange,
  isCompleted,
  onRestart,
  pressedKeys,
  onTextChange,
  onDifficultyChange,
  onPracticeSessionStart,
}) => {
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('beginner');
  const [selectedKeyboardRow, setSelectedKeyboardRow] = useState<KeyboardRow>('all');
  
  const { sampleText, isLoading, error, fetchSampleText } = useSampleText();

  // Handle starting a new practice session
  const handleStartPractice = async () => {
    await fetchSampleText(selectedDifficulty, selectedKeyboardRow);
  };

  // When sample text is fetched, update the parent component
  useEffect(() => {
    if (sampleText) {
      onTextChange(sampleText.content, sampleText.id);
      if (onDifficultyChange) {
        onDifficultyChange(selectedDifficulty);
      }
      if (onPracticeSessionStart) {
        onPracticeSessionStart();
      }
      setShowDifficultySelector(false);
      // Focus input after a short delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [sampleText, onTextChange, inputRef, onDifficultyChange, selectedDifficulty, onPracticeSessionStart]);

  // Modified restart handler
  const handleRestartWithNewText = () => {
    setShowDifficultySelector(true);
    onRestart();
  };

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={() => setShowDifficultySelector(true)}
            className="ml-4 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show difficulty selector if needed
  if (showDifficultySelector) {
    return (
      <main className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <DifficultySelector
          difficulty={selectedDifficulty}
          keyboardRow={selectedKeyboardRow}
          onDifficultyChange={setSelectedDifficulty}
          onKeyboardRowChange={setSelectedKeyboardRow}
          onStart={handleStartPractice}
        />
      </main>
    );
  }

  return (
    <main className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-200px)] flex flex-col">
      {/* Sample Text Info */}
      {sampleText && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{sampleText.title}</span> • 
            <span className="ml-2 capitalize">{sampleText.difficulty}</span> • 
            <span className="ml-2">{sampleText.wordCount} words</span>
          </p>
        </div>
      )}

      {/* Text Display */}
      <TextDisplay
        words={words}
        currentWordIndex={currentWordIndex}
        completedWords={completedWords}
        errorWords={errorWords}
      />

      {/* Input Field */}
      <TypingInput
        ref={inputRef}
        userInput={userInput}
        onInputChange={onInputChange}
        isCompleted={isCompleted}
        onRestart={onRestart}
      />

      {/* Virtual Keyboard */}
      <VirtualKeyboard
        pressedKeys={pressedKeys}
      />

      {/* Keyboard Shortcuts Help */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        <span className="bg-white/50 backdrop-blur-sm rounded px-2 py-1">
          Shortcuts: <kbd className="bg-gray-200 px-1 rounded">Ctrl+R</kbd> Restart, 
          <kbd className="bg-gray-200 px-1 rounded ml-1">F1</kbd> Focus, 
          {isCompleted && (
            <span>
              <kbd className="bg-gray-200 px-1 rounded ml-1">Space</kbd> or 
              <kbd className="bg-gray-200 px-1 rounded ml-1">Enter</kbd> Restart
            </span>
          )}
        </span>
        {!isCompleted && (
          <button
            onClick={handleRestartWithNewText}
            className="ml-4 text-blue-600 hover:text-blue-800 underline"
          >
            Change Difficulty
          </button>
        )}
      </div>
    </main>
  );
}; 