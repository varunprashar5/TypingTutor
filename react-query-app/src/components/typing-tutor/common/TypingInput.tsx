import React, { useEffect, useRef, forwardRef } from 'react';
import type { TypingInputProps } from '../../../types';

/**
 * TypingInput component for handling user text input
 */
const TypingInput = forwardRef<HTMLInputElement, TypingInputProps>(
  ({ userInput, onInputChange, isCompleted, onRestart }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Use the forwarded ref or fallback to internal ref
    const finalRef = ref || inputRef;

    useEffect(() => {
      // Auto-focus the input field on component mount
      if (finalRef && 'current' in finalRef && finalRef.current) {
        finalRef.current.focus();
      }
    }, [finalRef]);

    const renderCursorAnimation = (): React.ReactNode => {
      if (!isCompleted && userInput === "") {
        return (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-0.5 h-5 bg-blue-500 animate-pulse"></div>
        );
      }
      return null;
    };

    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 mb-4 flex-shrink-0">
        <div className="relative">
          <input
            ref={finalRef}
            type="text"
            value={userInput}
            onChange={onInputChange}
            disabled={isCompleted}
            className={`w-full p-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 
                       transition-all duration-300 focus:shadow-lg bg-white/90 backdrop-blur-sm ${
                         isCompleted ? 'opacity-50 cursor-not-allowed' : ''
                       }`}
            placeholder={isCompleted ? "Test completed!" : "Start typing..."}
            aria-label="Typing input field"
            aria-describedby="typing-instructions"
          />
          {renderCursorAnimation()}
        </div>
        
        {/* Hidden instructions for screen readers */}
        <div id="typing-instructions" className="sr-only">
          Type the words shown above. Your speed and accuracy will be tracked.
        </div>
        
        {/* Restart Button */}
        <div className="flex justify-center mt-3">
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 
                       text-white font-bold py-2 px-6 rounded-xl shadow-lg 
                       transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-red-300/50 active:scale-95
                       border border-red-400/30 text-sm flex items-center gap-2"
            aria-label="Restart typing test"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart
          </button>
        </div>
      </div>
    );
  }
);

TypingInput.displayName = 'TypingInput';

export default TypingInput; 