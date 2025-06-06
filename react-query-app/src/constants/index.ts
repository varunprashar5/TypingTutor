import type { SoundFrequencies, AnimationDurations } from '../types';

export const SAMPLE_TEXT: string = "The quick brown fox jumps over the lazy dog and runs through the forest with great speed while birds sing in the tall trees above the peaceful meadow where flowers bloom in spring and children play games during sunny afternoons when families gather together for picnics and laughter fills the air with joy and happiness spreads throughout the community";

export const KEYBOARD_LAYOUT: readonly string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
] as const;

export const CONFETTI_COLORS: readonly string[] = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
  '#feca57', '#ff9ff3', '#54a0ff'
] as const;

export const SOUND_FREQUENCIES: SoundFrequencies = {
  TYPING: 800,
  ERROR: 200,
  BURST: 1200,
  LEVEL_UP: 880,
  GAME_OVER: 150
} as const;

export const ANIMATION_DURATIONS: AnimationDurations = {
  TYPING_SOUND: 0.1,
  ERROR_SOUND: 0.3,
  CONFETTI_FALL: 3,
  BURST_SOUND: 0.2,
  LEVEL_UP_SOUND: 0.8,
  GAME_OVER_SOUND: 1.0
} as const;

// UI Constants
export const CONFETTI_PARTICLE_COUNT: number = 50;
export const INPUT_FOCUS_DELAY: number = 100;

// Timing Constants
export const WPM_UPDATE_INTERVAL: number = 1000;
export const DEBOUNCE_DELAY: number = 300;

// API Constants
export const API_BASE_URL: string = 'http://localhost:3001'; 