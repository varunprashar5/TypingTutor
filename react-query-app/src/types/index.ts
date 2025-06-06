// Core typing tutor types

export interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  totalWords: number;
  correctKeyPresses: number;
  totalKeyPresses: number;
}

export interface TypingState {
  sampleText: string;
  sampleTextId: string | null;
  currentWordIndex: number;
  userInput: string;
  completedWords: Set<number>;
  errorWords: Set<number>;
  totalKeyPresses: number;
  correctKeyPresses: number;
  isCompleted: boolean;
  finalStats: TypingStats | null;
}

// Action types for useReducer
export enum TypingActionType {
  SET_USER_INPUT = 'SET_USER_INPUT',
  SET_SAMPLE_TEXT = 'SET_SAMPLE_TEXT',
  PROCESS_KEY_PRESS = 'PROCESS_KEY_PRESS',
  VALIDATE_INPUT = 'VALIDATE_INPUT',
  COMPLETE_WORD = 'COMPLETE_WORD',
  RESET_STATE = 'RESET_STATE',
}

export interface TypingAction {
  type: TypingActionType;
  payload?: any;
}

export interface ProcessKeyPressPayload {
  isCorrect: boolean;
}

export interface CompleteWordPayload {
  finalStats: TypingStats;
}

export interface SetSampleTextPayload {
  text: string;
  id: string;
}

// Component prop types
export interface HeaderProps {
  currentWPM: number;
  accuracyPercentage: number;
  elapsedTime: number;
  completedWords: number;
  totalWords: number;
  progressPercentage: number;
}

export interface TextDisplayProps {
  words: string[];
  currentWordIndex: number;
  completedWords: Set<number>;
  errorWords: Set<number>;
}

export interface WordProps {
  word: string;
  index: number;
  isCompleted: boolean;
  hasError: boolean;
  isCurrent: boolean;
}

export interface TypingInputProps {
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompleted: boolean;
  onRestart: () => void;
}

export interface VirtualKeyboardProps {
  pressedKeys: Set<string>;
}

export interface CompletionModalProps {
  isVisible: boolean;
  finalStats: TypingStats | null;
  onRestart: () => void;
  sampleText?: string;
  sampleTextId?: string | null;
  userInput?: string;
  difficulty?: string;
}

export interface MetricCardProps {
  label: string;
  value: string | number;
  gradientFrom: string;
  gradientTo: string;
}

export interface ProgressBarProps {
  completedWords: number;
  totalWords: number;
  progressPercentage: number;
}

// Hook types
export interface UseAudioReturn {
  audioContext: AudioContext | null;
  isAudioSupported: boolean;
  playTypingSound: () => void;
  playErrorSound: () => void;
  playBurstSound: () => void;
  playLevelUpSound: () => void;
  playGameOverSound: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export interface UseTimerReturn {
  elapsedTime: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export interface UseKeyboardTrackingReturn {
  pressedKeys: Set<string>;
  resetPressedKeys: () => void;
}

export interface UseTypingLogicReturn {
  sampleText: string;
  sampleTextId: string | null;
  words: string[];
  totalWords: number;
  currentWordIndex: number;
  userInput: string;
  setUserInput: (value: string) => void;
  setSampleText: (text: string, id: string) => void;
  completedWords: Set<number>;
  errorWords: Set<number>;
  totalKeyPresses: number;
  correctKeyPresses: number;
  isCompleted: boolean;
  finalStats: TypingStats | null;
  processKeyPress: (inputValue: string, previousInput: string) => boolean;
  validateCurrentInput: (inputValue: string) => void;
  completeWord: (currentWPM: number, accuracyPercentage: number, elapsedTime: number) => void;
  resetTypingState: () => void;
}

// Keyboard shortcuts types
export interface KeyboardShortcuts {
  [key: string]: (event?: KeyboardEvent) => void;
}

export interface TypingTutorShortcutActions {
  onRestart: () => void;
  onPause?: () => void;
  onFocus?: () => void;
}

// Loading spinner types
export type LoadingSpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingSpinnerColor = 'blue' | 'green' | 'red' | 'purple';

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  color?: LoadingSpinnerColor;
  text?: string;
  overlay?: boolean;
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onRetry?: () => void;
}

// Audio utility types
export interface SoundFrequencies {
  TYPING: number;
  ERROR: number;
  BURST: number;
  LEVEL_UP: number;
  GAME_OVER: number;
}

export interface AnimationDurations {
  TYPING_SOUND: number;
  ERROR_SOUND: number;
  CONFETTI_FALL: number;
  BURST_SOUND: number;
  LEVEL_UP_SOUND: number;
  GAME_OVER_SOUND: number;
}

// Confetti types
export interface ConfettiParticleProps {
  index: number;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface StatsGridProps {
  finalStats: TypingStats;
} 