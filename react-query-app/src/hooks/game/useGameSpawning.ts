import { useEffect } from 'react';

interface FallingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  speed: number;
}

interface UseGameSpawningProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver';
  isPaused: boolean;
  currentLevel: number;
  selectedKeyboardRow: 'all' | 'upper' | 'middle' | 'lower';
  setFallingLetters: React.Dispatch<React.SetStateAction<FallingLetter[]>>;
  setTotalLettersSpawned: React.Dispatch<React.SetStateAction<number>>;
  getSpeedMultiplier: (level: number) => number;
}

export const useGameSpawning = ({
  gameState,
  isPaused,
  currentLevel,
  selectedKeyboardRow,
  setFallingLetters,
  setTotalLettersSpawned,
  getSpeedMultiplier
}: UseGameSpawningProps) => {
  // Letter spawning mechanism for game mode
  useEffect(() => {
    let spawnInterval: NodeJS.Timeout | null = null;
    
    if (gameState === 'playing' && !isPaused) {
      // Define spawn rates based on level (in milliseconds)
      const getSpawnRate = (level: number): number => {
        const spawnRates = {
          1: 2000,  // 2 seconds
          2: 1800,  // 1.8 seconds
          3: 1600,  // 1.6 seconds
          4: 1400,  // 1.4 seconds
          5: 1200,  // 1.2 seconds
          6: 1000,  // 1 second
          7: 900,   // 0.9 seconds
          8: 800,   // 0.8 seconds
          9: 700,   // 0.7 seconds
          10: 600   // 0.6 seconds
        };
        return spawnRates[level as keyof typeof spawnRates] || 500; // Cap at 0.5 seconds for levels > 10
      };

      const getCharactersForRow = (row: 'all' | 'upper' | 'middle' | 'lower'): string => {
        switch (row) {
          case 'upper':
            return 'QWERTYUIOP';
          case 'middle':
            return 'ASDFGHJKL';
          case 'lower':
            return 'ZXCVBNM';
          case 'all':
          default:
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
      };

      const spawnLetter = () => {
        const characters = getCharactersForRow(selectedKeyboardRow);
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters[randomIndex] || 'A';
        // Use actual container width - adjust based on responsive design
        const containerElement = document.querySelector('.max-w-4xl');
        const containerWidth = containerElement ? containerElement.clientWidth - 48 : 760; // Account for padding
        const letterWidth = 40;
        const randomX = Math.random() * (containerWidth - letterWidth);
        const baseSpeed = 1; // Slower base speed for better playability
        const speedMultiplier = getSpeedMultiplier(currentLevel);
        const speed = baseSpeed * speedMultiplier;
        
        const newLetter = {
          id: `letter-${Date.now()}-${Math.random()}`,
          character: randomCharacter,
          x: randomX,
          y: -40, // Start above the container
          speed: speed
        };
        
        console.log('Spawning letter:', newLetter);
        return newLetter;
      };

      const spawnRate = getSpawnRate(currentLevel);
      console.log(`Setting up spawn interval with rate: ${spawnRate}ms for level ${currentLevel}`);
      
      // Spawn first letter immediately
      const firstLetter = spawnLetter();
      setFallingLetters([firstLetter]);
      setTotalLettersSpawned(prev => prev + 1);
      
      // Continue spawning letters at intervals
      spawnInterval = setInterval(() => {
        setFallingLetters(prev => {
          // Check if we haven't exceeded maximum letters on screen
          if (prev.length < 8) { // Increased max letters
            const newLetter = spawnLetter();
            setTotalLettersSpawned(prevTotal => prevTotal + 1);
            return [...prev, newLetter];
          }
          return prev;
        });
      }, spawnRate);
    }

    return () => {
      if (spawnInterval) {
        clearInterval(spawnInterval);
      }
    };
  }, [gameState, currentLevel, selectedKeyboardRow, isPaused, getSpeedMultiplier, setFallingLetters, setTotalLettersSpawned]);
};