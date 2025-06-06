import { useState, useEffect } from 'react';
import type { UseTimerReturn } from '../../types';

/**
 * Custom hook for managing timer functionality
 * @returns Timer state and control functions
 */
export const useTimer = (): UseTimerReturn => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startTimer = (): void => {
    if (startTime === null) {
      setStartTime(Date.now());
      setIsRunning(true);
    }
  };

  const stopTimer = (): void => {
    setIsRunning(false);
  };

  const resetTimer = (): void => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  // Update elapsed time every 100ms when timer is running
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (startTime !== null && isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime, isRunning]);

  return {
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer
  };
}; 