/**
 * Formats elapsed time from milliseconds to MM:SS format
 * @param milliseconds - Time in milliseconds
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formats time from seconds to readable format (hours and minutes)
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "67h 40m", "25m", "30s")
 * 
 * Examples:
 * - formatDuration(243600) returns "67h 40m" (67 hours 40 minutes)
 * - formatDuration(3600) returns "1h 0m" (1 hour)
 * - formatDuration(1800) returns "30m" (30 minutes)
 * - formatDuration(45) returns "45s" (45 seconds)
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${remainingSeconds}s`;
  }
};

/**
 * Calculates Words Per Minute (WPM)
 * @param completedWords - Number of completed words
 * @param elapsedTime - Time elapsed in milliseconds
 * @returns WPM rounded to nearest integer
 */
export const calculateWPM = (completedWords: number, elapsedTime: number): number => {
  if (elapsedTime <= 0) return 0;
  const minutes = elapsedTime / (1000 * 60);
  return Math.round(completedWords / minutes);
};

/**
 * Calculates accuracy percentage
 * @param correctKeyPresses - Number of correct key presses
 * @param totalKeyPresses - Total number of key presses
 * @returns Accuracy percentage rounded to nearest integer
 */
export const calculateAccuracy = (correctKeyPresses: number, totalKeyPresses: number): number => {
  if (totalKeyPresses <= 0) return 100;
  return Math.round((correctKeyPresses / totalKeyPresses) * 100);
};

/**
 * Calculates progress percentage
 * @param completedWords - Number of completed words
 * @param totalWords - Total number of words
 * @returns Progress percentage
 */
export const calculateProgress = (completedWords: number, totalWords: number): number => {
  if (totalWords <= 0) return 0;
  return (completedWords / totalWords) * 100;
}; 