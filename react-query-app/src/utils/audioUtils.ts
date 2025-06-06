import { SOUND_FREQUENCIES, ANIMATION_DURATIONS } from '../constants';

/**
 * Creates and plays a typing sound effect
 * @param audioContext - Web Audio API context
 */
export const playTypingSound = (audioContext: AudioContext | null): void => {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator: OscillatorNode = audioContext.createOscillator();
    const gainNode: GainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(SOUND_FREQUENCIES.TYPING, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + ANIMATION_DURATIONS.TYPING_SOUND);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + ANIMATION_DURATIONS.TYPING_SOUND);
  } catch (error) {
    console.warn('Error playing typing sound:', error);
  }
};

/**
 * Creates and plays an error sound effect
 * @param audioContext - Web Audio API context
 */
export const playErrorSound = (audioContext: AudioContext | null): void => {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator: OscillatorNode = audioContext.createOscillator();
    const gainNode: GainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(SOUND_FREQUENCIES.ERROR, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + ANIMATION_DURATIONS.ERROR_SOUND);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + ANIMATION_DURATIONS.ERROR_SOUND);
  } catch (error) {
    console.warn('Error playing error sound:', error);
  }
};

/**
 * Creates and plays a burst sound effect
 * @param audioContext - Web Audio API context
 */
export const playBurstSound = (audioContext: AudioContext | null): void => {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator: OscillatorNode = audioContext.createOscillator();
    const gainNode: GainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(SOUND_FREQUENCIES.BURST, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(SOUND_FREQUENCIES.BURST * 0.5, audioContext.currentTime + ANIMATION_DURATIONS.BURST_SOUND);
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + ANIMATION_DURATIONS.BURST_SOUND);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + ANIMATION_DURATIONS.BURST_SOUND);
  } catch (error) {
    console.warn('Error playing burst sound:', error);
  }
};

/**
 * Creates and plays a level up sound effect
 * @param audioContext - Web Audio API context
 */
export const playLevelUpSound = (audioContext: AudioContext | null): void => {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Create a sequence of ascending notes
    const frequencies = [SOUND_FREQUENCIES.LEVEL_UP, SOUND_FREQUENCIES.LEVEL_UP * 1.25, SOUND_FREQUENCIES.LEVEL_UP * 1.5];
    const noteDuration = ANIMATION_DURATIONS.LEVEL_UP_SOUND / frequencies.length;
    
    frequencies.forEach((freq, index) => {
      const oscillator: OscillatorNode = audioContext.createOscillator();
      const gainNode: GainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const startTime = audioContext.currentTime + (index * noteDuration);
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + noteDuration);
    });
  } catch (error) {
    console.warn('Error playing level up sound:', error);
  }
};

/**
 * Creates and plays a game over sound effect
 * @param audioContext - Web Audio API context
 */
export const playGameOverSound = (audioContext: AudioContext | null): void => {
  if (!audioContext) return;
  
  try {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Create a descending sequence for game over
    const frequencies = [SOUND_FREQUENCIES.GAME_OVER * 2, SOUND_FREQUENCIES.GAME_OVER * 1.5, SOUND_FREQUENCIES.GAME_OVER];
    const noteDuration = ANIMATION_DURATIONS.GAME_OVER_SOUND / frequencies.length;
    
    frequencies.forEach((freq, index) => {
      const oscillator: OscillatorNode = audioContext.createOscillator();
      const gainNode: GainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const startTime = audioContext.currentTime + (index * noteDuration);
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + noteDuration);
    });
  } catch (error) {
    console.warn('Error playing game over sound:', error);
  }
};

/**
 * Initializes audio context for sound effects
 * @returns Audio context or null if not supported
 */
export const initializeAudioContext = async (): Promise<AudioContext | null> => {
  try {
    // Type assertion for webkit compatibility
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const context: AudioContext = new AudioContextClass();
    return context;
  } catch (error) {
    console.warn('Audio not supported:', error);
    return null;
  }
}; 