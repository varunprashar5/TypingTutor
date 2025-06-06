import { useEffect, useRef } from 'react';

interface FallingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  speed: number;
}

interface BurstingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  timestamp: number;
}

interface UseGameKeyDetectionProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver';
  isPaused: boolean;
  setFallingLetters: React.Dispatch<React.SetStateAction<FallingLetter[]>>;
  setBurstingLetters: React.Dispatch<React.SetStateAction<BurstingLetter[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setSuccessfulHits: React.Dispatch<React.SetStateAction<number>>;
  setShowSuccessFlash: React.Dispatch<React.SetStateAction<boolean>>;
  handlePauseToggle: () => void;
  playTypingSound: () => void;
  playErrorSound: () => void;
  playBurstSound: () => void;
}

export const useGameKeyDetection = ({
  gameState,
  isPaused,
  setFallingLetters,
  setBurstingLetters,
  setScore,
  setSuccessfulHits,
  setShowSuccessFlash,
  handlePauseToggle,
  playTypingSound,
  playErrorSound,
  playBurstSound
}: UseGameKeyDetectionProps) => {
  const lastKeyPressTime = useRef<number>(0);

  // Game key detection for falling letters
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleGameKeyDown = (event: KeyboardEvent): void => {
      // Ignore if paused
      if (isPaused) return;
      
      // Prevent default for all game keys
      if (event.key === ' ' || (event.key.length === 1 && event.key.match(/[a-zA-Z]/))) {
        event.preventDefault();
      }
      
      // Handle spacebar for pause
      if (event.key === ' ') {
        handlePauseToggle();
        return;
      }
      
      const key = event.key.toUpperCase();
      
      // Only process letter keys (A-Z)
      if (key.length === 1 && key.match(/[A-Z]/)) {
        // Debounce rapid key presses (50ms minimum between presses)
        const currentTime = Date.now();
        if (currentTime - lastKeyPressTime.current < 50) {
          return;
        }
        lastKeyPressTime.current = currentTime;
        
        const containerHeight = 500;
        const detectionZoneStart = containerHeight * 0.05; // Top 5% - even more forgiving
        const detectionZoneEnd = containerHeight * 0.95;   // Bottom 95% - larger detection zone
        
        // Get current falling letters snapshot to avoid stale closure
        setFallingLetters(currentLetters => {
          // Find matching letter in detection zone
          const matchingLetters = currentLetters
            .filter(letter => 
              letter.character === key && 
              letter.y >= detectionZoneStart && 
              letter.y <= detectionZoneEnd
            );
          
          // Prioritize letters closer to the center of the detection zone
          const detectionZoneCenter = (detectionZoneStart + detectionZoneEnd) / 2;
          const hitLetter = matchingLetters
            .sort((a, b) => {
              const distA = Math.abs(a.y - detectionZoneCenter);
              const distB = Math.abs(b.y - detectionZoneCenter);
              return distA - distB; // Closest to center first
            })[0];
          
          if (hitLetter) {
            // Add to bursting letters for animation
            setBurstingLetters(prev => [...prev, {
              id: `burst-${hitLetter.id}`,
              character: hitLetter.character,
              x: hitLetter.x,
              y: hitLetter.y,
              timestamp: Date.now()
            }]);
            
            // Play success sound and burst sound
            playTypingSound();
            playBurstSound();
            
            // Show success flash
            setShowSuccessFlash(true);
            setTimeout(() => setShowSuccessFlash(false), 300);
            
            // Increment score
            setScore(prev => prev + 10);
            
            // Increment successful hits (no automatic level progression)
            setSuccessfulHits(prev => prev + 1);
            
            // Remove the hit letter
            return currentLetters.filter(letter => letter.id !== hitLetter.id);
          } else {
            // Play error sound for missed key
            playErrorSound();
            return currentLetters;
          }
        });
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleGameKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGameKeyDown);
    };
  }, [
    gameState, 
    isPaused, 
    handlePauseToggle, 
    playTypingSound, 
    playErrorSound, 
    playBurstSound,
    setFallingLetters,
    setBurstingLetters,
    setScore,
    setSuccessfulHits,
    setShowSuccessFlash
  ]);
}; 