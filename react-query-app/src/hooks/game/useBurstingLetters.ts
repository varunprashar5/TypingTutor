import { useEffect } from 'react';

interface BurstingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  timestamp: number;
}

interface UseBurstingLettersProps {
  burstingLetters: BurstingLetter[];
  setBurstingLetters: React.Dispatch<React.SetStateAction<BurstingLetter[]>>;
}

export const useBurstingLetters = ({
  burstingLetters,
  setBurstingLetters
}: UseBurstingLettersProps) => {
  // Clean up bursting letters after animation completes
  useEffect(() => {
    if (burstingLetters.length === 0) return;

    const burstDuration = 400; // 400ms burst animation
    const cleanupTimer = setTimeout(() => {
      const currentTime = Date.now();
      setBurstingLetters(prev => 
        prev.filter(letter => currentTime - letter.timestamp < burstDuration)
      );
    }, burstDuration);

    return () => {
      clearTimeout(cleanupTimer);
    };
  }, [burstingLetters.length, setBurstingLetters]);
}; 