import { useState, useEffect, useCallback, useRef } from 'react';
import { initializeAudioContext, playTypingSound, playErrorSound, playBurstSound, playLevelUpSound, playGameOverSound } from '../../utils/audioUtils';
import type { UseAudioReturn } from '../../types';

/**
 * Custom hook for managing audio functionality
 * @returns Audio context and sound playing functions
 */
export const useAudio = (): UseAudioReturn => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isAudioSupported, setIsAudioSupported] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const initAudio = async (): Promise<void> => {
      try {
        const context = await initializeAudioContext();
        audioContextRef.current = context;
        setAudioContext(context);
      } catch (error) {
        console.warn('Audio initialization failed:', error);
        setIsAudioSupported(false);
      }
    };

    initAudio();
    
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.warn);
      }
    };
  }, []);

  const handleTypingSound = useCallback((): void => {
    if (isAudioSupported && audioContext && !isMuted) {
      try {
        playTypingSound(audioContext);
      } catch (error) {
        console.warn('Failed to play typing sound:', error);
      }
    }
  }, [audioContext, isAudioSupported, isMuted]);

  const handleErrorSound = useCallback((): void => {
    if (isAudioSupported && audioContext && !isMuted) {
      try {
        playErrorSound(audioContext);
      } catch (error) {
        console.warn('Failed to play error sound:', error);
      }
    }
  }, [audioContext, isAudioSupported, isMuted]);

  const handleBurstSound = useCallback((): void => {
    if (isAudioSupported && audioContext && !isMuted) {
      try {
        playBurstSound(audioContext);
      } catch (error) {
        console.warn('Failed to play burst sound:', error);
      }
    }
  }, [audioContext, isAudioSupported, isMuted]);

  const handleLevelUpSound = useCallback((): void => {
    if (isAudioSupported && audioContext && !isMuted) {
      try {
        playLevelUpSound(audioContext);
      } catch (error) {
        console.warn('Failed to play level up sound:', error);
      }
    }
  }, [audioContext, isAudioSupported, isMuted]);

  const handleGameOverSound = useCallback((): void => {
    if (isAudioSupported && audioContext && !isMuted) {
      try {
        playGameOverSound(audioContext);
      } catch (error) {
        console.warn('Failed to play game over sound:', error);
      }
    }
  }, [audioContext, isAudioSupported, isMuted]);

  const toggleMute = useCallback((): void => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    audioContext,
    isAudioSupported,
    playTypingSound: handleTypingSound,
    playErrorSound: handleErrorSound,
    playBurstSound: handleBurstSound,
    playLevelUpSound: handleLevelUpSound,
    playGameOverSound: handleGameOverSound,
    isMuted,
    toggleMute
  };
}; 