import { useEffect, useRef } from 'react';

interface FallingLetter {
  id: string;
  character: string;
  x: number;
  y: number;
  speed: number;
}

interface UseGameAnimationProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver';
  isPaused: boolean;
  setFallingLetters: React.Dispatch<React.SetStateAction<FallingLetter[]>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<'idle' | 'playing' | 'paused' | 'gameOver'>>;
  playErrorSound: () => void;
  playGameOverSound: () => void;
}

export const useGameAnimation = ({
  gameState,
  isPaused,
  setFallingLetters,
  setLives,
  setGameState,
  playErrorSound,
  playGameOverSound
}: UseGameAnimationProps) => {
  const animationRef = useRef<number | null>(null);

  // Animation loop for falling letters
  useEffect(() => {
    if (gameState !== 'playing' || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    let lastTime = 0;
    const animate = (currentTime: number) => {
      // Calculate delta time for smooth animation
      if (lastTime === 0) {
        lastTime = currentTime;
      }
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Update falling letters positions
      setFallingLetters(prev => {
        const containerHeight = 500; // Match game container height
        const updatedLetters = prev.map(letter => ({
          ...letter,
          y: letter.y + (letter.speed * deltaTime * 0.06) // Normalize speed with deltaTime
        }));
        
        // Debug: Log animation progress
        if (updatedLetters.length > 0 && Math.random() < 0.1) { // Log occasionally
          console.log(`Animating ${updatedLetters.length} letters, first letter at y: ${updatedLetters[0]?.y}`);
        }
        
        // Filter out letters that reached the bottom
        const lettersAtBottom = updatedLetters.filter(letter => letter.y > containerHeight - 40);
        const remainingLetters = updatedLetters.filter(letter => letter.y <= containerHeight - 40);
        
        // Handle letters that reached the bottom
        if (lettersAtBottom.length > 0) {
          // Play error sound for each missed letter
          lettersAtBottom.forEach(() => playErrorSound());
          
          // Decrement lives in a separate effect to avoid state update conflicts
          setTimeout(() => {
            setLives(currentLives => {
              const newLives = Math.max(0, currentLives - lettersAtBottom.length);
              if (newLives === 0) {
                setGameState('gameOver');
                playGameOverSound();
              }
              return newLives;
            });
          }, 0);
        }
        
        return remainingLetters;
      });
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [gameState, isPaused, playGameOverSound, playErrorSound, setFallingLetters, setLives, setGameState]);

  return {
    animationRef
  };
};