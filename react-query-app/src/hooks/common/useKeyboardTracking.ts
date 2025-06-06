import { useState, useEffect, useCallback } from 'react';
import type { UseKeyboardTrackingReturn } from '../../types';

/**
 * Custom hook for tracking keyboard key presses
 * @returns Pressed keys state
 */
export const useKeyboardTracking = (): UseKeyboardTrackingReturn => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    const key = event.key;
    
    if (key === ' ') {
      setPressedKeys(prev => new Set([...prev, 'SPACE']));
    } else if (key.length === 1 && (key.match(/[A-Za-z0-9]/) || '[];\',./=-'.includes(key))) {
      setPressedKeys(prev => new Set([...prev, key.toUpperCase()]));
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent): void => {
    const key = event.key;
    
    if (key === ' ') {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete('SPACE');
        return newSet;
      });
    } else if (key.length === 1 && (key.match(/[A-Za-z0-9]/) || '[];\',./=-'.includes(key))) {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key.toUpperCase());
        return newSet;
      });
    }
  }, []);

  const resetPressedKeys = (): void => {
    setPressedKeys(new Set());
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    pressedKeys,
    resetPressedKeys
  };
}; 