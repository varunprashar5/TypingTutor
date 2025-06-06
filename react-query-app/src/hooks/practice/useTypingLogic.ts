import { useReducer, useCallback } from 'react';
import { SAMPLE_TEXT } from '../../constants';
import { TypingActionType } from '../../types';
import type { 
  TypingState, 
  TypingAction, 
  UseTypingLogicReturn, 
  TypingStats,
  ProcessKeyPressPayload,
  CompleteWordPayload,
  SetSampleTextPayload
} from '../../types';

// Initial state
const initialState: TypingState = {
  sampleText: SAMPLE_TEXT,
  sampleTextId: null,
  currentWordIndex: 0,
  userInput: "",
  completedWords: new Set(),
  errorWords: new Set(),
  totalKeyPresses: 0,
  correctKeyPresses: 0,
  isCompleted: false,
  finalStats: null
};

// Reducer function
const typingReducer = (state: TypingState, action: TypingAction): TypingState => {
  switch (action.type) {
    case TypingActionType.SET_USER_INPUT:
      return {
        ...state,
        userInput: action.payload as string
      };

    case TypingActionType.SET_SAMPLE_TEXT: {
      const payload = action.payload as SetSampleTextPayload;
      return {
        ...initialState,
        sampleText: payload.text,
        sampleTextId: payload.id
      };
    }

    case TypingActionType.PROCESS_KEY_PRESS: {
      const payload = action.payload as ProcessKeyPressPayload;
      return {
        ...state,
        totalKeyPresses: state.totalKeyPresses + 1,
        correctKeyPresses: payload.isCorrect 
          ? state.correctKeyPresses + 1 
          : state.correctKeyPresses,
        errorWords: payload.isCorrect 
          ? state.errorWords 
          : new Set([...state.errorWords, state.currentWordIndex])
      };
    }

    case TypingActionType.VALIDATE_INPUT: {
      const words = state.sampleText.split(' ');
      const targetWord = words[state.currentWordIndex];
      const currentInput = (action.payload as string).trim();
      
      if (currentInput && !targetWord?.startsWith(currentInput)) {
        return {
          ...state,
          errorWords: new Set([...state.errorWords, state.currentWordIndex])
        };
      } else if (currentInput && targetWord?.startsWith(currentInput)) {
        const newErrorWords = new Set(state.errorWords);
        newErrorWords.delete(state.currentWordIndex);
        return {
          ...state,
          errorWords: newErrorWords
        };
      }
      return state;
    }

    case TypingActionType.COMPLETE_WORD: {
      const payload = action.payload as CompleteWordPayload;
      const newErrorWords = new Set(state.errorWords);
      newErrorWords.delete(state.currentWordIndex);
      
      const newCompletedWords = new Set([...state.completedWords, state.currentWordIndex]);
      const totalWords = state.sampleText.split(' ').length;
      
      const isTestCompleted = newCompletedWords.size === totalWords;
      
      return {
        ...state,
        errorWords: newErrorWords,
        completedWords: newCompletedWords,
        currentWordIndex: state.currentWordIndex + 1,
        userInput: "",
        isCompleted: isTestCompleted,
        finalStats: isTestCompleted ? payload.finalStats : null
      };
    }

    case TypingActionType.RESET_STATE:
      return {
        ...initialState,
        sampleText: state.sampleText, // Keep the same text
        sampleTextId: state.sampleTextId // Keep the same text ID
      };

    default:
      return state;
  }
};

/**
 * Custom hook for managing typing logic and state
 * @returns Typing state and functions
 */
export const useTypingLogic = (): UseTypingLogicReturn => {
  const [state, dispatch] = useReducer(typingReducer, initialState);

  const words = state.sampleText.split(' ');
  const totalWords = words.length;

  const setUserInput = useCallback((value: string): void => {
    dispatch({
      type: TypingActionType.SET_USER_INPUT,
      payload: value
    });
  }, []);

  const processKeyPress = useCallback((inputValue: string, previousInput: string): boolean => {
    let isCorrect = false;
    
    // Track accuracy for new characters
    if (inputValue.length > previousInput.length) {
      const newChar = inputValue[inputValue.length - 1];
      const expectedChar = words[state.currentWordIndex]?.[inputValue.length - 1] || ' ';
      
      isCorrect = newChar === expectedChar;
      
      dispatch({
        type: TypingActionType.PROCESS_KEY_PRESS,
        payload: { isCorrect } as ProcessKeyPressPayload
      });
    }

    return isCorrect;
  }, [words, state.currentWordIndex]);

  const validateCurrentInput = useCallback((inputValue: string): void => {
    dispatch({
      type: TypingActionType.VALIDATE_INPUT,
      payload: inputValue
    });
  }, []);

  const completeWord = useCallback((currentWPM: number, accuracyPercentage: number, elapsedTime: number): void => {
    const finalStats: TypingStats = {
      wpm: currentWPM,
      accuracy: accuracyPercentage,
      time: elapsedTime,
      totalWords: totalWords,
      correctKeyPresses: state.correctKeyPresses,
      totalKeyPresses: state.totalKeyPresses
    };

    dispatch({
      type: TypingActionType.COMPLETE_WORD,
      payload: { finalStats } as CompleteWordPayload
    });
  }, [totalWords, state.correctKeyPresses, state.totalKeyPresses]);

  const setSampleText = useCallback((text: string, id: string): void => {
    dispatch({
      type: TypingActionType.SET_SAMPLE_TEXT,
      payload: { text, id } as SetSampleTextPayload
    });
  }, []);

  const resetTypingState = useCallback((): void => {
    dispatch({
      type: TypingActionType.RESET_STATE
    });
  }, []);

  return {
    sampleText: state.sampleText,
    sampleTextId: state.sampleTextId,
    words,
    totalWords,
    currentWordIndex: state.currentWordIndex,
    userInput: state.userInput,
    setUserInput,
    setSampleText,
    completedWords: state.completedWords,
    errorWords: state.errorWords,
    totalKeyPresses: state.totalKeyPresses,
    correctKeyPresses: state.correctKeyPresses,
    isCompleted: state.isCompleted,
    finalStats: state.finalStats,
    processKeyPress,
    validateCurrentInput,
    completeWord,
    resetTypingState
  };
}; 