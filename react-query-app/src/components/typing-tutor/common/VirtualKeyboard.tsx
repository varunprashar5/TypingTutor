import React from 'react';
import { KEYBOARD_LAYOUT } from '../../../constants';
import type { VirtualKeyboardProps } from '../../../types';

interface KeyProps {
  keyValue: string;
  isPressed: boolean;
  isSpaceBar?: boolean;
}

interface KeyboardRowProps {
  row: readonly string[];
  pressedKeys: Set<string>;
}

/**
 * Component for rendering individual keyboard keys
 */
const Key: React.FC<KeyProps> = ({ keyValue, isPressed, isSpaceBar = false }) => {
  const getKeyClassName = (): string => {
    const baseClasses = `border-2 border-gray-300 rounded-md shadow-sm 
                        flex items-center justify-center font-bold text-xs
                        transition-all duration-200 ease-in-out`;
    
    const sizeClasses = isSpaceBar ? 'w-48 h-8' : 'w-8 h-8';
    
    const stateClasses = isPressed
      ? 'bg-blue-200 text-blue-900 border-blue-500 transform scale-90 shadow-inner'
      : 'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 hover:shadow-md hover:scale-105';

    return `${baseClasses} ${sizeClasses} ${stateClasses}`;
  };

  return (
    <div className={getKeyClassName()}>
      {keyValue}
    </div>
  );
};

/**
 * Component for rendering keyboard rows
 */
const KeyboardRow: React.FC<KeyboardRowProps> = ({ row, pressedKeys }) => {
  return (
    <div className="flex gap-1">
      {row.map((key) => (
        <Key
          key={key}
          keyValue={key}
          isPressed={pressedKeys.has(key)}
        />
      ))}
    </div>
  );
};

/**
 * VirtualKeyboard component for displaying the keyboard layout
 */
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ pressedKeys }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 flex-shrink-0">
      <h3 className="text-sm font-bold text-gray-800 mb-3 text-center">Keyboard Layout</h3>
      <div className="flex flex-col items-center gap-2">
        {/* Keyboard Rows */}
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <KeyboardRow
            key={rowIndex}
            row={row}
            pressedKeys={pressedKeys}
          />
        ))}
        
        {/* Space Bar */}
        <div className="mt-1">
          <Key
            keyValue="SPACE"
            isPressed={pressedKeys.has('SPACE')}
            isSpaceBar={true}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard; 