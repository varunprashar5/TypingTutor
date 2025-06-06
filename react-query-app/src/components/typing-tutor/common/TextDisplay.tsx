import React, { memo } from 'react';
import type { WordProps, TextDisplayProps } from '../../../types';

/**
 * Component for rendering individual words in the text display
 */
const Word: React.FC<WordProps> = memo(({ word, index, isCompleted, hasError, isCurrent }) => {
  const getWordClassName = (): string => {
    if (isCompleted) {
      return 'bg-emerald-100 text-emerald-900 border border-emerald-300 opacity-100';
    } else if (hasError) {
      return 'bg-red-100 text-red-900 border border-red-400 shadow-sm';
    } else if (isCurrent) {
      return 'bg-blue-100 text-blue-900 border border-blue-400 shadow-sm transform scale-105';
    } else {
      return 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 opacity-60';
    }
  };

  return (
    <span 
      className={`inline-block mx-0.5 px-1.5 py-0.5 rounded-md transition-all duration-300 ease-in-out ${getWordClassName()}`}
      aria-label={`Word ${index + 1}: ${word}`}
    >
      {word}
    </span>
  );
});

Word.displayName = 'Word';

/**
 * TextDisplay component for showing the text to be typed
 */
const TextDisplay: React.FC<TextDisplayProps> = memo(({ words, currentWordIndex, completedWords, errorWords }) => {
  return (
    <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 mb-4 flex-shrink-0">
      <div className="bg-white/80 rounded-xl p-4 shadow-inner border border-gray-100">
        <div 
          className="text-sm sm:text-base leading-relaxed tracking-wide font-medium text-gray-800 select-none"
          role="region"
          aria-label="Text to type"
          aria-live="polite"
        >
          {words.map((word, index) => (
            <Word
              key={index}
              word={word}
              index={index}
              isCompleted={completedWords.has(index)}
              hasError={errorWords.has(index)}
              isCurrent={index === currentWordIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

TextDisplay.displayName = 'TextDisplay';

export default TextDisplay; 